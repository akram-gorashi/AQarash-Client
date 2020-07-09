import { Injectable } from '@angular/core';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  vehiclesUrl = environment.apiUrl + 'vehicle';
  vehicles: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
  constructor(private http: HttpClient) {}

  requestGetVehicles() {
    // Construct Http URL String query parameters from queries object
    //const httpParams = new HttpParams({ fromObject: filterQuery });
    this.http.get(this.vehiclesUrl).subscribe((vehicles: Vehicle[]) => {
      this.setVehicle(vehicles);
    });
  }

  public setVehicle(vehicles: Vehicle[]): void {
    this.vehicles.next(vehicles);
  }

  public getVehicles(): BehaviorSubject<Vehicle[]> {
    return this.vehicles;
  }

  public getVehicle(id: number) {
   // const params = new HttpParams().set('id', id.toString())
   // console.log(this.vehiclesUrl, params.toString())
    return this.http.get(this.vehiclesUrl +'/'+ id);
  }
}
