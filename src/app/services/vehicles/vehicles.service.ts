import { Injectable } from '@angular/core';
import { Vehicle } from 'src/app/models/app/Vehicle/Vehicle';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PaginationResponse } from 'src/app/models/app/Vehicle/PaginationResponse';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  vehiclesUrl = environment.apiUrl + 'vehicle';
  vehicles: BehaviorSubject<Vehicle[]> = new BehaviorSubject<Vehicle[]>([]);
  pagination: BehaviorSubject<PaginationResponse>= new BehaviorSubject<PaginationResponse>({} as PaginationResponse);
  constructor(private http: HttpClient) {}

  requestGetVehicles(filterQuery?: Vehicle) {
    // Construct Http URL String query parameters from queries object
    let myQuery = this.vehiclesUrl +'?'
    for (let entry in filterQuery) {
        myQuery += entry + '=' + encodeURIComponent(filterQuery[entry]) + '&';
    }

    // remove last '&'
    myQuery = myQuery.substring(0, myQuery.length-1)
   return this.http.get<Vehicle[]>(myQuery , {observe: 'response' })
  }

  public setVehicle(vehicles: Vehicle[]): void {
    this.vehicles.next(vehicles);
  }

  public getVehicles(): BehaviorSubject<Vehicle[]> {
    return this.vehicles;
  }

  public getVehicle(id: number) {
   // const params = new HttpParams().set('id', id.toString())
    return this.http.get(this.vehiclesUrl +'/'+ id);
  }

  public getMasterTableData() {
   return this.http.get<any>(environment.apiUrl + 'masterTable');
 }

 /* public setPaginationInfo(paginationInfo: PaginationResponse) {
   this.pagination.next(paginationInfo)
 }

 public getPaginationInfo(): BehaviorSubject<PaginationResponse> {
    return this.pagination;
 } */

}
