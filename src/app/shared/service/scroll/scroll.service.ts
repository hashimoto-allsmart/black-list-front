import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class ScrollService {

  /**
   * コンストラクタ
   * @param platformId プラットフォームID
   * @param router ルーター
   * @param scrollService スクロールサービス
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private scrollService: ScrollToService
  ) { }

  /**
   * ページ切り替え時に自動スクロール
   */
  async initScrollTop() {
    await this.router.events.toPromise();
    await this.scrollTop();
  }

  /**
   * 一番上へスクロール
   */
  async scrollTop() {
    // SSR対策
    if (!isPlatformBrowser(this.platformId)) { return; }
    await this.scrollService.scrollTo({ container: document.body } as ScrollToConfigOptions).toPromise();
  }

  /**
   * スクロール(タグID指定)
   * @param target ターゲットID
   */
  async scrollToTarget(target: string) {
    // SSR対策
    if (!isPlatformBrowser(this.platformId)) { return; }
    await this.scrollService.scrollTo({ target: target }).toPromise();
  }
}
