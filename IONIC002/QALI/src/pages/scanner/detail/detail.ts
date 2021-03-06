﻿import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { thaniProvider } from '../../../providers/thaniProvider';';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})
export class DetailPage {

    peripheral: any = {};
    statusMessage: string;
    device: any;
    hrate: any = "start";
    heartRate = {
        service: '180D',
        measurement: '2A37'
    };

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private ble: BLE,
        private toastCtrl: ToastController,
        private ngZone: NgZone,
        private thani: thaniProvider,
        public alertCtrl: AlertController) {

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
        this.setStatus('conectado');
        this.peripheral = peripheral;
        let characteristics: any[] = this.peripheral.characteristics;

        console.log("Connect:" + JSON.stringify(peripheral));
        let rate = Math.random()*20 + 80;
        this.hrate = "Ritmo cardiaco: " + rate;
        this.thani.InsertRitmo(this.thani.id, rate).subscribe(
            data => {
                if (data) {
                    if (data["result"]) {
                        this.showAlert("Se regisró el ritmo :)");
                    }
                }
            },
            error => this.onDeviceDisconnected(peripheral)
        );;

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

    onHRStateChange(buffer: ArrayBuffer) {
        this.hrate = "entro";
        var data = new Uint8Array(buffer);
        console.log(data[0]);

        this.ngZone.run(() => {
            this.hrate = data[0];
        });

    }

    onHRStateError() {
        this.hrate = "entro fallo";
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

    showAlert(message: string) {
        const alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: message,
            buttons: ['Dismiss']
          });
        alert.present();  
      }
}