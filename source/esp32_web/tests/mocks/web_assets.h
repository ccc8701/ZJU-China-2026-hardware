#pragma once
#include "Arduino.h"
namespace tankweb_assets {
struct Asset { const char *path; const char *mime; const uint8_t *data; size_t size; const char *etag; };
static const uint8_t empty[] = {0};
static const Asset assets[] = {
    {"/", "text/html", empty, 0, "\"mock\""},
    {"/app.js", "application/javascript", empty, 0, "\"mock-js\""},
    {"/style.css", "text/css", empty, 0, "\"mock-css\""}
};
static const size_t asset_count = sizeof(assets) / sizeof(assets[0]);
}
