# MicroSquad (a.k.a uSquad)

[![Known Vulnerabilities](https://snyk.io/test/github/lucasvanmol/usquad-web-ui/badge.svg)](https://snyk.io/test/github/lucasvanmol/usquad-web-ui)
![Build](https://github.com/cmcrobotics/microsquad/workflows/build-action/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lucasvanmol_usquad-web-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=lucasvanmol_usquad-web-ui)

A Microbit orchestration library based on [Bitio](https://github.com/AdventuresInMinecraft/bitio) : Using a single Microbit as a gateway, control remote Microbits via the radio.
Messages are exchanged using the Influx line protocol (with a small custom parser implemented in micropython)

![Microbit](https://microbit-micropython.readthedocs.io/en/v1.0.1/_images/happy.png)

**Basic functionalities include :**
* Broadcast, group and unicast messaging
* Assigning session identifiers (will be resent with each message from the client)
* Remotely controlling displays
* Requesting remote sensor readings (buttons, gyroscope, compass, temperature, votes etc...)


# Dependencies

For the **uSquad** Gateway :
* Python 3.8+
* [https://github.com/AdventuresInMinecraft/Bitio](https://github.com/AdventuresInMinecraft/bitio)

For the **uSquad** clients :
* The provided **uSquad** firmware to upload on each Microbit.

For the **uSquad** Web Interface :
* The spectacular [Kenney Character Assets](https://kenney.itch.io/kenney-character-assets) under Creative Commons Zero

# How to use it

## Flash the Microbits

* The Microbit Gateway uses [https://github.com/AdventuresInMinecraft/Bitio](https://github.com/AdventuresInMinecraft/bitio) - Simply download the latest compatible firmware and copy it to the Microbit flash drive to load it as the new firmware.
* The client firmware is available as a Github release.

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

