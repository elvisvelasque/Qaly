﻿import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {

    peripheral: any = {};
    statusMessage: string;
    device: any;
    hrate: any = {};
    heartRate = {
        service: '180d',
        measurement: '2a37'
    };
    rate: number;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private ble: BLE,
        private toastCtrl: ToastController,
        private ngZone: NgZone) {

        let device = navParams.get('device');
        this.device = device;

        this.setStatus('Connecting to ' + device.name || device.id);

        this.ble.startStateNotifications().subscribe(
            data => { console.log(data); },
            error => { console.log("error"); }
        );

        this.ble.connect(device.id).subscribe(
            peripheral => this.onConnected(peripheral),
            peripheral => this.onDeviceDisconnected(peripheral)
        );

    }

    onConnected(peripheral) {
        this.setStatus('');
        this.peripheral = peripheral;
        let characteristics: any[] = this.peripheral.characteristics;

        console.log("Connect:" + JSON.stringify(peripheral));
        this.ble.startNotification(peripheral.id, this.heartRate.service, this.heartRate.measurement).subscribe(
            data => this.onButtonStateChange(data),
            () => console.log('Unexpected Error, Failed to subscribe for hearth rate state changes')
        );

        //this.ble.startNotification("F8:6B:77:17:1B:80", '180d', '2a37').subscribe(
        //    (notificationData) => {
        //        console.log("Notification:" + String.fromCharCode.apply(null, new Uint8Array(notificationData)));
        //        this.ble.read("F8:6B:77:17:1B:80", '180D', '2A37').then(function (data) {
        //            //console.log("READ:" + String.fromCharCode.apply(null, new Uint8Array(data)));
        //            console.log("Read" + JSON.stringify(data));
        //        }, function (error) {
        //            console.log("Error Read" + JSON.stringify(error));
        //        });
        //    },
        //    (error) => {
        //        console.log("Error Notification" + JSON.stringify(error));
        //    }
        //);
    }

    onButtonStateChange(buffer: ArrayBuffer) {
        var data = new Uint8Array(buffer);
        console.log(data[0]);

        this.ngZone.run(() => {
            this.rate = data[0];
        });

    }

    onDeviceDisconnected(peripheral) {
        let toast = this.toastCtrl.create({
            message: 'The peripheral unexpectedly disconnected',
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    }

    // Disconnect peripheral when leaving the page
    ionViewWillLeave() {
        console.log('ionViewWillLeave disconnecting Bluetooth');
        this.ble.disconnect(this.peripheral.id).then(
            () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
            () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
        )
    }

    setStatus(message) {
        console.log(message);
        this.ngZone.run(() => {
            this.statusMessage = message;
        });
    }

    bytesToString(buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }
}