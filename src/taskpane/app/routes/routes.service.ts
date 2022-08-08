import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RoutesModel } from "./routes.model";
import { WaypointsModel } from "./waypoints.model";

@Injectable({
  providedIn: "root",
})
export class RoutesService {
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getRoutes(driverId: number): Observable<Array<RoutesModel>> {
    return this.http.get<Array<RoutesModel>>(`trips?driver_id=${driverId}`);
  }

  getWaypoints(id: number): Observable<Array<WaypointsModel>> {
    return this.http.get<Array<WaypointsModel>>(`routes?trip_id=${id}`);
  }

  updateWaypoints(waypointsModel: WaypointsModel) {
    return this.http.put(`routes/${waypointsModel.id}`, waypointsModel);
  }
}
