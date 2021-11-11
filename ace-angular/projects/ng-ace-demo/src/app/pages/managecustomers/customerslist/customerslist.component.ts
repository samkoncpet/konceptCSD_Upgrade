import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerslist',
  templateUrl: './customerslist.component.html',
  styleUrls: ['./customerslist.component.css']
})
export class CustomerslistComponent implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }

  addnewcustomer(){
    this.router.navigateByUrl('/addcustomers');
  }
}
