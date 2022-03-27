import { Component, OnInit  } from '@angular/core';

import { ResourceService } from '../../../_services/resource.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: []
})
export class TypographyComponent implements OnInit {

  constructor(private resourceLoader: ResourceService) { }

  ngOnInit(): void {
    if (typeof document === 'undefined' || typeof document.body === 'undefined') return

    this.resourceLoader.addJS('https://cdn.jsdelivr.net/npm/code-prettify@latest/loader/run_prettify.js')

    // prettify stylesheet is included in "typography.component.html" file
  }


}
