import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlackListService } from '../shared/service/api/black-list.service';
import { BlackListData, STRAGE_KEY } from '../shared/type/type';
import { StrageService } from '../shared/service/strage/strage.service';
import { DetailComponent } from '../detail/detail.component';
import { ViewChild } from '@angular/core/src/metadata/di';
import { ScrollService } from '../shared/service/scroll/scroll.service';
import { DialogService } from '../shared/service/dialog/dialog.service';

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
  /** ページ */
  page = 1;
  /** リスト件数 */
  collectionSize = 0;

  constructor(
    public fb: FormBuilder,
    public blackListService: BlackListService,
    public strageService: StrageService,
    public scrollService: ScrollService,
    public dialogService: DialogService
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
    this.collectionSize = this.blackList.length;
  }

  /**
   * 検索ボタン押下
   */
  async onSearch() {
    // ブラックリストの取得
    this.blackList = await this.blackListService.search();
    // リスト数の更新
    this.collectionSize = this.blackList.length;
    // ページ表示位置を初期化
    this.page = 1;
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
  async onDelite(index: number) {
    // 削除確認ダイアログを表示
    const result = await this.dialogService.alart('確認', ['削除しますか?']);
    // いいえの場合は何もしない
    if (!result) { return; }
    // 完了ダイアログ起動
    await this.dialogService.complete('完了', ['削除が完了しました。']);
  }

  /**
   * 編集キャンセルイベント
   */
  async onCancel() {
    // 一番上までスクロール
    await this.scrollService.scrollTop();
    // 詳細画面を非表示
    this.detailView = false;
  }
}
