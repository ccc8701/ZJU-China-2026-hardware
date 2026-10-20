#include <stdint.h>
extern uint32_t _estack, _sidata, _sdata, _edata, _sbss, _ebss;
extern int main(void);
extern void SysTick_Handler(void), USART1_IRQHandler(void), USART2_IRQHandler(void);
void Default_Handler(void) { for (;;) __asm volatile ("nop"); }
void Reset_Handler(void) {
    uint32_t *src = &_sidata;
    for (uint32_t *p = &_sdata; p < &_edata; ++p) *p = *src++;
    for (uint32_t *p = &_sbss; p < &_ebss; ++p) *p = 0;
    main();
    Default_Handler();
}
__attribute__((section(".isr_vector"), used))
void (*const vectors[76])(void) = {
    [0] = (void (*)(void))(&_estack),
    [1] = Reset_Handler,
    [2 ... 75] = Default_Handler,
    [15] = SysTick_Handler,
    [53] = USART1_IRQHandler,
    [54] = USART2_IRQHandler
};
