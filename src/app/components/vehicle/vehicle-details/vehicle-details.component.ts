import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';
import { environment } from 'src/environments/environment';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
  providers: [
   { provide: CarouselConfig, useValue: { interval: 4000, noPause: false, showIndicators: true } }
 ]
})
export class VehicleDetailsComponent implements OnInit {
  assetsUrl: string = environment.assetsUrl;
  vehicle: Vehicle = <Vehicle>{};
  activeImage: number = 1;
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
    this.vehicleService.getVehicle(id).subscribe((vehicle: Vehicle) => {
      this.vehicle = vehicle;
      console.log(this.vehicle);
    });
  }

  
}
