import { type LatLngTuple } from "leaflet"

export type LocationType =  0 | 1 | 2 | 3 | 4;
export type WheelchairBoarding = 0 | 1 | 2;

export interface GTFSStop {
    stop_id: string,
    stop_code: string,
    stop_name: string,
    stop_desc: string,
    zone_id: string,
    stop_url: string,
    location_type: "0" | "1" | "2" | "3" | "4",
    parent_station: string,
    stop_timezone: never,
    wheelchair_boarding: "0" | "1" | "2",
    stop_lat: string,
    stop_lon: string
}

export interface Stop {
    id: string,
    code: string,
    name: string,
    desc: string,
    zone: string, // CHANGE
    url: string,
    type: LocationType,
    parent: string | null,
    wheelchair_boarding: WheelchairBoarding,
    latlng: LatLngTuple
}
