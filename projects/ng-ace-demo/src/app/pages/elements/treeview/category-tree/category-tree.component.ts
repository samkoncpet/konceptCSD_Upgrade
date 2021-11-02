import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {  TreeviewComponent, TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: []
})
export class CategoryTreeComponent implements OnInit, AfterViewInit {

  items!: TreeviewItem[];

  @ViewChild(TreeviewComponent) categoryTree!: TreeviewComponent;
  @ViewChild('categoryToolbarEl') categoryToolbarEl! : any;
  @ViewChild('categoryTreeEl') categoryTreeEl! : any;

  filterText!: string;

  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 1000
  });

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.items = this.getItems()
    
  }

  ngAfterViewInit() {
    this.categoryTree.allItem.collapsed = true
    this.ref.detectChanges()

    this.categoryToolbarEl.nativeElement.appendChild(this.categoryTreeEl.nativeElement.querySelector('.treeview-header'))
  }



  getItems(): TreeviewItem[] {

    let categoryData = [
      {
        value: 1,
          text: 'For Sale',
 
          children: [
              {
                value: 2,
                  text: 'Appliances'
              },                
              { 
                value: 3,
                  text: 'Arts & Crafts'
              },
              { 
                value: 4,
                  text: 'Clothing'
              },
              { 
                value: 5,
                  text: 'Electronics'
              },
              { 
                value: 6,
                  text: 'Jewelry'
              },
              { 
                  value: 7,
                  text: 'Office & Business'
              },
              { 
                  value: 8,
                  text: 'Sports & Fitness'
              }
          ]
      },


      {
          value: 10,
          text: 'Vehicles',
 
          children: [
              {
                  value: 11,
                  text: 'Cars',

                  children: [
                      {
                          value: 12,
                          text: 'Convertible'
                      },                
                      { 
                          value: 13,
                          text: 'Coupe'
                      },
                      { 
                          value: 14,
                          text: 'Hatchback'
                      },
                      { 
                          value: 15,
                          text: 'SUV'
                      },
                      { 
                          value: 16,
                          text: 'Sedan'
                      },
                      { 
                          value: 17,
                          text: 'Truck'
                      }
                  ]
              },

              { 
                  value: 18,
                  text: 'Bikes'
              },
              { 
                  value: 19,
                  text: 'Boats'
              }
          ]
      },

      {
          value: 20,
          text: 'Services',
      },
      {
          value: 21,
          text: 'Personals',
      }      
    ]

    this._uncheckAndCollapse(categoryData)


    let _items = []
    for(let item of categoryData) {

      let $item = <any> item;
      $item['checked'] = false
      let newItem = new TreeviewItem($item)
    
      _items.push(newItem)
    }
    
    return _items;
  }



  private _uncheckAndCollapse(items: any) {
    for (let item of items) {
      item['checked'] = false
      if (item['children']) {
        item['collapsed'] = true
        this._uncheckAndCollapse(item['children'])
      }
    }
  }

}
