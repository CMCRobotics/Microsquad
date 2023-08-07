#!/usr/bin/env ts-node
'use strict';

import {DeviceDiscovery, HomieDeviceManager} from "node-homie"

import { Observer, Subject, takeUntil, filter, switchMap, combineLatest, map, distinctUntilChanged} from "rxjs";

import {DeviceGateway} from "../src/microsquad/homie/gateway"
import { DeviceTerminal } from "../src/microsquad/homie/terminal";
import { AsyncClient, connect } from "async-mqtt";
import { notNullish } from "node-homie/model";
import { mandatorySwitchMap, optionalSwitchMap, watchList } from "node-homie/rx";
import { MicroSquadEvent } from "../src/microsquad/event";
import { Controller } from "../src/microsquad/controller";



const mqtt_opts = {
    url: 'mqtt://localhost:1883',
    topicRoot: 'microsquad'
};

const onDestroy$ = new Subject<boolean>();

let discovery;

let deviceManager :  HomieDeviceManager;

let gatewayDevice;
let terminalDevice ;

if(process.argv[2] == 'disco'){
    console.log("Discovery mode")
    const tester : Partial<Observer<MicroSquadEvent>> = {
        next: (event) =>{
            console.log(`*** Received event ${event.type} for ${event.deviceId}`)
            
        }
    }
    let subject = new Subject<MicroSquadEvent>();
    subject.subscribe(tester);
    let controller = new Controller(mqtt_opts,subject);
    controller.onInit();


    // discovery = new DeviceDiscovery(mqtt_opts);
    // deviceManager = new HomieDeviceManager();

    // deviceManager.query({
    //     node: { id: 'info' }, property: { id: 'command' }
    // }).pipe(
    //     // unsubscribe on application exit
    //     takeUntil(onDestroy$),
    //     // filter out empty values
    //     filter(props => props.length > 0),
    //     // subscribe to value updates
    //     switchMap(props =>
    //         // combine latest values in a list of the following observables
    //         combineLatest(
    //             // map each property to its value$ observable
    //             props.map(prop =>
    //                 // filter out empty and only update on changed values
    //                 prop.value$.pipe(
    //                     // filter out empty values
    //                     filter(notNullish),
    //                     // // only update on changes
    //                     // distinctUntilChanged(),
    //                     // in the end, map back to the property itself
    //                     map(value => prop ))
    //             )
    //         )
    //     )
    // ).subscribe({
    //     next: poplist => {
    //         console.log('\nProperty updates list: ');
    //         poplist.forEach(p => {
    //             console.log('Property: ', p.pointer, ' - ', p.value);
    //         });
    //     }
    // });

   
    // discovery.events$.pipe(
    //     // unsubscribe on application exit
    //     takeUntil(onDestroy$)
    // ).subscribe({
    //     next: event => {
    //         // new device was discovered
    //         if (event.type === 'add') {
    //             // if device ID is not already known...
    //             if (!deviceManager.hasDevice(event.deviceId)) {
    //                 // create a HomieDevice and add it to the devicemanager
    //                 const device = deviceManager.add(event.makeDevice());

    //                 console.log('Discovered device: ', device.id);

    //                 // Activate device so property updates keep coming in
    //                 device.onInit();
    //             }

    //         } else if (event.type === 'remove') {
    //             // remove and get the removed device ID from the devicemanager
    //             const device = deviceManager.removeDevice(event.deviceId);
    //             // if the device was in the devicemanager
    //             if (device) {
    //                 // clear out the object and disconnect from mqtt
    //                 // note: this will not touch the device in the mqtt message bus (destroy only refers to the javascript object)
    //                 device.onDestroy();
    //                 console.log(`Device removed : '${event.deviceId}'`)
    //             }

    //         } else if (event.type === 'error') {
    //             console.log('Error discovering devices: ', event.error);
    //         }
    //     }
    // });
    // discovery.onInit();
}
if(process.argv[2] == 'dev'){
    console.log("Declaring a gateway")
    gatewayDevice = new DeviceGateway({ id: 'gateway', name: 'MicroSquad Gateway' }, mqtt_opts);
    gatewayDevice.onInit();

    console.log("Declaring a terminal")
    terminalDevice = new DeviceTerminal({ id: 'terminal-1', name:"Test Terminal 1"}, mqtt_opts);
    terminalDevice.onInit();

    console.log('Declared devices...');

    setTimeout( () => {
        console.log('Sending a command');
        const client : AsyncClient = connect(`tcp://localhost:1883`);
        client.on("connect", async() => {
            try{
                await client.publish('microsquad/terminal-1/info/command', "my command");
                console.log("Sent the command");
                await new Promise(f => setTimeout(f, 1000));
                await client.publish('microsquad/terminal-1/info/command', "my second command");
                console.log("Sent second command");
            }catch(e: any){
                console.log("Error while sending command");
                console.log(e.stack);
            }
        });
    }, 2000);
    

}
// const client = connect('mqtt://localhost')
// client.publish('microsquad/gateway/scoreboard/score', 'gros')
// console.log('Updated property...')

process.on('SIGINT', async()  => {
    console.log('Exiting application')
    if(gatewayDevice){
        console.log('Destroying gateway')
        await gatewayDevice.onDestroy();
    } 
    onDestroy$.next(true);
    onDestroy$.complete()
    if(discovery){
        console.log('Destroying discovery')
        await discovery.onDestroy();
    }
    console.log('Exited')
    process.exit()
});
