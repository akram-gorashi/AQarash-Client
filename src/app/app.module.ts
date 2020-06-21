import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { HeaderComponent } from './components/shared/layout/header/header.component';
import { AppComponent } from './app.component';

import * as arContent from '../assets/i18n/ar.json';
import * as enContent from '../assets/i18n/en.json';

const TRANSLATIONS = { ar: arContent, en: enContent };
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export class TranslateUniversalLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(TRANSLATIONS[lang].default);
  }
}

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        // useClass: TranslateUniversalLoader, // Used in production to enable translation
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {
  
}
