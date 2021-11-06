import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './edit.component.html',
  styleUrls: []
})
export class EditComponent implements OnInit {

  constructor() { }

  options = {
    style: 'drop',
    droppable: true,

    container: 'border-1 border-dashed brc-grey-m4 brc-h-warning-m1',

    placeholderClass: 'text-125 text-600 text-grey-l1 my-2',
    placeholderText: 'Drop profile image or click to choose',
    placeholderIcon: '<i class="fa fa-user fa-3x text-green-m3 my-2"></i>',

    thumbnail: 'large',

    allowExt: 'gif|jpg|jpeg|png|webp|svg'
  }

  ngOnInit(): void {
  }

}
