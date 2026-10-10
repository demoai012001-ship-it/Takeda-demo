import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Users,
  Trophy,
  TrendingUp,
  Target,
  CircleDot,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  FileText,
  Activity,
  MoreHorizontal,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { hcps, regions } from "@/lib/demo-data";
import { Panel, PageHeading, HCPTable, Footer } from "./shared";
import { ActivityChart, ScoreChart, WorldMap } from "./charts";
const kpis = [
  {
    label: "Total HCPs",
    value: "1,248",
    change: "8.2",
    note: "vs. last quarter",
    icon: Users,
    path: "/explorer",
  },
  {
    label: "Top influencers",
    value: "86",
    change: "12.4",
    note: "vs. last quarter",
    icon: Trophy,
    path: "/leaderboard",
  },
  {
    label: "Emerging influencers",
    value: "124",
    change: "18.6",
    note: "vs. last quarter",
    icon: TrendingUp,
    path: "/emerging",
  },
  {
    label: "High priority",
    value: "424",
    change: "9.8",
    note: "34% of total HCPs",
    icon: Target,
    path: "/explorer",
  },
  {
    label: "Medium priority",
    value: "512",
    change: "5.3",
    note: "41% of total HCPs",
    icon: CircleDot,
    path: "/explorer",
  },
  {
    label: "Low priority",
    value: "312",
    change: "2.1",
    note: "25% of total HCPs",
    icon: Users,
    path: "/explorer",
  },
] as const;
export function Dashboard() {
  const [region, setRegion] = useState("All regions");
  const [specialty, setSpecialty] = useState("All specialties");
  const [period, setPeriod] = useState("This quarter");
  const rows = hcps.filter(
    (h) =>
      (region === "All regions" || h.region === region) &&
      (specialty === "All specialties" || h.specialty === specialty),
  );
  const scope = region === "All regions" ? null : regions.find((r) => r.name === region);
  return (
    <main className="content">
      <PageHeading
        title="Executive dashboard"
        description="A connected view of scientific influence. Smarter engagement. Greater impact."
        engine
      />
      <div className="toolbar">
        <div className="filter-group">
          <Globe2 size={14} className="text-muted-foreground" />
          <select
            aria-label="Filter region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option>All regions</option>
            {regions.map((r) => (
              <option key={r.name}>{r.name}</option>
            ))}
          </select>
          <select
            aria-label="Filter specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option>All specialties</option>
            <option>IBD Specialist</option>
            <option>Gastroenterology</option>
            <option>Clinical Research</option>
          </select>
          <select
            aria-label="Dashboard period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>This quarter</option>
            <option>This month</option>
            <option>Last quarter</option>
          </select>
        </div>
        <span className="live-label">
          <span className="status-dot" /> Last updated today, 12:02 UTC
        </span>
      </div>
      <div className="kpi-grid">
        {kpis.map((k, i) => (
          <Link
            to={k.path}
            search={
              k.path === "/explorer"
                ? {
                    priority: i === 3 ? "High" : i === 4 ? "Medium" : i === 5 ? "Low" : "",
                    region: scope?.name ?? "",
                    specialty: specialty === "All specialties" ? "" : specialty,
                  }
                : {}
            }
            className="kpi"
            key={k.label}
          >
            <div className="kpi-top">
              <span>{k.label}</span>
              <span className="kpi-icon">
                <k.icon />
              </span>
            </div>
            <div className="kpi-value">
              {scope
                ? Math.round((Number(k.value.replace(",", "")) * scope.percent) / 100)
                : specialty !== "All specialties"
                  ? Math.round(Number(k.value.replace(",", "")) * 0.46)
                  : period === "This month"
                    ? Math.round(Number(k.value.replace(",", "")) * 0.8)
                    : k.value}
            </div>
            <div className="kpi-foot">
              <ArrowUpRight />
              <span className="positive">{k.change}%</span>
              <span>{k.note}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="dashboard-top">
        <Panel
          title="Priority segmentation"
          subtitle="Scientific engagement prioritization"
          action={<MoreHorizontal size={15} className="text-muted-foreground" />}
        >
          <div className="donut-wrap">
            <div className="donut" />
            <div className="donut-hole">
              <strong>{scope ? scope.count : "1,248"}</strong>
              <small>Total physicians</small>
            </div>
          </div>
          <div className="priority-legend">
            <div>
              <span className="legend-dot" />
              High<strong>34% · {scope ? Math.round(scope.count * 0.34) : 424}</strong>
            </div>
            <div>
              <span className="legend-dot secondary" />
              Medium<strong>41% · {scope ? Math.round(scope.count * 0.41) : 512}</strong>
            </div>
            <div>
              ● Low<strong>25% · {scope ? Math.round(scope.count * 0.25) : 312}</strong>
            </div>
          </div>
        </Panel>
        <Panel
          title="Top 15 HCP scores"
          subtitle="AI-powered scientific engagement score"
          action={<span className="badge">Score /10</span>}
        >
          <ScoreChart />
          <div className="chart-legend">
            <span>
              <span className="legend-dot" />
              Top influencers
            </span>
            <span>All ranked physicians</span>
          </div>
        </Panel>
        <Panel
          title="HCP distribution"
          subtitle={region === "All regions" ? "Scientific reach across regions" : region}
          action={<Globe2 size={14} className="text-muted-foreground" />}
        >
          <WorldMap />
          <div className="region-list">
            {regions.slice(0, 3).map((r) => (
              <div key={r.name}>
                <span>{r.name}</span>
                <strong>
                  {r.count} <span className="positive">({r.percent}%)</span>
                </strong>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <span>5 regions · 32 countries</span>
            <Link to="/explorer" className="link-action">
              Explore <ArrowRight />
            </Link>
          </div>
        </Panel>
      </div>
      <div className="dashboard-bottom">
        <Panel
          title="Monthly engagement activity"
          subtitle="Scientific signals and interactions over time"
          action={
            <span className="badge green">
              <ArrowUpRight size={10} />
              24.8% vs. previous period
            </span>
          }
        >
          <ActivityChart />
          <div className="chart-legend">
            <span>
              <span className="legend-dot" />
              MSL interactions
            </span>
            <span>
              <span className="legend-dot secondary" />
              Scientific publications
            </span>
          </div>
        </Panel>
        <Panel
          title="AI intelligence brief"
          subtitle="Signals that matter. Actions that make a difference."
          className="insight-panel"
          action={<Sparkles size={17} className="text-primary" />}
        >
          <div className="panel-content">
            <div className="insight-item">
              <div className="insight-icon">
                <TrendingUp />
              </div>
              <div>
                <strong>5 HCPs show rapidly increasing engagement</strong>
                <p>Scientific activity is accelerating across key IBD thought leaders.</p>
                <Link to="/emerging">
                  Explore rising influencers <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon">
                <FileText />
              </div>
              <div>
                <strong>3 KOLs published new research this month</strong>
                <p>New publications highlight evolving treatment approaches.</p>
                <Link to="/signals">
                  Review scientific signals <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon">
                <Target />
              </div>
              <div>
                <strong>2 emerging influencers moved to high priority</strong>
                <p>Recommended for proactive scientific engagement.</p>
                <Link to="/recommendations">
                  View recommendations <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </Panel>
      </div>
      <div className="dashboard-bottom">
        <Panel
          title="Top influential HCPs"
          subtitle="Leading voices shaping the IBD scientific landscape"
          action={
            <Link to="/leaderboard" className="link-action">
              View leaderboard <ArrowRight />
            </Link>
          }
        >
          <div className="h-4" />
          <HCPTable rows={rows.slice(0, 5)} compact />
          <div className="section-footer">
            <span>
              Showing {Math.min(5, rows.length)} of {scope ? scope.count : "1,248"} physicians
            </span>
            <span>Ranked by scientific engagement</span>
          </div>
        </Panel>
        <Panel
          title="Scientific activity by region"
          subtitle="Intensity of scientific engagement · Last 6 months"
          action={<Activity size={14} className="text-muted-foreground" />}
        >
          <div className="panel-content">
            <div className="heatmap-grid">
              <span />
              {["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => (
                <span key={m} className="heat-label text-center">
                  {m}
                </span>
              ))}
              {regions.map((r, i) => (
                <RegionHeat key={r.name} name={r.name} index={i} />
              ))}
            </div>
          </div>
          <div className="section-footer">
            <span>Activity intensity</span>
            <span>Low ░ ▒ ▓ High</span>
          </div>
        </Panel>
      </div>
      <Footer />
    </main>
  );
}
function RegionHeat({ name, index }: { name: string; index: number }) {
  return (
    <>
      <span className="heat-label">{name}</span>
      {Array.from({ length: 6 }, (_, i) => {
        const n = ([62, 78, 54, 86, 92, 98][i] ?? 62) - index * 11;
        return (
          <span
            className={`heat-cell ${n > 79 ? "hot" : n > 55 ? "mid" : ""}`}
            key={i}
            title={`${name}: ${n} activity signals`}
          >
            {n}
          </span>
        );
      })}
    </>
  );
}
