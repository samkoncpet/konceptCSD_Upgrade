import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor() { }

  private _loadedResources = {}

  addCSS(path: string, prepend: boolean) : Promise<any> {
    return new Promise((resolve, reject) => {
      if(this._loadedResources[path]) {
        resolve(this._loadedResources[path])
        return
      }

      let link = document.createElement('link')
      link.rel = 'stylesheet';
      link.href = path;

      link.onload = () => {
        this._loadedResources[path] = link
        resolve(link)
      }
      link.onerror = () => {
        reject()
      }

      if (prepend) {
        document.head.prepend(link)
      }
      else {
        document.head.append(link)
      }
    })
  }

  prependCSS(path: string) : Promise<any> {
    return this.addCSS(path, true)
  }

  /////////////////////

  addJS(path: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      if(this._loadedResources[path]) {
        resolve(this._loadedResources[path])
        return
      }
  
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = path;

      script.onload = () => {
        this._loadedResources[path] = script
        resolve(script)
      }
  
      script.onerror = () => {
        reject()
      }

      document.body.append(script) 
    })
  }
}

