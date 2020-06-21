import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AppService } from './services/app/app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  locale: string;
  constructor(@Inject(AppService) private translateService: TranslateService) {}

  ngOnInit() {
    this.locale = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe(
      (langChangeEvent: LangChangeEvent) => {
        this.locale = langChangeEvent.lang;
      }
    );
  }
}
