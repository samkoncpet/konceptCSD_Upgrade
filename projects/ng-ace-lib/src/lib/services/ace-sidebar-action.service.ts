import { Injectable } from '@angular/core';

import { NgAceActionService } from './ace-action.service';

@Injectable({
  providedIn: 'root'
})
export class NgAceSidebarActionService extends NgAceActionService {
  constructor() { 
    super()
  }
}
