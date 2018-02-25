import { Component, OnInit, ViewChild, ElementRef, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss', '../form.scss']
})
export class TextAreaComponent implements OnInit, ControlValueAccessor {

  /** textarea */
  @ViewChild('textarea') textarea: ElementRef;

  /** error */
  @ViewChild(FormErrorComponent) formError: FormErrorComponent;

  /** ラベル */
  @Input()
  label = '';

  /** プレースホルダー */
  @Input()
  placeholder = '';

  /** 非表示 */
  disabled: boolean;

  /** 変更検知時の外部へ通知 */
  onChangeCallback = (value: any): void => { };

  /** フォーカスアウト時の外部への通知 */
  onTouchedCallback = (): void => { };

  /**
   * コンストラクタ
   * @param controlDir FormControlオブジェクト
   */
  constructor(@Optional() @Self() public controlDir: NgControl) { controlDir.valueAccessor = this; }

  /** 初期処理 */
  ngOnInit() {
    // FormControlを取得
    const control = this.controlDir.control;
    // バリデータを取得
    const validators = control.validator;
    // バリデータの設定
    control.setValidators(validators);
    // 値とバリデータを再設定
    control.updateValueAndValidity();
  }

  /** フォーカスアウトイベント */
  onBlur() {
    // エラーの場合はエラーメッセージを表示
    if (this.formError.isError()) { this.formError.errorDisplay() };
    // コールバック起動
    this.onTouchedCallback();
  }

  /**
   * 値変更イベント
   * @param value 変更された値
   */
  onChange(value: any) {
    // エラーメッセージを非表示
    this.formError.errorHide();
    // コールバック起動
    this.onChangeCallback(value);
  }

  // ControlValueAccessorの実装メソッド
  writeValue(obj: any) { this.textarea.nativeElement.value = obj; }

  // ControlValueAccessorの実装メソッド
  registerOnChange(fn: any) { this.onChangeCallback = fn; }

  // ControlValueAccessorの実装メソッド
  registerOnTouched(fn: any) { this.onTouchedCallback = fn; }

  // ControlValueAccessorの実装メソッド
  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }
}
