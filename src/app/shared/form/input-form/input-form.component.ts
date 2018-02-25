import { Component, OnInit, Self, Input, ViewChild, ElementRef, Renderer2, OnChanges, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss', '../form.scss']
})
export class InputFormComponent implements OnInit, OnChanges, ControlValueAccessor {

  /** input */
  @ViewChild('input') input: ElementRef;

  /** form-error */
  @ViewChild(FormErrorComponent) formError: FormErrorComponent;

  /** ラベル */
  @Input()
  label = '';

  /** プレースホルダー */
  @Input()
  placeholder = '';

  /** フォーム入力以外でエラーを表示するか */
  @Input()
  errorDisplay = false;

  /** 非表示 */
  disabled: boolean;

  /** 変更検知時の外部へ通知 */
  onChangeCallback = (value: any): void => { };

  /** フォーカスアウト時の外部への通知 */
  onTouchedCallback = (): void => { };

  /**
   * コンストラクタ
   * @param controlDir FormControlオブジェクト
   * @param renderer レンダリングサービス
   * @param el 自コンポネントの要素
   */
  constructor(
    // https://stackoverflow.com/questions/47886424/error-in-no-provider-for-ngcontrol-angular-aot?rq=1
    @Optional() @Self() public controlDir: NgControl,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // 自身を登録
    controlDir.valueAccessor = this;
  }

  /** 変更検知 */
  ngOnChanges() {
    if (this.errorDisplay) { this.formError.errorDisplay(); return; }
    this.formError.errorHide();
  }

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
  writeValue(obj: any) { this.input.nativeElement.value = obj; }

  // ControlValueAccessorの実装メソッド
  registerOnChange(fn: any) { this.onChangeCallback = fn; }

  // ControlValueAccessorの実装メソッド
  registerOnTouched(fn: any) { this.onTouchedCallback = fn; }

  // ControlValueAccessorの実装メソッド
  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }
}
