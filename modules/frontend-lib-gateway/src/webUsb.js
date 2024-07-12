// Define the vendor and product IDs for the Microbit V1
const VID_MICROBIT_V1 = 0x0D28;
const PID_MICROBIT_V1 = 0x0204;

// Define the endpoint IDs for the Microbit V1
const EP_IN = 0x81;
const EP_OUT = 0x01;

// Define a function to send a string message to the Microbit V1
async function sendMessageToDevice(device, message) {
  // Claim the interface for the Microbit V1
  const interfaceNumber = 2;
  await device.open();
  await device.selectConfiguration(1);
  await device.claimInterface(interfaceNumber);

  // Convert the string message to a Uint8Array
  const messageArray = new TextEncoder().encode(message);

  // Send the message to the Microbit V1
  await device.transferOut(EP_OUT, messageArray.buffer);

  // Release the interface for the Microbit V1
  await device.releaseInterface(interfaceNumber);
  await device.close();
}

// Define a function to get the Microbit V1 device
async function getMicrobitDevice() {
  // Request access to the Microbit V1 device
  const device = await navigator.usb.requestDevice({
    filters: [
      { vendorId: VID_MICROBIT_V1, productId: PID_MICROBIT_V1 }
    ]
  });

  // Open the device
  await device.open();

  // Check if the interface is claimed
  const interfaceNumber = 2;
  const interface = device.configuration.interfaces.find(
    i => i.interfaceNumber === interfaceNumber
  );
  if (interface.claimed) {
    await

/*
// First, we'll define the string message that we want to send
const message = "Hello Microbit!";

// Next, we'll request permission to access the Microbit over WebUSB
navigator.usb.requestDevice({ filters: [{ vendorId: 0x0d28, productId: 0x0204 }] })
  .then(device => {
    // Once we have permission, we'll open a connection to the device
    return device.open()
      .then(() => device.selectConfiguration(1))
      .then(() => device.claimInterface(2))
      .then(() => {
        // Now that we have a connection to the device, we can send the message
        const encoder = new TextEncoder();
        return device.transferOut(5, encoder.encode(message));
      });
  })
  .catch(error => {
    // If there's an error, we'll log it to the console
    console.error(error);
  });
*/


/*function sendMessageToMicrobit(message) {
  // Request permission to access the Microbit over WebUSB
  navigator.usb.requestDevice({ filters: [{ vendorId: 0x0d28, productId: 0x0204 }] })
    .then(device => {
      // Once we have permission, open a connection to the device
      return device.open()
        .then(() => device.selectConfiguration(1))
        .then(() => device.claimInterface(2))
        .then(() => {
          // Send the message to the Microbit
          const encoder = new TextEncoder();
          return device.transferOut(5, encoder.encode(message));
        });
    })
    .catch(error => {
      // If there's an error, log it to the console
      console.error(error);
    });
}
*/


// Let me explain how this program works:

// We start by defining the string message that we want to send. You can replace this with any string that you want to send to the Microbit.

// We then request permission to access the Microbit over WebUSB using the navigator.usb.requestDevice() function. The filters parameter specifies the vendor and product IDs of the Microbit, so that we only get devices that match those IDs.

// Once we have permission to access the device, we open a connection to it using the device.open() function. We then select the device configuration and claim the interface that we want to use to communicate with the Microbit.

// Now that we have a connection to the device, we can send the message to the Microbit. We create a new TextEncoder object to encode the message as bytes, and then use the device.transferOut() function to send the encoded message to the Microbit. The first parameter of device.transferOut() specifies the endpoint number that we want to use to send the message (in this case, endpoint 5), and the second parameter is the encoded message.

// If there's an error at any point, we log it to the console using console.error().


/*
function receiveMessageFromMicrobit() {
  // Request permission to access the Microbit over WebUSB
  navigator.usb.requestDevice({ filters: [{ vendorId: 0x0d28, productId: 0x0204 }] })
    .then(device => {
      // Once we have permission, open a connection to the device
      return device.open()
        .then(() => device.selectConfiguration(1))
        .then(() => device.claimInterface(2))
        .then(() => {
          // Set up a loop to continuously read data from the Microbit
          const decoder = new TextDecoder();
          let data = "";
          device.transferIn(4, 64).then(processData);
          function processData(result) {
            data += decoder.decode(result.data);
            if (result.data.byteLength === 64) {
              device.transferIn(4, 64).then(processData);
            } else {
              // When we've received the entire message, emit it as an event
              myEventEmitter.emit('messageReceived', data);
              data = "";
              device.transferIn(4, 64).then(processData);
            }
          }
        });
    })
    .catch(error => {
      // If there's an error, log it to the console
      console.error(error);
    });
}

*/