import { DriverModel } from "./drivers.model";
import { DriversService } from "./drivers.service";
import { Component, Inject, OnInit } from "@angular/core";
import moment from "moment-msdate";

/* global console, Excel */

const data = [
  {
    lat: -103.49655,
    long: 25.532542,
    expected_time: 1656854282,
    actual_time: 1656854506,
  },
  {
    lat: -103.496468,
    long: 25.533083,
    expected_time: 1656840025,
    actual_time: 1656886037,
  },
  {
    lat: -103.50107,
    long: 25.537915,
    expected_time: 1656855568,
    actual_time: 1656828598,
  },
  {
    lat: -103.4821,
    long: 25.550523,
    expected_time: 1656823375,
    actual_time: 1656881416,
  },
  {
    lat: -103.481874,
    long: 25.550808,
    expected_time: 1656812194,
    actual_time: 1656824616,
  },
  {
    lat: -103.480533,
    long: 25.550635,
    expected_time: 1656858244,
    actual_time: 1656880750,
  },
  {
    lat: -103.469031,
    long: 25.544948,
    expected_time: 1656885981,
    actual_time: 1656818808,
  },
  {
    lat: -103.467941,
    long: 25.54152,
    expected_time: 1656871207,
    actual_time: 1656841656,
  },
  {
    lat: -103.417621,
    long: 25.573219,
    expected_time: 1656880351,
    actual_time: 1656865441,
  },
  {
    lat: -103.414732,
    long: 25.574893,
    expected_time: 1656867414,
    actual_time: 1656830843,
  },
  {
    lat: -103.399246,
    long: 25.580418,
    expected_time: 1656845002,
    actual_time: 1656820163,
  },
  {
    lat: -103.396278,
    long: 25.579001,
    expected_time: 1656863369,
    actual_time: 1656822918,
  },
  {
    lat: -103.395427,
    long: 25.57871,
    expected_time: 1656890422,
    actual_time: 1656872711,
  },
  {
    lat: -103.381343,
    long: 25.56144,
    expected_time: 1656874098,
    actual_time: 1656821140,
  },
  {
    lat: -103.380922,
    long: 25.560423,
    expected_time: 1656869079,
    actual_time: 1656847718,
  },
  {
    lat: -103.379589,
    long: 25.55824,
    expected_time: 1656813727,
    actual_time: 1656891018,
  },
  {
    lat: -103.320899,
    long: 25.553941,
    expected_time: 1656816608,
    actual_time: 1656839761,
  },
  {
    lat: -103.316824,
    long: 25.534496,
    expected_time: 1656862843,
    actual_time: 1656854013,
  },
  {
    lat: -103.313656,
    long: 25.534608,
    expected_time: 1656860370,
    actual_time: 1656814743,
  },
  {
    lat: -103.252244,
    long: 25.535269,
    expected_time: 1656833883.1,
    actual_time: 1656871659,
  },
  {
    lat: -103.22273,
    long: 25.537192,
    expected_time: 1656806592,
    actual_time: 1656850970,
  },
  {
    lat: -102.872471,
    long: 25.626645,
    expected_time: 1656849940,
    actual_time: 1656858011,
  },
  {
    lat: -102.871816,
    long: 25.625641,
    expected_time: 1656876563,
    actual_time: 1656856257,
  },
  {
    lat: -102.030773,
    long: 25.641457,
    expected_time: 1656858300,
    actual_time: 1656841401,
  },
  {
    lat: -101.296251,
    long: 25.44299,
    expected_time: 1656888364,
    actual_time: 1656837276,
  },
  {
    lat: -101.071492,
    long: 25.453576,
    expected_time: 1656892717,
    actual_time: 1656810941,
  },
  {
    lat: -101.069119,
    long: 25.453011,
    expected_time: 1656840791,
    actual_time: 1656821886,
  },
  {
    lat: -101.064713,
    long: 25.45391,
    expected_time: 1656850185,
    actual_time: 1656825486,
  },
  {
    lat: -101.06185,
    long: 25.458182,
    expected_time: 1656867089,
    actual_time: 1656842294,
  },
  {
    lat: -101.053341,
    long: 25.463139,
    expected_time: 1656862976,
    actual_time: 1656873195,
  },
  {
    lat: -100.957552,
    long: 25.571729,
    expected_time: 1656888730,
    actual_time: 1656811345,
  },
  {
    lat: -100.916233,
    long: 25.610289,
    expected_time: 1656834899,
    actual_time: 1656889605,
  },
  {
    lat: -100.449467,
    long: 25.658702,
    expected_time: 1656835923,
    actual_time: 1656813552,
  },
  {
    lat: -100.404439,
    long: 25.669139,
    expected_time: 1656881560,
    actual_time: 1656880268,
  },
  {
    lat: -100.382984,
    long: 25.668729,
    expected_time: 1656868323,
    actual_time: 1656889036,
  },
  {
    lat: -100.357318,
    long: 25.67192,
    expected_time: 1656821401,
    actual_time: 1656877024,
  },
  {
    lat: -100.276071,
    long: 25.674628,
    expected_time: 1656838719,
    actual_time: 1656818971,
  },
  {
    lat: -100.275608,
    long: 25.674804,
    expected_time: 1656872685,
    actual_time: 1656870959,
  },
  {
    lat: -100.215956,
    long: 25.69055,
    expected_time: 1656862413,
    actual_time: 1656830818,
  },
  {
    lat: -100.21315,
    long: 25.691255,
    expected_time: 1656815371,
    actual_time: 1656859243,
  },
  {
    lat: -100.212585,
    long: 25.692515,
    expected_time: 1656881311,
    actual_time: 1656856521,
  },
  {
    lat: -100.212428,
    long: 25.693376,
    expected_time: 1656809066,
    actual_time: 1656872377,
  },
  {
    lat: -100.209469,
    long: 25.693673,
    expected_time: 1656876418,
    actual_time: 1656814023,
  },
  {
    lat: -100.164185,
    long: 25.692691,
    expected_time: 1656891458,
    actual_time: 1656835610,
  },
  {
    lat: -99.995324,
    long: 25.606418,
    expected_time: 1656842504,
    actual_time: 1656869523,
  },
  {
    lat: -99.964077,
    long: 25.599032,
    expected_time: 1656851383,
    actual_time: 1656871299,
  },
  {
    lat: -98.715127,
    long: 25.92043,
    expected_time: 1656871668,
    actual_time: 1656889602,
  },
  {
    lat: -98.450593,
    long: 26.023094,
    expected_time: 1656873634,
    actual_time: 1656833951,
  },
  {
    lat: -98.39485,
    long: 26.045247,
    expected_time: 1656820179,
    actual_time: 1656854940,
  },
  {
    lat: -98.371524,
    long: 26.054224,
    expected_time: 1656870598,
    actual_time: 1656846578,
  },
  {
    lat: -98.369143,
    long: 26.054076,
    expected_time: 1656866739,
    actual_time: 1656871586,
  },
  {
    lat: -98.286117,
    long: 26.041266,
    expected_time: 1656874968,
    actual_time: 1656848008,
  },
  {
    lat: -98.222278,
    long: 26.018695,
    expected_time: 1656875797,
    actual_time: 1656853579,
  },
  {
    lat: -98.167052,
    long: 26.005328,
    expected_time: 1656884772,
    actual_time: 1656867528,
  },
  {
    lat: -98.166468,
    long: 26.004822,
    expected_time: 1656886768,
    actual_time: 1656853831,
  },
  {
    lat: -97.741468,
    long: 25.99218,
    expected_time: 1656829204,
    actual_time: 1656851225,
  },
  {
    lat: -97.574525,
    long: 25.917907,
    expected_time: 1656852434,
    actual_time: 1656862030,
  },
  {
    lat: -97.573823,
    long: 25.917263,
    expected_time: 1656874119,
    actual_time: 1656858867,
  },
  {
    lat: -97.580592,
    long: 25.895588,
    expected_time: 1656849632,
    actual_time: 1656818432,
  },
  {
    lat: -97.562522,
    long: 25.887231,
    expected_time: 1656812747,
    actual_time: 1656853294,
  },
  {
    lat: -97.532527,
    long: 25.853001,
    expected_time: 1656852599,
    actual_time: 1656854326,
  },
  {
    lat: -97.546271,
    long: 25.826621,
    expected_time: 1656857424,
    actual_time: 1656826303,
  },
  {
    lat: -97.531688,
    long: 25.827228,
    expected_time: 1656869061,
    actual_time: 1656861358,
  },
  {
    lat: -97.531782,
    long: 25.824439,
    expected_time: 1656867626,
    actual_time: 1656853666,
  },
  {
    lat: -97.531117,
    long: 25.824485,
    expected_time: 1656830305,
    actual_time: 1656872520,
  },
];

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
    this.buildTable();
  }

  async buildTable() {
    try {
      await Excel.run(async (context) => {
        /**
         * Insert your Excel code here
         */
        const currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
        currentWorksheet.getRange(`C2:C${data.length + 1}`).numberFormat = [["[$-409]m/d/yy h:mm AM/PM;@"]];
        currentWorksheet.getRange(`D2:C${data.length + 1}`).numberFormat = [["[$-409]m/d/yy h:mm AM/PM;@"]];
        const expensesTable = currentWorksheet.tables.add("A1:D1", true /*hasHeaders*/);
        expensesTable.name = "ExpensesTable";
        expensesTable.getHeaderRowRange().values = [["latitude", "longitude", "expected time", "actual time"]];
        expensesTable.rows.add(
          null /*add at the end*/,
          data.map((s, i) => {
            const actual_time = moment(s.actual_time);
            const expected_time = moment(s.expected_time);
            console.log({ actual_time: actual_time.diff(expected_time, "minutes") });
            if (actual_time.diff(expected_time, "minutes") > 60) {
            }
            return [s.lat, s.long, expected_time.toOADate(), actual_time.toOADate()];
          })
        );

        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  }
}
