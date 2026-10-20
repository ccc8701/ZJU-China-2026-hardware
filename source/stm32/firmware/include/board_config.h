#ifndef BOARD_CONFIG_H
#define BOARD_CONFIG_H

/* User confirmed channels 1/2/3 click and indicate with HIGH; 2026-10-01. */
#ifndef BOARD_RELAYS_VERIFIED
#define BOARD_RELAYS_VERIFIED 1
#endif

#ifndef BOARD_RELAY_ACTIVE_HIGH
#define BOARD_RELAY_ACTIVE_HIGH 1
#endif

/* Bit 0: upper H3/PC13; bit 1: middle H4/PC14; bit 2: lower H8/PC15. */
#ifndef BOARD_LEVEL_MASK
#define BOARD_LEVEL_MASK 7
#endif

#endif
