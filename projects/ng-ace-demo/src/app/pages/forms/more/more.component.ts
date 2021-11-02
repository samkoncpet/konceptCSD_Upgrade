import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { csv2json } from 'json-2-csv';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

// @ts-ignore
import DualListbox from 'dual-listbox';

import Util from '@ace/util';

import { ResourceService } from '../../../_services/resource.service';


@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoreFormsComponent implements OnInit {

  currentRate = 7;

  states: any;

  constructor(private resourceLoader: ResourceService) {
    let states = `"name","abbr"
    "Alabama","AL"
    "Alaska","AK"
    "Arizona","AZ"
    "Arkansas","AR"
    "California","CA"
    "Colorado","CO"
    "Connecticut","CT"
    "Delaware","DE"
    "Florida","FL"
    "Georgia","GA"
    "Hawaii","HI"
    "Idaho","ID"
    "Illinois","IL"
    "Indiana","IN"
    "Iowa","IA"
    "Kansas","KS"
    "Kentucky","KY"
    "Louisiana","LA"
    "Maine","ME"
    "Maryland","MD"
    "Massachusetts","MA"
    "Michigan","MI"
    "Minnesota","MN"
    "Mississippi","MS"
    "Missouri","MO"
    "Montana","MT"
    "Nebraska","NE"
    "Nevada","NV"
    "New Hampshire","NH"
    "New Jersey","NJ"
    "New Mexico","NM"
    "New York","NY"
    "North Carolina","NC"
    "North Dakota","ND"
    "Ohio","OH"
    "Oklahoma","OK"
    "Oregon","OR"
    "Pennsylvania","PA"
    "Rhode Island","RI"
    "South Carolina","SC"
    "South Dakota","SD"
    "Tennessee","TN"
    "Texas","TX"
    "Utah","UT"
    "Vermont","VT"
    "Virginia","VA"
    "Washington","WA"
    "West Virginia","WV"
    "Wisconsin","WI"
    "Wyoming","WY"`

    csv2json(states, (err, data) => {
      this.states = data
    })    
   }

    ngOnInit() {
      this.resourceLoader.prependCSS('https://cdn.jsdelivr.net/npm/dual-listbox/dist/dual-listbox.css').then(() => {
        const el = document.querySelector('#duallist')
        new DualListbox(el)
  
        let duallist = Util.prev(el)
        duallist.querySelectorAll('.dual-listbox__button').forEach((el: any) => {
          el.className = 'btn btn-white btn-h-lighter-blue btn-a-lighter-blue mb-1';
        })
  
        duallist.querySelectorAll('.dual-listbox__title').forEach((el: any) => {
          el.className += ' text-md text-default-d3 bgc-default-l4 brc-default-l1 radius-t-2 pl-3';
        })
  
        duallist.querySelectorAll('.dual-listbox__available, .dual-listbox__selected').forEach((el: any) => {
          el.className += ' radius-b-1';
        })
      })
    }

    public typeahead: any

    search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.states.filter((v:any) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  
    formatter = (x: {name: string}) => x.name

    selectedState!: any
    selectedFood!: any
    selectedTag!: any

    tags = []

    food = ['Pizza', 'Pasta', 'Parmesan']

    duallistSource = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9', 'option 10']
    duallistConfirmed = new Array<any>()

}
