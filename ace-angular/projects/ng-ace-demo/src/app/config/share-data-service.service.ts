import { Injectable } from '@angular/core';    
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataServiceService {
  name: string;    
  public content = new BehaviorSubject<string>("HElLO");    
  public share = this.content.asObservable();    
  constructor() { }

  SetValue(data) {    
    this.content.next(data);     
  }    
}
