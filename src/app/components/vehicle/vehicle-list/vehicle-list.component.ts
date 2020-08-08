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

  getCurrentPage(pageQuery?) {
    let pageNumber;
    if (pageQuery) {
      this.changeParms(pageQuery.pageNumber);
      this.getVehicleList({ pageNumber: pageQuery.pageNumber });
    } else {
      this.route.queryParams.subscribe((params) => {
        pageNumber = params['pageNumber'];
      });
      this.changeParms(pageNumber);
      if (pageNumber == undefined) {
      } else {
        this.changeParms(pageNumber);
        this.getVehicleList({ pageNumber: pageNumber });
      }
    }
  }
  getVehicleList(pageQuery?: Object) {
    this.vehicleService.requestGetVehicles(pageQuery);
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
      this.paginationInfo = this.vehicleService.pagination.value;
    });
  }

  watchLoader() {
    this.vehicleService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
  pageChanged(e: any) {
    let pageQuery = { pageNumber: e.page, pageSize: e.itemsPerPage };
    this.getCurrentPage(pageQuery);
  }
  changeParms(newParams) {
    this.router.navigate([], {
      queryParams: {
        pageNumber: newParams,
      },
    });
  }
}
