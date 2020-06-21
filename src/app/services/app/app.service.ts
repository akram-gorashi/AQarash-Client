import { AppLanguage } from '../../models/app/AppLanguage';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocallyStoredItemsKeys } from '../../models/app/LocallyStoredItemsKeys';


@Injectable({
   providedIn: 'root'
})


export class AppService {

   appLanguage: BehaviorSubject<string> = new BehaviorSubject<string>(AppLanguage.ARABIC);


   constructor(public translate: TranslateService) {
      // Setup app languages
      translate.addLangs(['en', 'ar']);
      translate.setDefaultLang('ar');
      // Retreive current language from local storage
      const appLang = localStorage.getItem(LocallyStoredItemsKeys.AppLanguage);
      if (appLang) {
         this.setLanguage(appLang);
      } else {
         document.body.setAttribute('dir', 'rtl');
      }
   }


   setAppLang(language: AppLanguage | string) {
      this.appLanguage.next(language);
      // Store current language on local storage
      localStorage.setItem(LocallyStoredItemsKeys.AppLanguage, language);
   }


   getAppLang(): BehaviorSubject<string> {
      return this.appLanguage;
   }


   setLanguage(language: AppLanguage | string) {

      if (language === AppLanguage.ARABIC) {

         document.body.setAttribute('dir', 'rtl');
         this.translate.use('ar');
         const oldlink = document.getElementsByTagName('link').item(1);
         const newlink = document.createElement('link');
         document.title = ("موقع هناي - سيارات للبيع في السودان");
         newlink.setAttribute('rel', 'stylesheet');
         newlink.setAttribute('type', 'text/css');
         // newlink.setAttribute('integrity', 'sha384-vus3nQHTD+5mpDiZ4rkEPlnkcyTP+49BhJ4wJeJunw06ZAp+wzzeBPUXr42fi8If');
         newlink.setAttribute('crossorigin', 'anonymous');
         newlink.setAttribute('href', 'https://cdn.rtlcss.com/bootstrap/v4.2.1/css/bootstrap.min.css');
         document.getElementsByTagName('head').item(0).replaceChild(newlink, oldlink);
         this.setAppLang(AppLanguage.ARABIC);

      } else {

         document.body.setAttribute('dir', 'ltr');
         document.title = ("Car site - Cars for sale in sudan");
         this.translate.use('en');
         const oldlink = document.getElementsByTagName('link').item(1);
         const newlink = document.createElement('link');
         newlink.setAttribute('rel', 'stylesheet');
         newlink.setAttribute('type', 'text/css');
         // newlink.setAttribute('integrity', 'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T');
         newlink.setAttribute('crossorigin', 'anonymous');
         newlink.setAttribute('href', 'https://stackpath.bootstrapcdn.com/bootswatch/4.5.0/flatly/bootstrap.min.css');

         document.getElementsByTagName('head').item(0).replaceChild(newlink, oldlink);

         this.setAppLang(AppLanguage.ENGLISH);
      }

   }

}
