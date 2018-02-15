import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class ScrollService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private scrollService: ScrollToService
  ) { }

  /** 
   * ページ切り替え時に自動スクロール
   */
  async initScrollTop() {
    if (!isPlatformBrowser(this.platformId)) { return; }
    await this.router.events.toPromise();
    this.scrollService.scrollTo({ offset: 0 });
  }

  /**
   * スクロール(オフセット指定)
   * @param offset オフセット
   */
  scrollToOffset(offset: number) {
    if (!isPlatformBrowser(this.platformId)) { return; }
    this.scrollService.scrollTo({ offset: offset });
  }

  /**
   * スクロール(ID指定)
   * @param target ターゲットID
   */
  scrollToTarget(target: string) {
    if (!isPlatformBrowser(this.platformId)) { return; }
    this.scrollService.scrollTo({ target: target });
  }
}
