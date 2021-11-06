import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpHeaders, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, timeout, map } from 'rxjs/operators';
import { LocalstorageService } from '../config/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService implements HttpInterceptor {
  private permittedActions: string[] = ["POST", "GET"];
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _localstorageService: LocalstorageService
  ) { }
  getAuthToken() {
    return this._localstorageService.localstorageGet("token");
  };

  logout() {
    window.sessionStorage.clear();
    this._router.navigate(['/index']);
  };

  private prepareHeader(method: string, url: string, headers: HttpHeaders | null): HttpHeaders {
  // headers = headers || new HttpHeaders();
    let authToken: string = this._localstorageService.localstorageGet("token");
    
    if (!authToken) {      
      authToken = "";
    }
    let currentPost: string = "";
    
    headers = new HttpHeaders({
      'Authorization':  'Bearer ' + authToken,
      'Content-Type': 'application/json',
      'language': 'en'
    });

    return headers
  }

  private prepareCustomHeader(method: string, url: string, headers: HttpHeaders | null): HttpHeaders {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'language': 'en'
      });
  
      return headers
    }

  getWithoutHeader<T>(url: string): Observable<T> {
      return this._http.get<T>(url, {withCredentials: false});
  }

  get<T>(url: string, headers?: HttpHeaders | null,): Observable<T> {
    const expandedHeaders = this.prepareHeader('GET', url, headers);
      return this._http.get<T>(url, {headers: expandedHeaders, withCredentials: false});
  }

  postWithoutHeader<T>(url: string, body: any, headers?: HttpHeaders | null): Observable<T> {     
    const expandedHeaders = this.prepareCustomHeader('POST', url, headers);
      return this._http.post<T>(url, body, {headers: expandedHeaders, withCredentials: false});
  }

  post<T>(url: string, body: any, headers?: HttpHeaders | null): Observable<T> {     
    const expandedHeaders = this.prepareHeader('POST', url, headers);
      return this._http.post<T>(url, body, {headers: expandedHeaders, withCredentials: false});
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if(!this.permittedActions.includes(request.method)){
      return;
    }
    
    return next.handle(request)
      .pipe(
        catchError((response) => {
          if (response.status === 400) {
            if(response.error != null && response.error.data != undefined && response.error.data != null && response.error.data.length > 0) {
                var html: string = "";
                response.error.data.forEach((data: string) => {
                html += data + "</br>";
              });
            }
          }
          else if (response.status === 401) {
            this.logout();
          }
          else if (response.status === 404) {
          }
          return throwError(response);
        }),
        timeout(15000)
      )      
  };

}
