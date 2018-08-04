import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { contactopage } from './contacto/contacto';


@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html'
})
export class contactospage {

  posts = [];
  constructor(public navCtrl: NavController) {
    for (let i = 0; i < 4; i++) {
      this.posts[i] = {
        text: 'Contacto ' + i,
        created_at: (i + 1),
      };
    }
  }

  itemTapped() {
    this.navCtrl.push(contactopage);
  }

}
