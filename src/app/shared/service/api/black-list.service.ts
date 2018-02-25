import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BlackListData } from '../../type/type';
import { HttpParamsOptions } from '@angular/common/http/src/params';

@Injectable()
export class BlackListService {

  /** URL(Navigation) */
  url = 'http://localhost:8082/api/blackList';

  /**
   * コンストラクタ
   * @param http HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * 検索
   * @param keyWord 検索ワード
   */
  async search(keyWord: string) {
    const params = new HttpParams().set('key_word', keyWord);
    const response = await this.http.get<BlackListData[]>(this.url, { params: params });
    try { return await response.toPromise(); } catch (error) { console.log(error); return []; }
  }

  /**
   * 登録
   * @param body 登録データ
   */
  async register(body: BlackListData) {
    const response = await this.http.post<any>(this.url, body);
    try { await response.toPromise(); return true; } catch (error) { console.log(error); return false; }
  }

  /**
   * 更新
   * @param body 更新データ
   */
  async update(body: BlackListData) {
    const response = await this.http.put<any>(this.url, body);
    try { await response.toPromise(); return true; } catch (error) { console.log(error); return false; }
  }

  /**
   * 削除
   * @param id ID
   */
  async delete(id: string) {
    const params = new HttpParams().set('id', id);
    const response = await this.http.delete<any>(this.url, { params: params });
    try { await response.toPromise(); return true; } catch (error) { console.log(error); return false; }
  }
}
