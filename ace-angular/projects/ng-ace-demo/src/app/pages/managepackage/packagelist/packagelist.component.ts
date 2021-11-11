import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packagelist',
  templateUrl: './packagelist.component.html',
  styleUrls: ['./packagelist.component.css']
})
export class PackagelistComponent implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }

  addpackage(){
    this.router.navigateByUrl('/addpackage');
  }

}
