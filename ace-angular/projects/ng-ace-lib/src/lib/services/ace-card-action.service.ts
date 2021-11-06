import { Injectable } from '@angular/core';

import { NgAceActionService } from './ace-action.service';

@Injectable({
  providedIn: 'root'
})
export class NgAceCardActionService extends NgAceActionService {
  constructor() { 
    super()
  }
}
