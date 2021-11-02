import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, ValidatorFn} from '@angular/forms';


@Component({
  selector: 'app-wizard-validation',
  templateUrl: './validation.component.html',
  styleUrls: []
})
export class ValidationComponent implements OnInit {

  myForm = {
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    url: '',
    subscription: '',
    'gender[]': '',

    agree: '',
    platform: ''
  }
  
  subscriptionItems = [
    {
      id: "newsletter",
      label: "Latest news and announcements"
    },
    {
      id: "offers",
      label: "Product offers and discounts"
    }
  ]

  urlPattern = "^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$"


  confirmPasswords = (form: FormGroup) => {
    let password = form.get('password')?.value;
    let confirmPassword = form.get('confirmPassword')?.value;

    if (password === confirmPassword) return null
    form.controls['confirmPassword'].setErrors({ mismatch: true })

    return { mismatch: true }
  }

  checkSubscriptions = (form: FormGroup) => {
    let control = form.controls['subscription']
    if (!control) return

    control.setErrors({})
    control.updateValueAndValidity( { onlySelf: true, emitEvent: false })

    for(let i = 0; i < this.subscriptionItems.length; i++) {
      if (form.get(`subscription${i}`)?.value === true) return null
    }

    control.setErrors({ selectOne: true })
    return { selectOne: true }
  }

  updateSubscriptions() {
    this.formGroup.controls['subscription']?.markAsTouched()
  }

  formGroup = new FormGroup({
    email: new FormControl(this.myForm.email, [Validators.required, Validators.minLength(6), Validators.email]),
    password: new FormControl(this.myForm.password, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(this.myForm.confirmPassword, [Validators.required]),
    phone: new FormControl(this.myForm.phone, [Validators.required]),
    url: new FormControl(this.myForm.url, [Validators.required]),

    subscription: new FormControl(this.myForm['subscription']),

    'gender[]': new FormControl(this.myForm['gender[]'], [Validators.required]),

    agree: new FormControl(this.myForm.agree),
    platform: new FormControl(this.myForm.platform),
  }, [<ValidatorFn> this.confirmPasswords, <ValidatorFn> this.checkSubscriptions])


  get email() { return this.formGroup.get('email') }
  get password() { return this.formGroup.get('password') }
  get confirmPassword() { return this.formGroup.get('confirmPassword') }
  get phone() { return this.formGroup.get('phone') }
  get url() { return this.formGroup.get('url') }

  get subscription() { return this.formGroup.get('subscription') || undefined }
  get gender() { return this.formGroup.get('gender[]') }

  get platform() { return this.formGroup.get('platform') }
  get agree() { return this.formGroup.get('agree') }


  constructor() { }

  ngOnInit(): void {
    let index = 0;
    this.subscriptionItems.forEach(() => {
      this.formGroup.addControl(`subscription${index}`, new FormControl(false))
      index++;
    })
  }

  isValidForm() : boolean {    
    this.formGroup.markAllAsTouched()
    return this.formGroup?.status === "VALID"
  }

  isInvalid(item: any) {
    return item && item.invalid && (item.dirty || item.touched)
  }

}
