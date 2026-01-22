import { Pane, Text, Heading, majorScale } from "evergreen-ui";
import { useMemo, useState } from "react";
import { flights } from "../data/flights";
import { airlines } from "../data/airlines";

interface FlightStatsProps {
    darkMode: boolean;
}

const BAR_COLOR = "#6c63ff";
const DEFAULT_SHOW = 8;

interface StatItem {
    label: string;
    count: number;
}

const StatCard = ({
    title,
    total,
    totalLabel,
    items,
    darkMode,
}: {
    title: string;
    total: number;
    totalLabel: string;
    items: StatItem[];
    darkMode: boolean;
}) => {
    const [expanded, setExpanded] = useState(false);
    const displayItems = expanded ? items : items.slice(0, DEFAULT_SHOW);
    const maxCount = items[0]?.count ?? 1;

    return (
        <Pane marginBottom={majorScale(3)}>
            <Heading
                size={500}
                color={darkMode ? "white" : "default"}
                marginBottom={majorScale(1)}
            >
                {title}
            </Heading>
            <Pane
                display="flex"
                alignItems="baseline"
                gap={majorScale(1)}
                marginBottom={majorScale(2)}
            >
                <Text
                    size={600}
                    fontWeight={700}
                    color={darkMode ? "white" : "default"}
                >
                    {total}
                </Text>
                <Text size={300} color={darkMode ? "#888" : "muted"}>
                    {totalLabel}
                </Text>
            </Pane>
            {displayItems.map((item) => (
                <Pane
                    key={item.label}
                    display="flex"
                    alignItems="center"
                    marginBottom={4}
                    gap={majorScale(1)}
                >
                    <Text
                        size={300}
                        color={darkMode ? "#ccc" : "default"}
                        width={120}
                        flexShrink={0}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        {item.label}
                    </Text>
                    <Pane
                        flex={1}
                        height={16}
                        backgroundColor={darkMode ? "#333" : "#eee"}
                        borderRadius={4}
                    >
                        <Pane
                            height={16}
                            width={`${(item.count / maxCount) * 100}%`}
                            backgroundColor={BAR_COLOR}
                            borderRadius={4}
                        />
                    </Pane>
                    <Text
                        size={300}
                        color={darkMode ? "#ccc" : "default"}
                        width={30}
                        textAlign="right"
                    >
                        {item.count}
                    </Text>
                </Pane>
            ))}
            {items.length > DEFAULT_SHOW && (
                <Text
                    size={300}
                    color={BAR_COLOR}
                    cursor="pointer"
                    marginTop={majorScale(1)}
                    display="block"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded
                        ? "Show Less"
                        : `Show More (${items.length - DEFAULT_SHOW})`}
                </Text>
            )}
        </Pane>
    );
};

const FlightStats = ({ darkMode }: FlightStatsProps) => {
    const topAirports = useMemo(() => {
        const counts: Record<string, number> = {};
        flights.forEach((f) => {
            counts[f.from] = (counts[f.from] || 0) + 1;
            counts[f.to] = (counts[f.to] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([code, count]) => ({
                label: code,
                count,
            }))
            .sort((a, b) => b.count - a.count);
    }, []);

    const topAirlines = useMemo(() => {
        const counts: Record<string, number> = {};
        flights.forEach((f) => {
            counts[f.airline] = (counts[f.airline] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([code, count]) => ({
                label: airlines[code] ?? code,
                count,
            }))
            .sort((a, b) => b.count - a.count);
    }, []);

    const topRoutes = useMemo(() => {
        const counts: Record<string, number> = {};
        flights.forEach((f) => {
            const route = `${f.from}-${f.to}`;
            counts[route] = (counts[route] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([route, count]) => {
                const [from, to] = route.split("-");
                return { label: `${from} → ${to}`, count };
            })
            .sort((a, b) => b.count - a.count);
    }, []);

    const totalAirports = useMemo(() => {
        const codes = new Set<string>();
        flights.forEach((f) => {
            codes.add(f.from);
            codes.add(f.to);
        });
        return codes.size;
    }, []);

    return (
        <Pane
            height={500}
            overflowY="auto"
            flex={1}
            minWidth={300}
            paddingX={majorScale(2)}
        >
            <StatCard
                title="Top Airports"
                total={totalAirports}
                totalLabel="total airports"
                items={topAirports}
                darkMode={darkMode}
            />
            <StatCard
                title="Top Airlines"
                total={topAirlines.length}
                totalLabel="total airlines"
                items={topAirlines}
                darkMode={darkMode}
            />
            <StatCard
                title="Top Routes"
                total={topRoutes.length}
                totalLabel="total routes"
                items={topRoutes}
                darkMode={darkMode}
            />
        </Pane>
    );
};

export default FlightStats;
