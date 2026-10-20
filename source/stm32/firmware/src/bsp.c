#include "bsp.h"
#include "util.h"
#include <stdarg.h>

typedef struct {
    volatile uint32_t CRL, CRH, IDR, ODR, BSRR, BRR, LCKR;
} gpio_regs_t;
typedef struct {
    volatile uint32_t CR, CFGR, CIR, APB2RSTR, APB1RSTR, AHBENR,
                      APB2ENR, APB1ENR, BDCR, CSR;
} rcc_regs_t;
typedef struct {
    volatile uint32_t SR, DR, BRR, CR1, CR2, CR3, GTPR;
} uart_regs_t;
#define RCC ((rcc_regs_t *)0x40021000u)
#ifdef BSP_UART_HOST_TEST
static uart_regs_t host_uart_regs[2];
#define UART1 (&host_uart_regs[0])
#define UART2 (&host_uart_regs[1])
#else
#define UART1 ((uart_regs_t *)0x40013800u)
#define UART2 ((uart_regs_t *)0x40004400u)
#endif
#define REG32(address) (*(volatile uint32_t *)(address))
#define GPIO_BASE 0x40010800u
#define UART_RX_MASK 255u
#define UART_TX_MASK 2047u

const gpio_pin_t PIN_LED_R = { PORT_B, 3 };
const gpio_pin_t PIN_LED_Y = { PORT_B, 4 };
const gpio_pin_t PIN_LED_G = { PORT_B, 5 };
const gpio_pin_t PIN_RELAY[3] = {{PORT_A,15},{PORT_A,12},{PORT_A,11}};
const gpio_pin_t PIN_BUTTON[3] = {{PORT_B,14},{PORT_B,15},{PORT_A,8}};
const gpio_pin_t PIN_LEVEL[3] = {{PORT_C,13},{PORT_C,14},{PORT_C,15}};
typedef struct {
    volatile uint32_t rx_dropped, rx_loss_epoch, tx_dropped, rx_bytes, tx_bytes;
    volatile uint16_t rx_head, rx_tail, tx_head, tx_tail;
    volatile uint8_t rx_ring[UART_RX_MASK + 1u];
    volatile uint8_t tx_ring[UART_TX_MASK + 1u];
    char line[160];
    size_t used;
    bool discard;
    uint32_t seen_loss_epoch;
} uart_state_t;
static uart_state_t uart_state[2];

#ifdef BSP_UART_HOST_TEST
static uint32_t irq_save(void) { return bsp_test_irq_save(); }
static void irq_restore(uint32_t mask) { bsp_test_irq_restore(mask); }
#else
static uint32_t irq_save(void) {
    uint32_t mask;
    __asm volatile ("mrs %0, primask\n cpsid i" : "=r"(mask) : : "memory");
    return mask;
}
static void irq_restore(uint32_t mask) {
    __asm volatile ("msr primask, %0" : : "r"(mask) : "memory");
}
#endif

#ifndef BSP_UART_HOST_TEST
static volatile uint32_t ticks;
static gpio_regs_t *gpio(gpio_pin_t pin) {
    return (gpio_regs_t *)(GPIO_BASE + (uint32_t)pin.port * 0x400u);
}
void gpio_write(gpio_pin_t pin, bool high) {
    gpio(pin)->BSRR = 1u << (pin.pin + (high ? 0u : 16u));
}
void gpio_mode(gpio_pin_t pin, gpio_mode_t mode) {
    uint32_t nibble = 4u;
    if (mode == GPIO_IN_PULL_UP || mode == GPIO_IN_PULL_DOWN) {
        gpio_write(pin, mode == GPIO_IN_PULL_UP);
        nibble = 8u;
    } else if (mode == GPIO_OUT_PP) nibble = 2u; /* 2 MHz push-pull */
    else if (mode == GPIO_OUT_OD) nibble = 6u;   /* 2 MHz open-drain */
    volatile uint32_t *reg = pin.pin < 8 ? &gpio(pin)->CRL : &gpio(pin)->CRH;
    uint32_t shift = (pin.pin & 7u) * 4u;
    *reg = (*reg & ~(15u << shift)) | (nibble << shift);
}
bool gpio_read(gpio_pin_t pin) { return (gpio(pin)->IDR & (1u << pin.pin)) != 0; }
void SysTick_Handler(void) { ++ticks; }
uint32_t millis(void) { return ticks; }
void delay_ms(uint32_t ms) {
    uint32_t start = millis();
    while ((uint32_t)(millis() - start) < ms) { __asm volatile ("nop"); }
}
void delay_us(uint32_t us) {
    uint32_t start = REG32(0xE0001004u), cycles = us * 8u;
    while ((uint32_t)(REG32(0xE0001004u) - start) < cycles) { __asm volatile ("nop"); }
}
#endif

static void uart_irq(uart_state_t *state, uart_regs_t *regs) {
    uint32_t status = regs->SR;
    if (status & ((1u << 5) | 15u)) {
        uint8_t value = (uint8_t)regs->DR;
        ++state->rx_bytes;
        if (status & 15u) { ++state->rx_dropped; ++state->rx_loss_epoch; }
        else {
            uint16_t next = (uint16_t)((state->rx_head + 1u) & UART_RX_MASK);
            if (next == state->rx_tail) { ++state->rx_dropped; ++state->rx_loss_epoch; }
            else { state->rx_ring[state->rx_head] = value; state->rx_head = next; }
        }
    }
    if ((status & (1u << 7)) && (regs->CR1 & (1u << 7))) {
        if (state->tx_tail != state->tx_head) {
            regs->DR = state->tx_ring[state->tx_tail];
            state->tx_tail = (uint16_t)((state->tx_tail + 1u) & UART_TX_MASK);
            ++state->tx_bytes;
        }
        if (state->tx_tail == state->tx_head) regs->CR1 &= ~(1u << 7);
    }
}
void USART1_IRQHandler(void) { uart_irq(&uart_state[0], UART1); }
void USART2_IRQHandler(void) { uart_irq(&uart_state[1], UART2); }

static void uart_enqueue(uart_state_t *state, uart_regs_t *regs,
                         const char *text) {
    size_t length = text_len(text);
    if (!length) return;
    uint32_t mask = irq_save();
    uint16_t head = state->tx_head;
    size_t available = (state->tx_tail - head - 1u) & UART_TX_MASK;
    if (length > available) {
        ++state->tx_dropped;
        irq_restore(mask);
        return;
    }
    irq_restore(mask);
    /* One foreground producer: ISR only consumes up to the published head.
       Filling uncommitted empty slots can therefore keep RX IRQs enabled. */
    for (size_t i = 0; i < length; ++i) {
        state->tx_ring[head] = (uint8_t)text[i];
        head = (uint16_t)((head + 1u) & UART_TX_MASK);
    }
    mask = irq_save();
    state->tx_head = head;
    /* Atomically publish and wake TX, including when ISR emptied the old queue. */
    regs->CR1 |= 1u << 7;
    irq_restore(mask);
}
void uart_write(const char *text) { uart_enqueue(&uart_state[0], UART1, text); }
void uart2_write(const char *text) { uart_enqueue(&uart_state[1], UART2, text); }
void uart_printf(const char *format, ...) {
    char text[768];
    va_list args;
    va_start(args, format);
    vfmt(text, sizeof text, format, args);
    va_end(args);
    uart_write(text);
}
uint32_t uart_rx_dropped(void) { return uart_state[0].rx_dropped; }
uint32_t uart_tx_dropped(void) { return uart_state[0].tx_dropped; }
uint32_t uart2_rx_dropped(void) { return uart_state[1].rx_dropped; }
uint32_t uart2_tx_dropped(void) { return uart_state[1].tx_dropped; }
uint32_t uart2_rx_bytes(void) { return uart_state[1].rx_bytes; }
uint32_t uart2_tx_bytes(void) { return uart_state[1].tx_bytes; }

static bool uart_line(uart_state_t *state, char *out, size_t capacity) {
    for (;;) {
        uint32_t mask = irq_save();
        if (state->rx_loss_epoch != state->seen_loss_epoch) {
            state->seen_loss_epoch = state->rx_loss_epoch;
            /* Existing newlines may predate the error: clear the entire queue,
               then synchronize at a future newline, not a buffered old one. */
            state->rx_tail = state->rx_head;
            state->used = 0;
            state->discard = true;
        }
        if (state->rx_tail == state->rx_head) { irq_restore(mask); return false; }
        uint8_t c = state->rx_ring[state->rx_tail];
        state->rx_tail = (uint16_t)((state->rx_tail + 1u) & UART_RX_MASK);
        uint32_t consumed_epoch = state->rx_loss_epoch;
        irq_restore(mask);
        if (c == '\r') continue;
        if (c == '\n') {
            mask = irq_save();
            if (consumed_epoch != state->rx_loss_epoch) {
                state->seen_loss_epoch = state->rx_loss_epoch;
                state->rx_tail = state->rx_head;
                state->used = 0;
                state->discard = true;
                irq_restore(mask);
                continue;
            }
            if (state->discard) {
                state->discard = false; state->used = 0; irq_restore(mask); continue;
            }
            if (!state->used) { irq_restore(mask); continue; }
            if (!capacity || state->used >= capacity) {
                ++state->rx_dropped; state->used = 0; irq_restore(mask); return false;
            }
            memcpy(out, state->line, state->used);
            out[state->used] = 0;
            state->used = 0;
            irq_restore(mask);
            return true;
        }
        if (state->discard) continue;
        if ((c == 8u || c == 127u) && state->used) { --state->used; continue; }
        if (c < 32u || c > 126u) {
            state->discard = true; state->used = 0; ++state->rx_dropped; continue;
        }
        if (state->used + 1u >= sizeof state->line) {
            state->discard = true; state->used = 0; ++state->rx_dropped;
        } else state->line[state->used++] = (char)c;
    }
    return false;
}
bool uart_read_line(char *out, size_t capacity) {
    return uart_line(&uart_state[0], out, capacity);
}
bool uart2_read_line(char *out, size_t capacity) {
    return uart_line(&uart_state[1], out, capacity);
}

#ifndef BSP_UART_HOST_TEST
void bsp_reboot(void) {
    __asm volatile ("cpsid i");
    REG32(0xE000ED0Cu) = 0x05FA0004u;
    for (;;) { __asm volatile ("nop"); }
}
void bsp_init(void) {
    __asm volatile ("cpsid i");
    /* Establish a known clock even after the ROM GO command. HSI = 8 MHz. */
    RCC->CR |= 1u;
    while (!(RCC->CR & 2u)) { }
    RCC->CFGR = 0u;
    while (RCC->CFGR & 12u) { }
    RCC->CR &= ~((1u << 24) | (1u << 16) | (1u << 18));
    REG32(0x40022000u) = 0u; /* FLASH_ACR: zero wait states at 8 MHz. */
    RCC->APB2ENR |= (1u << 0) | (1u << 2) | (1u << 3) | (1u << 4) | (1u << 14);
    RCC->APB2RSTR |= 1u << 14;
    RCC->APB2RSTR &= ~(1u << 14);
    RCC->APB1ENR |= 1u << 17;
    RCC->APB1RSTR |= 1u << 17;
    RCC->APB1RSTR &= ~(1u << 17);
    /* SWJ_CFG=010: release PA15/PB3/PB4, preserve PA13/PA14 SWD. */
    REG32(0x40010004u) = 2u << 24;
    /* A debugger can leave TRACE_IOEN set across system reset. */
    REG32(0xE0042004u) &= ~(1u << 5);
    for (unsigned i = 0; i < 3; ++i) {
        gpio_mode(PIN_RELAY[i], GPIO_IN_FLOAT);
        gpio_mode(PIN_BUTTON[i], GPIO_IN_PULL_UP);
        gpio_mode(PIN_LEVEL[i], i == 0 ? GPIO_IN_PULL_UP : GPIO_IN_FLOAT);
    }
    const gpio_pin_t leds[3] = { PIN_LED_R, PIN_LED_Y, PIN_LED_G };
    for (unsigned i = 0; i < 3; ++i) {
        gpio_write(leds[i], false);
        gpio_mode(leds[i], GPIO_OUT_PP);
    }
    gpio_pin_t tx = { PORT_A,9 }, rx = { PORT_A,10 };
    gpio_write(tx, true);
    /* PA9 alternate-function push-pull; hold unused PA10 at UART idle high. */
    gpio(tx)->CRH = (gpio(tx)->CRH & ~(15u << 4)) | (10u << 4);
    gpio_mode(rx, GPIO_IN_PULL_UP);
    gpio_pin_t tx2 = { PORT_A,2 }, rx2 = { PORT_A,3 };
    gpio_write(tx2, true);
    /* PA2 alternate-function push-pull; PA3 USART2 RX idle high. */
    gpio(tx2)->CRL = (gpio(tx2)->CRL & ~(15u << 8)) | (10u << 8);
    gpio_mode(rx2, GPIO_IN_PULL_UP);
    memset(uart_state, 0, sizeof uart_state);
    UART1->BRR = 69u; /* 8 MHz / 115200, realized baud 115942 (~0.64% error). */
    UART1->CR2 = 0;
    UART1->CR3 = 0;
    UART1->CR1 = (1u << 13) | (1u << 5) | (1u << 3) | (1u << 2);
    UART2->BRR = 69u;
    UART2->CR2 = 0;
    UART2->CR3 = 0;
    UART2->CR1 = (1u << 13) | (1u << 5) | (1u << 3) | (1u << 2);
    REG32(0xE000ED08u) = 0x08000000u; /* vector table */
    REG32(0xE000E010u) = 0u;
    REG32(0xE000E014u) = 7999u;
    REG32(0xE000E018u) = 0u;
    REG32(0xE000E180u) = 0xFFFFFFFFu;
    REG32(0xE000E184u) = 0xFFFFFFFFu;
    REG32(0xE000E280u) = 0xFFFFFFFFu;
    REG32(0xE000E284u) = 0xFFFFFFFFu;
    REG32(0xE000E104u) = (1u << 5) | (1u << 6); /* USART1 IRQ37, USART2 IRQ38 */
    REG32(0xE000EDFCu) |= 1u << 24; /* DWT tracing */
    REG32(0xE0001004u) = 0;
    REG32(0xE0001000u) |= 1u;
    REG32(0xE000E010u) = 7u;
    __asm volatile ("cpsie i");
}
#endif
