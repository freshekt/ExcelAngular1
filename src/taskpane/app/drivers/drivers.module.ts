import { DriversComponent } from "./drivers.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [DriversComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [DriversComponent],
})
export class DriversModule {}
