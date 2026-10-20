#ifndef DRIVERS_H
#define DRIVERS_H
#include "bsp.h"
#define OLED_WIDTH 128u
#define OLED_HEIGHT 64u
#define OLED_PAGES (OLED_HEIGHT / 8u)
#define OLED_TEXT_ROWS OLED_PAGES
#define OLED_TEXT_COLUMNS (OLED_WIDTH / 6u)
typedef struct { gpio_pin_t scl; gpio_pin_t sda; } soft_i2c_t;
extern const soft_i2c_t BUS_OLED, BUS_AHT;
void i2c_init(const soft_i2c_t *bus);
bool i2c_probe(const soft_i2c_t *bus, uint8_t address);
bool i2c_write(const soft_i2c_t *bus, uint8_t address,
               const uint8_t *data, size_t length);
bool i2c_read(const soft_i2c_t *bus, uint8_t address,
              uint8_t *data, size_t length);
bool oled_init(void);
uint8_t oled_address(void);
void oled_clear(void);
void oled_text(uint8_t row, uint8_t column, const char *text);
/* Synchronous refresh cancels any queued asynchronous frame. */
bool oled_refresh(void);
/* Begin takes a frame snapshot without I2C traffic; false if busy/unavailable. */
bool oled_refresh_begin(void);
/* Step sends at most 16 data bytes. True means no error, including when idle. */
bool oled_refresh_step(void);
/* Query completion separately; errors and the final successful step clear busy. */
bool oled_refresh_busy(void);
bool oled_test_pattern(uint8_t pattern);
typedef enum { AHT_WAIT, AHT_OK, AHT_ERROR } aht_result_t;
bool aht_init(void);
bool aht_start(void);
aht_result_t aht_poll(int32_t *temperature_centi, uint32_t *humidity_centi);
#endif
