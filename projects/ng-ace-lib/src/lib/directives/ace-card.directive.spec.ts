import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

import {NgAceCard} from './ace-card.directive';

@Component({
  template: `
  <div #card="NgAceCard" NgAceCard class="card" [fullscreen]="fullscreen" (fullscreenChange)="onFullscreenChange($event)" (onExpanded)="onExpanded()" (onRestored)="onRestored()">
  <div class="card-header">
      <h5 class="card-title">
        Card Title
      </h5>
      
      <div class="card-toolbar">
          <a role="button" (click)="card.toggleFullscreen()">
            Fullscreen
          </a>

          <a role="button" (click)="reload()">
            Reload
          </a>

          <a role="button" (click)="card.close()">
            Close
          </a>
      </div>
  </div><!-- /.card-header -->

  <div class="card-body" #collapse="ngbCollapse" [ngbCollapse]="false">
   Content
  </div><!-- /.card-body -->
</div>
  `
})
class TestComponent {
  @ViewChild('card', {static: true}) card!: NgAceCard;
  @ViewChild('collapse', {static: true}) collapse!: NgbCollapse;

  fullscreen = false;

  onFullscreenChange = ($event: any) => {}
  onExpanded = () => {}
  onRestored = () => {}

  reload() {
    this.card.reload()
    setTimeout(() => {
      this.card.stopLoading()
    }, 100)
  }

  toggle() {
    this.collapse.toggle()
  }
}

function getActionButtons(fixture: ComponentFixture<any>): any {  
  return fixture.debugElement.queryAll(By.css('a[role="button"]'))
}




describe('NgAceCard', () => {
  document.body.classList.add('is-document-loaded')


  let fixture: ComponentFixture <TestComponent>;
  let buttons: any;

  /**it('should have four toolbar buttons', () => {
    expect(contents.length).toBe(3)
    expect(toggles.length).toBe(3)
  })*/
  beforeEach(() => {
    fixture?.destroy()
  
    fixture = TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ NgAceCard, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges()

   

    buttons = getActionButtons(fixture);
  })


  it('should make card fullscreen/restore when relevant button is clicked', (done) => {
    const button = buttons[0].nativeElement as HTMLElement
    let comp = fixture.componentInstance

    expect(comp.card.fullscreen).toBeFalse();

    const onFullscreenChangeSpy = spyOn(comp, 'onFullscreenChange');
    const onExpandedSpy = spyOn(comp, 'onExpanded');
    const onRestoredSpy = spyOn(comp, 'onRestored');

    comp.card.onExpanded.
    subscribe(() => {
      // comp.card.restore()
      button.click()
    })

    comp.card.onRestored.
    subscribe(() => {
      expect(onFullscreenChangeSpy).toHaveBeenCalledTimes(2);
      expect(onExpandedSpy).toHaveBeenCalledTimes(1);
      expect(onRestoredSpy).toHaveBeenCalledTimes(1);
      done()
    })


    button.click()
    expect(comp.card.fullscreen).toBeTrue();
  })

  it('should make card fullscreen/restore when `fullscreen` value is updated', (done) => {
    let comp = fixture.componentInstance

    const onFullscreenChangeSpy = spyOn(comp, 'onFullscreenChange');
    const onExpandedSpy = spyOn(comp, 'onExpanded');
    const onRestoredSpy = spyOn(comp, 'onRestored');
 
    comp.card.onExpanded.
    subscribe(() => {
      comp.fullscreen = false
      fixture.detectChanges()
    })

    comp.card.onRestored.
    subscribe(() => {
      expect(onFullscreenChangeSpy).toHaveBeenCalledTimes(2);
      expect(onExpandedSpy).toHaveBeenCalledTimes(1);
      expect(onRestoredSpy).toHaveBeenCalledTimes(1);
      done()
    })


    comp.fullscreen = true
    fixture.detectChanges()
  })


  it('should prevent/unprevent card fullscreen', () => {
    const button = buttons[0].nativeElement as HTMLElement
    let comp = fixture.componentInstance

    comp.card.preventEvent('expand')

    button.click()

    expect(comp.card.fullscreen).toBeFalse();

    comp.card.preventEvent('expand', false)

    button.click()

    expect(comp.card.fullscreen).toBeTrue();
  })


  it('should close card', (done) => {
    const button = buttons[2].nativeElement as HTMLElement
    let comp = fixture.componentInstance

    comp.card.onClosed.
    subscribe(() => {
      expect(comp.card.element.parentNode).toBeNull()
      done()
    })

    button.click()
  })


  it('should reload card', (done) => {
    const button = buttons[1].nativeElement as HTMLElement
    let comp = fixture.componentInstance

    comp.card.onLoad.
    subscribe((loading: boolean) => {
      if (loading === true) {
        setTimeout(() => {
          expect(comp.card.element.querySelector('.bs-card-loading-overlay')).not.toBeNull()
        })
      }
      else if (loading === false) {
        expect(comp.card.element.querySelector('.bs-card-loading-overlay')).toBeNull()
        done()
      }
    })

    button.click()
  })
});
