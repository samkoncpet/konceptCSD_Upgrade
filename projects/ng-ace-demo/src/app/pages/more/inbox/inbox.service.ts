import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * We use this inbox service to communicate between different inbox components
 */

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  private _actionEvent = new Subject<{ action: string, params?: any }>()

  constructor() { }

  action(action: string, params?: any) {
    this._actionEvent.next({ action, params })    
  }

  onAction(): Observable<{ action: string, params?: any }> {
    return this._actionEvent.pipe(share())
  }


  showMessageDetail(messageInfo: any) {
    this.action('detail', {messageInfo: messageInfo})
  }

  showMessageList() {
    this.action('list')
  }
}
