import { DriverModel } from "./drivers.model";
import { DriversService } from "./drivers.service";
import { Component, Inject, OnInit } from "@angular/core";
import moment from "moment-msdate";

/* global console, Excel */

@Component({
  selector: "app-drivers",
  templateUrl: "./drivers.component.html",
})
export class DriversComponent implements OnInit {
  drivers: Array<DriverModel> = [];
  constructor(@Inject(DriversService) private service: DriversService) {}
  ngOnInit(): void {
    this.service.getDrivers().subscribe((drivers) => {
      this.drivers = drivers;
    });
  }
}
