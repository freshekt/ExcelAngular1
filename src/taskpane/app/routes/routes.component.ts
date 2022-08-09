import { WaypointModel, WaypointsModel } from "./waypoints.model";
import moment from "moment-msdate";

import { Component, Inject, OnDestroy, OnInit } from "@angular/core";

import { RoutesModel } from "./routes.model";
import { RoutesService } from "./routes.service";
import { map, Subject, switchMap, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Moment } from "moment";

/* global console, Excel */

@Component({
  selector: "app-routes",
  templateUrl: "./routes.component.html",
})
export class RoutesComponent implements OnInit, OnDestroy {
  routes: Array<RoutesModel> = [];
  alive$ = new Subject();
  changes = [];
  waypointsModel: WaypointsModel;
  viewChanges: Array<{ address: string; value: string }> = [];
  constructor(
    @Inject(RoutesService) private service: RoutesService,
    @Inject(ActivatedRoute) private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.alive$.next(null);
    this.alive$.complete();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.alive$),
        switchMap((params: any) => this.service.getRoutes(params.id))
      )
      .subscribe((routes) => {
        this.routes = routes;
      });
  }

  async buildTable(routeId: number) {
    this.service
      .getWaypoints(routeId)
      .pipe(
        map((s) => {
          console.log(s);
          this.waypointsModel = s[0];
          this.changes = [];
          return s[0].points;
        })
      )
      .subscribe(async (waypoints) => {
        try {
          await Excel.run(async (context) => {
            /**
             * Insert your Excel code here
             */

            const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
            try {
              let table = currentWorksheet.tables.getItem("ExpensesTable");
              if (table) {
                table.delete();
              }
              await context.sync();
            } catch (err) {
              console.log(err);
            }
            currentWorksheet.getRange(`C2:D${waypoints.length + 1}`).numberFormat = [["[$-409]m/d/yy h:mm AM/PM;@"]];
            currentWorksheet.getRange(`C2:C${waypoints.length + 1}`).format.columnWidth = 80;
            currentWorksheet.getRange(`D2:D${waypoints.length + 1}`).format.columnWidth = 80;
            const tableData = waypoints.map((s, i) => {
              const actual_time = moment(s.actual_time * 1000);
              const expected_time = moment(s.expected_time * 1000);

              return [s.lat, s.long, expected_time.toOADate(), actual_time.toOADate()];
            });
            const expensesTable = currentWorksheet.tables.add("A1:D1", true /*hasHeaders*/);
            expensesTable.name = "ExpensesTable";
            expensesTable.getHeaderRowRange().values = [["latitude", "longitude", "expected time", "actual time"]];
            expensesTable.rows.add(null, tableData);
            currentWorksheet.getUsedRange().format.autofitColumns();
            currentWorksheet.getUsedRange().format.autofitRows();
            expensesTable.onChanged.add((e) => {
              this.changes.push(e.address);
              return context.sync();
            });

            waypoints.forEach((s, i) => {
              const actual_time = moment(s.actual_time * 1000);
              const expected_time = moment(s.expected_time * 1000);
              console.log({ [`D${i + 2}`]: actual_time.diff(expected_time, "minutes") });
              if (actual_time.diff(expected_time, "minutes") > 30 && actual_time.diff(expected_time, "minutes") < 60) {
                const cell = expensesTable.getRange().getCell(i + 1, 3);
                cell.format.fill.color = "yellow";
                console.log({ [`D${i + 2}:yellow`]: actual_time.diff(expected_time, "minutes"), cell });
              }

              if (actual_time.diff(expected_time, "minutes") > 60) {
                const cell = expensesTable.getRange().getCell(i + 1, 3);
                cell.format.fill.color = "red";
                console.log({ [`D${i + 2}:red`]: actual_time.diff(expected_time, "minutes"), cell });
              }
            });

            await context.sync();
          });
        } catch (error) {
          console.error(error);
        }
      });
  }

  async detectChanges() {
    try {
      await Excel.run(async (context) => {
        const worksheet = context.workbook.worksheets.getActiveWorksheet();

        for (let address of this.changes) {
          const range = worksheet.getRange(address);
          range.format.font.italic = true;
          range.load("values");
          await context.sync();
          this.viewChanges.push({ address, value: moment.fromOADate(range.values[0]).format() });
        }
        //await context.sync();
      });
    } catch (err) {
      console.error(err);
    }
  }

  async submitChanges() {
    try {
      await Excel.run(async (context) => {
        const worksheet = context.workbook.worksheets.getActiveWorksheet();
        let expensesTable = worksheet.tables.getItem("ExpensesTable");
        let bodyRange = expensesTable.getDataBodyRange().load("values");

        await context.sync();
        const points: Array<WaypointModel> = bodyRange.values.map((s) => ({
          lat: s[0],
          long: s[1],
          expected_time: Math.ceil(moment.fromOADate(s[2]).valueOf() / 1000),
          actual_time: Math.ceil(moment.fromOADate(s[3]).valueOf() / 1000),
        }));
        this.waypointsModel.points = points;
      });
      console.log(this.waypointsModel);
      this.service.updateWaypoints(this.waypointsModel).subscribe();
    } catch (err) {
      console.error(err);
    }
  }

  async drawHistogram() {
    await Excel.run(async (context) => {
      const worksheet = context.workbook.worksheets.getActiveWorksheet();
      let expensesTable = worksheet.tables.getItem("ExpensesTable");
      let bodyRange = expensesTable.getDataBodyRange().load("values");

      await context.sync();
      const dataRange = worksheet.getRange(`c2:D${bodyRange.values.length + 1}`);
      let chart = worksheet.charts.add(Excel.ChartType.line, dataRange, Excel.ChartSeriesBy.auto);
      chart.title.text = "Waypoints Data";
      chart.legend.position = Excel.ChartLegendPosition.right;
      chart.legend.format.fill.setSolidColor("white");
      chart.dataLabels.showValue = false;
    });
  }
}
