import { Component, OnInit } from '@angular/core';
import { NgAceModalService } from 'ng-ace-admin';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: []
})
export class ModalsComponent implements OnInit {

  bodyScrollbars = false

  constructor(private modalService: NgAceModalService) { }

  ngOnInit(): void {
    
  }

  open(content: any, options?: any) {    
    this.modalService.open(content, options)
  }
}
