import { Pane, Text } from "evergreen-ui";
import { useEffect, useRef, useState } from "react";
import Globe, { GlobeInstance } from "globe.gl";
import { airports } from "../data/airports";
import { flights } from "../data/flights";

interface FlightArc {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    fromCode: string;
    toCode: string;
}

interface AirportPoint {
    lat: number;
    lng: number;
    code: string;
}

interface FlightGlobeProps {
    darkMode: boolean;
}

const GLOBE_SIZE = 500;

const FlightGlobe = ({ darkMode }: FlightGlobeProps) => {
    const globeRef = useRef<HTMLDivElement>(null);
    const globeInstanceRef = useRef<GlobeInstance | null>(null);
    const activeAirportRef = useRef<string | null>(null);
    const lockedAirportRef = useRef<string | null>(null);
    const [displayedAirport, setDisplayedAirport] = useState<string | null>(
        null
    );

    const refreshGlobe = (globe: GlobeInstance) => {
        globe
            .arcColor(globe.arcColor())
            .arcStroke(globe.arcStroke())
            .arcDashLength(globe.arcDashLength())
            .arcDashGap(globe.arcDashGap())
            .arcDashAnimateTime(globe.arcDashAnimateTime())
            .pointColor(globe.pointColor())
            .pointRadius(globe.pointRadius());
    };

    useEffect(() => {
        if (!globeRef.current) return;

        const arcsData: FlightArc[] = flights
            .filter((f) => airports[f.from] && airports[f.to])
            .map((f) => ({
                startLat: airports[f.from].lat,
                startLng: airports[f.from].lng,
                endLat: airports[f.to].lat,
                endLng: airports[f.to].lng,
                fromCode: f.from,
                toCode: f.to,
            }));

        const airportCodes = new Set<string>();
        flights.forEach((f) => {
            if (airports[f.from]) airportCodes.add(f.from);
            if (airports[f.to]) airportCodes.add(f.to);
        });
        const pointsData: AirportPoint[] = Array.from(airportCodes).map(
            (code) => ({
                lat: airports[code].lat,
                lng: airports[code].lng,
                code,
            })
        );

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
            .arcColor((arc: object) => {
                const a = arc as FlightArc;
                const hovered = activeAirportRef.current;
                if (!hovered) return ["#009e93", "#009e93"];
                if (a.fromCode === hovered || a.toCode === hovered)
                    return ["#ffcc00", "#ffcc00"];
                return ["rgba(0,158,147,0.15)", "rgba(0,158,147,0.15)"];
            })
            .arcStroke((arc: object) => {
                const a = arc as FlightArc;
                const hovered = activeAirportRef.current;
                if (!hovered) return 0.5;
                return a.fromCode === hovered || a.toCode === hovered
                    ? 1.0
                    : 0.3;
            })
            .arcDashLength((arc: object) => {
                const a = arc as FlightArc;
                const hovered = activeAirportRef.current;
                if (hovered && (a.fromCode === hovered || a.toCode === hovered))
                    return 1;
                return 0.4;
            })
            .arcDashGap((arc: object) => {
                const a = arc as FlightArc;
                const hovered = activeAirportRef.current;
                if (hovered && (a.fromCode === hovered || a.toCode === hovered))
                    return 0;
                return 0.2;
            })
            .arcDashAnimateTime((arc: object) => {
                const a = arc as FlightArc;
                const hovered = activeAirportRef.current;
                if (hovered && (a.fromCode === hovered || a.toCode === hovered))
                    return 0;
                return 1500;
            })
            .pointsData(pointsData)
            .pointLat("lat")
            .pointLng("lng")
            .pointColor((point: object) => {
                const p = point as AirportPoint;
                return p.code === activeAirportRef.current
                    ? "#ffcc00"
                    : "#009e93";
            })
            .pointRadius((point: object) => {
                const p = point as AirportPoint;
                return p.code === activeAirportRef.current ? 0.8 : 0.5;
            })
            .pointAltitude(0.01)
            .onPointHover((point: object | null) => {
                if (lockedAirportRef.current) return;
                const p = point as AirportPoint | null;
                activeAirportRef.current = p?.code ?? null;
                setDisplayedAirport(p?.code ?? null);
                refreshGlobe(globe);
            })
            .onPointClick((point: object) => {
                const p = point as AirportPoint;
                lockedAirportRef.current = p.code;
                activeAirportRef.current = p.code;
                setDisplayedAirport(p.code);
                refreshGlobe(globe);
            })
            .onGlobeClick(() => {
                lockedAirportRef.current = null;
                activeAirportRef.current = null;
                setDisplayedAirport(null);
                refreshGlobe(globe);
            })
            .width(GLOBE_SIZE)
            .height(GLOBE_SIZE);

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
        <Pane position="relative" display="inline-block">
            <div ref={globeRef} />
            {displayedAirport && (
                <Text
                    position="absolute"
                    top={12}
                    left={12}
                    size={400}
                    fontWeight={700}
                    color={darkMode ? "white" : "default"}
                >
                    {displayedAirport}
                </Text>
            )}
        </Pane>
    );
};

export default FlightGlobe;
