import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonfunctionsService {

  constructor() { }

  getBoolean(value){
    switch(value){
      case "true":         
        return true;
      case "True":         
        return true;
      case 1:         
        return true;
      case "1":         
        return true;
      case "on":         
        return true;
      case "yes":
        return true;
      case "Yes":
        return true;
      case true:         
        return true;
      case "false":         
        return false;
      case "False":         
        return false;
      case 0:         
        return false;
      case "0":         
        return false;
      case "off":         
        return false;
      case "no":
        return false;
      case "No":
        return false;
      case false:         
        return false;
      default: 
        return false;
     }
  }
}