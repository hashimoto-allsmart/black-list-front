import { Component, Input } from '@angular/core';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** ナビバーの折りたたみ状態 */
  isNavbarCollapsed = true;
}
