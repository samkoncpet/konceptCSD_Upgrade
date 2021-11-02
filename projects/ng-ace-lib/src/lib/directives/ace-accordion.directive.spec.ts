import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

import {NgAceAccordion, NgAceAccordionCard, NgAceAccordionToggle} from './ace-accordion.directive';

@Component({
  template: `
  <div NgAceAccordion [closeOthers]="closeOthers" [activeId]="activeId" (activeIdChange)="onActiveIdChange()">

    <div>
        <a NgAceAccordionToggle>
          Accordion 1 Toggle
        </a>
        <div NgAceAccordionCard [ngbCollapse]="true">
            Accordion 1 Content
        </div>
    </div>

    <div>
        <a NgAceAccordionToggle>
          Accordion 2 Toggle
        </a>
        <div NgAceAccordionCard [ngbCollapse]="true">
            Accordion 2 Content
        </div>
    </div>

    <div>
        <a NgAceAccordionToggle>
          Accordion 3 Toggle
        </a>
        <div NgAceAccordionCard [ngbCollapse]="true">
            Accordion 3Content
        </div>
    </div>
  
  </div>
  `
})
class TestComponent {
  closeOthers = true;
  activeId: any;

  onActiveIdChange = ($event: any) => {}
}


function getAccordionDirective(fixture: ComponentFixture<any>): NgAceAccordion {
  return fixture.debugElement.query(By.directive(NgAceAccordion)).injector.get(NgAceAccordion);
}

function getCollapseDirectives(fixture: ComponentFixture<any>): any {  
  let result = [];

  fixture.debugElement.queryAll(By.directive(NgbCollapse)).forEach((de: DebugElement) => {
    result.push(de.injector.get(NgbCollapse))
  })

  return result
}

function getToggleButtons(fixture: ComponentFixture<any>): any {  
  return fixture.debugElement.queryAll(By.directive(NgAceAccordionToggle))
}




describe('AceAccordion', () => {
  let fixture: ComponentFixture <TestComponent>;
  let accordion: NgAceAccordion;
  let toggles: any;
  let contents: any;

  beforeEach(() => {
	fixture?.destroy()
	  
    fixture = TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ NgAceAccordion, NgAceAccordionCard, NgAceAccordionToggle, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges()

    accordion = getAccordionDirective(fixture);

    contents = getCollapseDirectives(fixture);

    toggles = getToggleButtons(fixture);
  })



  it('should have three accordion elements', () => {
    expect(contents.length).toBe(3)
    expect(toggles.length).toBe(3)
  })


  it('should uncollapse the first accordion when toggle is clicked', (done) => {
    const toggle = toggles[0].nativeElement as HTMLElement
    const content = contents[0] as NgbCollapse

    content.shown
    .subscribe(() => {
      expect(content.collapsed).not.toBeTrue()
      done()
    })

    toggle.click()
  })


  it('should collapse other accordions when another one is shown', (done) => {
    const toggle1 = toggles[0].nativeElement as HTMLElement
    const content1 = contents[0] as NgbCollapse

    const toggle2 = toggles[1].nativeElement as HTMLElement
    const content2 = contents[1] as NgbCollapse

    const toggle3 = toggles[2].nativeElement as HTMLElement
    const content3 = contents[2] as NgbCollapse

    content1.shown
    .subscribe(() => {
      expect(content1.collapsed).not.toBeTrue()

      toggle2.click()
    })

    content2.shown
    .subscribe(() => {
      expect(content1.collapsed).toBeTrue()
      toggle3.click()
    })


    content3.shown
    .subscribe(() => {
      expect(content1.collapsed).toBeTrue()
      expect(content2.collapsed).toBeTrue()

      done()
    })

    toggle1.click()
  })


  it('should collapse other accordions when an accordion is opened by setting activeId', (done) => {
    const content1 = contents[0] as NgbCollapse
    const content3 = contents[2] as NgbCollapse  
  
    let comp = fixture.componentInstance

    expect(content1.collapsed).toBeTrue();
    expect(content3.collapsed).toBeTrue();
 
    content1.shown
    .subscribe(() => {
      expect(content1.collapsed).toBeFalse();

      comp.activeId = 3
      fixture.detectChanges()
    })

    content3.shown
    .subscribe(() => {
      expect(content1.collapsed).toBeTrue();
      expect(content3.collapsed).toBeFalse();

      done()
    })

    comp.activeId = 1;
    fixture.detectChanges()
  })



  it('when closeOthers is false, it should not collapse other accordions when another one is shown', (done) => {
    let comp = fixture.componentInstance
    comp.closeOthers = false
    comp.activeId = 1
    fixture.detectChanges()

  
    const content1 = contents[0] as NgbCollapse

    const toggle2 = toggles[1].nativeElement as HTMLElement
    const content2 = contents[1] as NgbCollapse

    const toggle3 = toggles[2].nativeElement as HTMLElement
    const content3 = contents[2] as NgbCollapse

    expect(content1.collapsed).toBeFalse();
    expect(content2.collapsed).toBeTrue();
    expect(content3.collapsed).toBeTrue();



    content2.shown
    .subscribe(() => {
      expect(content1.collapsed).toBeFalse();
      expect(content2.collapsed).toBeFalse();

      toggle3.click()
    })


    content3.shown
    .subscribe(() => {
      expect(content1.collapsed).toBeFalse();
      expect(content2.collapsed).toBeFalse();
      expect(content3.collapsed).toBeFalse();

      done()
    })

    toggle2.click()
  })


  it('should respond to activeIdChange', (done) => {
    let comp = fixture.componentInstance
    fixture.detectChanges()

    const onActiveIdChangeSpy = spyOn(comp, 'onActiveIdChange');

    const toggle2 = toggles[1].nativeElement as HTMLElement
    const content2 = contents[1] as NgbCollapse

    const toggle3 = toggles[2].nativeElement as HTMLElement
    const content3 = contents[2] as NgbCollapse

    content2.shown
    .subscribe(() => {
      expect(content2.collapsed).toBeFalse();

      comp.activeId = 3 // is called twice ?!
      fixture.detectChanges()
    })

    content3.shown
    .subscribe(() => {
      expect(content2.collapsed).toBeTrue();
      expect(content3.collapsed).toBeFalse();

      expect(onActiveIdChangeSpy).toHaveBeenCalledTimes(3);
      done();
    })

    toggle2.click()
  })

});