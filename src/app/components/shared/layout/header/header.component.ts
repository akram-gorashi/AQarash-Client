import { Component, OnInit } from '@angular/core';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { AppService } from 'src/app/services/app/app.service';
import { AppLanguage } from 'src/app/models/app/AppLanguage';
import AppUtils from 'src/app/helper/utils/AppUtils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  appLanguage: string;
  isAr: boolean;
  isChangingLang: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
     this.getCurrentAppLanguage();
  }

  private getCurrentAppLanguage(): void {
    // Get current language from local storage
    this.appLanguage = localStorage.getItem(LocallyStoredItemsKeys.AppLanguage);
    // Get it from the observable if doesn't exist on local storage
    if (!this.appLanguage) {
      this.appLanguage = this.appService.getAppLang().value;
    }
    // Set the header lang link
    this.isAr = this.appLanguage === 'ar' ? true : false;
    // Watch for language changes
    this.appService.getAppLang().subscribe((lang) => (this.appLanguage = lang));
  }

  async switchLang() {
    // Show loader
    this.isChangingLang = !this.isChangingLang;
    // Delay until animation ends, also switch document direction
     await AppUtils.delay(2800);
    // Switch the language
    if (!this.appLanguage || this.appLanguage === AppLanguage.ENGLISH) {
      this.appService.setLanguage(AppLanguage.ARABIC);
      this.isAr = true;
      this.isChangingLang = !this.isChangingLang;
    } else {
      this.appService.setLanguage(AppLanguage.ENGLISH);
      this.isAr = false;
      this.isChangingLang = !this.isChangingLang;
    }
  }
}
