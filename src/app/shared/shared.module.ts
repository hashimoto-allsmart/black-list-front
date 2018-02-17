import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { HttpClientModule } from '@angular/common/http';

import { InputFormComponent } from './form/input-form/input-form.component';
import { TitleComponent } from './title/title.component';
import { TextAreaComponent } from './form/text-area/text-area.component';
import { BlackListService } from './service/api/black-list.service';
import { ScrollService } from './service/scroll/scroll.service';
import { StrageService } from './service/strage/strage.service';
import { FormErrorComponent } from './form/form-error/form-error.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './service/dialog/dialog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    HttpClientModule,
  ],
  declarations: [
    InputFormComponent,
    TitleComponent,
    TextAreaComponent,
    FormErrorComponent,
    DialogComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputFormComponent,
    TitleComponent,
    TextAreaComponent,
  ],
  providers: [
    BlackListService,
    ScrollService,
    StrageService,
    DialogService
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class SharedModule { }
