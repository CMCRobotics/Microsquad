# MicroSquad

<!--
[![Known Vulnerabilities](https://snyk.io/test/github/cmcrobotics/usquad-web-ui/badge.svg)](https://snyk.io/test/github/cmcrobotics/usquad-web-ui)
-->
![Build](https://github.com/cmcrobotics/microsquad/workflows/build-action/badge.svg)
<!--
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lucasvanmol_usquad-web-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=lucasvanmol_usquad-web-ui)
-->

**MicroSquad** is an Internet of Things orchestration framework focused initially on the [BBC Micro:bit](https://microbit.org/) (a.k.a Microbit).
To interface with the Microbit, it relies on [Bitio](https://github.com/AdventuresInMinecraft/bitio) : Using a single Microbit as a gateway, one can control remote Microbits over the radio.
Messages are exchanged using the Influx line protocol (with a small custom parser implemented in micropython)

![Microbit](https://microbit-micropython.readthedocs.io/en/v1.0.1/_images/happy.png)

**Basic MicroSquad functionalities include :**
* Broadcast, group and unicast messaging.
* Assigning session identifiers (will be resent with each message from the client).
* Remotely controlling displays.
* Requesting remote sensor readings (buttons, gyroscope, compass, temperature, votes etc...).
* Controlling a 3D web-based scene where players can interact.

# Software dependencies

For the **MicroSquad** Gateway :
* Python 3.8+
* [https://github.com/AdventuresInMinecraft/Bitio](https://github.com/AdventuresInMinecraft/bitio)

For the **MicroSquad** clients :
* The provided **MicroSquad** firmware to upload on each Microbit. For instance [microsquad.hex](https://github.com/CMCRobotics/microsquad/releases/download/v1.0.microsquad.mpy/microsquad.hex)

For the **MicroSquad** Web Interface :
* The spectacular [Kenney Character Assets](https://kenney.itch.io/kenney-character-assets) under Creative Commons Zero

# How to use it

## Flash the Microbits

* The Microbit Gateway uses [https://github.com/AdventuresInMinecraft/Bitio](https://github.com/AdventuresInMinecraft/bitio) - Simply download the latest compatible firmware and copy it to the Microbit flash drive to load it as the new firmware.
* The client firmware is available as a Github release. For instance [microsquad.hex](https://github.com/CMCRobotics/microsquad/releases/download/v1.0.microsquad.mpy/microsquad.hex)

## Configure and start Mosquitto MQTT broker

Place the following file contents at location ```/etc/mosquitto/conf.d/listeners.conf``` :

```conf
listener 1883
protocol mqtt

listener 9001
protocol websockets 

allow_anonymous true
```
For a more comprehensive example, consult ``docs/samples/mosquitto.conf``.

## Start the Gateway

From ```modules/gateway```, execute :
```bash
. ./setup-venv.sh
python -m microsquad.gateway.mqtt
```
## Start the Web UI

From ```modules/web-ui```, execute :
```bash
. source-path.sh
npm run serve
```
