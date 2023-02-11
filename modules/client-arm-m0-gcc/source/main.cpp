/**
 * @file main.cpp
 * @author Brice Copy
 * @brief Microsquad client for Microbit V1
 * @date 2023-02-11
 */
#include "MicroBit.h"
#include "inc/images.h"

MicroBit    uBit;

int main()
{
    // Initialise the micro:bit runtime.
    uBit.init();
    uBit.radio.enable();
    MicroBitImage angry_image((ImageData*)IMAGES::T_ANGRY);
    uBit.display.print(angry_image);

    while(1)
    {
        if (uBit.buttonA.isPressed())
            uBit.radio.datagram.send("1");

        else if (uBit.buttonB.isPressed())
            uBit.radio.datagram.send("2");

        uBit.sleep(100);
    }

}

