import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';

// ngxModules //
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// ngxModules //
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { HeaderComponent } from './components/shared/layout/header/header.component';
import { AppComponent } from './app.component';

import * as arContent from '../assets/i18n/ar.json';
import * as enContent from '../assets/i18n/en.json';

import { VehicleListComponent } from './components/vehicle/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/vehicle/vehicle-details/vehicle-details.component';
import { SearchVehicleComponent } from './components/vehicle/search-vehicle/search-vehicle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  declarations: [AppComponent, HeaderComponent, VehicleListComponent, VehicleDetailsComponent, SearchVehicleComponent],
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
    CarouselModule,
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {
  
}
