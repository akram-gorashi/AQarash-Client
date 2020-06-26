import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle;
  page: number = 1;
  constructor(private vehicleService: VehiclesService) {}

  ngOnInit(): void {
    this.getVehicleList();
  }

  getVehicleList() {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
      console.log(this.vehicles);
    });
  }
}
