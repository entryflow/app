import { Component, OnInit} from '@angular/core';
import ApexCharts from 'apexcharts'
import { Browser } from '@capacitor/browser';


@Component({

  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})

export class Tab1Page implements OnInit {

  public faltasData: any = [1, 32, 45, 32, 3, 52, 41];
  public aTiempoData: any = [119, 109, 129, 100, 101, 90, 109];
  public retardos: any = [31, 40, 28, 51, 42, 10, 1];

  constructor(){}

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

      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 2000,

        animateGradually: {
            enabled: true,
            delay: 150
        },

        dynamicAnimation: {
            enabled: true,
            speed: 3
        },

    },

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

async openUrl(){
  await Browser.open({url: 'https://face-detection-server-gs2dvwxye-deventryflow-gmailcom.vercel.app/'});
}
}
