import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptDecryptService } from '../../app/config/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private _router: Router,
    private _encdecrService: EncryptDecryptService) { }

  localstorageSet(key, value){
    window.localStorage.setItem(key, this._encdecrService.Encrypt(value));
  }
  localstorageGet(key){
    if(window.localStorage.getItem(key) === null){      
      this._router.navigate(['/index']);
    }
    else{
      return this._encdecrService.Decrypt(window.localStorage.getItem(key));
    }
  }
  localstorageclear(){
    window.localStorage.clear();
  }
}
