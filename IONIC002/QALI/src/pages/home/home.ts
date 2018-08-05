import { Component ,ViewChild} from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import chartJs from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('stepCanvas') stepCanvas;
  stepChart: any;
  stepItems: Array<any> = [];

  type: string;
  posts = [];
  imageUrl: string = 'assets/imgs/profile/profile-cover.jpg';

  constructor(
    public platform: Platform, 
    public navCtrl: NavController) {
    for (let i = 0; i < 4; i++) {
      this.posts[i] = {
        text: 'Pago recibido ' + i,
        created_at: (i + 1),
      };
    }

    this.type = "principal"
  }


  changeUser(){
    this.type = "usuario"
   }

  changePrincipal(){
    this.type = "principal"
   }

   changeSearch() {
    this.type = "search"
   }

    ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.getSteps();
    });
  }  

  getSteps() {
    this.stepItems = [];

    this.stepItems = 
    [
    {"value": 11, "time": "01/10/2018"}, 
    {"value": 6, "time": "02/10/2018"}, 
    {"value": 18, "time": "03/10/2018"}, 
    {"value": 24, "time": "04/10/2018"}, 
    {"value": 11, "time": "05/10/2018"}, 
    {"value": 31, "time": "06/10/2018"}
    ];
    console.log(this.stepItems);
    this.stepChart = this.getStepsChart();

    /*
  this.invoice.GetProductSales().then(
    data => {
      if (data.length > 0) {
        this.p_items = data;
        console.log("PRODUCTOS");
        console.log(this.p_items);
        this.pieChart = this.getPieChart();
        document.getElementById("porc").textContent = "El producto mas vendido es " + this.p_items["Nombre"][0] + ", con " + Math.round(this.p_items["Datas"][0]*100) + " %";
      }
      else {
        document.getElementById("porc").textContent = "Lo sentimos, no hay información disponible sobre tus productos";
      }
    },
    error => {
      console.error('Error al obtener data de productos');
      console.dir(error);
    }
=======
  @ViewChild('stepCanvas') stepCanvas;
  stepChart: any;

  stepItems: Array<any> = [];

  constructor(
    public platform: Platform, 
    public navCtrl: NavController) 
  {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.getSteps();
    });
  }  

  getSteps() {
    this.stepItems = [];

    this.stepItems = 
    [
    {"value": 11, "time": "01/10/2018"}, 
    {"value": 6, "time": "02/10/2018"}, 
    {"value": 18, "time": "03/10/2018"}, 
    {"value": 24, "time": "04/10/2018"}, 
    {"value": 11, "time": "05/10/2018"}, 
    {"value": 31, "time": "06/10/2018"}
    ];
    console.log(this.stepItems);
    this.stepChart = this.getStepsChart();

    /*
  this.invoice.GetProductSales().then(
    data => {
      if (data.length > 0) {
        this.p_items = data;
        console.log("PRODUCTOS");
        console.log(this.p_items);
        this.pieChart = this.getPieChart();
        document.getElementById("porc").textContent = "El producto mas vendido es " + this.p_items["Nombre"][0] + ", con " + Math.round(this.p_items["Datas"][0]*100) + " %";
      }
      else {
        document.getElementById("porc").textContent = "Lo sentimos, no hay información disponible sobre tus productos";
      }
    },
    error => {
      console.error('Error al obtener data de productos');
      console.dir(error);
    }
>>>>>>> 8222cd56b28943b5b2aa42a876cb79294f7f9906
  );*/
  }

  getStepsChart() {
    const data = {
      labels: this.stepItems.map(a => a["time"]),
      datasets: [{
        label: 'Pasos',
        data: this.stepItems.map(a => a["value"]),
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

  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    });
}
}
