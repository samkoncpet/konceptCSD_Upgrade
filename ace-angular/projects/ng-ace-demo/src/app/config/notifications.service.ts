import { Injectable } from '@angular/core'; 
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor() { }
    
  info(message: string, subject?: string): void {
    Swal.fire({
      title: subject,
      text: message,
      icon: 'info',  
      confirmButtonColor : "#33B5FF"
    });
  }
  error(message: string, subject?: string): void {
    Swal.fire({
      title: subject,
      text: message,
      icon: 'warning',  
      confirmButtonColor : "#33B5FF"
    });
  }
  warning(message: string, subject?: string): void {
    Swal.fire({
      title: subject,
      text: message,
      icon: 'warning',  
      confirmButtonColor : "#33B5FF",
      showCancelButton: true,
    });
  }
  success(message: string, subject?: string): void {
    Swal.fire(subject, message, 'success');
  }

  responseHandler(apiResponse: any) {
    if(apiResponse.sys_Message != null)
    {
      if(apiResponse.response == -1)
      {
        if(apiResponse.sys_Message.length > 0)
        {
          this.error(apiResponse.sys_Message)
        }
      }
      if(apiResponse.response == 0)
      {
        if(apiResponse.sys_Message.length > 0)
        {
          this.info(apiResponse.sys_Message)
        }
      }
      if(apiResponse.response == 1)
      {
        if(apiResponse.sys_Message.length > 0)
        {
          this.success(apiResponse.sys_Message)
        }
      }
    }

    return apiResponse;
  }
}
