#include "util.h"
#include <assert.h>
#include <limits.h>
#include <stdio.h>

int main(void) {
    int32_t value = 17;
    assert(parse_i32("-2147483648", &value) && value == INT32_MIN);
    assert(parse_i32("2147483647", &value) && value == INT32_MAX);
    assert(!parse_i32("2147483648", &value));
    assert(!parse_i32("-2147483649", &value));
    assert(!parse_i32("", &value));
    assert(!parse_i32("-", &value));
    assert(!parse_i32("30xyz", &value));
    char text[80];
    fmt(text, sizeof text, "%d.%02u / %08X", -12, 3u, 0x0410u);
    assert(text_eq(text, "-12.03 / 00000410"));
    fmt(text, sizeof text, "%d", INT32_MIN);
    assert(text_eq(text, "-2147483648"));
    char guard[6] = { '!', 0, 0, 0, 0, '?' };
    assert(fmt(guard + 1, 4, "%s", "abcdef") == 6);
    assert(text_eq(guard + 1, "abc"));
    assert(guard[0] == '!' && guard[5] == '?');
    assert(fmt(0, 0, "%s", "abc") == 3);
    puts("util: integer bounds and bounded formatting passed");
    return 0;
}
