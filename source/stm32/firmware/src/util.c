#include "util.h"
size_t text_len(const char *s) { size_t n = 0; while (s[n]) ++n; return n; }
bool text_eq(const char *a, const char *b) {
    while (*a && *a == *b) { ++a; ++b; }
    return *a == *b;
}
bool parse_i32(const char *s, int32_t *value) {
    bool negative = *s == '-';
    if (*s == '-' || *s == '+') ++s;
    if (!*s) return false;
    uint32_t n = 0, limit = negative ? 2147483648u : 2147483647u;
    for (; *s; ++s) {
        if (*s < '0' || *s > '9') return false;
        uint32_t d = (uint32_t)(*s - '0');
        if (n > (limit - d) / 10u) return false;
        n = n * 10u + d;
    }
    *value = negative ? (int32_t)(0u - n) : (int32_t)n;
    return true;
}
void *memcpy(void *dst, const void *src, size_t n) {
    unsigned char *d = dst;
    const unsigned char *s = src;
    while (n--) *d++ = *s++;
    return dst;
}
void *memset(void *dst, int value, size_t n) {
    unsigned char *d = dst;
    while (n--) *d++ = (unsigned char)value;
    return dst;
}
static void put(char *out, size_t capacity, size_t *count, char c) {
    if (capacity && *count + 1u < capacity) out[*count] = c;
    ++*count;
}
static void number(char *out, size_t capacity, size_t *count,
                   uint32_t value, bool negative, unsigned base,
                   unsigned width, bool zero, bool uppercase) {
    char digits[32];
    unsigned n = 0;
    const char *alphabet = uppercase ? "0123456789ABCDEF" : "0123456789abcdef";
    do { digits[n++] = alphabet[value % base]; value /= base; } while (value);
    unsigned length = n + (negative ? 1u : 0u);
    if (negative && zero) put(out, capacity, count, '-');
    for (unsigned i = length; i < width; ++i) put(out, capacity, count, zero ? '0' : ' ');
    if (negative && !zero) put(out, capacity, count, '-');
    while (n) put(out, capacity, count, digits[--n]);
}
int vfmt(char *out, size_t capacity, const char *format, va_list args) {
    size_t count = 0;
    for (; *format; ++format) {
        if (*format != '%') { put(out, capacity, &count, *format); continue; }
        ++format;
        bool zero = *format == '0';
        if (zero) ++format;
        unsigned width = 0;
        while (*format >= '0' && *format <= '9') {
            width = width * 10u + (unsigned)(*format++ - '0');
            if (width > 100u) width = 100u;
        }
        bool long_value = *format == 'l';
        if (long_value) ++format;
        char type = *format;
        if (!type) break;
        if (type == 's') {
            const char *s = va_arg(args, const char *);
            if (!s) s = "(null)";
            while (*s) put(out, capacity, &count, *s++);
        } else if (type == 'c') put(out, capacity, &count, (char)va_arg(args, int));
        else if (type == '%') put(out, capacity, &count, '%');
        else if (type == 'd' || type == 'i') {
            int32_t v = long_value ? (int32_t)va_arg(args, long) : va_arg(args, int);
            number(out, capacity, &count, v < 0 ? 0u - (uint32_t)v : (uint32_t)v,
                   v < 0, 10, width, zero, false);
        } else if (type == 'u' || type == 'x' || type == 'X') {
            uint32_t v = long_value ? (uint32_t)va_arg(args, unsigned long) : va_arg(args, unsigned int);
            number(out, capacity, &count, v, false, type == 'u' ? 10u : 16u,
                   width, zero, type == 'X');
        } else { put(out, capacity, &count, '?'); }
    }
    if (capacity) out[count < capacity ? count : capacity - 1u] = 0;
    return (int)count;
}
int fmt(char *out, size_t capacity, const char *format, ...) {
    va_list args;
    va_start(args, format);
    int count = vfmt(out, capacity, format, args);
    va_end(args);
    return count;
}
