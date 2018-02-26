import { Component, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss', '../form.scss'],
  animations: [
    trigger('state', [
      transition(':enter', [
        animate(100, keyframes([
          style({ opacity: 0, transform: 'translateY(-30%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      transition(':leave', [
        animate(100, keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateY(-30%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class FormErrorComponent implements OnInit {
  /** フォームコントロール */
  @Input()
  controlDir: NgControl;

  /** 表示有無 */
  isDisplay: boolean;

  /** コンストラクタ */
  constructor() { }

  /** 初期処理 */
  ngOnInit() { }

  /** エラー判定 */
  isError(): boolean {
    // バリデーションエラーではない場合は表示しない
    if (!this.controlDir.invalid) { return false; }
    // フォームに触れていなくて、変更もされていない場合は表示しない
    // if ((!this.controlDir.touched && !this.controlDir.dirty)) { return false; }
    // エラーメッセージを表示
    return true;
  }

  /** エラー画面表示 */
  errorDisplay() { this.isDisplay = true; }

  /** エラー画面非表示 */
  errorHide() { this.isDisplay = false; }

  /** エラーメッセージを取得 */
  getErrorMessage() {
    // エラーがない場合は空文字を返却
    if (!this.controlDir.errors) { return ''; }
    // 入力必須エラー
    if (this.controlDir.errors.required) { return '入力必須項目です。'; }
    // 知らないエラーの場合はメッセージなし
    return '';
  }
}
