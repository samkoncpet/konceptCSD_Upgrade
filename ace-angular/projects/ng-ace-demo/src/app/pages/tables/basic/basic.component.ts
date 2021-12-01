import { Component, OnInit } from '@angular/core';
import { csv2json } from 'json-2-csv';

import { ResourceService } from '../../../_services/resource.service';

declare var basictable: any;

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: []
})
export class BasicTablesCompontent implements OnInit {

  domains : any;
  allChecked = false;
  semiChecked = false;

  constructor(private resourceLoader: ResourceService) { 
    let csvDomains = `name,price,clicks,update,status
    ace.com,$45,"3,330","Feb 12",expiring
    base.com,$35,"2,595","Feb 18",registered
    max.com,$60,"4,400","Mar 11",sold
    best.com,$75,"6,500","Apr 03",flagged
    pro.com,$55,"4,250","Jan 21",registered`

    csv2json(csvDomains, (err, data) => {
      this.domains = data
    })
  }

  ngOnInit(): void {
    this.resourceLoader.addJS('https://cdn.jsdelivr.net/npm/basictable@latest/dist/js/basictable.min.js').then(() => {
      new basictable('#responsive-table', {breakpoint: 800})
    })
  }

  onCheckDomain() {
    let total = 0
    this.domains.forEach((domain: any) => {
      if (domain['checked']) total++
    })

    this.semiChecked = false
    if (total == 0) {
      this.allChecked = false
    }
    else if (total == this.domains.length) {
      this.allChecked = true
    }
    else this.semiChecked = true
  }

  onCheckAll() {
    this.domains.forEach((domain: any) => {
      domain['checked'] = this.allChecked
    })
    this.semiChecked = false
  }

}
