import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../shared/service/dialog/dialog.service';

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
    public fb: FormBuilder,
    public dialogService: DialogService
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

  async onSubmit() {
    console.log(this.registerForm.controls['company-name'].value);
    console.log(this.registerForm.controls['phone-number'].value);
    console.log(this.registerForm.controls['contact-name'].value);
    console.log(this.registerForm.controls['industry-name'].value);
    console.log(this.registerForm.controls['remarks'].value);
    // 確認ダイアログ起動
    const result = await this.dialogService.confirm('確認', ['登録しますか?']);
    // いいえの場合は何もしない
    if (!result) { return; }
    // 登録API起動
    // 完了ダイアログ起動
    await this.dialogService.complete('完了', ['登録が完了しました。']);
  }

  focusout(form: string) {
    console.log(this.registerForm.controls[form].errors);
  }
}
