import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SidebarDataService {
  getItems(sidebarData: any) {
	// this._sidebarList = sidebarData

	/**
	 * We "deep copy" sidebarData
	 * Otherwsie when we navigate between different layouts, sidebar items will be persistent (i.e. unwanted ones remain 'open', etc)
	*/
	let _sidebarList = JSON.parse(JSON.stringify(sidebarData))

	// and we convert it to a tree
    let _sidebarID_Map: any = {}
	for (let item of _sidebarList) {
		if(item['id']) {
			_sidebarID_Map[item['id']] = item
		}
    }
    
    let _sidebarItemTree = []
	// append each item to its parent element
	for (let $item of _sidebarList) {
		let item: any = $item

		if( !item.parent ) {
			item['isFirstLevel'] = true // it's a root (top-level) node. i.e. has no parent
			_sidebarItemTree.push(item)
			continue
		}
		
		var parentId = item['parent']
		let _pnode = _sidebarID_Map[parentId] || null

		if( _pnode ) {
			// create the children array if not already
			if( !Array.isArray(_pnode.children) ) {
				_pnode.children = []
				_pnode.hasChildren = true
			}

			// only add this if previously inserted
			// because we are accessing 'sidebarData' directly and may duplicated/triplicate, etc items on navigation
			if (!_pnode.children.includes(item)) {
				_pnode.children.push(item)
				item['parentNode'] = _pnode //add a reference to parent node
			}
		}
    }

    return _sidebarItemTree
  }

}