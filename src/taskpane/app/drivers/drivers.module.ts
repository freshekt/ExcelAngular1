import { DriversComponent } from "./drivers.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [DriversComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [DriversComponent],
})
export class DriversModule {}
