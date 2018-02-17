import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  /** タイトル */
  @Input()
  title = '';

  /** コンストラクタ */
  constructor() { }

  /** 初期処理 */
  ngOnInit() { }
}
