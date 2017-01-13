import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import "rxjs/add/operator/map";

import { Map } from "leaflet";

import { GeoLocationService } from "../services/geo-location.service";

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css'],
  inputs: ['longitude', 'latitude', 'zoom', 'minZoom', 'maxZoom', 'regionLayerPolygon', 'markerDataPoints']
})
export class LeafletMapComponent implements OnInit {

  address: string;
  subObj: any;
  public map: Map;
  /**
   * Get geo location from google map
   */
  http: Http;
  /**
  * The longitude that defines the center of the map.
  */
  longitude: number = 0;

  /**
   * The latitude that defines the center of the map.
   */
  latitude: number = 0;

  /**
   * The zoom level of the map. The default zoom level is 8.
   */
  zoom: number = 8;

  /**
   * The minimal zoom level of the map allowed. When not provided, no restrictions to the zoom level
   * are enforced.
   */
  minZoom: number;

  /**
   * The maximal zoom level of the map allowed. When not provided, no restrictions to the zoom level
   * are enforced.
   */
  maxZoom: number;

  /**
   * To draw regional ploygon on map as per cordinates
   */
  regionLayerPolygon: Array<Object>;

  /**
   * To draw regional ploygon on map as per cordinates
   */
  markerDataPoints: Array<Object>;

  constructor(http: Http, private _geoLocation: GeoLocationService) {
    this.http = http;
  }

  /** @internal preinitalization of component*/
  ngOnInit() {
    this._initMapInstance();
  }

  /**
   * Map initialization
   */
  private _initMapInstance() {
    console.log(this.latitude, this.longitude);
    let mapInstance = L.map('map', {
      center: L.latLng(this.latitude || 0, this.longitude || 0), //17.44692, 78.37604),
      attributionControl: false,
      zoom: this.zoom,
      //maxBounds: bounds,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom
    });
    // create the tile layer with correct attribution
    let tilesURL = 'https://api.mapbox.com/styles/v1/gajusp/cixubws9b005g2rpls5gq5smi/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2FqdXNwIiwiYSI6ImNpeHVidmhvbTAwNHAzMmxteXZrYWVjNmkifQ.NBY10TYu54LOb6mr49zs-g';
    let tilesAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
    let tiles = L.tileLayer(tilesURL, {
      attribution: tilesAttrib,
      maxZoom: this.maxZoom,
      id: 'your.mapbox.project.id',
      accessToken: 'your.mapbox.public.access.token'
    });
    tiles.addTo(mapInstance);
    //this.mapInstance.on('zoomend', onScrollMapZoomHandler);
    this.map = mapInstance;
    this.addMarkeronMap();
  }

  /**
   * Draw Polygon as per geo cordinates
   */
  drawRegionPolygonOnMap() {
    if (this.regionLayerPolygon) {

    }
  }

  /**
   * Add marker on map 
   */
  addMarkeronMap() {
    var stateIcon, markerObj, htmlPopup;
    if (this.markerDataPoints && this.markerDataPoints.length > 0) {

    } else {
      //default marker
      stateIcon = this.getStateIcon("<img class='' src='assets/images/marker-icon.png'>");
      markerObj = L.marker([25.32417, 80.68359], { icon: stateIcon }).addTo(this.map);
      htmlPopup = '<div>This is Marker popup</div>';
      markerObj.bindPopup(htmlPopup, {
        closeButton: true,
        className: "leaflet-mouse-over-device-data-popup",
        autoPan: false,
        keepInView: true
      });
      markerObj.on("click", this.onMarkerClickHandler);
    }

  }

  getStateIcon(iconHtmlStr) {
    return L.divIcon({
      html: iconHtmlStr,
      className: ""
    });
  }

  /**
   * Marker click handler to emit event
   */
  onMarkerClickHandler(evt) {
    console.log(evt);
  }

  /** @internal */
  ngOnDestroy() {
  }


}
