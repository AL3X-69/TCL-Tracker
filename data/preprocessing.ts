import { StopRBush } from "../shared/tree";
import Papa from "papaparse";
import {GTFSStop, LocationType, Stop, WheelchairBoarding} from "../shared/gtfs";
import fs from "node:fs";

const tree = new StopRBush();

const convertStop = (s: GTFSStop): Stop => ({
    id: s.stop_id,
    name: s.stop_name,
    desc: s.stop_desc,
    code: s.stop_code,
    zone: s.zone_id,
    url: s.stop_url,
    type: parseInt(s.location_type) as LocationType,
    parent: s.parent_station == "" ? null : s.parent_station,
    wheelchair_boarding: parseInt(s.wheelchair_boarding) as WheelchairBoarding,
    latlng: [parseFloat(s.stop_lat), parseFloat(s.stop_lon)]
})

const streamFile = (path: string, cb: (chunk: any) => void): Promise<void> => new Promise((resolve) => {
    const stream = fs.createReadStream(path);
    Papa.parse(stream, {
        header: true,
        step: (r) => {
            if (r.errors.length > 0) console.error(r.errors);
            cb(r.data);
        },
        delimiter: ",",
        complete: () => resolve()
    })
});

streamFile("data/gtfs/stops.txt", (data: GTFSStop) => {
    tree.insert(convertStop(data));
}).then(() => {
    fs.writeFileSync("data/gtfs/stops.json", JSON.stringify(tree.toJSON()), {
        flag: "w"
    });
});

