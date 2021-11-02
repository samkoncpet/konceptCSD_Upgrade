import { Component, OnInit, ViewChild } from '@angular/core';
import {  TreeviewComponent, TreeviewItem, TreeviewConfig } from 'ngx-treeview';

@Component({
  selector: 'app-file-tree',
  templateUrl: './file-tree.component.html',
  styleUrls: []
})
export class FileTreeComponent implements OnInit {

  items!: TreeviewItem[];

  @ViewChild(TreeviewComponent) fileTree!: TreeviewComponent;


  filterText!: string;

  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 1000
  });

  constructor() { }

  ngOnInit(): void {
    this.items = this.getItems()    
  }



  getItems(): TreeviewItem[] {
    let fileData = [
      {
          value: 1,
          text: 'Cloud Files',
          icons: {
              'default': '<i class="fas fa-cloud text-blue-m1"></i>'
          },
          children: [
              {
                  value: 2,
                  text: 'Folder 1',
                  icons: {
                      'default': '<i class="fa fa-folder text-orange-d1"></i>',
                      'open': '<i class="fa fa-folder-open text-orange-d1"></i>'
                  },
                  children: [
                      { 
                          value: 3,
                          text: 'ebook.pdf' ,
                          icons: {
                              'default': '<i class="far fa-file-pdf text-125 text-danger-m1"></i>'
                          }
                      },
                      { 
                          value: 4,
                          text: 'archive.zip' ,
                          icons: {
                              'default': '<i class="far fa-file-archive text-125 text-purple-m1"></i>'
                          }
                      },
                      { 
                          value: 5,
                          text: 'video.mp4' ,
                          icons: {
                              'default': '<i class="far fa-file-video text-125 text-success-m1"></i>'
                          }
                      },
                  ]
              },
              { 
                  value: 6,
                  text: 'README.md',
                  icons: {
                      'default': '<i class="far fa-file text-grey"></i>'
                  },
              }
          ]
      },
      {
          value: 7,
          text: 'Local Files',
          icons: {
              'default': '<i class="fas fa-desktop text-info"></i>'
          },
          children: [
              {
                  value: 8,
                  text: 'document.doc',
                  icons: {
                      'default': '<i class="fa fa-file-word text-blue-m2"></i>'
                  },
              }
          ]
      }
    ];



    // mark all items as unchecked/ un
    this._uncheckAndExpand(fileData)

    // convert items to TreeViewItem array
    let _items = []
    for(let item of fileData) {

      let $item = <any> item;
      $item['checked'] = false


      let newItem = new TreeviewItem($item)
 
      _items.push(newItem)
    }

    // assign icons to TreeviewItem elements
    this._setIcons(fileData, _items)
    
    return _items;
  }


  private _uncheckAndExpand(items: any) {
    for (let item of items) {
      item['checked'] = false
      if (item['children']) {
        item['collapsed'] = false
        this._uncheckAndExpand(item['children'])
      }
    }
  }


  /**
   * Since I know no way of assigning custom data to TreeviewItems
   * We convert our original item tree and our new TreeviewItem tree to an array
   * And iterate (both) to assign icons to TreeviewItems
   */
  private _setIcons(fileDataTree: any, treeviewItemsTree: any) {
    let fileDataArray = this._toArray(fileDataTree)
    let treeviewItemsArray = this._toArray(treeviewItemsTree)

    for (let i = 0 ; i < fileDataArray.length; i++) {
      treeviewItemsArray[i]['icons'] = fileDataArray[i]['icons']
    }
  }

  // convert our tree to an array
  private _toArray(input: any) : any {
    let result = []

    for(let item of input) {
      result.push(item)
      if (item.children && item.children.length > 0) {
        result = result.concat(this._toArray(item.children))
      }
    }

    return result
  }

}
