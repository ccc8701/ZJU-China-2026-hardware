#ifndef UTIL_H
#define UTIL_H
#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>
#include <stdarg.h>
size_t text_len(const char *s);
bool text_eq(const char *a, const char *b);
bool parse_i32(const char *s, int32_t *value);
int fmt(char *out, size_t capacity, const char *format, ...);
int vfmt(char *out, size_t capacity, const char *format, va_list args);
void *memcpy(void *dst, const void *src, size_t n);
void *memset(void *dst, int value, size_t n);
#endif
