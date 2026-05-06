import "leaflet/dist/leaflet.css";
import "./style.scss";

import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App/>
    </StrictMode>
);
