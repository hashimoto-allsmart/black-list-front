import { Component, OnInit, Input, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { BlackListData } from '../shared/type/type';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollService } from '../shared/service/scroll/scroll.service';
import { DialogService } from '../shared/service/dialog/dialog.service';
import { BlackListService } from '../shared/service/api/black-list.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnChanges {
  /** 詳細情報 */
  @Input()
  data: BlackListData;
  /** フォーム */
  detailForm: FormGroup;
  /** 編集取消イベント */
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  /** 編集完了イベント */
  @Output() complete: EventEmitter<any> = new EventEmitter();
  /** フォーム入力以外でエラーを表示するか */
  errorDisplay = false;

  /**
   * コンストラクタ
   * @param fb フォームビルダ
   * @param element 要素
   * @param scrollService スクロールサービス
   * @param dialogService ダイアログサービス
   * @param blackListService ブラックリストサービス
   */
  constructor(
    public fb: FormBuilder,
    public element: ElementRef,
    // public renderer: Renderer2,
    public scrollService: ScrollService,
    public dialogService: DialogService,
    public blackListService: BlackListService
  ) {
    // フォームグループの登録
    this.detailForm = this.fb.group({
      'company-name': ['', [Validators.required]],
      'phone-number': ['', [Validators.required]],
      'contact-name': '',
      'industry-name': '',
      'remarks': ''
    });
  }

  /** 変更検知　*/
  ngOnChanges() {
    this.detailForm.controls['company-name'].setValue(this.data.company_name);
    this.detailForm.controls['phone-number'].setValue(this.data.phone_number);
    this.detailForm.controls['contact-name'].setValue(this.data.contact_name);
    this.detailForm.controls['industry-name'].setValue(this.data.industry);
    this.detailForm.controls['remarks'].setValue(this.data.remarks);
    const target = this.element.nativeElement;
    this.scrollService.scrollToTarget('app-detail');
  }

  /** 取消 */
  onCancel() { this.cancel.emit(); }

  /** 更新 */
  async onSubmit() {
    // エラー表示フラグを初期化
    this.errorDisplay = false;
    /** エラーがある場合はエラーメッセージを設定 */
    if (!this.detailForm.valid) { this.errorDisplay = true; return; }
    // 確認ダイアログ起動
    const result = await this.dialogService.confirm('確認', ['更新しますか?']);
    // いいえの場合は何もしない
    if (!result) { return; }
    // 登録データ(必須)の生成
    const body = {
      id: this.data.id,
      company_name: this.detailForm.controls['company-name'].value,
      phone_number: this.detailForm.controls['phone-number'].value
    } as BlackListData;
    // 登録データ(オプション)の生成
    if (this.detailForm.controls['contact-name'].value) { body.contact_name = this.detailForm.controls['contact-name'].value; }
    if (this.detailForm.controls['industry-name'].value) { body.industry = this.detailForm.controls['industry-name'].value; }
    if (this.detailForm.controls['remarks'].value) { body.remarks = this.detailForm.controls['remarks'].value; }
    // 更新API起動
    const ret = await this.blackListService.update(body);
    // エラーの場合はエラーダイアログ表示
    if (!ret) { await this.dialogService.error('更新異常', ['ブラックリストの更新に失敗しました。']); return; }
    // 完了ダイアログ起動
    await this.dialogService.complete('完了', ['更新が完了しました。']);
    // 更新完了イベント通知
    this.complete.emit();
  }
}
