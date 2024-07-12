# MicroSquad documentation

## Design philosophy

**MicroSquad** combines physical devices with virtual devices through Internet of Things (**IoT**) concepts.

Interactions and readings from the physical world are captured through **Terminals** - i.e. devices such as a Microbit microcontroller (which is equipped with sensors such as buttons, temperature, motion sensors, touch pads) or even a mobile phone (for more complex interactions support).

By combining an interaction logic loop (or **Workflow**), one can use **MicroSquad** to create games and team exercises.

The state of **Terminals** and of the **Workflow** are maintained and made available through a hierarchy of variables and their respective values. These values are made available through an **MQTT broker** and accessible via standard Internet protocols (**TCP** and **Websockets**).

From then on, it becomes possible to create interactive **Scenes**, such as 3D environments where the players of a team game can be represented as 3D avatars, or augmented reality experiences combining virtual and physical elements.

On the **scene**, relying on the same design philosophy, all composing elements (3D characters, decor elements, heads up displays, cameras, lighting) are also represented and interacted with via the **MQTT broker**.

The **MQTT broker** values hierarchy relies on a naming convention called [Homie](https://homieiot.github.io/) - Homie exposes a **device** and **property** model that is compatible with **IoT** software such as **HomeAssistant** - so all **MicroSquad** devices (be they physical or virtual) can be mixed and matched with other home automation devices (such as lightbulbs, smart power sockets etc...).

## Implementation

The following architecture diagram summarizes the organization of a typical MicroSquad setup :

![Architecture](https://github.com/CMCRobotics/microsquad/blob/develop/docs/plantuml/MicroSquad%20Architecture.png?raw=true)