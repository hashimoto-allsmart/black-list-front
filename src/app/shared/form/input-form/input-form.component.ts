import { Component, OnInit, Self, Input, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss', '../form.scss']
})
export class InputFormComponent implements OnInit, ControlValueAccessor {

  /** input */
  @ViewChild('input') input: ElementRef;

  /** ラベル */
  @Input()
  label = '';

  /** プレースホルダー */
  @Input()
  placeholder = '';

  /** 非表示 */
  disabled: boolean;

  errorDisplay = false;

  /** 変更検知時の外部へ通知 */
  onChangeCallback = (value: any): void => { };

  /** フォーカスアウト時の外部への通知 */
  onTouchedCallback = (): void => { };

  /**
   * コンストラクタ
   * @param controlDir FormControlオブジェクト
   */
  constructor(@Self() public controlDir: NgControl) { controlDir.valueAccessor = this; }

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
    // エラーメッセージを表示
    this.errorDisplay = true;
    // コールバック起動
    this.onTouchedCallback();
  }

  /**
   * 値変更イベント
   * @param value 変更された値
   */
  onChange(value: any) {
    // エラーメッセージを非表示
    this.errorDisplay = false;
    // コールバック起動
    this.onChangeCallback(value);
  }

  // ControlValueAccessorの実装メソッド
  writeValue(obj: any) { this.input.nativeElement.value = obj; }

  // ControlValueAccessorの実装メソッド
  registerOnChange(fn: any) { this.onChangeCallback = fn; }

  // ControlValueAccessorの実装メソッド
  registerOnTouched(fn: any) { this.onTouchedCallback = fn; }

  // ControlValueAccessorの実装メソッド
  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }
}
