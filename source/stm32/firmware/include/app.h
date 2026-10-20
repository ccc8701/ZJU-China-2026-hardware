#ifndef APP_H
#define APP_H

#define APP_FW_VERSION "tankctrl-3.0"
#define APP_UART2_PROTOCOL 1u
#define APP_COMMAND_CAPACITY 160u
#define APP_STATUS_CAPACITY 1024u
#define APP_WEB_RESPONSE_CAPACITY 1152u

void app_init(void);
void app_poll(void);
#endif
