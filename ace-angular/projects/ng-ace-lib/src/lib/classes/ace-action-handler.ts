import { Injectable, Injector, Inject } from "@angular/core";
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';


import { NgAceActionService }  from '../services/ace-action.service';
import { NgAceSidebarActionService } from "../services/ace-sidebar-action.service";
import { NgAceCardActionService } from "../services/ace-card-action.service";

import Util from '@ace/util';



@Injectable()
export abstract class AceActionHandler {
  element: any;
  prevented: any;

  protected actionService: any;

  protected destroy$ = new Subject<void>()

  constructor(protected injector: Injector, @Inject('type') private type?: number) {
    // use a different Action Service for sidebar, cards, and other elements
    // not necessary, we can use just one Action Service altogether
    // but maybe it becomes more responsive this way

    // the type paramter is passed in Directives
    if (this.type === 1) {
      this.actionService = this.injector.get(NgAceSidebarActionService)
    }
    else if (this.type === 2) {
      this.actionService = this.injector.get(NgAceCardActionService)
    }
    else {
      this.actionService = this.injector.get(NgAceActionService)
    }

    this.prevented = {}
  }

  init() : void {
    this._subscribeToServices()
  }

  destroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }



  private _subscribeToServices() {

    this.actionService.onAction()
    .pipe(
      filter(({ selector , action }) => typeof (<any>this)[action] === 'function' && Util.matches(this.element, selector)),
      takeUntil(this.destroy$)
    )
    .subscribe((data:{ selector: any , action: string }) => {
      (<any>this)[data.action]() // call the function with data.action name
    })

    this.actionService.onPrevent()
    .pipe(
      filter(({ selector }) => Util.matches(this.element, selector)),
      takeUntil(this.destroy$)
    )
    .subscribe((data:{ selector: any , event: string, prevent?: boolean }) => {
      this.preventEvent(data.event, data.prevent)
    })

  }

  //
  preventEvent(event: string, prevent?: boolean) {
    this.prevented[event] = prevent === false ? false : true
  }

  isPrevented(event: string): boolean {
    return this.prevented[event] === true
  }
}
