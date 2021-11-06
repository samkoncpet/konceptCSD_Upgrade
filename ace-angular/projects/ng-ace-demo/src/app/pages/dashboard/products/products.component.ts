import { Component, OnInit } from '@angular/core';

import { csv2json } from 'json-2-csv';

@Component({
  selector: 'dashboard-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: any;

  constructor() {    
    // you can load data from remote DB
    // this is only for demo
    let csvProducts = `name,price,old_price,status
    Hoverboard,$119.99,$229.99,on_sale
    Hiking Shoe,$46.45,,approved
    Gaming Console,$355.00,,pending
    Digital Camera,$219.95,$324.99,out_of_stock
    Laptop,$899.00,,sold`

    csv2json(csvProducts, (err, data) => {
      setTimeout(() => {
        this.products = data
      })
    })


   }

  ngOnInit(): void {
  }

}
