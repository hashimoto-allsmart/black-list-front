import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
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
}
