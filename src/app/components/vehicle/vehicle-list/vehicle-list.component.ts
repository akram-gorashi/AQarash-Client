import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';
import { environment } from 'src/environments/environment';
import { NavigationExtras, Router } from '@angular/router';
import { PaginationResponse } from 'src/app/models/app/Vehicle/PaginationResponse';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  page: number = 1;
  assetsUrl: string = environment.assetsUrl;
  paginationInfo: PaginationResponse = <PaginationResponse>{};
  isLoading: boolean = false;
  constructor(
    private vehicleService: VehiclesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getVehicleList();
  }

  getVehicleList(pageQuery?) {
    this.isLoading = true;
    this.vehicleService.requestGetVehicles(pageQuery)
      this.isLoading = false;
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
      this.paginationInfo = this.vehicleService.pagination.value;
      console.log(this.vehicles);
    });
  }

  pageChanged(e: any) {
      let pageQuery = {pageNumber: e.page, pageSize: e.itemsPerPage}
      console.log(pageQuery)
      this.vehicleService.requestGetVehicles(pageQuery)

  }
}
