import { Component, OnInit} from '@angular/core';
import ApexCharts from 'apexcharts'
import { Browser } from '@capacitor/browser';


@Component({

  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],

})

export class Tab1Page implements OnInit {



  constructor(){}

  ngOnInit(){

    var options = {
      series: [{
      name: 'Faltas',
      data: [1, 32, 45, 32, 3, 52, 41]
    },
    {
      name: 'A tiempo',
      data: [10, 109, 42, 51, 28, 40, 31]
    },
    {
      name: 'Retardos',
      data: [31, 40, 28, 51, 42, 10, 1]
    }
    ],

    chart: {
      fontFamily: 'QuickSand',
      marginBottom: 0,
      height: 220,
      type: 'area',
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
        }

    },

    toolbar:{
      show: false,
      enabled: false,
      tools:{
        download: false,
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
      width: 1,

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
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],

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
      enabled: false,
      show: false,
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },

    grid:{
      show: false,
    },

    legend:{
      position: 'top',
    }

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
