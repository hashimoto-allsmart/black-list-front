import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './title/title.component';
import { BlackListService } from './service/black-list.service';
import { StrageService } from './service/strage.service';
import { DetailComponent } from './detail/detail.component';
import { ScrollService } from './service/scroll.service';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

const appRoutes: Routes = [
  { path: 'home', component: SearchComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    SearchComponent,
    TitleComponent,
    DetailComponent
  ],
  imports: [
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    ReactiveFormsModule,
    HttpClientModule,
    ScrollToModule.forRoot(),
    BrowserModule
  ],
  providers: [
    RegisterComponent,
    TitleComponent,
    DetailComponent,
    BlackListService,
    StrageService,
    ScrollService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
