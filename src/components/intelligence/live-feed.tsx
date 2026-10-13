import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Pause, RotateCcw, Sparkles, Siren, ArrowUp, ArrowDown, Bot, Radio } from "lucide-react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { Panel } from "./shared";
import {
  liveRoster,
  priorityFor,
  recencyMultiplier,
  frequencyMultiplier,
  seeded,
  signalTypes,
  sources,
  whatIf,
} from "@/lib/live-feed";

type Ev = {
  id: number;
  time: string;
  hcpId: string;
  name: string;
  institution: string;
  label: string;
  type: string;
  tier: string;
  source: string;
  base: number;
  reliability: number;
  daysAgo: number;
  recency: number;
  freq: number;
  delta: number;
};
type Alert = { id: number; title: string; why: string };

const regionsList = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];

export function LiveFeed() {
  const [running, setRunning] = useState(false);
  const [scores, setScores] = useState(() => Object.fromEntries(liveRoster.map((h) => [h.id, h.score])));
  const [prevRank, setPrevRank] = useState<Record<string, number>>({});
  const [events, setEvents] = useState<Ev[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [insights, setInsights] = useState<string[]>([
    "Copilot is standing by. Start the live feed to stream scientific signals.",
  ]);
  const [history, setHistory] = useState<{ t: number; avg: number }[]>([{ t: 0, avg: avgOf(scores) }]);
  const [pulse, setPulse] = useState<string | null>(null);
  const rand = useRef(seeded(42));
  const counter = useRef(0);
  const scoresRef = useRef(scores);
  scoresRef.current = scores;

  const ranking = useMemo(
    () => [...liveRoster].sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0)),
    [scores],
  );

  useEffect(() => {
    if (!running) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const r = rand.current;
      counter.current += 1;
      const n = counter.current;
      // Bias the story: Dr. Jane Smith gets frequent high-impact signals early.
      const hcp = n % 3 === 1 ? liveRoster[1]! : liveRoster[Math.floor(r() * liveRoster.length)]!;
      const sig = n % 3 === 1 ? signalTypes[Math.floor(r() * 4)]! : signalTypes[Math.floor(r() * signalTypes.length)]!;
      const prior = 0;
      const daysAgo = [0, 1, 3, 12, 25, 45][Math.floor(r() * 6)]!;
      const recency = recencyMultiplier(daysAgo);
      setEvents((prev) => {
        const priorCount = prev.filter((e) => e.hcpId === hcp.id).length + prior;
        const freq = frequencyMultiplier(priorCount);
        const delta = Math.round(sig.points * sig.reliability * recency * freq * 10) / 10;
        const before = Object.fromEntries(
          [...liveRoster].sort((a, b) => scoresRef.current[b.id]! - scoresRef.current[a.id]!).map((h, i) => [h.id, i]),
        );
        const oldScore = scoresRef.current[hcp.id]!;
        const next = { ...scoresRef.current, [hcp.id]: Math.round((oldScore + delta) * 10) / 10 };
        const after = [...liveRoster].sort((a, b) => next[b.id]! - next[a.id]!);
        const newRank = after.findIndex((h) => h.id === hcp.id);
        setPrevRank(before);
        setScores(next);
        setHistory((h) => [...h.slice(-19), { t: n, avg: avgOf(next) }]);
        setPulse(hcp.id);
        const ev: Ev = {
          id: n,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          hcpId: hcp.id,
          name: hcp.name,
          institution: hcp.institution,
          label: sig.label,
          type: sig.type,
          tier: sig.tier,
          source: sig.source,
          base: sig.points,
          reliability: sig.reliability,
          daysAgo,
          recency,
          freq,
          delta,
        };
        // Alerts
        const newAlerts: Alert[] = [];
        if (priorityFor(oldScore) !== "High" && priorityFor(next[hcp.id]!) === "High")
          newAlerts.push({ id: n, title: "Emerging Influencer Detected", why: `${hcp.name} crossed the 80-point High priority threshold after a ${sig.tier.toLowerCase()}-impact ${sig.type.toLowerCase()}.` });
        if (newRank < before[hcp.id]! && newRank === 0)
          newAlerts.push({ id: n + 0.1, title: "Rising KOL Identified", why: `${hcp.name} moved to #1 on the influencer leaderboard (+${delta} pts).` });
        if (priorCount >= 2)
          newAlerts.push({ id: n + 0.2, title: "Scientific Activity Spike", why: `${priorCount + 1} signals for ${hcp.name} this session — frequency multiplier ${freq.toFixed(2)}x applied.` });
        if (sig.tier === "High" && priorCount === 1)
          newAlerts.push({ id: n + 0.3, title: "Recommended Medical Affairs Engagement", why: `Schedule scientific exchange with ${hcp.name}: repeated high-impact activity in ${hcp.region}.` });
        if (newAlerts.length) setAlerts((a) => [...newAlerts, ...a].slice(0, 5));
        const all = [ev, ...prev];
        setInsights(copilot(all, next));
        return all.slice(0, 40);
      });
      timer = setTimeout(tick, 2000 + rand.current() * 3000);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [running]);

  useEffect(() => {
    if (!pulse) return;
    const t = setTimeout(() => setPulse(null), 1200);
    return () => clearTimeout(t);
  }, [pulse]);

  const reset = () => {
    setRunning(false);
    rand.current = seeded(42);
    counter.current = 0;
    const s = Object.fromEntries(liveRoster.map((h) => [h.id, h.score]));
    setScores(s);
    setPrevRank({});
    setEvents([]);
    setAlerts([]);
    setHistory([{ t: 0, avg: avgOf(s) }]);
    setInsights(["Copilot is standing by. Start the live feed to stream scientific signals."]);
  };

  const latest = events[0];
  const waterfall = latest
    ? [
        { name: "Base signal", value: latest.base },
        { name: "Reliability", value: Math.round(latest.base * (latest.reliability - 1) * 10) / 10 },
        { name: "Recency", value: Math.round(latest.base * latest.reliability * (latest.recency - 1) * 10) / 10 },
        { name: "Frequency", value: Math.round(latest.base * latest.reliability * latest.recency * (latest.freq - 1) * 10) / 10 },
        { name: "Total", value: latest.delta },
      ]
    : [];
  const contribByTier = ["High", "Medium", "Low"].map((tier) => ({
    tier,
    value: Math.round(events.filter((e) => e.tier === tier).reduce((s, e) => s + e.delta, 0) * 10) / 10,
  }));
  const regionActivity = regionsList.map((r) => ({
    region: r.replace(" America", " Am."),
    value: events.filter((e) => liveRoster.find((h) => h.id === e.hcpId)?.region === r).length,
  }));
  const highCount = ranking.filter((h) => priorityFor(scores[h.id]!) === "High").length;
  const totalDelta = events.reduce((s, e) => s + e.delta, 0);

  const jane = liveRoster[1]!;
  const janeScore = scores[jane.id]!;

  return (
    <main className="content live-feed">
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span className={`status-dot ${running ? "" : "idle"}`} /> FLAGSHIP · REAL-TIME COMMAND CENTER
          </div>
          <h1>Live Scientific Intelligence Feed</h1>
          <p className="page-description">
            Simulated real-time signals from connected scientific sources, scored and explained instantly.
          </p>
        </div>
        <div className="heading-actions">
          <Button variant="outline" onClick={reset}>
            <RotateCcw /> Reset
          </Button>
          <Button onClick={() => setRunning(!running)} className="live-start">
            {running ? <Pause /> : <Play />}
            {running ? "Pause live feed" : events.length ? "Resume live feed" : "Start Live Feed"}
          </Button>
        </div>
      </div>

      <div className="source-strip">
        {sources.map((s) => (
          <span key={s} className={`source-chip ${running ? "on" : ""}`}>
            <span className="source-dot" /> {s}
          </span>
        ))}
      </div>

      <div className="kpi-grid live-kpis">
        <Kpi label="Signals processed" value={String(events.length)} />
        <Kpi label="Score points added" value={`+${totalDelta.toFixed(1)}`} />
        <Kpi label="High priority (tracked)" value={`${highCount} / ${liveRoster.length}`} />
        <Kpi label="Avg. engagement score" value={avgOf(scores).toFixed(1)} />
        <Kpi label="Active alerts" value={String(alerts.length)} />
        <Kpi label="Feed status" value={running ? "LIVE" : "Paused"} />
      </div>

      <div className="live-grid">
        <Panel title="Real-time activity stream" subtitle="Timestamp · source · impact · physician" action={<Radio size={15} className={running ? "text-primary live-blink" : "text-muted-foreground"} />}>
          <div className="stream">
            {events.length === 0 && <p className="empty">Press “Start Live Feed” to begin streaming signals.</p>}
            {events.map((e) => (
              <div key={e.id} className="stream-item">
                <span className={`tier-pill ${e.tier}`}>{e.tier}</span>
                <div className="stream-body">
                  <strong>{e.label}</strong>
                  <span>
                    <Link to="/hcp/$id" params={{ id: e.hcpId }}>{e.name}</Link> · {e.institution}
                  </span>
                  <small>
                    {e.time} · {e.source} · activity {e.daysAgo === 0 ? "today" : `${e.daysAgo}d ago`}
                  </small>
                </div>
                <span className="stream-delta">+{e.delta}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Live influencer leaderboard" subtitle="Rankings recalculate on every signal">
          <div className="live-board" style={{ height: ranking.length * 46 }}>
            {ranking.map((h, i) => {
              const was = prevRank[h.id];
              const move = was === undefined ? 0 : was - i;
              const s = scores[h.id]!;
              return (
                <div key={h.id} className={`live-row ${pulse === h.id ? "pulse" : ""}`} style={{ transform: `translateY(${i * 46}px)` }}>
                  <span className="live-rank">#{i + 1}</span>
                  <span className="avatar sm">{h.initials}</span>
                  <span className="live-name">{h.name}</span>
                  <span className={`badge ${priorityFor(s)}`}>{priorityFor(s)}</span>
                  <strong className="live-score">{s.toFixed(1)}</strong>
                  <span className="live-move">
                    {move > 0 && <ArrowUp className="positive" size={14} />}
                    {move < 0 && <ArrowDown className="negative" size={14} />}
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <div className="live-grid three">
        <Panel title="AI explainability" subtitle={latest ? `Why ${latest.name}'s score changed` : "Waiting for the first signal"} action={<Sparkles size={15} className="text-primary" />}>
          {latest ? (
            <>
              <div className="explain-list">
                <div><span>{latest.type}</span><strong>+{latest.base} pts</strong></div>
                <div><span>Source reliability</span><strong>×{latest.reliability.toFixed(2)}</strong></div>
                <div><span>Recency multiplier</span><strong>×{latest.recency.toFixed(1)}</strong></div>
                <div><span>Frequency multiplier</span><strong>×{latest.freq.toFixed(2)}</strong></div>
                <div className="total"><span>Total increase</span><strong>+{latest.delta} pts</strong></div>
              </div>
              <div style={{ height: 150 }}>
                <ResponsiveContainer>
                  <BarChart data={waterfall}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} width={28} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {waterfall.map((w, i) => (
                        <Cell key={i} fill={w.name === "Total" ? "var(--primary)" : "var(--chart-2)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p className="empty">Each score update will be broken down into signal, reliability, recency and frequency.</p>
          )}
        </Panel>

        <Panel title="Recency intelligence" subtitle="Recent activity carries more weight">
          <div className="recency-bars">
            {[
              ["Last 7 days", 1.2, "Highest impact"],
              ["Last 30 days", 1.0, "Medium impact"],
              ["Last 90 days", 0.8, "Standard impact"],
              ["Older", 0.5, "Reduced impact"],
            ].map(([l, m, d]) => (
              <div key={l as string}>
                <span>{l}<small>{d}</small></span>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${((m as number) / 1.2) * 100}%` }} /></div>
                <strong>×{(m as number).toFixed(1)}</strong>
              </div>
            ))}
          </div>
          <h3 className="mini-title">Contribution by impact tier</h3>
          <div style={{ height: 110 }}>
            <ResponsiveContainer>
              <BarChart data={contribByTier} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="tier" tick={{ fontSize: 11 }} width={60} />
                <Tooltip />
                <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} isAnimationActive />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="AI alerts" subtitle="Generated automatically, with reasons" action={<Siren size={15} className="text-primary" />}>
          <div className="alerts">
            {alerts.length === 0 && <p className="empty">No alerts yet.</p>}
            {alerts.map((a) => (
              <div key={a.id} className="alert-item">
                <strong>🚨 {a.title}</strong>
                <p>{a.why}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="live-grid three">
        <Panel title="Average engagement score" subtitle="Recalculated in real time">
          <div style={{ height: 180 }}>
            <ResponsiveContainer>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="t" tick={{ fontSize: 10 }} />
                <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10 }} width={32} />
                <Tooltip />
                <Line dataKey="avg" stroke="var(--primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <h3 className="mini-title">Signals by region</h3>
          <div style={{ height: 120 }}>
            <ResponsiveContainer>
              <BarChart data={regionActivity}>
                <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} width={24} />
                <Bar dataKey="value" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="What-if scenario simulator" subtitle={`Forecast for ${jane.name} · current ${janeScore.toFixed(1)}`}>
          <div className="whatif">
            {whatIf.map((w) => {
              const future = janeScore + w.delta;
              const rank = [...liveRoster].filter((h) => h.id !== jane.id && scores[h.id]! > future).length + 1;
              return (
                <div key={w.label} className="whatif-item">
                  <span>If {jane.name.replace("Dr. ", "Dr. ")} {w.label.toLowerCase()}</span>
                  <strong>
                    {janeScore.toFixed(1)} → {future.toFixed(1)}
                  </strong>
                  <small>
                    Predicted rank #{rank} · {priorityFor(future)} influence
                  </small>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Medical Affairs Copilot" subtitle="Continuously generated insights" action={<Bot size={15} className="text-primary" />}>
          <div className="copilot">
            {insights.map((t, i) => (
              <p key={t + i} className="copilot-msg">{t}</p>
            ))}
          </div>
        </Panel>
      </div>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="kpi">
      <div className="kpi-top"><span>{label}</span></div>
      <div className="kpi-value live-value" key={value}>{value}</div>
    </div>
  );
}

function avgOf(s: Record<string, number>) {
  const v = Object.values(s);
  return v.reduce((a, b) => a + b, 0) / v.length;
}

function copilot(all: Ev[], scores: Record<string, number>) {
  const out: string[] = [];
  const promoted = liveRoster.filter((h) => h.score < 80 && scores[h.id]! >= 80).length;
  if (promoted) out.push(`${promoted} HCP${promoted > 1 ? "s" : ""} moved from Medium to High Priority this session.`);
  const pubs = all.filter((e) => e.source === "Publications Database").length;
  if (pubs) out.push(`New publication activity increased by ${Math.round((pubs / all.length) * 100)}% of incoming signals.`);
  const top = [...liveRoster].sort((a, b) => scores[b.id]! - scores[a.id]! - (a.score - b.score) * 0)[0]!;
  const gains = liveRoster
    .map((h) => ({ h, g: scores[h.id]! - h.score }))
    .sort((a, b) => b.g - a.g)[0]!;
  if (gains.g > 0) out.push(`${gains.h.name} should be prioritized for scientific engagement (+${gains.g.toFixed(1)} pts).`);
  const byType: Record<string, number> = {};
  all.forEach((e) => (byType[e.type] = (byType[e.type] ?? 0) + e.delta));
  const driver = Object.entries(byType).sort((a, b) => b[1] - a[1])[0];
  if (driver) out.push(`${driver[0]} is the largest score driver right now.`);
  out.push(`${top.name} currently leads the influencer leaderboard.`);
  return out;
}
