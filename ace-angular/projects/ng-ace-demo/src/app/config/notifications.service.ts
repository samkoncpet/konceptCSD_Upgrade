import { Injectable } from '@angular/core'; 
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgAceToasterService } from 'ng-ace-admin';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private toasterService: NgAceToasterService) { }
    
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

  showSuccess(subject?: string, message?: string) {
    this.toasterService.show({
      placement: 'tr',
      className: 'bgc-white-tp1 shadow border-0',

      headerClass: 'd-none',
      bodyClass: 'd-flex border-0 p-0 text-dark-tp2',

      body:`
            <div class='bgc-green-d1 text-white px-3 pt-3'>
                <div class='border-2 brc-white px-3 py-25 radius-round'>
                    <i class='fa fa-check text-150'></i>
                </div>
            </div>
            <div class='p-3 mb-0 flex-grow-1'>
                <h4 class='text-130'>`
                +  subject +`</h4>`
                 +  message +`            </div>
            <button class='close-btn align-self-start btn btn-xs btn-outline-grey btn-h-light-grey py-2px mr-1 mt-1 border-0 text-150'>&times;</button>
          `
    })
  }
  showWarning(subject?: string, message?: string) {
    this.toasterService.show({
      placement: 'tr',
      className: 'bgc-white-tp1 shadow border-0',

      headerClass: 'd-none',
      bodyClass: 'd-flex border-0 p-0 text-dark-tp2',

      body: `
            <div class='bgc-orange-d1 text-white px-3 pt-3'>
                <div class='border-2 brc-white px-3 py-25 radius-round'>
                    <i class='fa fa-times text-150'></i>
                </div>
            </div>
            <div class='p-3 mb-0 flex-grow-1'>
            <h4 class='text-130'>`
            +  subject +`</h4>`
             +  message +`            </div>
            </div>
            <button class='close-btn align-self-start btn btn-xs btn-outline-grey btn-h-light-grey py-2px mr-1 mt-1 border-0 text-150'>&times;</button>
          `
    })
  }
}
