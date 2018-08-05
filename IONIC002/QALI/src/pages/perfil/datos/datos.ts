import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'datos-perfil',
  templateUrl: 'datos.html'
})
export class datospage {

  imageUrl: string = 'assets/imgs/profile/profile-cover.jpg';

  constructor(public navCtrl: NavController) {

  }

}
