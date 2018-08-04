import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class perfilpage {

  imageUrl: string = 'assets/imgs/profile/profile-cover.jpg';

  constructor(public navCtrl: NavController) {

  }

}
