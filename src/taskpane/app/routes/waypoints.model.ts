export interface WaypointModel {
  lat: number;
  long: number;
  expected_time: number;
  actual_time: number;
}
export interface WaypointsModel {
  id: number;
  trip_id: number;
  points: Array<WaypointModel>;
}
