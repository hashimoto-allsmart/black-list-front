import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlackListData } from '../type/type';

@Injectable()
export class BlackListService {

  /** URL */
  url = 'assets/black-list.json';

  constructor(private http: HttpClient) { }

  async search() {
    const response = await this.http.get<BlackListData[]>(this.url);
    return await response.toPromise();
  }
}
