import "leaflet/dist/leaflet.css";
import "style.scss";

import $ from "jquery";
import Papa from "papaparse";

const loadingPopup = $("#loading");
const startPopup = $("#start");

const loadFile = (path: string): Promise<unknown[]> => new Promise((resolve, reject) => {
    Papa.parse(path, {
        step: () => {

        }
    });
});

const loadGTFSData = () => {

};
