import { Component, OnInit} from '@angular/core';
import ApexCharts from 'apexcharts'
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { Browser } from '@capacitor/browser';


import {
  AlertController,
  ModalController,
  LoadingController,
  ToastController,
  Platform,
} from '@ionic/angular';

import { ModalCreateEmployeeComponent } from '../components/modal-create-employee/modal-create-employee.component';
import { ModalEditEmployeeComponent } from '../components/modal-edit-employee/modal-edit-employee.component';
import { ModalEditProfileComponent } from '../components/modal-edit-profile/modal-edit-profile.component';
import { ModalViewEmployeeInfoComponent } from '../components/modal-view-employee-info/modal-view-employee-info.component';
import { ApiService } from '../services/api.service';
import { ModalRegEntryNExitComponent } from '../components/modal-reg-entry-n-exit/modal-reg-entry-n-exit.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  public is_register = false;
  private faio! : FingerprintAIO;
  API_URL = 'http://172.16.2.235:8000/';

  public faltasData: any = [1, 32, 45, 32, 3, 52, 41];
  public aTiempoData: any = [119, 109, 129, 100, 101, 90, 109];
  public retardos: any = [31, 40, 28, 51, 42, 10, 1];

  constructor( private alertController: AlertController,
    private modalController: ModalController,
    private api: ApiService,
    private LoadingController: LoadingController,
    private toastController: ToastController,
    private platform: Platform,private http: HttpClient
    ){
      if(this.platform.is('cordova')){
        this.faio = new FingerprintAIO();
      }
    }

  ngOnInit(){

    var options = {
      series: [{
      name: 'Faltas',
      data: this.faltasData
    },
    {
      name: 'A tiempo',
      data: this.aTiempoData
    },
    {
      name: 'Retardos',
      data: this.retardos
    }
    ],

    colors:['#f54242', '#42f584', '#f5a742'],

    // theme: {
      // mode: 'light',
      // monochrome: {
          // enabled: false,
          // color: '#0570B0',
          // shadeTo: 'dark',
          // shadeIntensity: 0.65
      // },
    // },

    chart: {

      fontFamily: 'QuickSand',
      marginBottom: 0,
      height: '44%',
      width: '100%',
      type: 'area',

      parentHeightOffset: 0,

      background: {show: false},


    //  sparkline: {
    //    enabled: true
    //  },

    toolbar:{
      show: true,
      enabled: true,
      tools:{
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
        customIcons: []
      }
    }

    },

    dataLabels: {
      enabled: false
    },

    stroke: {
      show: true,
      curve: 'smooth',
      width: 2
    },

    yaxis:{
      show: false,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels:{
        show: false
      }
    },

    xaxis: {

      show: false,
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-20T01:30:00.000Z", "2018-09-21T02:30:00.000Z", "2018-09-22T03:30:00.000Z", "2018-09-23T04:30:00.000Z", "2018-09-24T05:30:00.000Z", "2018-09-25T06:30:00.000Z"],

      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels:{
        show: false
      }

    },
    tooltip: {
      enabled: true,
      show: true,
      x: {
        format: 'dd/MM/yyyy HH:mm'
      },
    },
    grid:{
      show: false,
      enable: false,
      padding: { left: -1, right: -1, top: 0, bottom: -12},
    },
    legend:{
      position: 'top',
      width: 0,
      height: 0
    },

  };

    const chart = new ApexCharts(document.getElementById('chart0'), options);

    chart.render();

    setTimeout(() => {(window.dispatchEvent(new Event('resize')))}, 1);

  }

async ionViewWillEnter(){

}

async getToken() {
  let data: any = [];
  await Preferences.get({ key: 'token' }).then((res) => {
    data = res.value;
  });

  return data;
}

async getUserInfo(token:any) {
  let data: any = [];
  const options = {
    url: this.API_URL + 'token',
    params: { token: token },
  };

  const response = await CapacitorHttp.request({
    ...options,
    method: 'GET',
  }).then((res) => {
    data = res.data;
  });

  return data;

}

async registerData(user_id : any, type : any) {
  let data_tmp: any = [];

  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  const body = `user_id=${user_id}`;
  try {
    const response = await this.http.post(`${this.API_URL}registerUserEntry`, body, { headers }).toPromise();

    return response;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error; // You can handle or rethrow the error as needed
  }
}

async authenticate() {
  if(this.platform.is('cordova')){
    try {
      const available = await this.faio.isAvailable();
      if (available === "finger" || available === "face") {
        await this.faio.show({
          title: 'Autenticación',
          subtitle: 'Autenticación requerida',
          description: 'Por favor, autentícate',
          fallbackButtonTitle: 'Usar PIN',
          disableBackup: true
        });
        let jsonData = await this.getUserInfo(await this.getToken());
        let user_id = jsonData.user.id;
        // Autenticación exitosa, puedes empezar a registrar entradas/salidas aquí
        this.registerData(user_id, 1);
      } else {
        // Redirige al usuario a otra página si FaceID o huella digital no están disponibles
      }
    } catch (error) {
      console.error("errn: " + error);
    }
  }
}

async openUrl(){
  await Browser.open({url: 'https://face-detection-server-gs2dvwxye-deventryflow-gmailcom.vercel.app/'});
}

  public alertButtons = [{'text': 'Cancelar', 'role': 'cancel'}, {'text': 'Aceptar', 'handler': () => {this.onModalCreate();}}];
  public alertInputs = [
    {
      label: 'Entrada',
      type: 'radio',
      value: '1',
    },
    {
      label: 'Salida',
      type: 'radio',
      value: '2',
    },

  ];


  async onModalCreate(){
    const modal = await this.modalController.create({
      component: ModalRegEntryNExitComponent,
      animated: true,
      mode: 'ios',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
  }


}