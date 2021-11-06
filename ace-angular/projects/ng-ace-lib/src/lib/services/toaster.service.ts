import { Injectable} from '@angular/core';

import { DomService } from './dom.service'

import { ToasterContainerComponent } from '../components/toaster.component'

@Injectable({
  providedIn: 'root'
})
export class NgAceToasterService {
  toastContainers: any = {}

  constructor(private domService: DomService) { }

  show(options: any = {}) : any {
    options.placement = options.placement || 'tr'

    let toasterContainerCompRef = this._getContainer(options.placement)

    return toasterContainerCompRef.add({ ...options })
  }


  remove(toast: any) {
    if (typeof toast !== 'object' && typeof this.toastContainers[toast.placement] === 'undefined') return

    let toasterContainerCompRef = this._getContainer(toast.placement)

    toasterContainerCompRef.remove(toast)
  }


  private _getContainer(placement: string): any {
    if (typeof this.toastContainers[placement] !== 'undefined') return this.toastContainers[placement]
 
    let toasterContainerCompRef = this.domService.insertComponent(ToasterContainerComponent, {placement: placement}).instance

    this.toastContainers[placement] = toasterContainerCompRef
    return toasterContainerCompRef
  }

  ///

  removeAll(placement?: string|null, instant = false) {
    if (placement && placement != 'all') {
      if (typeof this.toastContainers[placement] !== 'undefined') this.toastContainers[placement].removeAll(instant)
      return
    }

    for (let placement in this.toastContainers) {
      if (Object.prototype.hasOwnProperty.call(this.toastContainers, placement)) {
        this.toastContainers[placement].removeAll(instant)
      }
    }
  }
}

