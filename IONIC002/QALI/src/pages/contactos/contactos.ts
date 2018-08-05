import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { contactopage } from './contacto/contacto';
import { thaniProvider } from '../../providers/thaniProvider';


@Component({
  selector: 'page-contactos',
  templateUrl: 'contactos.html'
})
export class contactospage {
  users: any;
  posts = [];
  constructor(public navCtrl: NavController,
              public thani:thaniProvider) {
    /*for (let i = 0; i < 4; i++) {
      this.posts[i] = {
        text: 'Contacto ' + i,
        created_at: (i + 1),
      };
    }*/
  }

  ionViewDidLoad(){
  this.getAllUsersOut();
  }

  itemTapped() {
    this.navCtrl.push(contactopage);
  }

  getAllUsersOut() {
    this.thani.getAllOut(this.thani.id).
      subscribe(
        data => {
          if (data) {
            console.log(data)
          this.users = data;
          }
          else {
            console.log('error')
            //this.presentLoading('Ocurrió un error. Inténtalo de nuevo :)');
          }
        },
      error => {
        console.log('error')
        //this.presentLoading('Ocurrió un error. Inténtalo de nuevo :)');
        console.dir(error);
      }
    ); 
  }

}
