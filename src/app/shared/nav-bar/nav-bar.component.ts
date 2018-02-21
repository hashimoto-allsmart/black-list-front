import { Component, OnInit, Input } from '@angular/core';
import { NavBarData } from '../type/type';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  /** ナビゲーションバーデータ */
  @Input() data: NavBarData;

  /** ナビバーの折りたたみ状態 */
  isNavbarCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

  /** 折りたたみ状態変更 */
  changeNavbarCollapsed() { this.isNavbarCollapsed = !this.isNavbarCollapsed; }

  /** 折りたたみ */
  closeNavbar() { this.isNavbarCollapsed = true; }
}
