import { Component, OnInit, ViewEncapsulation, Inject, PLATFORM_ID, Injector } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('state', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        animate(300, keyframes([
          style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      // 動かないっぽい(https://github.com/angular/angular/issues/15798)
      transition(':leave', [
        animate(300, keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateY(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {
  /** タイトル */
  title = '';

  /** メッセージ */
  messages = [];

  /** OKボタン表示有無/ラベル */
  okey = { display: true, label: '' };

  /** キャンセルボタン表示有無/ラベル */
  cancel = { display: true, label: '' };

  /** モーダル */
  activeModal: any;

  /**
   * コンストラクタ
   * @param platformId プラットフォームID
   * @param injector インジェクタ
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private injector: Injector
  ) { }

  /** 初期処理 */
  ngOnInit() {
    // コンストラクタでDIするとサーバサイドでレンダリングする際に
    // Error: No component factory found for NgbModalBackdrop. Did you add it to @NgModule.entryComponents?
    // となる為、初期処理時に取得するように修正
    if (isPlatformBrowser(this.platformId)) { this.activeModal = this.injector.get(NgbActiveModal); }
  }

  /** OKボタンクリック */
  onClickOkey() { this.activeModal.close(true); }

  /** キャンセル */
  onClickCancel() { this.activeModal.close(false); }
}
