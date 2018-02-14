// ********** ブラックリスト ********** //
/** ブラックリストデータ */
export interface BlackListData {
  company_name: string;   // 企業名
  phone_number: string;   // 電話番号
  contact_name: string;   // 担当者名
  industry_name: string;  // 業種名
  remarks: string;        // 備考
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
