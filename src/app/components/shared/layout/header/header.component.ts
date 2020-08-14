import { Component, OnInit, HostListener } from '@angular/core';
import { LocallyStoredItemsKeys } from 'src/app/models/app/LocallyStoredItemsKeys';
import { AppService } from 'src/app/services/app/app.service';
import { AppLanguage } from 'src/app/models/app/AppLanguage';
import AppUtils from 'src/app/helper/utils/AppUtils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SearchVehicleComponent } from 'src/app/components/vehicle/search-vehicle/search-vehicle.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  toggleNavbar = true;
  appLanguage: string;
  isAr: boolean;
  isChangingLang: any;
  bsModalRef: BsModalRef;
  isOnMidScreen: boolean;
  isCollapsed = false;
  hasScrolledBanner: boolean = false;
  isNavbarCollapsed: boolean = false;
  constructor(
    private appService: AppService,
    private modalService: BsModalService
  ) {}

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

  openModalWithComponent() {
    this.bsModalRef = this.modalService.show(SearchVehicleComponent, {
      class: 'modal-dialog-centered',
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  // Listen for window size changes
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?): void {
    // If browser window is resized below mid screen size width
    window.innerWidth <= 500
      ? (this.isOnMidScreen = true)
      : (this.isOnMidScreen = false);
  }

  // Window scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (window.pageYOffset > 200) this.hasScrolledBanner = true;
    else this.hasScrolledBanner = false;
  }
}
