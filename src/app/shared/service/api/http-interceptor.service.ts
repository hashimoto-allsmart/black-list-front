import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  /** コンストラクタ */
  constructor() { }

  /**
   * httpリクエストインタセプタ
   * @param request リクエスト
   * @param next ハンドラ
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'dataType': 'json'
      }
    });
    return next.handle(req);
  }
}
