import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonfunctionsService {

  constructor(
    private _router: Router) { }

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
      case null:
        return null;
      default:
        return false;
     }
  }

  exactionLog(status: number,  message: string) {
    console.log("status: " + status + " message: " + message);
    if (status === 400) {
      // // 400 Bad Request
      // // The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
    }
    else if (status === 401) {
      // // 401 Unauthorized
      // // Indicates that the request requires user authentication information. The client MAY repeat the request with a suitable Authorization header field
      window.sessionStorage.clear();
      this._router.navigate(['/']);
    }
    else if (status === 403) {
      // // 403 Forbidden
      // // Unauthorized request. The client does not have access rights to the content. Unlike 401, the client’s identity is known to the server.
    }
    else if (status === 404) {
      // // 404 Not Found
      // // The server can not find the requested resource.
      window.sessionStorage.clear();
      this._router.navigate(['/dashboard']);
    }
    else if (status === 405) {
      // // 405 Method Not Allowed
      // // The request HTTP method is known by the server but has been disabled and cannot be used for that resource.
    }
    else if (status === 406) {
      // // 406 Not Acceptable
      // // The server doesn’t find any content that conforms to the criteria given by the user agent in the Accept header sent in the request.
    }
    else if (status === 408) {
      // // 408 Request Timeout
      // // Indicates that the server did not receive a complete request from the client within the server’s allotted timeout period.
    }
    else if (status === 415) {
      // // 415 Unsupported Media Type
      // // The mediatype in Content-type of the request is not supported by the server.
    }
    else if (status === 500) {
      // // 500 Internal Server Error
      // // The server encountered an unexpected condition which prevented it from fulfilling the request.
      window.sessionStorage.clear();
      this._router.navigate(['/']);
    }
    else if (status === 503) {
      // // 503 Service Unavailable
      // // The server is not ready to handle the request.
    }
  }
}
