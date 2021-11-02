import { Injectable } from '@angular/core';
import { EncryptDecryptService } from '../../app/config/encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private _encdecrService: EncryptDecryptService) { }

  localstorageSet(key, value){
    window.localStorage.setItem(key, this._encdecrService.Encrypt(value));
  }
  localstorageGet(key){
    return this._encdecrService.Decrypt(window.localStorage.getItem(key));
  }
  localstorageclear(){
    window.localStorage.clear();
  }
}
