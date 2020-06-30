import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
  NgbCarouselConfig,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  direction = 'RIGHT';

  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {}
}
