import { Component, OnInit } from '@angular/core';

import { Map } from "leaflet";
import { GeoLocationService } from "../services/geo-location.service";
import { LeafletMapComponent } from "../leaflet-map/leaflet-map.component";

@Component({
  selector: 'navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  private _map: Map;

  constructor(private _geoLocation: GeoLocationService, private _leafComp: LeafletMapComponent) { }

  ngOnInit() {
    this._map = this._leafComp.map;
  }

  /**
   * Get Custom geo location
   */
  gotoLocation(address: string) {
    this._geoLocation.getCustomGeoLocation(address).subscribe(latlng => {
      this._map.setView(latlng, 12);
    }, error => console.error(error));
  }

}
