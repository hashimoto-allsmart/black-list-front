import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlackListService } from '../service/black-list.service';
import { BlackListData, STRAGE_KEY } from '../type/type';
import { StrageService } from '../service/strage.service';
import { DetailComponent } from '../detail/detail.component';
import { ViewChild } from '@angular/core/src/metadata/di';
import { ScrollService } from '../service/scroll.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  /** フォーム */
  searchForm: FormGroup;
  /** ブラックリスト */
  blackList: BlackListData[];
  /** テーブル表示 */
  tableView = false;
  /** 詳細情報表示 */
  detailView = false;
  /** 詳細情報 */
  detailData: BlackListData;

  constructor(
    public fb: FormBuilder,
    public blackListService: BlackListService,
    public strageService: StrageService,
    public scrollService: ScrollService
  ) { }

  /**
   * 初期表示
   */
  ngOnInit() {
    // フォームグループの登録
    this.searchForm = this.fb.group({
      'keyword': ''
    });
    // セッションから復旧
    const strage = this.strageService.fetch(STRAGE_KEY.SEARCH);
    if (!strage) { return; }
    this.blackList = strage.data;
    this.tableView = true;
  }

  /**
   * 検索ボタン押下
   */
  async onSearch() {
    // ブラックリストの取得
    this.blackList = await this.blackListService.search();
    // セッションへ保存
    this.strageService.save(STRAGE_KEY.SEARCH, { data: this.blackList });
    // テーブルの表示
    this.tableView = true;
  }

  /**
   * 詳細ボタン押下
   * @param index テーブルインデックス
   */
  onDetail(index: number) {
    // 詳細情報コンポネントへのインプット情報設定
    this.detailData = this.blackList[index];
    // 詳細画面表示
    this.detailView = true;
  }

  /**
   * 削除ボタン押下
   * @param index テーブルインデックス
   */
  onDelite(index: number) {
  }

  /**
   * 編集キャンセルイベント
   */
  async onCancel() {
    await this.scrollService.scrollTop();
    this.detailView = false;
  }
}
