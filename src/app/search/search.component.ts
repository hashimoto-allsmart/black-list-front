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
  /** 検索条件 */
  keyWord = '';
  /** 表示するリスト */
  rows = [] as BlackListData[];
  /** ブラックリスト */
  blackList = [] as BlackListData[];
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
    { path: 'industry' },
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
    this.searchForm = this.fb.group({ 'keyword': '' });
    // セッションから復旧
    const strage = this.strageService.fetch(STRAGE_KEY.SEARCH);
    // セッションにデータがない場合は処理終了
    if (!strage) { return; }
    // 検索条件を取得
    const keyWord = strage.data;
    // フォームに再設定
    this.searchForm.controls['keyword'].setValue(keyWord);
    // 検索
    this.onSearch();
  }

  /** 検索ボタン押下 */
  async onSearch(page?: number) {
    // 検索ボックスからキーワードを取得
    const keyWord = this.searchForm.controls['keyword'].value;
    // ブラックリストの取得
    this.blackList = await this.blackListService.search(keyWord);
    // リスト数の更新
    this.collectionSize = this.blackList.length;
    // ページ表示位置を初期化
    this.page = page ? page : 1;
    // 表示用に切り出し
    this.rows = this.getRows(this.page);
    // セッションへ保存
    this.strageService.save(STRAGE_KEY.SEARCH, { data: keyWord });
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
  async onDelite(row: BlackListData) {
    // 削除確認ダイアログを表示
    const result = await this.dialogService.alart('確認', ['削除しますか?']);
    // いいえの場合は何もしない
    if (!result) { return; }
    // 削除API起動
    const ret = await this.blackListService.delete(row.id);
    // エラーの場合はエラーダイアログ表示
    if (!ret) { await this.dialogService.error('削除異常', ['ブラックリストの削除に失敗しました。']); return; }
    // 完了ダイアログ起動
    await this.dialogService.complete('完了', ['削除が完了しました。']);
    // 再検索
    this.onSearch();
  }

  /** 編集キャンセルイベント */
  async onCancel() {
    // 一番上までスクロール
    await this.scrollService.scrollTop();
    // 詳細画面を非表示
    this.detailView = false;
  }

  /** 編集完了通知 */
  async onComplete() {
    // 一番上までスクロール
    await this.scrollService.scrollTop();
    // 詳細画面を非表示
    this.detailView = false;
    // 再検索
    this.onSearch(this.page);
  }

  /**
   * リスト取得
   * @param page ページ
   */
  getRows(page: number) { return this.blackList.slice(((page - 1) * 10), ((page) * 10)); }

  /**
   * ページャー操作
   * @param page 変更後のページ 
   */
  async onPager(page: number) {
    // 一番上までスクロール
    await this.scrollService.scrollTop();
    // 詳細画面を非表示
    this.detailView = false;
    // 表示するリストを変更
    this.rows = this.getRows(page);
  }
}
