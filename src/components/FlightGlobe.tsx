import { Pane } from "evergreen-ui";
import { useEffect, useRef } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import { airports } from "../data/airports";
import { flights } from "../data/flights";

interface FlightArc {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
}

interface FlightGlobeProps {
    darkMode: boolean;
}

const GLOBE_SIZE = 500;

const FlightGlobe = ({ darkMode }: FlightGlobeProps) => {
    const globeRef = useRef<HTMLDivElement>(null);
    const globeInstanceRef = useRef<GlobeInstance | null>(null);

    useEffect(() => {
        if (!globeRef.current) return;

        const arcsData: FlightArc[] = flights
            .filter((f) => airports[f.from] && airports[f.to])
            .map((f) => ({
                startLat: airports[f.from].lat,
                startLng: airports[f.from].lng,
                endLat: airports[f.to].lat,
                endLng: airports[f.to].lng,
            }));

        const airportCodes = new Set<string>();
        flights.forEach((f) => {
            if (airports[f.from]) airportCodes.add(f.from);
            if (airports[f.to]) airportCodes.add(f.to);
        });
        const pointsData = Array.from(airportCodes).map((code) => ({
            lat: airports[code].lat,
            lng: airports[code].lng,
        }));

        const globe = new Globe(globeRef.current)
            .globeImageUrl(
                "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            )
            .backgroundColor("rgba(0,0,0,0)")
            .arcsData(arcsData)
            .arcStartLat("startLat")
            .arcStartLng("startLng")
            .arcEndLat("endLat")
            .arcEndLng("endLng")
            .arcColor(() => ["#009e93", "#009e93"])
            .arcDashLength(0.4)
            .arcDashGap(0.2)
            .arcDashAnimateTime(1500)
            .arcStroke(0.5)
            .pointsData(pointsData)
            .pointLat("lat")
            .pointLng("lng")
            .pointColor(() => "#009e93")
            .pointRadius(0.5)
            .pointAltitude(0.0)
            .width(GLOBE_SIZE)
            .height(GLOBE_SIZE);

        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.5;
        globe.controls().enableZoom = true;

        globeInstanceRef.current = globe;

        return () => {
            if (globeInstanceRef.current) {
                globeInstanceRef.current._destructor();
            }
        };
    }, []);

    useEffect(() => {
        if (globeInstanceRef.current) {
            globeInstanceRef.current.backgroundColor("rgba(0,0,0,0)");
        }
    }, [darkMode]);

    return (
        <Pane
            display="flex"
            // justifyContent="center"
        >
            <div ref={globeRef} />
        </Pane>
    );
};

export default FlightGlobe;
