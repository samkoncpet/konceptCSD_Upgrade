import { AfterViewInit, Component, ViewChild, Input, NgZone } from '@angular/core';

import Chart from 'chart.js';

import stat1 from './stats1.json'
import stat2 from './stats2.json'

@Component({
  selector: 'dashboard-infobox',
  templateUrl: './infobox.component.html'
})
export class InfoboxComponent {
  public stats1: any

  constructor() {
    this.stats1 = stat1
  }
}

@Component({
  selector: 'dashboard-infobox2',
  templateUrl: './infobox2.component.html'
})
export class InfoboxComponent2 {
  public stats2: any

  constructor() {
    this.stats2 = stat2
  }
}






@Component({
  selector: 'dashboard-infobox-linechart',
  template: `
          <ng-template #tooltipTemplate>
            <span class="text-white text-600 text-105 letter-spacing">{{tooltipLabel}}: {{tooltipValue}}</span>
          </ng-template>
          <canvas #canvasRef [ngbTooltip]="tooltipTemplate" #tooltip="ngbTooltip"
                  triggers="manual" placement="bottom"
                  tooltipClass="ng-custom-tooltip  bgc-info-d3 brc-info-d3"
                  (mouseleave)="tooltip.close()"
                  class="ml-n15 mt-n2" style="height: 64px; width: 100%;"></canvas>
        `
})
export class InfoboxLineChartComponent implements AfterViewInit {
  @Input() dataset!: any;

  @ViewChild('canvasRef') canvasRef!: any;
  @ViewChild('tooltip') tooltip!: any;


  tooltipLabel = ''
  tooltipValue = ''

  constructor(private _ngZone: NgZone) {
  }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => this._drawChart())
  }

  _drawChart() : void {
    let canvas = this.canvasRef.nativeElement

    var ctx = canvas.getContext('2d');
    var gradientbg = ctx.createLinearGradient(0, 0, 0, 50);
    gradientbg.addColorStop(0, 'rgba(109, 187, 109, 0.25)');
    gradientbg.addColorStop(1, 'rgba(109, 187, 109, 0.05)');

    let data = []
    try {
      data = JSON.parse(this.dataset)
    }
    catch(e){}

    new Chart(ctx, {
      type: 'line',
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              data: data,
              backgroundColor: gradientbg,
              hoverBackgroundColor: '#70bcd9',
              fill: true,

              borderColor: 'rgba(109, 187, 109, 0.8)',

              borderWidth: 2.25,
              pointRadius: 7,
              lineTension: 0.4,

              pointBackgroundColor: 'transparent',
              pointBorderColor: 'transparent',

              pointHoverBackgroundColor: 'rgba(109, 187, 109, 0.8)',
              pointHoverBorderColor: 'rgba(109, 187, 109, 0.8)',
            },
            {
              type: 'bar',
              data: data,
              backgroundColor: 'transparent',
              hoverBackgroundColor: 'transparent',
              fill: false,

              borderColor: 'transparent',

              barPercentage: 0.8
            },
          ]
      },

      options: {


        responsive: false,
        animation: {
          duration: 1000,//_animate ? 1000 : false
        },
        
        legend: {
            display: false
        },
        layout: {
          padding: {
              left: 10,
              right: 10,
              top: 0,
              bottom: -10
          }
        },
        scales: {
            yAxes: [
                {
                  stacked: true,
                  ticks: {
                    display: false,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false
                  }
                }
            ],

            xAxes: [
              {
                stacked: true,
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false //this will remove only the label
                }
              },
            ]
        },//scales


        tooltips: {
            // Disable the on-canvas tooltip, because canvas area is small and tooltips will be cut (clipped)
            enabled: false,
            mode: 'index',

            //use bootstrap tooltip instead
            custom: (tooltipModel) => {
              if (tooltipModel.body) {
                this._ngZone.run(() => {
                  this.tooltipLabel = tooltipModel.title[0]
                  this.tooltipValue = Number(tooltipModel.body[0].lines[0]).toLocaleString()

                  if (!this.tooltip.isOpen()) {
                    this.tooltip.open()
                  }
                })
              }              
            }
        }// tooltips
        
      }
    })
  }

}





@Component({
  selector: 'dashboard-infobox-piechart',
  template: `
            <canvas #canvasRef style="width: 180px;" ></canvas>
        `
})
export class InfoboxPieChartComponent implements AfterViewInit {
  @Input() dataset!: any;

  @ViewChild('canvasRef') canvasRef!: any;


  constructor(private _ngZone: NgZone) {
  }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => this._drawChart())
  }

  _drawChart() : void {
    let canvas = this.canvasRef.nativeElement

    let color = window.getComputedStyle(canvas).color
    let percent = parseInt(this.dataset)

    new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
          datasets: [{
              data: [percent, 100 - percent],
              backgroundColor: [
                color,
                  "#e3e5ea"
              ],
              hoverBackgroundColor: [
                color,
                "#e3e5ea"
              ],
              borderWidth: 0
          }]
      },
      
      options: {
          responsive: false,
          cutoutPercentage: 80,
          legend: {
              display: false
          },
          animation: {
              duration: 500,//_animate ? 500 : false,
              easing: 'easeInCubic'
          },
          tooltips: {
              enabled: false,
          }
      }
    })//new Chart
  }

}