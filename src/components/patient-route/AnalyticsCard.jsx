"use client"
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { ChevronDown } from "lucide-react";

const heartRateData = [
    { day: "Sat", value: 136 },
    { day: "Sun", value: 152 },
    { day: "Mon", value: 124 },
    { day: "Tue", value: 137 },
    { day: "Wed", value: 167 },
    { day: "Thu", value: 131 },
    { day: "Fri", value: 116 },
];

const bloodPressureData = [
    { day: "Sat", value: 120 },
    { day: "Sun", value: 118 },
    { day: "Mon", value: 122 },
    { day: "Tue", value: 125 },
    { day: "Wed", value: 119 },
    { day: "Thu", value: 121 },
    { day: "Fri", value: 117 },
];

const glucoseData = [
    { day: "Sat", value: 95 },
    { day: "Sun", value: 102 },
    { day: "Mon", value: 88 },
    { day: "Tue", value: 91 },
    { day: "Wed", value: 98 },
    { day: "Thu", value: 93 },
    { day: "Fri", value: 87 },
];

// type MetricType = "Heart Rate" | "Blood Pressure" | "Glucose";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg">
                {payload[0].value} bpm
            </div>
        );
    }
    return null;
};

export function AnalyticsCard() {
    const [activeMetric, setActiveMetric] = useState("Heart Rate");
    const [timePeriod, setTimePeriod] = useState("weekly");
    const [hoveredIndex, setHoveredIndex] = useState(4);

    const getCurrentData = () => {
        switch (activeMetric) {
            case "Heart Rate":
                return heartRateData;
            case "Blood Pressure":
                return bloodPressureData;
            case "Glucose":
                return glucoseData;
            default:
                return heartRateData;
        }
    };

    const data = getCurrentData();
    const maxValue = Math.max(...data.map(d => d.value));
    const hoveredValue = hoveredIndex !== null ? data[hoveredIndex]?.value : null;

    return (
        <Card className="w-full p-3 sm:p-5 bg-white border-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-semibold">Analytics</h2>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                    <SelectTrigger className="w-full sm:w-[140px] border-none bg-gray-50 rounded-lg sm:rounded-xl text-xs sm:text-sm">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Metric Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                <button
                    onClick={() => setActiveMetric("Heart Rate")}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-xs sm:text-sm ${activeMetric === "Heart Rate"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                >
                    Heart Rate
                </button>
                <button
                    onClick={() => setActiveMetric("Blood Pressure")}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-xs sm:text-sm ${activeMetric === "Blood Pressure"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                >
                    Blood Pressure
                </button>
                <button
                    onClick={() => setActiveMetric("Glucose")}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-xs sm:text-sm ${activeMetric === "Glucose"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                >
                    Glucose
                </button>
                <button
                    className="px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all text-xs sm:text-sm"
                >
                    4+
                </button>
            </div>

            {/* Chart */}
            <div className="w-full h-40 sm:h-60 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                        onMouseMove={(state) => {
                            if (state.isTooltipActive) {
                                setHoveredIndex(state.activeTooltipIndex);
                            }
                        }}
                        onMouseLeave={() => {
                            setHoveredIndex(null);
                        }}
                    >
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                            domain={[0, 180]}
                            ticks={[0, 20, 40, 60, 80, 100, 120, 140, 160, 180]}
                            width={30}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={false}
                            position={{ y: 0 }}
                        />
                        {hoveredValue && (
                            <ReferenceLine
                                y={hoveredValue}
                                stroke="#9ca3af"
                                strokeDasharray="5 5"
                                strokeWidth={1}
                            />
                        )}
                        <Bar
                            dataKey="value"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={60}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={hoveredIndex === index ? "#6366f1" : "#e0e7ff"}
                                    stroke={hoveredIndex === index ? "#4f46e5" : "#c7d2fe"}
                                    strokeWidth={2}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
