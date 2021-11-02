import { OnInit, Component, NgZone } from '@angular/core';

import { Chart } from 'chart.js';
import Util from '@ace/util';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
  styleUrls: []
})
export class OverviewComponent implements OnInit {

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.drawCharts()
      })
    })
  }

  drawCharts() {
    var _animate = !Util.isReducedMotion()

    // progress chart showing user skills
    var skillData = [74, 68, 50]
    var skillColor = ['green-m1', 'purple-m1', 'primary-m1']
    var skillTextColor = ['secondary-d3', 'secondary-d3', 'secondary-d3']
    var skillName = ['HTML &amp; CSS', 'Angular', 'Backend']

    let chartContainer = document.getElementById('skill-chart')

    for(var p = 0; p < skillData.length; p++) {
       var canvas = Util.append(chartContainer,
        `<div class="pos-rel m-2 text-center text-${skillColor[p]} style="max-width: 30%;">
            <canvas height="100" width="100"></canvas>
            <span class="position-center text-85 text-600 text-${skillTextColor[p]}">${skillName[p]}</span>
         </div>`)

       var color = Util.css(canvas, 'color')
       canvas = canvas.querySelector('canvas')

       var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [skillData[p], 100 - skillData[p]],
                    backgroundColor: [
                        color,
                        "#dbe7ed"
                    ],
                    hoverBackgroundColor: [
                        color,
                        "#dbe7ed"
                    ],
                    borderWidth: 0
                }]
            },
            
            options: {
                responsive: true,
                cutoutPercentage: 88,
                rotation: Math.PI * 0.5,
                legend: {
                    display: false
                },
                animation: {
                    //animateScale: true,
                    duration: _animate ? 500 : 0,
                },
                tooltips: {
                    enabled: false,
                }
            }
        }

        new Chart(canvas, config)
    }
  }

}
