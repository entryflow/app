import { Component } from '@angular/core'
import ApexCharts from 'apexcharts'
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  chartSize = 110;
  chartFontSize = '100b';

  constructor()
  {}

  ngOnInit() {

    var options = {

    series: [64],

    chart: {
        fontFamily: 'QuickSand',
      height: this.chartSize,
      type: 'radialBar',
      toolbar: {
        show: false
      },
      sparkline: {
      enabled: true
    }
    },

    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
         hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: false,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#EEF0F2',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: false,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: 0,
            show: true,
            color: '#888',
            fontSize: '0px',
          },
          value: {
            offsetY: -10,
            formatter: function(val: string) {
              return (val+"%");
            },
            color: '#7FE1AD',
            fontSize: '18px',
            fontWeight: 650,
            show: true,
          }
        }

      }
    },
    theme: {
      mode: 'light',
      palette: 'palette10',
      monochrome: {
          enabled: true,
          color: '#7FE1AD',
          shadeTo: 'dark',
          shadeIntensity: 0.65
      },
    },

    fill: {
      type: 'solid',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: [''],
    };

    const options1 = {
      series: [40],

      chart: {
          fontFamily: 'QuickSand',
        height: this.chartSize,
        type: 'radialBar',
        toolbar: {
          show: false
        },
        sparkline: {
        enabled: true
      }
      },

      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
           hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#EEF0F2',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

                  dataLabels: {
          show: true,
          name: {
            offsetY: 0,
            show: true,
            color: '#888',
            fontSize: '14px',
          },
          value: {
            offsetY: -10,
            formatter: function(val: string) {
              return (val+"%");
            },
            color: '#F85F6A',
            fontSize: '18px',
            fontWeight: 650,
            show: true,
          }
        }
        }
      },
      theme: {
        mode: 'light',
        palette: 'palette10',
        monochrome: {
            enabled: true,
            color: '#F85F6A',
            shadeTo: 'dark',
            shadeIntensity: 0.65
        },
      },

      fill: {
        type: 'solid',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [''],
    };

    const options2 = {
      series: [90],
      chart: {
          fontFamily: 'QuickSand',
        height: this.chartSize,
        type: 'radialBar',
        toolbar: {
          show: false
        },
        sparkline: {
        enabled: true
      }
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
           hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: false,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#EEF0F2',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -45,
              show: true,
              color: '#888',
              fontSize: '14px',
            },
            value: {
              offsetY: -10,
              formatter: function(val: string) {
                return (val+"%");
              },
              color: '#5F6AF8',
              fontSize: '18px',
              fontWeight: 650,
              show: true,
            }
          }
        }
      },
      theme: {
        mode: 'light',
        palette: 'palette10',
        monochrome: {
            enabled: true,
            color: '#5F6AF8',
            shadeTo: 'dark',
            shadeIntensity: 0.65
        },
      },
      stroke: {
        lineCap: 'round'
      },
      labels: [''],

    };

    var stack = {
      series: [
        {
          name: 'Asistencias',
          group: 'Asistencias',
          data: [12, 10, 13, 14, 11],
        },
        {
          name: 'Faltas',
          group: 'Faltas',
          data: [2, 1, 3, 4, 5]
        }
      ],
      stroke: {
        show: true,
        curve: 'smooth',
        width: 2
      },
      chart: {
        fontFamily: 'QuickSand',
        type: 'bar',
        height: 200,
        stacked: true,
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
          'Lun',
          'Mar',
          'Mie',
          'Jue',
          'Vie'
        ],
        axisBorder: {
          show: false
        },
      },
      colors: ['#42F584', '#F54242'], // Aquí se agrega el color para las faltas
      fill: {
        colors: undefined,
        opacity: 0.3,
        type: 'solid',
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
      grid:{
        show: false,
        enable: false,
        padding: { left: -1, right: -1, top: 0, bottom: -12},
      },
      legend: {
        position: 'top',
        width: 0,
        height: 0,
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 12,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
      },


    };

    const radialChart1 = new ApexCharts(document.getElementById('radialChart1'), options);
    const chart1 = new ApexCharts(document.getElementById('chart1'), options1);
    const chart2 = new ApexCharts(document.getElementById('chart2'), options2);
    const chart3 = new ApexCharts(document.getElementById('chartStack'), stack);

    radialChart1.render();
    chart1.render();
    chart2.render();
    chart3.render();

    setTimeout(() => {(window.dispatchEvent(new Event('resize')))}, 1);

  }

}
