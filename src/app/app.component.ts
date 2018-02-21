import { Component, Input } from '@angular/core';
import { tick } from '@angular/core/testing';
import { NavBarData } from './shared/type/type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // ナビゲーションバー情報
  navData = {
    brand: { label: 'ブラックリスト', link: 'search' },
    items: [
      { label: '検索', link: 'search' },
      { label: '登録', link: 'register' }
    ]
  } as NavBarData;
}
