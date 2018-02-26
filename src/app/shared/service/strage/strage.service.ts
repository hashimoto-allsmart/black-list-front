import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { STRAGE_KEY, StrageData, } from '../../type/type';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class StrageService {

  /**
   * コンストラクタ
   * @param platformId プラットフォームID
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  /**
   * 取り出し
   * @param key データ
   */
  fetch(key: string): StrageData {
    // SSR対策
    if (!isPlatformBrowser(this.platformId)) { return undefined; }
    return JSON.parse(sessionStorage.getItem(key)) || undefined;
  }

  /**
   * 保存
   * @param key データ
   * @param data データ
   */
  save(key: string, data: StrageData) {
    // SSR対策
    if (!isPlatformBrowser(this.platformId)) { return undefined; }
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}
