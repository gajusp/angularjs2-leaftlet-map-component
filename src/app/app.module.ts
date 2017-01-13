import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { GeoLocationService } from "./services/geo-location.service";
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    LeafletMapComponent,
    NavigatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GeoLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
