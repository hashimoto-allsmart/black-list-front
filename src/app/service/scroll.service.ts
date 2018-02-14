import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ScrollService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  async initScrollTop() {
    if (!isPlatformBrowser(this.platformId)) { return; }
    await this.router.events.toPromise();
    window.scroll(0, 0);
  }

  scrollTo(x: number, y: number) {
    if (!isPlatformBrowser(this.platformId)) { return; }
    window.scroll(x, y);
  }
}
