import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup, FormControl, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
}
export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value) {
    if (!control.value.toString().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return { email: true };
    } else {
      return null;
    }
  } else {
    return null;
  }
}
export function AlphaValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value) {
    if (!control.value.toString().match(/^[a-zA-Z ]*$/)) {
      return { AlphaValidator: true };
    } else {
      return null;
    }
  } else {
    return null;
  }
}
export function NumericValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value) {
    if (!control.value.toString().match(/^[0-9]+$/)) {
      return { NumericValidator: true };
    } else {
      return null;
    }
  } else {
    return null;
  }
}
export function AlphaNumericValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value) {
    if (
      !control.value.toString().match(/^[-a-zA-Z0-9]+(( ?)+[-a-zA-Z0-9]+)*$/)
    ) {
      return { AlphaNumericValidator: true };
    } else {
      return null;
    }
  } else {
    return null;
  }
}
export function FormErrorMessage(formGroup: FormGroup, control: string) {
  let controlValue = formGroup.get(control).errors;
  if (controlValue) {
    if (controlValue.required) {
      return 'This field is required'
    }
    else if (controlValue.minlength) {
      return 'Please enter at least ' + controlValue.minlength.requiredLength + ' characters';
    }
    else if (controlValue.maxlength) {
      return 'Please enter not more than  ' + controlValue.maxlength.requiredLength + ' characters';
    } 
    else if (controlValue.UrlValidator) {
      return 'Please enter valid url'
    }
    else if (controlValue.mobile) {
      return 'Please enter valid mobile number'
    }
    else if (control === "DateTillUnmarried") {
      if(controlValue.matDatepickerMin["min"] >= controlValue.matDatepickerMin["actual"]){
        return 'Please enter valid date'
      }
    }
    else if (controlValue.PassportNo) {
      return 'Please enter valid passport number'
    }
    
    else if (controlValue.AlphaValidator) {
      return 'Please enter only english alphabets'
    }
    else if (controlValue.NumericValidator) {
      return 'Please enter only number'
    }
    else if (controlValue.DecimalValidator) {
      return 'Please enter only number or decimal'
    }
    else if (controlValue.AlphaNumericValidator) {
      return 'Please enter only alphabets and numbers'
    }
    else if (controlValue.AllowedCharacterValidator) {
      return "Please use only '$-/:-{-~!\"^_`\[\]' special characters";
    }
    else if (controlValue.PasswordValidator) {
      return 'Password must be between 6 - 32 character, Contains 1 Uppercase 1 Lowercase 1 Number & 1 Special character';
    }
    else if (controlValue.OnlyPunjabi) {
      return 'Only punjabi is allowed';
    }
    else if (controlValue.PanCard) {
      return 'Please enter a valid PAN number';
    }
    else if (controlValue.NumWithoutDecimal) {
      return 'Please enter whole number without decimal';
    }
    else if (controlValue.PunjabiMixed) {
      return 'Only punjabi, numbers and special characters [ ! @ # $ % & * ( ) , . ? " : { } | - /] are allowed';
    }
    else if (controlValue.EnglishPunjabiOnly) {
      return 'Only english and punjabi is allowed';
    }
    else if (controlValue.EnglishMixed) {
      return 'Only english, numbers and special characters [ ! @ # $ % & * ( ) , . ? " : { } | - /] are allowed';
    }
    else if (controlValue.email) {
      return 'Please enter a valid email address';
    }
    else if (controlValue.emailValidator) {
      return 'Please enter a valid email address';
    }
    else if (controlValue.EnglishAddress) {
      return 'Only Alphanumeric with special character like #-,/ are allowed.';
    }
    else if (controlValue.PunjabiAddress) {
      return 'Only punjabi,number is allowed with special character like #-,/';
    }
    else if (controlValue.VoterID) {
      return 'Invalid voter id.';
    }
    else if (controlValue.EnrolmentNumber) {
      return 'Only "/",alphabets and numbers are allowed.';
    }
    else if (controlValue.NumWithForwordSlash) {
      return 'Only "/" and numbers are allowed.';
    }
    else if (controlValue.NumOnly) {
      return 'Only numerics are allowed.';
    }
    else if (controlValue.Aadhaar) {
      return 'Invalid aadhaar number.';
    }
    else if (controlValue.SocialSecurityNumber) {
      return 'Please enter a Social Security Number.';
    }
    else if (controlValue.numRangeValidator) {      
      return 'Input should be in 0 to 11';
    }
    else if(controlValue.NumBiggerThanZero){
      return 'Input should be greater than zero'
    }
    else {
      return controlValue;
    }
  }
}