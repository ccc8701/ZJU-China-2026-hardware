#include <assert.h>
#include <stdint.h>
#include <stdio.h>

static uint32_t bsp_test_irq_save(void);
static void bsp_test_irq_restore(uint32_t mask);
#define BSP_UART_HOST_TEST 1
#include "../firmware/src/bsp.c"
#include <string.h>

enum { RXNE = 1u << 5, TXE = 1u << 7, TXEIE = 1u << 7 };
static uint32_t irq_mask;
static void (*restore_hook)(void);
static unsigned hook_after, hook_port;
static char transmitted[2][8192];
static size_t transmitted_used[2];

static uint32_t bsp_test_irq_save(void) {
    uint32_t previous = irq_mask;
    irq_mask = 1;
    return previous;
}

static void bsp_test_irq_restore(uint32_t mask) {
    assert(mask <= 1u);
    irq_mask = mask;
    if (!mask && restore_hook && --hook_after == 0u) {
        void (*hook)(void) = restore_hook;
        restore_hook = NULL;
        hook();
    }
}

static void reset_uart(void) {
    memset(uart_state, 0, sizeof uart_state);
    memset(host_uart_regs, 0, sizeof host_uart_regs);
    memset(transmitted, 0, sizeof transmitted);
    memset(transmitted_used, 0, sizeof transmitted_used);
    irq_mask = 0;
    restore_hook = NULL;
    hook_after = 0;
    hook_port = 0;
}

/* Exercise the real IRQ wrappers. Mock SR is cleared explicitly because a plain
   host variable cannot implement the STM32's SR/DR read-clear sequence. */
static void fire_irq(unsigned port, uint32_t status, uint8_t received) {
    assert(port < 2u && irq_mask == 0u);
    uint32_t sent_before = uart_state[port].tx_bytes;
    host_uart_regs[port].SR = status;
    host_uart_regs[port].DR = received;
    if (port == 0u) USART1_IRQHandler();
    else USART2_IRQHandler();
    if (uart_state[port].tx_bytes != sent_before) {
        assert(uart_state[port].tx_bytes == sent_before + 1u);
        assert(transmitted_used[port] + 1u < sizeof transmitted[port]);
        transmitted[port][transmitted_used[port]++] =
            (char)host_uart_regs[port].DR;
        transmitted[port][transmitted_used[port]] = 0;
    }
    host_uart_regs[port].SR = 0;
}

static void receive(unsigned port, const char *text) {
    while (*text) fire_irq(port, RXNE, (uint8_t)*text++);
}

static void write_uart(unsigned port, const char *text) {
    if (port == 0u) uart_write(text);
    else uart2_write(text);
}

static bool read_uart(unsigned port, char *out, size_t capacity) {
    return port == 0u ? uart_read_line(out, capacity) :
                        uart2_read_line(out, capacity);
}

static uint32_t rx_dropped(unsigned port) {
    return port == 0u ? uart_rx_dropped() : uart2_rx_dropped();
}

static uint32_t tx_dropped(unsigned port) {
    return port == 0u ? uart_tx_dropped() : uart2_tx_dropped();
}

static void drain_count(unsigned port, size_t count) {
    while (count--) {
        assert(host_uart_regs[port].CR1 & TXEIE);
        assert(uart_state[port].tx_head != uart_state[port].tx_tail);
        fire_irq(port, TXE, 0);
    }
}

static void drain(unsigned port) {
    size_t limit = 2048;
    while (host_uart_regs[port].CR1 & TXEIE) {
        assert(limit-- > 0);
        fire_irq(port, TXE, 0);
    }
    assert(uart_state[port].tx_head == uart_state[port].tx_tail);
}

static void fill_text(char *out, size_t length, unsigned seed) {
    for (size_t i = 0; i < length; ++i)
        out[i] = (char)('!' + (i + seed) % 90u);
    out[length] = 0;
}

static void expect_line(unsigned port, const char *expected) {
    char out[160];
    assert(read_uart(port, out, sizeof out));
    assert(strcmp(out, expected) == 0);
}

static void test_isolation(void) {
    reset_uart();
    receive(0, "desk partial");
    receive(1, "esp first\n");
    char out[160];
    assert(!uart_read_line(out, sizeof out));
    expect_line(1, "esp first");
    receive(1, "esp second\n");
    receive(0, " complete\n");
    expect_line(0, "desk partial complete");
    expect_line(1, "esp second");
    assert(uart2_rx_bytes() == strlen("esp first\nesp second\n"));

    uart_write("desktop");
    uart2_write("wifi");
    assert(uart2_tx_bytes() == 0u);
    drain(0);
    assert(strcmp(transmitted[0], "desktop") == 0);
    assert(transmitted_used[1] == 0u);
    assert(host_uart_regs[1].CR1 & TXEIE);
    drain(1);
    assert(strcmp(transmitted[1], "wifi") == 0);
    assert(uart2_tx_bytes() == 4u);
    uart_printf(" %d/%s", 17, "ok");
    drain(0);
    assert(strcmp(transmitted[0], "desktop 17/ok") == 0);
    assert(strcmp(transmitted[1], "wifi") == 0);
}

static void test_tx_capacity(unsigned port) {
    reset_uart();
    char full[2048], too_long[2049];
    fill_text(full, 2047, 3);
    fill_text(too_long, 2048, 7);
    write_uart(port, "");
    assert(!(host_uart_regs[port].CR1 & TXEIE));
    assert(tx_dropped(port) == 0u);
    write_uart(port, full);
    assert(transmitted_used[port] == 0u);
    assert(host_uart_regs[port].CR1 & TXEIE);
    write_uart(port, "rejected");
    assert(tx_dropped(port) == 1u);
    drain_count(port, 10);
    write_uart(port, "elevenbytes");
    assert(tx_dropped(port) == 2u);
    drain(port);
    assert(transmitted_used[port] == 2047u);
    assert(strcmp(transmitted[port], full) == 0);
    write_uart(port, too_long);
    assert(tx_dropped(port) == 3u);
    assert(!(host_uart_regs[port].CR1 & TXEIE));
    write_uart(port, "next");
    drain(port);
    assert(strcmp(transmitted[port] + 2047, "next") == 0);
    assert(tx_dropped(1u - port) == 0u);
    assert(transmitted_used[1u - port] == 0u);
    assert(uart_state[port].tx_bytes == 2051u);
}

static void test_tx_wrap(unsigned port) {
    reset_uart();
    char first[1801], second[1601];
    fill_text(first, 1800, 1);
    fill_text(second, 1600, 5);
    write_uart(port, first);
    drain_count(port, 1700);
    write_uart(port, second);
    drain(port);
    assert(transmitted_used[port] == 3400u);
    assert(memcmp(transmitted[port], first, 1800) == 0);
    assert(strcmp(transmitted[port] + 1800, second) == 0);
    assert(tx_dropped(port) == 0u);
}

static void hook_drain(void) { drain(hook_port); }

static void test_tx_publish_after_drain(unsigned port) {
    reset_uart();
    write_uart(port, "old");
    write_uart(1u - port, "other");
    hook_port = port;
    hook_after = 1;
    restore_hook = hook_drain;
    /* The first irq_restore occurs after the producer's capacity snapshot.
       The old queue is emptied before the new head is published. */
    write_uart(port, "new");
    assert(restore_hook == NULL);
    assert(strcmp(transmitted[port], "old") == 0);
    assert(host_uart_regs[port].CR1 & TXEIE);
    assert(transmitted_used[1u - port] == 0u);
    drain(port);
    drain(1u - port);
    assert(strcmp(transmitted[port], "oldnew") == 0);
    assert(strcmp(transmitted[1u - port], "other") == 0);
}

static void test_old_newline_after_loss(unsigned port) {
    reset_uart();
    receive(port, "old\npump ");
    fire_irq(port, RXNE | 8u, 'x');
    receive(port, "on\n");
    receive(1u - port, "unaffected\n");
    char out[160] = "unchanged";
    assert(!read_uart(port, out, sizeof out));
    assert(strcmp(out, "unchanged") == 0);
    assert(rx_dropped(port) == 1u);
    expect_line(1u - port, "unaffected");
    receive(port, "discard this\nvalid\n");
    expect_line(port, "valid");
    assert(rx_dropped(port) == 1u);
    assert(uart_state[port].rx_bytes ==
           strlen("old\npump on\ndiscard this\nvalid\n") + 1u);
}

static void hook_loss_during_line(void) {
    fire_irq(hook_port, RXNE | 2u, '!');
    receive(hook_port, "\ninjected\n");
}

static void test_loss_during_line(unsigned port, unsigned after) {
    reset_uart();
    receive(port, "pump on\nbuffered\n");
    hook_port = port;
    hook_after = after;
    restore_hook = hook_loss_during_line;
    char out[160] = "unchanged";
    assert(!read_uart(port, out, sizeof out));
    assert(restore_hook == NULL);
    assert(strcmp(out, "unchanged") == 0);
    assert(rx_dropped(port) == 1u);
    receive(port, "new boundary\nvalid\n");
    expect_line(port, "valid");
    assert(rx_dropped(port) == 1u);
}

static void test_rx_overflow(unsigned port) {
    reset_uart();
    for (unsigned i = 0; i < 256u; ++i) fire_irq(port, RXNE, 'x');
    assert(rx_dropped(port) == 1u);
    assert(uart_state[port].rx_bytes == 256u);
    char out[160];
    assert(!read_uart(port, out, sizeof out));
    receive(port, "\nvalid\n");
    expect_line(port, "valid");
    assert(rx_dropped(port) == 1u);
}

static void test_local_line_errors(unsigned port) {
    reset_uart();
    receive(port, "\001invalid\nclean\n");
    expect_line(port, "clean");
    assert(rx_dropped(port) == 1u);
    receive(port, "too big\nfresh\n");
    char out[160] = "unchanged";
    assert(!read_uart(port, out, 4));
    assert(strcmp(out, "unchanged") == 0);
    expect_line(port, "fresh");
    assert(rx_dropped(port) == 2u);
    assert(uart_state[port].rx_loss_epoch == 0u);

    for (unsigned i = 0; i < 160u; ++i) fire_irq(port, RXNE, 'x');
    receive(port, "\nshort\n");
    expect_line(port, "short");
    assert(rx_dropped(port) == 3u);
    assert(uart_state[port].rx_loss_epoch == 0u);
}

static void test_rx_tx_same_irq(unsigned port) {
    reset_uart();
    write_uart(port, "ABC");
    fire_irq(port, RXNE | TXE, 'o');
    fire_irq(port, RXNE | TXE, 'k');
    fire_irq(port, RXNE | TXE, '\n');
    expect_line(port, "ok");
    assert(strcmp(transmitted[port], "ABC") == 0);
    assert(!(host_uart_regs[port].CR1 & TXEIE));
    assert(uart_state[port].rx_bytes == 3u);
    assert(uart_state[port].tx_bytes == 3u);
    assert(rx_dropped(port) == 0u);
    fire_irq(port, TXE, 0);
    assert(uart_state[port].tx_bytes == 3u);
}

static void test_rx_error_keeps_tx(unsigned port) {
    reset_uart();
    write_uart(port, "ABCD");
    /* Each PE/FE/NE/ORE status must drain DR and count a received byte, even
       when RXNE is clear, while allowing the TX side of that IRQ to progress. */
    for (unsigned bit = 0; bit < 4u; ++bit)
        fire_irq(port, TXE | (1u << bit), '!');
    assert(strcmp(transmitted[port], "ABCD") == 0);
    assert(rx_dropped(port) == 4u);
    assert(uart_state[port].rx_bytes == 4u);
    assert(uart_state[port].tx_bytes == 4u);
    assert(rx_dropped(1u - port) == 0u);
    if (port == 1u) {
        assert(uart2_rx_bytes() == 4u);
        assert(uart2_tx_bytes() == 4u);
    }
}

int main(void) {
    test_isolation();
    for (unsigned port = 0; port < 2u; ++port) {
        test_tx_capacity(port);
        test_tx_wrap(port);
        test_tx_publish_after_drain(port);
        test_old_newline_after_loss(port);
        test_loss_during_line(port, 3);
        test_loss_during_line(port, (unsigned)strlen("pump on\n"));
        test_rx_overflow(port);
        test_local_line_errors(port);
        test_rx_tx_same_irq(port);
        test_rx_error_keeps_tx(port);
    }
    puts("bsp UART: isolation, whole-string TX, wrap, IRQ races and loss recovery passed");
    return 0;
}
