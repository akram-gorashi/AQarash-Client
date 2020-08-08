import { Component, OnInit, Input } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';
import { environment } from 'src/environments/environment';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { PaginationResponse } from 'src/app/models/app/Vehicle/PaginationResponse';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  @Input() vehicles: Vehicle[];
  assetsUrl: string = environment.assetsUrl;
  paginationInfo: PaginationResponse = <PaginationResponse>{};
  isLoading: boolean;
  constructor(
    private vehicleService: VehiclesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // load page based on 'page' query param or default to 1
    this.getCurrentPage();
    //TODO: fix loader
    //  this.watchLoader();
  }

  getCurrentPage() {
    console.log('fghddgd');

    let pageNumber = this.route.snapshot.params['pageNumber'];
    console.log(pageNumber);
    if (pageNumber == undefined) {
      this.getVehicleList();
    } else {
      console.log(pageNumber);
      this.router.navigate([], {
        queryParams: {
          pageNumber: pageNumber,
        },
      });
      this.getVehicleList(pageNumber);
    }
  }
  getVehicleList(pageQuery?) {
    this.vehicleService.requestGetVehicles(pageQuery);
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
      this.paginationInfo = this.vehicleService.pagination.value;

      console.log(this.vehicles);
    });
  }

  watchLoader() {
    this.vehicleService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
  pageChanged(e: any) {
    let pageQuery = { pageNumber: e.page, pageSize: e.itemsPerPage };
    console.log(pageQuery);
    this.vehicleService.requestGetVehicles(pageQuery);
    window.scroll({
      top: 100,
      behavior: 'smooth',
    });
  }
}
