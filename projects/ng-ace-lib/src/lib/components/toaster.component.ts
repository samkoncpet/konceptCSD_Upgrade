import { Component, ElementRef, TemplateRef, ViewChildren, QueryList, ViewEncapsulation, NgZone } from '@angular/core';

import EventHandler from '@ace/event-handler';

const CLOSE_BTN = '.close-btn, [\\(click\\)=hide\\(\\)]';

@Component({
    selector: 'div.ace-toaster-container',
    template: `
    <div *ngFor="let toast of toasts" 
        [(ngbCollapse)]="toast.isCollapsed" class="toast-wrapper"
        (hidden)="onCollapsed(toast)">

        <ng-container *ngIf="!toast.templateRef">
            <ngb-toast
                #ngbToastRef
                [class]="toast.className"
                [autohide]="toast.autohide"
                [delay]="toast.delay"
                [attr.toast-uid]="toast.uid"
                (hidden)="onHidden(toast)"
                [style.width]="toast.width+'px'">

                <ng-template ngbToastHeader>
                    <div *ngIf="toast.header" class="toast-title" [innerHTML]="toast.header | safeHtml"></div>
                </ng-template>

                <div [outerHTML]="toast.body | safeHtml"></div>

                <div *ngIf="toast.progress && toast.autohide" class="toast-progress" [class]="toast.progress" [style.width]="toast.progressReverse ? 'calc(100% - 1px)' : '0'"></div>
            </ngb-toast>
        </ng-container>

        <ng-container *ngIf="toast.templateRef">
            <ngb-toast
                #ngbToastRef
                [class]="toast.className"
                [autohide]="toast.autohide"
                [delay]="toast.delay"
                [attr.toast-uid]="toast.uid"
                (hidden)="onHidden(toast)"
                [style.width]="toast.width+'px'">

                <ng-template [ngTemplateOutlet]="toast.templateRef"></ng-template>

                <div *ngIf="toast.progress && toast.autohide" class="toast-progress" [class]="toast.progress" [style.width]="toast.progressReverse ? 'calc(100% - 1px)' : '0'"></div>
            </ngb-toast>
        </ng-container>
    </div>
    ` ,

    styles: [
                '.toast-wrapper.collapsing:not(.show) { transition-duration: 300ms; }'
            ]
    ,
    encapsulation: ViewEncapsulation.None
  })
export class ToasterContainerComponent {
    placement!: string;
    toasts: any[] = []
    element: any;

    toastId = 0;

    @ViewChildren('ngbToastRef') ngbToastRefs!: QueryList<any>;
  
    constructor(private el: ElementRef, private ngZone: NgZone) {
        this.element = this.el.nativeElement
    }

    add(options: any = {}) : Promise<any> {
        this.element.classList.add('position-' + this.placement)

        const Defaults = {isCollapsed: false, autohide: true, ariaLive: 'polite', delay: 5000}
        let toast = {
            ...Defaults,
            ...options,
            ...{uid: ++this.toastId}
        }

        if (toast.belowNav) {
            this.element.classList.add('toaster-below-nav')
        }

        if (toast.sticky === true || toast.delay < 0) toast.autohide = false

        // if delay is below 30, we consider it as seconds, not milliseconds
        if (toast.autohide) toast.delay = toast.delay > 30 ? toast.delay : toast.delay * 1000

        // is it a TemplateRef?
        toast.templateRef = toast.templateRef instanceof TemplateRef ? toast.templateRef : null

        // add this toast to toasts array
        this.toasts.push(toast)

        return new Promise((resolve, reject) => {
            // extra styling and classes            
            setTimeout(() => {
                let newToastEl : any = null
                let newToastRef : any = null

                if (this.ngbToastRefs?.length == 0) {
                    reject({placement: this.placement})
                    return
                }
                
                try {
                    newToastRef = this.ngbToastRefs.last
                    if (!newToastRef) {
                        reject({placement: this.placement})
                        return
                    }
                    newToastEl = <HTMLElement> newToastRef._element.nativeElement
                }
                catch(e) {}

                if (!newToastEl || Number(newToastEl.getAttribute('toast-uid')) !== toast.uid) {
                    reject({placement: this.placement})
                    return
                }

                // reference to ngb-toast and HTMLElement
                toast.ngRef = newToastRef
                toast.elRef = newToastEl

                toast.ngRef.ariaLive = toast.ariaLive

                // add headerClass, etc if not a TemplateRef
                if (!toast.templateRef) {
                    let header = toast.elRef.querySelector('.toast-header')
                    if (header && toast.headerClass) header.className += ` ${toast.headerClass}`

                    let title = toast.elRef.querySelector('.toast-title')
                    if (title && toast.titleClass) title.className += ` ${toast.titleClass}`

                    let body = toast.elRef.querySelector('.toast-body')
                    if (body && toast.bodyClass) body.className += ` ${toast.bodyClass}`

                    if (toast.closeClass) {
                        let close = header && header.querySelector('.close')
                        if (close) {
                            close.className = toast.closeClass
                        }
                    }
                }

                // multiple close buttons?
                // all buttons with (click)='hide()' or '.close-btn' should 'close' the toast                
                this.ngZone.runOutsideAngular(() => {
                    let closeButtons = toast.elRef?.querySelectorAll(CLOSE_BTN)
                    if (closeButtons && closeButtons.length > 0) {
                        closeButtons.forEach((el: HTMLElement) => {
                            EventHandler.on(el, 'click', () => this._hideToast(toast))
                        })
                    }
                })

                // progress bar
                if (toast.progress && toast.autohide) {
                    let progress = toast.elRef.querySelector('.toast-progress')
                    if (!progress) return

                    progress.style.transitionDuration = `${Number(toast.delay)}ms`
                    progress.style.width = toast.progressReverse ? 0 : 'calc(100% - 2px)'
                }

                resolve({toast: toast, placement: this.placement, uid: toast.uid, toastEl: newToastEl, toastRef: newToastRef})
            })
        })
    }


    
    _hideToast(toast: any) {
        toast.ngRef.hide() // first we hide it, then collapse
    }


    remove(toast: any) {
        let index = this.toasts.findIndex(_toast => _toast.uid === toast.uid)
        if (index == -1) return

        this._hideToast(this.toasts[index])
    }

    onHidden(toast: any) {
        let index = this.toasts.findIndex(_toast => _toast.uid === toast.uid)
        if (index == -1) return

        if (toast.noCollapseRequired === true) {
            // we're coming from `removeAll`
            this.toasts.splice(index, 1)
            this._cleanUp(toast)
            return
        }

        toast.elRef.classList.remove('hide') // so it's not 'display: none' and is collapsible
        this.toasts[index].isCollapsed = true // and we remove it in 'onCollapsed'
    }

    // after toast is collapsed we removed it from dom
    onCollapsed(toast: any) {
        let index = this.toasts.findIndex(_tst => _tst.uid === toast.uid)
        if (index == -1) return

        this.toasts.splice(index, 1)
        this._cleanUp(toast)
    }


    //
    removeAll(instant = false) {
        if (instant) {
            // just remove, no fade/collapse animation
            this.toasts = []
            return
        }
        for (let toast of this.toasts) {
            toast.ngRef.hide()
            toast.noCollapseRequired = true
        }
    }
    //

    _cleanUp(toast: any) {
        this.ngZone.runOutsideAngular(() => {
            let closeButtons = toast.elRef?.querySelectorAll(CLOSE_BTN)
            if (closeButtons && closeButtons.length > 0) {
                closeButtons.forEach((el: HTMLElement) => {
                    EventHandler.off(el, 'click')
                })
            }
        })
    }
  }