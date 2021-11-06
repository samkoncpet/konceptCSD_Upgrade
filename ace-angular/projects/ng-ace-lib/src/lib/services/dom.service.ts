// courteousy of https://gist.github.com/reed-lawrence/1f6b7c328ad3886e60dc2b0adcf75a97
// and https://gist.github.com/caroso1222/1c99aee8c9efe873902a9c590ab7b40a

import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    // EmbeddedViewRef,
    ApplicationRef,
    ComponentRef
  } from '@angular/core';
  
  @Injectable({
    providedIn: 'root'
  })
  export class DomService {
  
    constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private appRef: ApplicationRef,
      private injector: Injector
    ) { }


    insertComponent(component: any, componentProps?: object, appendTo?: any) : any {
        let $comp = this.createComponent(component, componentProps)
        this.attachComponent($comp, appendTo)

        return $comp
    }
  
    createComponent(component: any, componentProps?: object) {
      // 1. Create a component reference from the component 
      const componentRef = this.componentFactoryResolver
        .resolveComponentFactory(component)
        .create(this.injector)
  
      if (componentProps && typeof componentRef.instance === 'object') {
        Object.assign(componentRef.instance as object, componentProps)
      }
  
      return componentRef
    }
  
    attachComponent(componentRef: ComponentRef<unknown>, appendTo?: any) {
      // 2. Attach component to the appRef so that it's inside the ng component tree
      this.appRef.attachView(componentRef.hostView)
  
      // 3. Get DOM element from component
      //const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      //  .rootNodes[0] as HTMLElement

      const domElem = componentRef.location.nativeElement
  
      // 4. Append DOM element to the body
      appendTo = appendTo || document.body
      appendTo.appendChild(domElem)
    }
  }