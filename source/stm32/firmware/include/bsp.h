#ifndef BSP_H
#define BSP_H
#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

typedef enum { PORT_A, PORT_B, PORT_C } gpio_port_t;
typedef struct { gpio_port_t port; uint8_t pin; } gpio_pin_t;
typedef enum { GPIO_IN_FLOAT, GPIO_IN_PULL_UP, GPIO_IN_PULL_DOWN,
               GPIO_OUT_PP, GPIO_OUT_OD } gpio_mode_t;
extern const gpio_pin_t PIN_LED_R, PIN_LED_Y, PIN_LED_G;
extern const gpio_pin_t PIN_RELAY[3], PIN_BUTTON[3], PIN_LEVEL[3];
void bsp_init(void);
void gpio_mode(gpio_pin_t pin, gpio_mode_t mode);
void gpio_write(gpio_pin_t pin, bool high);
bool gpio_read(gpio_pin_t pin);
uint32_t millis(void);
void delay_ms(uint32_t ms);
void delay_us(uint32_t us);
/* Foreground-only, nonblocking whole-string enqueue (2047-byte capacity).
   Queue-full strings are wholly rejected; IRQs transmit accepted strings. */
void uart_write(const char *text);
void uart_printf(const char *format, ...);
bool uart_read_line(char *line, size_t capacity);
uint32_t uart_rx_dropped(void);
/* Number of whole strings rejected by the TX queue, not a byte count. */
uint32_t uart_tx_dropped(void);
/* USART2 on PA2 TX / PA3 RX, 115200 8N1, with independent queues.
   Same foreground-only and whole-string rejection rules as USART1. */
void uart2_write(const char *text);
bool uart2_read_line(char *line, size_t capacity);
uint32_t uart2_rx_dropped(void);
uint32_t uart2_tx_dropped(void);
/* Cumulative DR reads (including errored bytes) and writes, modulo 2^32. */
uint32_t uart2_rx_bytes(void);
uint32_t uart2_tx_bytes(void);
void bsp_reboot(void);
#endif
