import { Component, OnInit, Input, Renderer2, ElementRef, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import { TdItem, ThItem, CellAttribute, IconItem, TableClickEvent } from '../type/type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewChecked {
  /** テーブルヘッダ要素 */
  @Input() thItems: ThItem[];

  /** テーブルデータ要素 */
  @Input() tdItems: TdItem[];

  /** 行データ */
  @Input() rows: any[];

  /** ボタンクリックイベント */
  @Output() buttonClick: EventEmitter<TableClickEvent> = new EventEmitter();

  /**
   * コンストラクタ
   * @param renderer レンダリングサービス
   * @param el 自コンポネントの要素
   */
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  /** 初期処理 */
  ngOnInit() {
  }

  /** HTMLテンプレート作成後処理 */
  ngAfterViewChecked() {
    // ボディのセル属性設定
    this.setBodyCellAttribute();
  }

  /** ボディのセル属性設定 */
  setBodyCellAttribute() {
    // ボディ取得
    const body = this.el.nativeElement.getElementsByTagName('tbody');
    // 生成されていない場合は処理終了
    if (body.length === 0) { return; }
    // 行数分ループ
    for (const tr of body[0].getElementsByTagName('tr')) {
      // 列タグを取得
      const td = tr.getElementsByTagName('td');
      // 列数分ループ
      for (let i = 0; i < td.length; i++) {
        // アイコン指定じゃない場合は次へ
        if (!this.tdItems[i].icon) { continue; }
        // 属性指定がない場合は次へ
        if (!this.tdItems[i].icon.buttonAttribute) { continue; }
        // 属性取得
        const attr = this.tdItems[i].icon.buttonAttribute;
        // セル属性設定
        this.renderer.addClass(td[i].getElementsByTagName('button')[0], attr.class);
      }
    }
  }

  /**
   * クリックイベント受信
   * @param rowIndex 行インデックス
   * @param colIndex 列インデックス
   * @param row 行データ
   */
  onClick(rowIndex: number, colIndex: number, row: any) {
    // イベント通知
    this.buttonClick.emit({ item: this.thItems[colIndex], row: row });
  }

  /**
   * Jsonデータ取得
   * @param path 取得するJsonデータまでのパス(カンマ区切り)
   * @param row 行データ
   */
  getJsonData(path: string, row: any) {
    // 返却値を設定
    let value = row;
    // カンマ区切りでパスを分割
    const paths = path.split('.');
    // 分割数分ループ
    for (const p of paths) {
      // 値がオブジェクト以外の場合は空文字を設定してループ終了
      if (!(value instanceof Object)) { value = ''; break; }
      // 値を取り出し
      value = value[p];
    }
    // 結果を返却
    return value;
  }
}
