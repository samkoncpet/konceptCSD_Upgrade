import { AfterViewInit, Component, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';

import Chart from 'chart.js';


@Component({
  selector: 'dashboard-traffic-chart',
  templateUrl: './traffic-chart.component.html',
  styleUrls: ['./traffic-chart.component.css'],
  encapsulation: ViewEncapsulation.None //because we dynamically insert 'pieChartLegends' and want the CSS rules be applied
})
export class TrafficChartComponent implements AfterViewInit {

  @ViewChild('canvasRef') canvasRef!: any;
  pieChartLegends!: any;

  constructor(private _ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => this._drawChart())
  }

  _drawChart(): void {
    let canvas = this.canvasRef.nativeElement

    var trafficSourcePieChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
          datasets: [{
              label: 'Traffic Sources',
              data: [40.7, 27.5, 9.3, 19.6, 4.9],
              backgroundColor: [
                "#4ca5ae",
                "#f18e5d",
                "#ea789d",
                "#22c1e4",
                "#e2e3e4"
              ],
          }],
          labels: [
              'Social Networks',
              'Search Engines',
              'Ad Campaings',
              'Direct Traffic',
              'Other'
          ]
      },
      
      options: {
          responsive: true,
  
          cutoutPercentage: 70,
          legend: {
              display: false
          },
          animation: {
              animateRotate: true,
              duration: 1000,//_animate ? 1000 : false
          },
          tooltips: {
              enabled: true,
              cornerRadius: 0,
              bodyFontColor: '#fff',
              bodyFontSize: 14,
              
              backgroundColor: 'rgba(34, 34, 34, 0.73)',
              borderWidth: 0,
            
              caretSize: 5,
  
              xPadding: 12,
              yPadding: 12,
              
              callbacks: {
                label: function(tooltipItem: any, data: any) {
                  return ' ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%'
                }
              }
          }
      }
    })

    this._ngZone.run(() => {
      setTimeout(() => {
        this.pieChartLegends = trafficSourcePieChart.generateLegend()
      })
    })
  }

}
