import { Component, OnInit } from '@angular/core';
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

  constructor(private vehicleService: VehiclesService) {}

  ngOnInit(): void {
    this.getMasterTableData();
    this.initForm();
  }

  initForm(): void {
    this.vehicleSearchFormGroup = new FormGroup({
      make: new FormControl(null),
      mileage: new FormControl(null),
      color: new FormControl(null),
      condition: new FormControl(null),
      model: new FormControl(null),
      year: new FormControl(null),
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
        if (vehicleToSearch[prop] === null) 
            delete vehicleToSearch[prop];
      }
    }
    console.log(vehicleToSearch);
    // this.vehicleService.requestGetVehicles(this.vehicleSearchFormGroup.value)
  }
}