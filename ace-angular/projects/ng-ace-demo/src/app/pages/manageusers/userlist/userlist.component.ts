import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }
  addnewuser(){
    this.router.navigateByUrl('/addnewuser');
  }
}
