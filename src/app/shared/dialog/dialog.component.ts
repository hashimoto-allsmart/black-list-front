import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('visible', [
      state('in', style({ transform: 'translateY(0)' })),
      transition(':enter', [
        animate(400, keyframes([
          style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
          // style({ opacity: 1, transform: 'translateY(10px)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      // 動かないっぽい(https://github.com/angular/angular/issues/15798)
      transition(':leave', [
        animate(400, keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
          // style({ opacity: 1, transform: 'translateY(-15px)', offset: 0.7 }),
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

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onClickOkey() {
    this.activeModal.close(true);
  }

  onClickCancel() {
    this.activeModal.close(false);
  }
}
