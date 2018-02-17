import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss', '../form.scss']
})
export class TextAreaComponent implements OnInit, ControlValueAccessor {

  /** textarea */
  @ViewChild('textarea') textarea: ElementRef;

  /** ラベル */
  @Input()
  label = '';

  /** プレースホルダー */
  @Input()
  placeholder = '';

  /** 非表示 */
  disabled: boolean;

  /** 変更検知 */
  onChange = (value: any): void => { };

  /** フォーカスアウト検知 */
  onTouched = (value: any): void => { };

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

  // ControlValueAccessorの実装メソッド
  writeValue(obj: any) { this.textarea.nativeElement.value = obj; }

  // ControlValueAccessorの実装メソッド
  registerOnChange(fn: any) { this.onChange = fn; }

  // ControlValueAccessorの実装メソッド
  registerOnTouched(fn: any) { this.onTouched = fn; }

  // ControlValueAccessorの実装メソッド
  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }
}
