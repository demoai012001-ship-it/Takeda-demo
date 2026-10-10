import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { activityData, hcps } from "@/lib/demo-data";
export function ActivityChart({ growth = false }: { growth?: boolean }) {
  return (
    <div className="chart-area">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={activityData} margin={{ top: 16, right: 12, left: -26, bottom: 0 }}>
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.18} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 4" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: 6,
              fontSize: 12,
            }}
          />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="interactions"
            name={growth ? "Influence growth" : "MSL interactions"}
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill="url(#area-fill)"
          />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey="publications"
            name="Scientific publications"
            stroke="var(--chart-2)"
            strokeWidth={2}
            fill="transparent"
            strokeDasharray="4 4"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export function ScoreChart() {
  return (
    <div className="chart-area">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={hcps.slice(0, 15)} margin={{ left: -30, right: 10, top: 15, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 4" />
          <XAxis
            dataKey="initials"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          />
          <YAxis
            domain={[0, 10]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          />
          <Tooltip
            labelFormatter={(_, payload) => payload?.[0]?.payload?.name}
            contentStyle={{
              background: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: 6,
            }}
          />
          <Bar isAnimationActive={false} dataKey="score" name="Engagement score" radius={[3, 3, 0, 0]}>
            {hcps.slice(0, 15).map((h, i) => (
              <Cell key={h.id} fill={i < 5 ? "var(--primary)" : "var(--chart-soft)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export function ProfileRadar() {
  const data = [
    "Publications",
    "Clinical trials",
    "Leadership",
    "Patient impact",
    "MSL engagement",
    "Conferences",
  ].map((name, i) => ({ name, value: [92, 84, 96, 78, 88, 90][i] }));
  return (
    <div className="radar-area">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
          <Radar dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.16} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
export function WorldMap() {
  return (
    <svg
      viewBox="0 0 680 290"
      className="world-map"
      role="img"
      aria-label="HCP distribution across world regions"
    >
      <g fill="var(--map-land)" stroke="var(--card)" strokeWidth="2">
        <path d="M54 74 82 40 133 28 179 41 190 69 223 82 197 108 177 115 164 145 137 133 122 111 90 101 81 81Z" />
        <path d="m160 142 30 1 25 22 8 34-20 40-17 32-15-18 1-36-14-34-8-20Z" />
        <path d="m202 24 40-12 27 13-12 31-33 5-20-20Z" />
        <path d="m309 73 26-21 37 2 15 19-18 22-36 4-21-12Z" />
        <path d="m328 105 40-11 37 23 9 41-22 43-20 20-21-27-16-41-15-27Z" />
        <path d="m371 58 42-25 72 1 58 22 60 12 17 35-37 22-40-6-24 26-20-8-22-28-23 10-18-25-32 6-35-15Z" />
        <path d="m472 129 21 11 17 32-14 25-16-24-12-20Z" />
        <path d="m522 175 32 2 15 12-26 10-24-8Z" />
        <path d="m553 213 40-20 30 13 15 35-27 15-53-15Z" />
        <path d="m638 253 10-9 8 18-14 12Z" />
      </g>
      <g className="map-dots">
        {([
          [128, 83, 15],
          [350, 78, 13],
          [520, 92, 11],
          [190, 192, 8],
          [402, 116, 7],
        ] as const).map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r + 8} fill="var(--primary)" opacity=".08" />
            <circle cx={x} cy={y} r={r} fill="var(--primary)" opacity=".17" />
            <circle cx={x} cy={y} r="4" fill="var(--primary)" />
          </g>
        ))}
      </g>
    </svg>
  );
}
export function KnowledgeGraph() {
  const points: [number, number][] = [
    [260, 140],
    [110, 65],
    [405, 55],
    [440, 180],
    [355, 265],
    [145, 245],
    [65, 155],
    [280, 35],
  ];
  return (
    <svg
      viewBox="0 0 520 310"
      className="network"
      role="img"
      aria-label="Scientific collaboration network"
    >
      {points.slice(1).map(([x, y], i) => (
        <g key={i}>
          <line x1="260" y1="140" x2={x} y2={y} stroke="var(--border)" strokeWidth="2" />
          <line
            x1={x}
            y1={y}
            x2={points[(i + 2) % points.length]?.[0] ?? 260}
            y2={points[(i + 2) % points.length]?.[1] ?? 140}
            stroke="var(--border)"
            strokeDasharray="4 4"
          />
        </g>
      ))}
      {points.map(([x, y], i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={y}
            r={i === 0 ? 39 : 24}
            fill={i === 0 ? "var(--primary)" : "var(--secondary)"}
            stroke={i === 0 ? "var(--primary)" : "var(--border)"}
          />
          <text
            x={x}
            y={y + 4}
            textAnchor="middle"
            fill={i === 0 ? "var(--primary-foreground)" : "var(--foreground)"}
            fontSize={i === 0 ? 12 : 10}
          >
            {["HCP", "Trials", "Research", "Peers", "Congress", "MSL", "Policy", "IBD"][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
