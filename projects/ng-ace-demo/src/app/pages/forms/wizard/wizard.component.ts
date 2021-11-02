import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { WizardComponent } from 'angular-archwizard';

import { ValidationComponent } from './validation-form/validation.component';
import { MovingDirection } from 'angular-archwizard';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormWizardComponent {

  constructor() { }

  @ViewChild(ValidationComponent)
  public validation!: ValidationComponent;


  enableValidation = false

  public canExitStep1 = (direction: MovingDirection) : boolean => {
    if (direction == MovingDirection.Forwards && this.enableValidation) {
      return this.validation?.isValidForm() || false
    }

    return true;
  }

}
