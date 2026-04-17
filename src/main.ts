import "leaflet/dist/leaflet.css";
import "./style.scss";

import {StopRBush} from "../shared/tree";
import $ from "jquery";
import L from "leaflet";

const loadingPopup = $("#loading");
const startPopup = $("#start");

const map = L.map("map").setView([45.75, 4.85], 13);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - Tiles courtesy of <a href="https://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>',
    minZoom: 1,
    maxZoom: 19
}).addTo(map);

const tree = new StopRBush();

const stylefn = (f: {
    properties: { couleur_hex: string }
} | undefined) => f ? ({color: f.properties.couleur_hex}) : ({});
const geoOptions = {style: stylefn};
const geoLayers = {
    bus: L.geoJSON([], geoOptions),
    tram: L.geoJSON([], geoOptions),
    metro: L.geoJSON([], geoOptions),
    navi: L.geoJSON([], geoOptions)),
}

const mapOptions = {
    layersVisibility: {
        bus: false,
        tram: true,
        metro: true,
        navi: true
    }
}

const loadGTFSData = () => Promise.all([
    fetch("data/gtfs/stops.json").then(r => r.json())
        .then((data) => {
            tree.fromJSON(data);
            loadingPopup.text(`Loaded ${tree.all().length} stops`);
        }),
    fetch("https://data.grandlyon.com/geoserver/sytral/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=sytral:tcl_sytral.tcllignebus_2_0_0&outputFormat=application/json&SRSNAME=EPSG:4171&startIndex=0&sortby=gid")
        .then(r => r.json())
        .then(data => geoLayers.bus.addData(data)),
    fetch("https://data.grandlyon.com/geoserver/sytral/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=sytral:tcl_sytral.tcllignetram_2_0_0&outputFormat=application/json&SRSNAME=EPSG:4171&startIndex=0&sortby=gid")
        .then(r => r.json())
        .then(data => geoLayers.tram.addData(data)),
    fetch("https://data.grandlyon.com/geoserver/sytral/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=sytral:rx_rhonexpress.rxligne_2_0_0&outputFormat=application/json&SRSNAME=EPSG:4171&startIndex=0&sortby=gid")
        .then(r => r.json())
        .then(data => geoLayers.tram.addData(data)),
    fetch("https://data.grandlyon.com/geoserver/sytral/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=sytral:tcl_sytral.tcllignefluv&outputFormat=application/json&SRSNAME=EPSG:4171&sortBy=gid")
        .then(r => r.json())
        .then(data => geoLayers.navi.addData(data)),
    fetch("https://data.grandlyon.com/geoserver/sytral/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=sytral:tcl_sytral.tcllignemf_2_0_0&outputFormat=application/json&SRSNAME=EPSG:4171&startIndex=0&sortby=gid")
        .then(r => r.json())
        .then(data => geoLayers.metro.addData(data))
]);

loadGTFSData().then(() => console.log("ready"));

