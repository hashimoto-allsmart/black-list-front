import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRouterModule } from '../app-routing.module';
import { InputFormComponent } from './form/input-form/input-form.component';
import { TitleComponent } from './title/title.component';
import { TextAreaComponent } from './form/text-area/text-area.component';
import { FormErrorComponent } from './form/form-error/form-error.component';
import { DialogComponent } from './dialog/dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BlackListService } from './service/api/black-list.service';
import { ScrollService } from './service/scroll/scroll.service';
import { StrageService } from './service/strage/strage.service';
import { DialogService } from './service/dialog/dialog.service';
import { TableComponent } from './table/table.component';
import { HttpInterceptorService } from './service/api/http-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AppRouterModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    InputFormComponent,
    TitleComponent,
    TextAreaComponent,
    FormErrorComponent,
    DialogComponent,
    NavBarComponent,
    TableComponent,
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouterModule,
    NavBarComponent,
    InputFormComponent,
    TitleComponent,
    TextAreaComponent,
    TableComponent
  ],
  providers: [
    BlackListService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    ScrollService,
    StrageService,
    DialogService
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class SharedModule { }
