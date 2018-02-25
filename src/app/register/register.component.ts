import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../shared/service/dialog/dialog.service';
import { BlackListService } from '../shared/service/api/black-list.service';
import { BlackListData } from '../shared/type/type';
import { InputFormComponent } from '../shared/form/input-form/input-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  /** フォーム入力以外でエラーを表示するか */
  errorDisplay = false;

  /** フォーム */
  registerForm: FormGroup;

  /**
   * コンストラクタ
   * @param fb フォームビルダー
   * @param dialogService ダイアログサービス
   */
  constructor(
    public fb: FormBuilder,
    public dialogService: DialogService,
    public blackListService: BlackListService
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

  /** 初期処理 */
  ngOnInit() { }

  /** リセット */
  reset() {
    // 一旦trueにしてからfalseに変更
    this.errorDisplay = true;
    this.errorDisplay = false;
  }

  /** 登録 */
  async onSubmit() {
    // エラー表示フラグを初期化
    this.errorDisplay = false;
    /** エラーがある場合はエラーメッセージを設定 */
    if (!this.registerForm.valid) { this.errorDisplay = true; return; }
    // 確認ダイアログ起動
    const result = await this.dialogService.confirm('確認', ['登録しますか?']);
    // いいえの場合は何もしない
    if (!result) { return; }
    // 登録データ(必須)の生成
    const body = {
      company_name: this.registerForm.controls['company-name'].value,
      phone_number: this.registerForm.controls['phone-number'].value
    } as BlackListData;
    // 登録データ(オプション)の生成
    if (this.registerForm.controls['contact-name'].value) { body.contact_name = this.registerForm.controls['contact-name'].value; }
    if (this.registerForm.controls['industry-name'].value) { body.industry = this.registerForm.controls['industry-name'].value; }
    if (this.registerForm.controls['remarks'].value) { body.remarks = this.registerForm.controls['remarks'].value; }
    // 登録API起動
    const ret = await this.blackListService.register(body);
    // エラーの場合はエラーダイアログ表示
    if (!ret) { await this.dialogService.error('登録異常', ['ブラックリストの登録に失敗しました。']); return; }
    // 完了ダイアログ起動
    await this.dialogService.complete('完了', ['登録が完了しました。']);
    // インプットパラメータ初期化
    this.registerForm.controls['company-name'].setValue('');
    this.registerForm.controls['phone-number'].setValue('');
    this.registerForm.controls['contact-name'].setValue('');
    this.registerForm.controls['industry-name'].setValue('');
    this.registerForm.controls['remarks'].setValue('');
  }
}
