import { Component, OnInit, Input, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { BlackListData } from '../shared/type/type';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollService } from '../shared/service/scroll/scroll.service';
import { DialogService } from '../shared/service/dialog/dialog.service';

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

  constructor(
    public fb: FormBuilder,
    public element: ElementRef,
    // public renderer: Renderer2,
    public scrollService: ScrollService,
    public dialogService: DialogService
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

  ngOnChanges() {
    this.detailForm.controls['company-name'].setValue(this.data.company_name);
    this.detailForm.controls['phone-number'].setValue(this.data.phone_number);
    this.detailForm.controls['contact-name'].setValue(this.data.contact_name);
    this.detailForm.controls['industry-name'].setValue(this.data.industry_name);
    this.detailForm.controls['remarks'].setValue(this.data.remarks);
    const target = this.element.nativeElement;
    this.scrollService.scrollToTarget('app-detail');
  }

  onCancel() {
    this.cancel.emit();
  }

  async onSubmit() {
    // 確認ダイアログ起動
    const result = await this.dialogService.confirm('確認', ['更新しますか?']);
    // いいえの場合は何もしない
    if (!result) { return; }
    // 登録API起動
    // 完了ダイアログ起動
    await this.dialogService.complete('完了', ['更新が完了しました。']);
  }
}
