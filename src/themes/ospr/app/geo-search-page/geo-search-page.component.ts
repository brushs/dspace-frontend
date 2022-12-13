import { Component, OnInit } from '@angular/core';

import 'leaflet-geosearch/dist/geosearch.css';
//declare const L: any; // --> Works
import L from 'leaflet'
//import * as L from 'leaflet';
import 'leaflet-draw';



//For geometry from data
const myStyle = {
  color: 'green',
  weight: 5,
  opacity: 0.65,
};

const markerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  // specify the path here
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});
L.Marker.prototype.options.icon = markerIcon;

@Component({
  selector: 'geo-search-page',
  templateUrl: './geo-search-page.component.html',
  styleUrls: ['./geo-search-page.component.scss']
})
export class GeoSearchPageComponent implements OnInit {

  name = 'Dspace';
  map: any;
  lat: number = 45.4215;
  lon: number = -75.6972;
  maker: L.Marker<any>;
  dbmaker: L.Marker<any>[];

  markers: any[];
  drawnItems: any;

  datachild: any;
  isAddFieldTask: boolean;
  isSave: boolean;
  data: any;
  lat1: any;
  lng1: any;
  lat2: any;
  lng2: any;


  constructor() { }

  ngOnInit(): void {
    this.map = L.map('map').setView([this.lat, this.lon], 7);
    this.data = 'Please draw a rectangle, using solid square icon';
    const baselayers = {
      openstreetmap: L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      ),
      googleStreets: L.tileLayer(
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }
      ),
      googleHybrid: L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }
      ),
      googleSat: L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        }
      ),
    };

    var overlays = {};

    L.control.layers(baselayers, overlays).addTo(this.map);

    baselayers['openstreetmap'].addTo(this.map);

        this.drawnItems = new L.FeatureGroup();

    this.map.addLayer(this.drawnItems);

    var options = {
      position: 'topright',
      draw: {
        circle: false,
        circlemarker: false, // Turns off this drawing tool
        polygon: false,
        //marker: {
        //  icon: markerIcon,
        //},
        marker: false,
        polyline: false,
      },
      edit: {
        featureGroup: this.drawnItems, //REQUIRED!!
        // remove: false
      },
    };

    var drawControl = new L.Control.Draw(options);
    this.map.addControl(drawControl);    

  }

}
