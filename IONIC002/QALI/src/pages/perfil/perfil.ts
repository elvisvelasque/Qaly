import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { datospage } from './datos/datos';
import { thaniProvider } from '../../providers/thaniProvider';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class perfilpage {

  imageUrl: string = 'assets/imgs/profile/profile-cover.jpg';
  users: any;
  constructor(public navCtrl: NavController,
  			  public thani:thaniProvider) {

  }

ionViewDidLoad(){
  this.getAllUsers();
}

changeData(){
	this.navCtrl.push(datospage);
}

getAllUsers() {
    this.thani.getAll(this.thani.id).
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
