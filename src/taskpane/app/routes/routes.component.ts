import moment from "moment-msdate";

import { Component, Inject, OnDestroy, OnInit } from "@angular/core";

import { RoutesModel } from "./routes.model";
import { RoutesService } from "./routes.service";
import { map, Subject, switchMap, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";

/* global console, Excel */

@Component({
  selector: "app-routes",
  templateUrl: "./routes.component.html",
})
export class RoutesComponent implements OnInit, OnDestroy {
  routes: Array<RoutesModel> = [];
  alive$ = new Subject();

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

            currentWorksheet.getRange(`C2:D${waypoints.length + 1}`).numberFormat = [["[$-409]m/d/yy h:mm AM/PM;@"]];
            currentWorksheet.getRange(`C2:C${waypoints.length + 1}`).format.columnWidth = 80;
            currentWorksheet.getRange(`D2:D${waypoints.length + 1}`).format.columnWidth = 80;
            const expensesTable = currentWorksheet.tables.add("A1:D1", true /*hasHeaders*/);
            expensesTable.name = "ExpensesTable";
            expensesTable.getHeaderRowRange().values = [["latitude", "longitude", "expected time", "actual time"]];
            expensesTable.rows.add(
              null /*add at the end*/,
              waypoints.map((s, i) => {
                const actual_time = moment(s.actual_time);
                const expected_time = moment(s.expected_time);
                console.log({ actual_time: actual_time.diff(expected_time, "seconds") });

                return [s.lat, s.long, expected_time.toOADate(), actual_time.toOADate()];
              })
            );

            expensesTable.onChanged.add((e) => {
              e.getRange(context).format.font.load(["italic"]);
              e.getRange(context).format.font.italic = true;
              return context.sync();
            });

            await context.sync();
          });
        } catch (error) {
          console.error(error);
        }
      });
  }
}
