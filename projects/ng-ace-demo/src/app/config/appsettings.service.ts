import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppsettingsService {

  constructor() { }
  // Koncent Host URL's
  koncentAPI: string = environment.koncentAPI;
  
  // Signin API
  signinAPI: string = "api/authentication/signin";
}
