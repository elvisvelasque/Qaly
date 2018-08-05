import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { perfilpage } from '../pages/perfil/perfil';
import { datospage } from '../pages/perfil/datos/datos';
import { contactopage } from '../pages/contactos/contacto/contacto';
import { contactospage } from '../pages/contactos/contactos';
import { LoginSliderPage } from '../pages/login-slider/login-slider';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ScannerPage } from '../pages/scanner/scanner';
import { DetailPage } from '../pages/scanner/detail/detail';
import { BLE } from '@ionic-native/ble';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { thaniProvider } from '../providers/thaniProvider';



@NgModule({
  declarations: [
    MyApp,
    perfilpage,
    datospage,
    contactospage,
    contactopage,
    HomePage,
    TabsPage,
    ScannerPage,
      DetailPage,
    LoginSliderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    perfilpage,
    datospage,
    contactospage,
    contactopage,
    HomePage,
    TabsPage,
    ScannerPage,
      DetailPage,
    LoginSliderPage
  ],
  providers: [
    StatusBar,
    thaniProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BLE
  ]
})
export class AppModule {}
