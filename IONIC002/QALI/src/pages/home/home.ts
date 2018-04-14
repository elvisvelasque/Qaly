import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts = [];
  imageUrl: string = 'assets/imgs/profile/profile-cover.jpg';

  constructor(public navCtrl: NavController) {
    for (let i = 0; i < 4; i++) {
      this.posts[i] = {
        text: 'Pago recibido ' + i,
        created_at: (i + 1),
      };
    }
  }

}
