import { Component, OnInit } from '@angular/core';

import * as Map from "leaflet";

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit {
 
  constructor() { }

  ngOnInit() {  
    function initMap() {      
         let mapInstance = L.map('map', {
           center: L.latLng(17.44692, 78.37604),
           attributionControl: false,
           zoom: 3,
           //maxBounds: bounds,
           maxZoom: 19,
           minZoom: 3
         });
         // create the tile layer with correct attribution
         let tilesURL = 'https://api.mapbox.com/styles/v1/gajusp/cixubws9b005g2rpls5gq5smi/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2FqdXNwIiwiYSI6ImNpeHVidmhvbTAwNHAzMmxteXZrYWVjNmkifQ.NBY10TYu54LOb6mr49zs-g';//'https://api.mapbox.com/styles/v1/kalyanivenna81/ciwqbrp8g001n2pm3jvochq0s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FseWFuaXZlbm5hODEiLCJhIjoiY2l3cHh1NWcwMDAwMjJvbGxhYzE2aXFoZCJ9.DfT7iZTiLYhq0CaNv3pEmQ';
         let tilesAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
         let tiles = L.tileLayer(tilesURL, {
            attribution: tilesAttrib,
            maxZoom: 19,
            id: 'your.mapbox.project.id',
            accessToken: 'your.mapbox.public.access.token'
         });
         tiles.addTo(mapInstance);
         //this.mapInstance.on('zoomend', onScrollMapZoomHandler);
         //this.map = this.mapInstance;
       }
       initMap();
    }
}
