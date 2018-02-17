import { Injectable } from '@angular/core';
import { STRAGE_KEY, StrageData, } from '../../type/type';

@Injectable()
export class StrageService {

  constructor() { }

  /**
   * 取り出し
   * @param key データ
   */
  fetch(key: string): StrageData {
    return JSON.parse(sessionStorage.getItem(key)) || undefined;
  }

  /**
   * 保存
   * @param key データ
   * @param data データ
   */
  save(key: string, data: StrageData) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}
