import RBush from "rbush";
import type { Stop } from "./gtfs.d.ts";

export class StopRBush extends RBush<Stop> {
    toBBox = ({latlng}: Stop) => ({minX: latlng[1], maxX: latlng[1], minY: latlng[0], maxY: latlng[0]});
    compareMinX = (a: Stop, b: Stop) => a.latlng[1] - b.latlng[1];
    compareMinY = (a: Stop, b: Stop) => a.latlng[0] - b.latlng[0];
}

