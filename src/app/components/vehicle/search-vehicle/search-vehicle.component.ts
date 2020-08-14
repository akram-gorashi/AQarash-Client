import { Component, OnInit, HostListener } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.component.html',
  styleUrls: ['./search-vehicle.component.css'],
})
export class SearchVehicleComponent implements OnInit {
  masterTableData: any = {};
  vehicleSearchFormGroup: any;
  years = [];
  isOnMidScreen: boolean;
  constructor(
    private vehicleService: VehiclesService,
  ) {}

  ngOnInit(): void {
    this.getMasterTableData();
    this.initForm();
    this.generateYears();
    this.getScreenSize();
  }
  generateYears() {
    var nowY = new Date().getFullYear();
    for (var Y = nowY; Y >= nowY - 35; Y--) {
      this.years.push(Y);
    }
    console.log(this.years);
  }

  initForm(): void {
    this.vehicleSearchFormGroup = new FormGroup({
      make: new FormControl(null),
      mileage: new FormControl(null),
      color: new FormControl(null),
      condition: new FormControl(null),
      model: new FormControl(null),
      minYear: new FormControl(null),
      maxYear: new FormControl(null),
      fuel: new FormControl(null),
      transmission: new FormControl(null),
      price: new FormControl(null),
      description: new FormControl(null),
      agentName: new FormControl(null),
      agentPhoneNumber: new FormControl(null),
      agentLocation: new FormControl(null),
    });
  }

  getMasterTableData() {
    this.vehicleService.getMasterTableData().subscribe((masterTableData) => {
      this.masterTableData = masterTableData[0];
      console.log(this.masterTableData);
      localStorage.setItem('MasterTable', JSON.stringify(masterTableData));
    });
  }

  searchCar() {
    let vehicleToSearch: Vehicle = this.vehicleSearchFormGroup.value;
    for (var prop in vehicleToSearch) {
      if (vehicleToSearch.hasOwnProperty(prop)) {
        if (vehicleToSearch[prop] === null) delete vehicleToSearch[prop];
      }
    }
    console.log(vehicleToSearch);
    if (Object.keys(vehicleToSearch).length === 0) {
      console.log(vehicleToSearch);
      return;
    } else {
      this.vehicleService.requestGetVehicles(vehicleToSearch);
    }
  }
 // Listen for window size changes
 @HostListener('window:resize', ['$event'])
 getScreenSize(event?): void {
   // If browser window is resized below mid screen size width
   window.innerWidth <= 767
     ? (this.isOnMidScreen = true)
     : (this.isOnMidScreen = false);
     console.log(this.isOnMidScreen)
 }
  
}
