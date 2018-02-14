import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /** フォーム */
  registerForm: FormGroup;

  companyNameError = '';

  constructor(
    public fb: FormBuilder
  ) {
    // フォームグループの登録
    this.registerForm = this.fb.group({
      'company-name': ['', [Validators.required]],
      'phone-number': ['', [Validators.required]],
      'contact-name': '',
      'industry-name': '',
      'remarks': ''
    });
  }

  ngOnInit() {
  }

  reset() {
  }

  onSubmit() {
    console.log(this.registerForm.controls['company-name'].value);
    console.log(this.registerForm.controls['phone-number'].value);
    console.log(this.registerForm.controls['contact-name'].value);
    console.log(this.registerForm.controls['industry-name'].value);
    console.log(this.registerForm.controls['remarks'].value);
  }

  focusout(form: string) {
    console.log(this.registerForm.controls[form].errors);
  }
}
