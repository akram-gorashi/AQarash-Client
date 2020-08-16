import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';
import { environment } from 'src/environments/environment';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import {
  NgxImageGalleryComponent,
  GALLERY_IMAGE,
  GALLERY_CONF,
} from 'ngx-image-gallery';
@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 4000, noPause: false, showIndicators: true },
    },
  ],
})
export class VehicleDetailsComponent implements OnInit {
  assetsUrl: string = environment.assetsUrl;
  vehicle: Vehicle = <Vehicle>{};
  activeImage: number = 1;

  // get reference to gallery component
  @ViewChild(NgxImageGalleryComponent)
  ngxImageGallery: NgxImageGalleryComponent;

  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };

  // gallery images
  images: GALLERY_IMAGE[] = [];
  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehiclesService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getVehicleInfo();
  }

  getVehicleInfo() {
    const id = this.route.snapshot.params['id'];
    this.vehicleService.getVehicle(id).subscribe(
      (vehicle: Vehicle) => {
        this.vehicle = vehicle;
      },
      (error) => console.log(error),
      () =>
        this.vehicle.imageUrl.forEach((imageUrl) => {
          this.images.push({
            url: imageUrl,
            altText: '',
            extUrl: '',
            thumbnailUrl: '',
          });
        })
    );
  }

  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }

  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }

  /**************************************************/

  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }
}
