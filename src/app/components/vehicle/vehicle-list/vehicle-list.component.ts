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
    console.log('fghddgd');

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
      console.log(pageNumber);
      if (pageNumber == undefined) {
        this.getVehicleList();
      } else {
        console.log(pageNumber);
        this.changeParms(pageNumber);
        console.log('getVehicleList(parms)');
        this.getVehicleList({ pageNumber: pageNumber });
      }
    }
  }
  getVehicleList(pageQuery?: Object) {
    console.log(pageQuery);
    this.vehicleService.requestGetVehicles(pageQuery);
    this.vehicleService.getVehicles().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
      this.paginationInfo = this.vehicleService.pagination.value;
      console.log(this.paginationInfo);
    });
    console.log(this.vehicles);
  }

  watchLoader() {
    this.vehicleService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
  pageChanged(e: any) {
    console.log(e.page + 'page changed');
    let pageQuery = { pageNumber: e.page, pageSize: e.itemsPerPage };
    console.log(pageQuery);
    /*  this.router.navigate([], {
      queryParams: {
        pageNumber: pageQuery.pageNumber,
      },
    }); */
    /* this.router.navigate([], {
      relativeTo: this.route,
      queryParams: pageQuery,
    }); */
    console.log(pageQuery);
    this.getCurrentPage(pageQuery);
    //  this.vehicleService.requestGetVehicles(pageQuery);
  }
  changeParms(newParams) {
   this.router.navigate([], {
      queryParams: {
        pageNumber: newParams,
      },
    });
    console.log(newParams);
  }
}
