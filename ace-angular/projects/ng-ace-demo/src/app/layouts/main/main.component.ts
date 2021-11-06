import { Component, OnInit, ViewChild } from '@angular/core';
import { NgAceSidebar } from 'ng-ace-admin';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('sidebar', {static: true}) sidebar!: NgAceSidebar;

  ngOnInit(): void {

  }

}
