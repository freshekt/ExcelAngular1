import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import AppComponent from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { APIInterceptor } from "./interceptors/api.interceptor";
import { DriversModule } from "./drivers/drivers.module";
import { RoutesModule } from "./routes/routes.module";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DriversModule,RoutesModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: "BASE_API_URL", useValue: 'http://sample.shareit.sharp-dev.net' },
    { provide: APP_BASE_HREF, useValue: "/" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
})
export default class AppModule {}
