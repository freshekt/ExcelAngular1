import {  RoutesComponent } from "./routes.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [RoutesComponent],
  imports: [CommonModule, HttpClientModule, RouterModule, RouterModule],
  exports: [RoutesComponent],
})
export class RoutesModule {}
