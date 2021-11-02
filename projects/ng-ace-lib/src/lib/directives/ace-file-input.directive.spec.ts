import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';



import {NgAceFileInput} from './ace-file-input.directive';

@Component({
  template: `
  <input #file="NgAceFile" type="file" [NgAceFile]="fileOptions" (onClear)="onClear()" />
  `
})
class TestComponent {
  @ViewChild('file', {static: true}) file!: NgAceFileInput;

  fileOptions: any;
  onClear = () => {}

}

function getClearButton(fixture: ComponentFixture<any>): any {  
  return fixture.debugElement.query(By.css('.remove'))
}


describe('NgAceFileInput', () => {
  document.body.classList.add('is-document-loaded')


  let fixture: ComponentFixture <TestComponent>;
  let clearButton: any;


  beforeEach(() => {
    fixture?.destroy()
  
    fixture = TestBed.configureTestingModule({
      declarations: [ NgAceFileInput, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges()

   

    clearButton = getClearButton(fixture);
  })


  it('should update style', () => {
    let comp = fixture.componentInstance

    comp.fileOptions = {
      style: 'drop',

      placeholderText: 'CHOOSE',
      placeholderIcon: '<i class="fa fa-upload text-purple"></i>',
    }

    fixture.detectChanges()

    const label = comp.file.element.parentNode

    expect(label.querySelector('.text-purple')).not.toBeNull()
    expect(label.textContent).toContain('CHOOSE')
  })

  it('should clear file input and call clear event', () => {
    let comp = fixture.componentInstance
    
    comp.fileOptions = {
      style: 'drop',
      allowExt: 'png|gif',
      allowMime: 'image/png|image/gif',
      maxSize: 5000
    }

    const onClearSpy = spyOn(comp, 'onClear');

    fixture.detectChanges()

    comp.file.showFileList([{ name: '1.png', type: 'image/png' }, { name: '2.jpg', type: 'image/jpg'}])

    let button = comp.file.element.parentNode.querySelector('.remove')
    button.click()

    expect(onClearSpy).toHaveBeenCalled();
   
  })

});


