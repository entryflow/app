import { Component } from '@angular/core';
import ApexCharts from 'apexcharts'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  ngOnInit() {
    const options = {
      chart: {
        type: 'radialBar',
        height: 300, // Ajusta la altura según tus necesidades
      width: 300, // Ajusta el ancho según tus necesidades
      },
      series: [20],
      labels: [''],
      colors: ['#7FE1AD'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
    const options1 = {
      chart: {
        type: 'radialBar',
        height: 300, // Ajusta la altura según tus necesidades
      width: 300, // Ajusta el ancho según tus necesidades
      },
      series: [44],
      labels: [''],
      colors: ['#F85F6A'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };
    const options2 = {
      chart: {
        type: 'radialBar',
        height: 300, // Ajusta la altura según tus necesidades
      width: 300, // Ajusta el ancho según tus necesidades
      },
      series: [80],
      labels: [''],
      colors: ['#5F6AF8'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    var stack = {
      series: [
        {
          name: 'Asistencias',
          group: 'asistencias',
          data: [1, 2, 3, 4, 5]
        },
        {
          name: 'Faltas',
          group: 'faltas',
          data: [1, 2, 3, 4, 5]
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      dataLabels: {
        formatter: (val: number) => {
          //return val / 1000 + 'K';
        }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        categories: [
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
        ]
      },
      fill: {
        opacity: 1
      },
      colors: ['#F85F6A', '#ccc'], // Aquí se agrega el color para las faltas
      yaxis: {
        labels: {
          formatter: (val: number) => {
            return val ;
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    };


    const chart = new ApexCharts(document.getElementById('chart0'), options);
    const chart1 = new ApexCharts(document.getElementById('chart1'), options1);
    const chart2 = new ApexCharts(document.getElementById('chart2'), options2);
    const chart3 = new ApexCharts(document.getElementById('chartStack'), stack);

    chart.render();
    chart1.render();
    chart2.render();
    chart3.render();
  }
}
