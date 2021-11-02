import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NgAceActionService {

  private _actionEvent = new Subject<{ selector: any , action: string }>()
  private _preventEvent = new Subject<{ selector: any , event: string, prevent?: boolean }>()

  constructor() {
  }

  action(selector: any , action: string) {
    this._actionEvent.next({ selector , action })
  }

  prevent(selector: any , event: string) {
    const prevent = true
    this._preventEvent.next({ selector , event, prevent })
  }

  unPrevent(selector: any , event: string) {
    const prevent = false
    this._preventEvent.next({ selector , event, prevent })
  }


  onAction(): Observable<{ selector: any , action: string }> {
    return this._actionEvent.pipe(share())
  }

  onPrevent(): Observable<{ selector: any , event: string, prevent?: boolean }> {
    return this._preventEvent.pipe(share())
  }
}
