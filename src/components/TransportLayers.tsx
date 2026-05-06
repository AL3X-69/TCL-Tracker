import {GeoJSON, LayersControl} from "react-leaflet";
import type {GeoJsonObject} from 'geojson';
import {useEffect} from "react";

interface GeoLayer {
    url: string,
    name: string,
    visible: boolean,
    data: GeoJsonObject | null
}

const geoLayers: GeoLayer[] = [
    {
        url: "https://data.grandlyon.com/geoserver/sytral/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=sytral:tcl_sytral.tcllignebus_2_0_0&outputFormat=application/json&SRSNAME=EPSG:4171&startIndex=0&sortby=gid",
        name: "Lignes de bus",
        visible: false,
        data: null
    }
]

const TransportLayers = () => {
    useEffect(() => {
        for (let geoLayer of geoLayers) fetch(geoLayer.url)
            .then(response => response.json())
            .then(data => geoLayer.data = data);
    }, []);

    return (
        <LayersControl position={"bottomright"}>
            {geoLayers.map(layer => layer.data && (
                <LayersControl.Overlay name={layer.name} checked={layer.visible}>
                    <GeoJSON data={layer.data}/>
                </LayersControl.Overlay>
            ))}
        </LayersControl>
    );
};

export default TransportLayers;
