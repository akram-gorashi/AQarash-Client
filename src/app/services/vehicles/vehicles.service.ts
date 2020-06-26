import { Injectable } from '@angular/core';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  vehiclesUrl = environment.apiUrl + 'vehicle';
  constructor(private http: HttpClient) {}

  getVehicles() {
    // Construct Http URL String query parameters from queries object
    //const httpParams = new HttpParams({ fromObject: filterQuery });
    return this.http.get(this.vehiclesUrl);
  }
}
