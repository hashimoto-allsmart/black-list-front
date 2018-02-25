// ********** ブラックリスト ********** //
/** ブラックリストデータ */
export interface BlackListData {
  id?: string;             // ID
  company_name?: string;   // 企業名
  phone_number?: string;   // 電話番号
  contact_name?: string;   // 担当者名
  industry?: string;       // 業種名
  remarks?: string;        // 備考
}

// ********** ストレージ ********** //
/** ストレージキー */
export const STRAGE_KEY = {
  SEARCH: 'search'
};
/** ストレージデータ */
export interface StrageData {
  data: any;
}

// ********** ナビゲーションバー ********** //
/** ナビゲーションアイテム */
export interface NavItem {
  label: string;  // ラベル
  link: string;   // リンク
}
/** ナビゲーションバーデータ */
export interface NavBarData {
  brand: NavItem;   // ブランド名
  items: NavItem[]; // ナビゲーションアイテム
}

// ********** テーブル ********** //
/** セルの条件 */
export interface CellAttribute {
  class?: string; // classに指定する文字列
  id?: string;    // idに指定する文字列
}
/** アイコン要素 */
export interface IconItem {
  title: string;                    // タイトル(Iconic)
  buttonAttribute?: CellAttribute;  // ボタンのクラス(bootstrap4)
}
/** テーブルヘッダ要素 */
export interface ThItem {
  label?: string;  // ヘッダラベル
  icon?: IconItem; // アイコン情報(表示内容がアイコンの場合に指定)
}
/** テーブルデータ要素 */
export interface TdItem {
  path?: string;    // データのJsonパス(表示内容が文字列の場合に指定)
  icon?: IconItem;  // アイコン情報(表示内容がアイコンの場合に指定)
}
/** テーブルクリックイベント */
export interface TableClickEvent {
  item: ThItem; // ヘッダ要素
  row: any;     // 行データ
}
