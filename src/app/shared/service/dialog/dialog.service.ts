import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../../dialog/dialog.component';

@Injectable()
export class DialogService {

  constructor(private modalService: NgbModal) { }

  /**
   * 確認ダイアログ
   * @param title タイトル
   * @param messages メッセージ
   */
  async confirm(title: string, messages: string[]) {
    // ダイアログのオプション
    const option = {} as NgbModalOptions;
    // タイトルの背景色を設定
    option.windowClass = 'info';
    // ダイアログオープン
    const modalRef = this.modalService.open(DialogComponent, option);
    // タイトルを設定
    modalRef.componentInstance.title = title;
    // メッセージを設定
    modalRef.componentInstance.messages = messages;
    // OKボタンのラベルを設定
    modalRef.componentInstance.okey.label = 'はい';
    // キャンセルボタンのラベルを設定
    modalRef.componentInstance.cancel.label = 'いいえ';
    // 結果を返却
    // ダイアログ範囲外のクリックイベントの受け方がわからないため、暫定的にtry-catchで対処
    try { return await modalRef.result; } catch (err) { return false; }
  }

  /**
   * 完了ダイアログ
   * @param title タイトル
   * @param messages メッセージ
   */
  async complete(title: string, messages: string[]) {
    // ダイアログのオプション
    const option = {} as NgbModalOptions;
    // タイトルの背景色を設定
    option.windowClass = 'info';
    // ダイアログオープン
    const modalRef = this.modalService.open(DialogComponent, option);
    // タイトルを設定
    modalRef.componentInstance.title = title;
    // メッセージを設定
    modalRef.componentInstance.messages = messages;
    // OKボタンのラベルを設定
    modalRef.componentInstance.okey.label = '閉じる';
    // キャンセルボタンを非表示
    modalRef.componentInstance.cancel.display = false;
    // 結果を返却
    // ダイアログ範囲外のクリックイベントの受け方がわからないため、暫定的にtry-catchで対処
    try { return await modalRef.result; } catch (err) { return false; }
  }

  /**
   * 警告ダイアログ
   * @param title タイトル
   * @param messages メッセージ
   */
  async alart(title: string, messages: string[]) {
    // ダイアログのオプション
    const option = {} as NgbModalOptions;
    // タイトルの背景色を設定
    option.windowClass = 'alart';
    // ダイアログオープン
    const modalRef = this.modalService.open(DialogComponent, option);
    // タイトルを設定
    modalRef.componentInstance.title = title;
    // メッセージを設定
    modalRef.componentInstance.messages = messages;
    // OKボタンのラベルを設定
    modalRef.componentInstance.okey.label = 'はい';
    // キャンセルボタンのラベルを設定
    modalRef.componentInstance.cancel.label = 'いいえ';
    // 結果を返却
    // ダイアログ範囲外のクリックイベントの受け方がわからないため、暫定的にtry-catchで対処
    try { return await modalRef.result; } catch (err) { return false; }
  }

  /**
   * エラーダイアログ
   * @param title タイトル
   * @param messages メッセージ
   */
  async error(title: string, messages: string[]) {
    // ダイアログのオプション
    const option = {} as NgbModalOptions;
    // タイトルの背景色を設定
    option.windowClass = 'alart';
    // ダイアログオープン
    const modalRef = this.modalService.open(DialogComponent, option);
    // タイトルを設定
    modalRef.componentInstance.title = title;
    // メッセージを設定
    modalRef.componentInstance.messages = messages;
    // OKボタンのラベルを設定
    modalRef.componentInstance.okey.label = 'OK';
    // キャンセルボタンを非表示
    modalRef.componentInstance.cancel.display = false;
    // 結果を返却
    // ダイアログ範囲外のクリックイベントの受け方がわからないため、暫定的にtry-catchで対処
    try { return await modalRef.result; } catch (err) { return false; }
  }
}
