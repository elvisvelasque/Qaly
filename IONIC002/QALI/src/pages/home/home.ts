import { Component ,ViewChild} from '@angular/core';
import { NavController,Platform, AlertController, LoadingController } from 'ionic-angular';
import { thaniProvider } from '../../providers/thaniProvider';
import chartJs from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('stepCanvas') stepCanvas;
  stepChart: any;
  stepItems: Array<any> = [];

  @ViewChild('hearthCanvas') hearthCanvas;
  hearthChart: any;
  hearthItems: Array<any> = [];

  @ViewChild('suenoCanvas') suenoCanvas;
  suenoChart: any;
  suenoItems: Array<any> = [];

  type: string;
  imageUrl: string = 'assets/imgs/profile/profile-cover.jpg';
  
  searchCell: string = "";
  searchName: string = "";
  searchId: number = 0;

  constructor(
    public platform: Platform, 
    public navCtrl: NavController,
    public thani: thaniProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.type = "principal"
  }


  changeUser(){
    this.type = "usuario"
   }

  changePrincipal(){
    this.getDetails();
    this.type = "principal"
   }

   changeSearch() {
     if (this.searchCell) {
       this.thani.GetUserByCell(this.searchCell).subscribe(
       data => {
         if (data) { 
           if (data["encontrado"]) {
             this.searchName = data["nombreCompleto"];
             this.searchId = data["id"];
             this.type = "search";
           }
         }
         else {
           this.presentLoading('Este usuario no existe :(');
         }
       },
       error => {
         this.presentLoading('Ocurrió un error. Inténtalo de nuevo :)');
         console.dir(error);
       }
     );
     }
     else {
       this.presentLoading("Debes ingresar un número");
     }
   }

    ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.getDetails();
    });
  }  

  getDetails() {
    this.stepItems = [];

    this.thani.GetUserDetails(this.thani.id).
      subscribe(
        data => {
          if (data) {
            if (data["pasos"]) {
              this.stepItems = data["pasos"];
              console.log(this.stepItems);
              this.stepChart = this.getStepsChart();
            }

            if (data["ritmoCardiaco"]) {
              this.hearthItems = data["ritmoCardiaco"];
              console.log(this.hearthItems);
              this.hearthChart = this.getHearthChart();
            }

            if (data["horasSueno"]) {
              this.suenoItems = data["horasSueno"];
              console.log(this.suenoItems);
              this.suenoChart = this.getSuenoChart();
            }
          }
          else {
            this.presentLoading('Ocurrió un error. Inténtalo de nuevo :)');
          }
        },
      error => {
        this.presentLoading('Ocurrió un error. Inténtalo de nuevo :)');
        console.dir(error);
      }
    ); 
  }

  getStepsChart() {
    const data = {
      labels: this.stepItems.map(a => a["fechaf"]),
      datasets: [{
        label: 'Pasos',
        data: this.stepItems.map(a => a["valor"]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.stepCanvas.nativeElement, 'bar', data, options);
  }

  getSuenoChart() {
    const data = {
      labels: this.suenoItems.map(a => a["fechaf"]),
      datasets: [{
        label: 'Horas de sueño',
        data: this.suenoItems.map(a => a["valor"]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.suenoCanvas.nativeElement, 'bar', data, options);
  }

  getHearthChart() {
    const data = {
      labels: this.hearthItems.map(a => a["fechaf"]),
      datasets: [{
        label: 'Ritmo cardiaco',
        data: this.hearthItems.map(a => a["valor"]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.hearthCanvas.nativeElement, 'bar', data, options);
  }

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
  }

  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }
}
