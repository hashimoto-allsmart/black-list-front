import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss', '../form.scss'],
})
export class FormErrorComponent implements OnInit {
  /** フォームコントロール */
  @Input()
  controlDir: NgControl;

  /** 表示有無 */
  @Input()
  isDisplay: boolean;

  /** 表示状態 */
  displayState = 'none';

  /** エラーメッセージ */
  errorMessage = '';

  /** コンストラクタ */
  constructor() { }

  /** 初期処理 */
  ngOnInit() { }

  /** エラーメッセージの表示要否 */
  isErrorDisplay(): boolean {
    // エラーメッセージ表示不可の場合は表示しない
    if (!this.isDisplay) { return false; }
    // バリデーションエラーではない場合は表示しない
    if (!this.controlDir.invalid) { return false; }
    // フォームに振れていなくて、変更もされていない場合は表示しない
    if ((!this.controlDir.touched && !this.controlDir.dirty)) { return false; }
    // エラーメッセージ設定
    this.errorMessage = this.getErrorMessage();
    // エラーメッセージを表示
    return true;
  }

  /** エラーメッセージを取得 */
  getErrorMessage() {
    // 入力必須エラー
    if (this.controlDir.errors.required) { return '入力必須項目です。'; }
    // 知らないエラーの場合はメッセージなし
    return '';
  }
}
