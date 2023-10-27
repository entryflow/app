import { Component } from '@angular/core'
import ApexCharts from 'apexcharts'
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  chartSize = 100;
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
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px',
          },
          value: {
            formatter: function(val: string) {
              return (val+"%");
            },
            color: '#111',
            fontSize: this.chartFontSize,
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
    labels: ['Este mes'],
    };

    const options1 = {
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
              fontSize: '17px',
            },
            value: {
              formatter: function(val: string) {
                return (val+"%");
              },
              color: '#111',
              fontSize: this.chartFontSize,
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
      labels: ['Este mes'],
    };

    const options2 = {
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
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function(val: string) {
                return (val+"%");
              },
              color: '#111',
              fontSize: this.chartFontSize,
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
      labels: ['Este mes'],
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
