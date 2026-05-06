import {MapContainer, TileLayer} from "react-leaflet";
import TransportLayers from "./components/TransportLayers.tsx";

const App = () => {
    return (
        <MapContainer center={[45.764, 4.835]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            attribution={'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>'}
            minZoom={1}
            maxZoom={20}/>
            <TransportLayers/>
        </MapContainer>
    );
};

export default App;