import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";

import "rxjs/add/operator/map";

@Injectable()
export class GeoLocationService {

    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    getCustomGeoLocation(address: string) {
        return this.http.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address))
            .map(res => res.json())
            .map(result => {
                if (result.status !== "OK") { throw new Error("unable to get geolocation address"); }
                let latlng = L.latLng({
                    lat: result.results[0].geometry.location.lat,
                    lng: result.results[0].geometry.location.lng
                });
                return latlng;
            });
    }

    getCurrentGeoLocation() {
        return this.http.get("https://www.google.co.in/maps/").map(res => res.json()).
            map(result => {
                if (result.status !== "OK") {
                    throw new Error("unable to get geolocation address");
                }
                let currentLatLng = L.latLng({
                    lat: result.results[0].geometry.location.lat,
                    lng: result.results[0].geometry.location.lng
                });
                return currentLatLng
            });
    }

}
