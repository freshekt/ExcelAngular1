import { DriversComponent } from "./drivers/drivers.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoutesComponent } from "./routes/routes.component";
const routes: Routes = [
  {
    path: "",
    component: DriversComponent,
  },
  {
    path: "routers/:id",
    component: RoutesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
