import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BlackListService } from '../shared/service/api/black-list.service';
import { BlackListData, STRAGE_KEY, ThItem, TdItem, TableClickEvent } from '../shared/type/type';
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
  /** テーブルヘッダ */
  thItems = [
    { label: '詳細' },
    { label: '企業名' },
    { label: '電話番号' },
    { label: '担当者名' },
    { label: '業種名' },
    { label: '削除' }
  ] as ThItem[];
  /** テーブルデータ */
  tdItems = [
    { icon: { title: 'spreadsheet', buttonAttribute: { class: 'btn-info' } } },
    { path: 'company_name' },
    { path: 'phone_number' },
    { path: 'contact_name' },
    { path: 'industry_name' },
    { icon: { title: 'trash', buttonAttribute: { class: 'btn-danger' } } }
  ] as TdItem[];

  /**
   * コンストラクタ
   * @param fb フォームビルダー
   * @param blackListService ブラックリストサービス
   * @param strageService ストレージサービス
   * @param scrollService スクロールサービス
   * @param dialogService ダイアログサービス
   */
  constructor(
    public fb: FormBuilder,
    public blackListService: BlackListService,
    public strageService: StrageService,
    public scrollService: ScrollService,
    public dialogService: DialogService
  ) { }

  /** 初期表示 */
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

  /** 検索ボタン押下 */
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
   * テーブルボタンクリックイベント受信
   * @param event テーブルボタンクリックイベント
   */
  onClick(event: TableClickEvent) {
    if (event.item.label === '詳細') { this.onDetail(event.row); return; }
    if (event.item.label === '削除') { this.onDelite(event.row); return; }
  }

  /**
   * 詳細ボタン押下
   * @param row 行データ
   */
  onDetail(row: any) {
    // 詳細情報コンポネントへのインプット情報設定
    this.detailData = row;
    // 詳細画面表示
    this.detailView = true;
  }

  /**
   * 削除ボタン押下
   * @param row 行データ
   */
  async onDelite(row: any) {
    // 削除確認ダイアログを表示
    const result = await this.dialogService.alart('確認', ['削除しますか?']);
    // いいえの場合は何もしない
    if (!result) { return; }
    // 完了ダイアログ起動
    await this.dialogService.complete('完了', ['削除が完了しました。']);
  }

  /** 編集キャンセルイベント */
  async onCancel() {
    // 一番上までスクロール
    await this.scrollService.scrollTop();
    // 詳細画面を非表示
    this.detailView = false;
  }
}
