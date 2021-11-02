import { Component, AfterViewInit, ViewChild, NgZone } from '@angular/core';


import Chart from 'chart.js';

@Component({
  selector: 'dashboard-sales-chart',
  templateUrl: './sales-chart.component.html'
})
export class SalesChartComponent implements AfterViewInit {

  @ViewChild('canvasRef') canvasRef!: any;
  @ViewChild('card') card!: any;// NgAceCard


  constructor(private _ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => this._drawChart())
  }

  reload(): void {
    //
    this.card.startLoading()
    setTimeout(() => {
      this.card.stopLoading()
    }, Math.random() * 1500 + 500)
  }

  _drawChart(): void {
    let canvas = this.canvasRef.nativeElement

    if (canvas.parentNode.offsetWidth < 600) {
      canvas.height = 180
    }
  
    var salesChartCtx = canvas.getContext("2d")
  
    /*** Background Gradient ***/
    var gradient1 = salesChartCtx.createLinearGradient(0, 0, 0, 400)
        gradient1.addColorStop(0, 'rgba(114,193,224, 0.2)')
        gradient1.addColorStop(1, 'rgba(114,193,224, 0)')
  
    var gradient2 = salesChartCtx.createLinearGradient(0, 0, 0, 300)
        gradient2.addColorStop(0, 'rgba(138,200,138, 0.45)')
        gradient2.addColorStop(1, 'rgba(138,200,138, 0)')
  
    var gradients = [gradient1, gradient2]
  
    var chartOptions1 = {
      lineTension: 0.3,
      borderWidth: 1.5,
      pointRadius: 0
    }
  
    new Chart(salesChartCtx, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "In-store",
            data: [3200, 1500, 3500, 2500, 3200, 7000, 2300, 3500, 3500, 6000, 6200, 8100],
    
            borderColor: '#72c1e0',
            pointBorderColor: '#72c1e0',
  
            fill: true,
            backgroundColor : gradients[0],
            pointBackgroundColor: '#fff',
  
            borderWidth: chartOptions1.borderWidth,
            pointRadius: chartOptions1.pointRadius,
            lineTension: chartOptions1.lineTension,
          },
          {
            label: "Online",
            data : [2500, 4200, 3000, 4000, 5500, 4800, 4600, 5900, 5800, 8900, 8200, 9000],
  
            borderColor: '#8ac88a',
            pointBorderColor: '#8ac88a',
  
            fill: true,
            backgroundColor : gradients[1],
            pointBackgroundColor: '#fff',
  
            borderWidth: chartOptions1.borderWidth,
            pointRadius: chartOptions1.pointRadius,
            lineTension: chartOptions1.lineTension,
          }      
        ]
      },
  
      options: {
        responsive: true,
        animation: {
          duration: 1000,//_animate ? 1000 : false
        },
  
  
        tooltips: {
          enabled: true,
          cornerRadius: 0,
          
          titleFontColor: 'rgba(0, 0, 0, 0.8)',
          titleFontSize: 16,
          titleFontStyle: 'normal',
  
          bodyFontColor: 'rgba(0, 0, 0, 0.8)',
          bodyFontSize: 14,
          titleFontFamily: "Open Sans",
          
          backgroundColor: 'rgba(255, 255, 255, 0.73)',
          borderWidth: 2,
          borderColor: 'rgba(254, 224, 116, 0.73)',
         
          caretSize: 5,
  
          xPadding: 12,
          yPadding: 12,
        },
  
        scales: {
          yAxes: [{
            ticks: {
              fontFamily: "Open Sans",
              fontColor: "#a0a4a9",
              fontStyle: "600",
              fontSize: 12,
              beginAtZero: false,
              maxTicksLimit: 6,
              padding: 16,
              callback: function(value: any, index, values) {
                var val = parseInt(value) / 1000;
                return val > 0 ? val + 'k' : val;
              }
            },
            gridLines: {
                drawTicks: false,
                display: false
            }
          }],
  
          xAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              display: true,
              borderDash: [2, 3],
              tickMarkLength: 3
            },
            ticks: {                
              fontFamily: "Open Sans",
              fontColor: "#808489",
              fontSize: 13,
              fontStyle: "400",
              padding: 12
            }
          }]
        },
  
        legend: {
          display: true,
          position: 'top'
        }
      }
    })
  
  }

}
