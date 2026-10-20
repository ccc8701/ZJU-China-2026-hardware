#include "display_temperature.h"
#include <assert.h>
#include <initializer_list>
#include <stdio.h>
#include <string.h>
using tankweb::DisplayTemperature;
namespace {
unsigned checks=0;
void check(bool value) { ++checks; assert(value); }
void healthy(DisplayTemperature &m, uint32_t now, int direction, int32_t measured=2300) {
    m.update(now, measured, true, direction, true);
}
bool same(const DisplayTemperature::View &a, const DisplayTemperature::View &b) {
    return a.available==b.available && a.centi==b.centi && a.fresh==b.fresh &&
        a.estimated==b.estimated && a.phase==b.phase && a.direction==b.direction &&
        a.elapsed_ms==b.elapsed_ms && a.delay_remaining_ms==b.delay_remaining_ms;
}
void testStartup() {
    DisplayTemperature m(DisplayTemperature::SMOOTH);
    check(!m.view().available);
    m.update(0, 0, false, 1, true);
    check(!m.view().available);
    m.update(100, 2345, true, 0, false);
    check(!m.view().available);
    healthy(m, 200, 0, 2345);
    check(m.view().centi==2345 && !m.view().estimated);
    healthy(m, 300, 0, 2400);
    check(m.view().centi==2400 && m.view().phase==DisplayTemperature::MEASURED);
    healthy(m, 400, 1, 2400);
    check(m.view().estimated && m.view().delay_remaining_ms==3000);
    healthy(m, 3399, 1, 5000);
    check(m.view().centi==2400 && m.view().delay_remaining_ms==1);
    healthy(m, 3400, 1);
    check(m.view().centi==2400 && m.view().phase==DisplayTemperature::RAMP);
}
void testRateAndDirections() {
    for (auto strategy : {DisplayTemperature::STEP, DisplayTemperature::SMOOTH}) {
        for (int direction : {-1,1}) {
            DisplayTemperature m(strategy);
            healthy(m, 0, direction, 2700);
            const uint32_t times[]={3000,10500,18000,25500,32999,33000,48000,63000};
            const int smooth[]={0,15,50,84,99,100,150,200};
            const int step[]={0,0,0,0,0,100,100,200};
            for (unsigned i=0;i<8;++i) {
                healthy(m,times[i],direction, direction>0 ? -4000 : 8000);
                check(m.view().centi==2700+direction*(strategy==DisplayTemperature::SMOOTH?smooth[i]:step[i]));
                check(m.view().elapsed_ms==times[i] && m.view().direction==direction);
            }
        }
    }
}
void testManualStopRestartReversal() {
    DisplayTemperature m(DisplayTemperature::SMOOTH);
    healthy(m,0,1);
    healthy(m,18000,1);
    check(m.view().centi==2350);
    healthy(m,18000,0,8000);
    healthy(m,100000,0,8000);
    check(m.view().centi==2350 && m.view().phase==DisplayTemperature::HOLD);
    healthy(m,100000,1,8000);
    check(m.view().delay_remaining_ms==3000 && m.view().centi==2350);
    healthy(m,118000,1);
    check(m.view().centi==2400);
    healthy(m,118000,-1);
    check(m.view().centi==2400 && m.view().delay_remaining_ms==3000);
    healthy(m,136000,-1,8000);
    check(m.view().centi==2350);
    healthy(m,151000,-1);
    check(m.view().centi==2300);
}
void testFreezeRecovery() {
    DisplayTemperature m(DisplayTemperature::SMOOTH);
    healthy(m,0,1);
    healthy(m,18000,1);
    const auto before=m.view();
    m.update(19000,7000,true,1,false);
    check(m.view().centi==before.centi && m.view().elapsed_ms==before.elapsed_ms);
    check(!m.view().fresh && m.view().direction==0 && m.view().phase==DisplayTemperature::FROZEN);
    m.update(70000,7000,false,1,true);
    check(m.view().centi==before.centi && !m.view().fresh);
    healthy(m,80000,1,7000);
    check(m.view().centi==2350 && m.view().delay_remaining_ms==3000);
    healthy(m,113000,1,7000);
    check(m.view().centi==2450);
    m.reset();
    check(!m.view().available && m.strategy()==DisplayTemperature::SMOOTH);
    healthy(m,120000,0,2712);
    check(m.view().centi==2712 && !m.view().estimated);
}
void testReadAndPollIndependence() {
    for(auto strategy : {DisplayTemperature::STEP,DisplayTemperature::SMOOTH}) {
        DisplayTemperature sparse(strategy),dense(strategy);
        healthy(sparse,100,-1,2837); healthy(dense,100,-1,2837);
        for(uint32_t now=101;now<98237;now+=31) healthy(dense,now,-1,6000);
        healthy(dense,98237,-1,6000); healthy(sparse,98237,-1,-4000);
        check(same(sparse.view(),dense.view()));
        const auto before=dense.view();
        for(unsigned client=0;client<100;++client) check(same(dense.view(),before));
        healthy(dense,98237,-1); check(same(dense.view(),before));
    }
}
void testWrapAndLimits() {
    DisplayTemperature m;
    const uint32_t start=UINT32_MAX-1000;
    healthy(m,start,1,2401);
    healthy(m,start+static_cast<uint32_t>(2999),1);
    check(m.view().delay_remaining_ms==1);
    healthy(m,start+static_cast<uint32_t>(33000),1);
    check(m.view().centi==2501 && m.view().elapsed_ms==33000);
    const uint32_t previous=start+static_cast<uint32_t>(63000);
    healthy(m,previous,1);
    check(m.view().centi==2601 && m.view().elapsed_ms==63000);
    healthy(m,previous-1,1);
    check(m.view().elapsed_ms==static_cast<uint64_t>(63000)+UINT32_MAX);
    DisplayTemperature high,low,noClamp;
    healthy(high,0,1,INT32_MAX-50); healthy(high,33000,1);
    healthy(low,0,-1,INT32_MIN+50); healthy(low,33000,-1);
    healthy(noClamp,0,1,8500); healthy(noClamp,33000,1);
    check(high.view().centi==INT32_MAX && low.view().centi==INT32_MIN);
    check(noClamp.view().centi==8600);
    check(strcmp(DisplayTemperature::phaseName(DisplayTemperature::FROZEN),"frozen")==0);
}
}
int main() {
    testStartup(); testRateAndDirections(); testManualStopRestartReversal();
    testFreezeRecovery(); testReadAndPollIndependence(); testWrapAndLimits();
    printf("display temperature: %u checks passed\n",checks);
}
