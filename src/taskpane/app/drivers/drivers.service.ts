import { DriverModel } from "./drivers.model";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DriversService {
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getDrivers(): Observable<Array<DriverModel>> {
    return this.http.get<Array<DriverModel>>("drivers");
  }
}
