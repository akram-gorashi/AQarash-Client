import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';
import { environment } from 'src/environments/environment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  page: number = 1;
  assetsUrl: string = environment.assetsUrl;
  constructor(private vehicleService: VehiclesService, private router: Router) {}

  ngOnInit(): void {
    this.getVehicleList();
  }

  getVehicleList() {
    this.vehicleService.requestGetVehicles();
   this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
      console.log(this.vehicles);
    });
  }

  vehicleDetails(vehicleId) {
   let navigationExtras: NavigationExtras = {
      queryParams: { 'id': vehicleId },
    };
    console.log(vehicleId, navigationExtras)
    // Navigate to the vehicle-details page with extras
    this.router.navigate(['vehicle-details'], navigationExtras);
  }
}
