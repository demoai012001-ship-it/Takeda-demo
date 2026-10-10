import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  Check,
  FileText,
  FlaskConical,
  MessageSquare,
  Mic,
  Play,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  ShieldAlert,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { hcps, signals, regions, alignmentWeights, evolvedScore } from "@/lib/demo-data";
import {
  Panel,
  PageHeading,
  HCPTable,
  Footer,
  Badge,
  Avatar,
  Trend,
  ScheduleModal,
} from "./shared";
import { ActivityChart, ProfileRadar, KnowledgeGraph } from "./charts";
import physician from "@/assets/physician.jpg";
const signalIcons = [FileText, MessageSquare, Mic, FlaskConical, Users, Trophy];
export function Signals() {
  const [filter, setFilter] = useState("All signals");
  const [live, setLive] = useState(true);
  const [newSignal, setNewSignal] = useState(false);
  const data = signals.filter((s) => filter === "All signals" || s.type === filter);
  return (
    <main className="content">
      <PageHeading
        title="Engagement signals"
        description="Follow the scientific activity shaping influence, in near real time."
      />
      <div className="toolbar">
        <div className="filter-group">
          <select
            aria-label="Signal type"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All signals</option>
            {signals.map((s) => (
              <option key={s.type}>{s.type}</option>
            ))}
          </select>
          <Button variant="outline" onClick={() => setNewSignal(true)} disabled={newSignal}>
            <Plus />
            Simulate new signal
          </Button>
        </div>
        <Button variant="ghost" onClick={() => setLive(!live)}>
          <span className="status-dot" />
          {live ? "Live feed enabled" : "Feed paused"}
        </Button>
      </div>
      <div className="grid-two">
        <Panel title="Scientific activity timeline" subtitle="Latest activity · October 10, 2026">
          <div className="timeline-label">
            TODAY · {data.length + (newSignal ? 1 : 0)} SCIENTIFIC SIGNALS
          </div>
          {newSignal && (
            <div className="feed-item">
              <div className="feed-icon">
                <FileText />
              </div>
              <div className="feed-body">
                <span className="badge green">New signal</span>
                <h3>Dr. Jane Smith · New IBD research published</h3>
                <p>Simulated peer-reviewed publication detected just now.</p>
              </div>
              <div className="feed-impact">
                <strong>+0.8</strong>
                <small>Score impact</small>
              </div>
            </div>
          )}
          {data.map((s, i) => {
            const Icon = signalIcons[signals.indexOf(s)] ?? Activity;
            return (
              <div className="feed-item" key={s.type}>
                <div className="feed-icon">
                  <Icon />
                </div>
                <div className="feed-body">
                  <span className="badge">{s.type}</span>
                  <h3>{s.title}</h3>
                  <Link
                    to="/hcp/$id"
                    params={{ id: hcps.find((h) => h.name === s.name)?.id ?? "1" }}
                    className="text-primary text-xs"
                  >
                    {s.name}
                  </Link>
                  <p>{s.detail}</p>
                  <p>{s.time}</p>
                </div>
                <div className="feed-impact">
                  <strong>+{s.impact}</strong>
                  <small>Score impact</small>
                  <div className="mt-3">
                    <Badge priority={s.level} />
                  </div>
                </div>
              </div>
            );
          })}
        </Panel>
        <div>
          <Panel
            title="Dynamic signal contribution"
            subtitle="Scientific activity powering engagement scores"
          >
            <div className="panel-content">
              {[
                { name: "MSL interactions", v: 32 },
                { name: "Scientific publications", v: 26 },
                { name: "Clinical trials", v: 18 },
                { name: "Congress participation", v: 14 },
                { name: "Advisory boards", v: 10 },
              ].map((s) => (
                <div className="coverage-row" key={s.name}>
                  <span>{s.name}</span>
                  <div className="coverage-track">
                    <div style={{ width: `${s.v * 2}%` }} />
                  </div>
                  <strong>{s.v}%</strong>
                </div>
              ))}
            </div>
          </Panel>
          <div className="mt-5">
            <Panel title="Engagement activity trend" subtitle="Quarterly scientific momentum">
              <ActivityChart />
            </Panel>
          </div>
          <div className="mt-5">
            <Panel title="Signal quality" className="insight-panel">
              <div className="panel-content">
                <div className="eyebrow">
                  <Check size={15} />
                  VALIDATED SCIENTIFIC SIGNALS
                </div>
                <p className="page-description">
                  Signals are assessed for scientific relevance, source credibility, and engagement
                  impact.
                </p>
                <div className="flex justify-between mt-5">
                  <strong>98.4% source confidence</strong>
                  <span className="badge green">Demo model</span>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
const stages = [
  "Collecting data",
  "Analyzing scientific signals",
  "Generating features",
  "Building influence network",
  "Calculating engagement score",
  "Predicting future influence",
];
export function Engine() {
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () =>
        setStep((s) => {
          if (s >= 5) {
            setRunning(false);
            return 6;
          }
          return s + 1;
        }),
      850,
    );
    return () => clearInterval(timer);
  }, [running]);
  return (
    <main className="content">
      <PageHeading
        title="AI scientific engagement engine"
        description="Connect scientific signals. Understand influence. Unlock the next opportunity."
      />
      <div className="grid-two">
        <Panel
          title="Scientific intelligence pipeline"
          subtitle="Explainable engagement scoring · Simulated analysis"
          action={<span className="badge">AI ENGINE</span>}
        >
          <div className="panel-content">
            {stages.map((s, i) => (
              <div
                key={s}
                className={`engine-stage ${step > i ? "done" : step === i ? "current" : ""}`}
              >
                <div className="stage-number">{step > i ? <Check /> : i + 1}</div>
                <div>
                  <strong>{s}</strong>
                  <small>
                    {
                      [
                        "Publications, trials, MSL interactions and congress activity",
                        "Source relevance, recency and scientific impact",
                        "Weighted scientific indicators and engagement features",
                        "Peer connections and collaborative research",
                        "Quarterly alignment combined with dynamic activity",
                        "Emerging influencer trajectory and confidence",
                      ][i]
                    }
                  </small>
                </div>
                {step > i && (
                  <span className="ml-auto text-success">
                    <Check size={14} />
                  </span>
                )}
              </div>
            ))}
            <div className="engine-progress">
              <div style={{ width: `${(Math.max(0, step + 1) / 7) * 100}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {step === 6
                  ? "Analysis complete · 1,248 HCPs scored"
                  : running
                    ? "Analyzing synthetic scientific data…"
                    : "Ready to analyze 1,248 HCPs"}
              </span>
              <Button
                disabled={running}
                onClick={() => {
                  setStep(0);
                  setRunning(true);
                }}
              >
                <Play />
                {running ? "Analyzing…" : step === 6 ? "Run again" : "Run analysis"}
              </Button>
            </div>
            {step === 6 && (
              <div className="mt-5">
                <Button asChild className="w-full">
                  <Link to="/recommendations">
                    <Sparkles />
                    View results & recommendations
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </Panel>
        <Panel
          title="Scientific knowledge graph"
          subtitle="Relationships connecting HCPs to scientific activity"
          action={<BrainCircuit size={18} className="text-primary" />}
        >
          <KnowledgeGraph />
          <div className="panel-content">
            <div className="hcp-metrics">
              <div>
                <span>Scientific connections</span>
                <strong>8,426</strong>
              </div>
              <div>
                <span>Signals analyzed</span>
                <strong>24,891</strong>
              </div>
              <div>
                <span>Confidence</span>
                <strong className="text-success">94.6%</strong>
              </div>
            </div>
            <p className="page-description">
              Quarterly alignment anchors the score. Dynamic signals reflect new scientific activity
              and engagement momentum.
            </p>
          </div>
        </Panel>
      </div>
      <div className="grid-two">
        <Panel
          title="Quarterly alignment model"
          subtitle="Static strategic alignment · Specified weighting"
        >
          <div className="panel-content">
            {Object.entries(alignmentWeights).map(([key, value]) => (
              <div className="weight-row" key={key}>
                <span>{key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}</span>
                <strong>{value}%</strong>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="Scientific feature engineering"
          subtitle="From individual signals to interpretable intelligence"
        >
          <div className="panel-content">
            {[
              "Source validation & deduplication",
              "Scientific relevance & recency weighting",
              "HCP network influence aggregation",
              "Engagement signal normalization",
              "Future influence trajectory estimation",
            ].map((s, i) => (
              <div className="recommendation" key={s}>
                <div className="insight-icon">
                  <Check />
                </div>
                <div>
                  <strong>{s}</strong>
                  <small>
                    {
                      [
                        "Peer-reviewed sources and validated engagement records",
                        "IBD-specific scientific context and relevance",
                        "Research collaborators, co-authors, and thought leaders",
                        "Comparable scientific scores across geographies",
                        "Forward-looking opportunity identification",
                      ][i]
                    }
                  </small>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Footer />
    </main>
  );
}
export function Recommendations() {
  const [scheduled, setScheduled] = useState(false);
  const [selected, setSelected] = useState("1");
  const [accepted, setAccepted] = useState<string[]>([]);
  const h = hcps.find((p) => p.id === selected) ?? hcps[0];
  const score = evolvedScore(5, { msl: 3, publications: 2, advisory: 1, mentions: 4 });
  if (!h) return null;
  return (
    <main className="content">
      <PageHeading
        title="Results & recommendations"
        description="Turn scientific intelligence into purposeful Medical Affairs engagement."
      />
      <div className="toolbar">
        <div className="filter-group">
          <select
            aria-label="Recommendation physician"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {hcps.slice(0, 8).map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
          <Badge priority="High" />
        </div>
        <span className="badge green">
          <Check size={11} />
          Analysis complete
        </span>
      </div>
      <div className="grid-two">
        <Panel
          title="Scientific engagement score evolution"
          subtitle={`${h.name} · Illustrative signal-driven scoring scenario`}
        >
          <div className="score-evolution">
            <div>
              <span>Previous quarterly score</span>
              <strong>
                5.0<span> /10</span>
              </strong>
            </div>
            <ArrowRight size={30} />
            <div>
              <span>Updated engagement score</span>
              <strong className="text-primary">
                {score.toFixed(1)}
                <span> /10</span>
              </strong>
            </div>
          </div>
          <div className="panel-content">
            <div className="coverage-track">
              <div style={{ width: "100%" }} />
            </div>
            <div className="flex justify-between mt-3 text-xs text-muted-foreground">
              <span>Low engagement</span>
              <strong className="text-primary">High scientific influence</strong>
            </div>
            {[
              { name: "MSL discussions", n: 3, score: "1.5" },
              { name: "New publications", n: 2, score: "2.0" },
              { name: "Advisory board participation", n: 1, score: "1.0" },
              { name: "Positive scientific mentions", n: 4, score: "0.5" },
            ].map((s) => (
              <div className="weight-row" key={s.name}>
                <span>
                  {s.n} {s.name}
                </span>
                <strong className="text-success">+{s.score}</strong>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="Recommended engagement actions"
          subtitle="Prioritized opportunities for scientific exchange"
          className="insight-panel"
          action={<Sparkles size={17} className="text-primary" />}
        >
          <div className="panel-content">
            {[
              "Schedule scientific exchange",
              "Invite to advisory board",
              "Include in clinical initiatives",
              "Share scientific publications",
              "Engage at upcoming congress",
            ].map((action, i) => (
              <div className="recommendation" key={action}>
                <div className="insight-icon">
                  {i === 0 ? <MessageSquare /> : i === 1 ? <Users /> : <Target />}
                </div>
                <div>
                  <strong>{action}</strong>
                  <small>
                    {
                      [
                        "Discuss evolving treatment sequencing in IBD",
                        "Contribute expertise to strategic scientific discussion",
                        "Explore research collaboration opportunities",
                        "Share relevant peer-reviewed IBD evidence",
                        "Arrange a focused scientific meeting at UEG Week",
                      ][i]
                    }
                  </small>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (i === 0 || i === 4) setScheduled(true);
                    else setAccepted((a) => (a.includes(action) ? a : [...a, action]));
                  }}
                  disabled={accepted.includes(action)}
                >
                  {accepted.includes(action) ? <Check /> : <Plus />}
                  {accepted.includes(action) ? "Added" : "Plan"}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel
        title="Engagement score trajectory"
        subtitle="Increasing scientific engagement over the last six months"
      >
        <ActivityChart growth />
      </Panel>
      <Footer />
      {scheduled && <ScheduleModal name={h.name} onClose={() => setScheduled(false)} />}
    </main>
  );
}
export function Leaderboard() {
  const [sort, setSort] = useState("Engagement score");
  const [region, setRegion] = useState("");
  const rows = hcps
    .filter((h) => !region || h.region === region)
    .slice()
    .sort((a, b) =>
      sort === "Growth momentum"
        ? b.growth - a.growth
        : sort === "Alignment score"
          ? b.alignment - a.alignment
          : b.score - a.score,
    );
  return (
    <main className="content">
      <PageHeading
        title="Influencer leaderboard"
        description="The physicians leading scientific progress in inflammatory bowel disease."
      />
      <div className="toolbar">
        <div className="filter-group">
          <select
            aria-label="Leaderboard region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All regions</option>
            {regions.map((r) => (
              <option key={r.name}>{r.name}</option>
            ))}
          </select>
          <select
            aria-label="Leaderboard sorting"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option>Engagement score</option>
            <option>Alignment score</option>
            <option>Growth momentum</option>
          </select>
        </div>
        <span className="text-xs text-muted-foreground">
          {rows.length} ranked physicians · Q4 2026
        </span>
      </div>
      <Panel
        title="Scientific influence rankings"
        subtitle="Quarterly alignment meets dynamic scientific engagement"
      >
        <div className="h-5" />
        <HCPTable rows={rows} />
      </Panel>
      <Footer />
    </main>
  );
}
export function Emerging() {
  const top = hcps.filter((h) => h.growth >= 20).sort((a, b) => b.growth - a.growth);
  return (
    <main className="content">
      <PageHeading
        title="Emerging influencers"
        description="Identify tomorrow’s scientific leaders. Engage with them today."
      />
      <div className="kpi-grid large-kpis">
        {[
          { label: "Emerging thought leaders", v: "124", note: "+18.6% this quarter" },
          { label: "Rapidly rising HCPs", v: "5", note: "Accelerating engagement" },
          { label: "New publications", v: "38", note: "Across emerging influencers" },
          { label: "High-priority transitions", v: "2", note: "Medium → high priority" },
        ].map((k) => (
          <div className="kpi" key={k.label}>
            <div className="kpi-top">
              {k.label}
              <TrendingUp size={15} />
            </div>
            <div className="kpi-value">{k.v}</div>
            <div className="kpi-foot positive">{k.note}</div>
          </div>
        ))}
      </div>
      <div className="grid-two">
        <Panel title="Top gainers" subtitle="Strongest quarter-over-quarter scientific momentum">
          <div className="panel-content">
            {top.slice(0, 5).map((h) => (
              <Link key={h.id} to="/hcp/$id" params={{ id: h.id }} className="opportunity">
                <Avatar hcp={h} />
                <div>
                  <h3>{h.name}</h3>
                  <p>
                    {h.institution} · {h.publications} publications
                  </p>
                </div>
                <div className="ml-auto">
                  <Trend value={h.growth} />
                  <p className="text-xs text-primary mt-2">{h.score}/10</p>
                </div>
              </Link>
            ))}
          </div>
        </Panel>
        <Panel
          title="Predictive AI outlook"
          subtitle="Illustrative probability of becoming a top influencer"
          className="insight-panel"
          action={<Sparkles size={17} className="text-primary" />}
        >
          <div className="panel-content">
            {top.slice(0, 4).map((h, i) => (
              <div key={h.id} className="mb-6">
                <div className="flex justify-between mb-3">
                  <strong className="text-xs">{h.name}</strong>
                  <strong className="text-primary">{92 - i * 5}%</strong>
                </div>
                <div className="coverage-track">
                  <div style={{ width: `${92 - i * 5}%` }} />
                </div>
                <p className="page-description">
                  {h.publications} publications · {h.trials} clinical trials · +{h.growth}% momentum
                </p>
              </div>
            ))}
            <span className="badge">Simulated 6-month forecast</span>
          </div>
        </Panel>
      </div>
      <div className="grid-two">
        <Panel
          title="Scientific growth trend"
          subtitle="Activity momentum among emerging thought leaders"
        >
          <ActivityChart growth />
        </Panel>
        <Panel
          title="Recent scientific milestones"
          subtitle="New voices advancing the IBD conversation"
        >
          <div className="panel-content">
            {[
              "Dr. Priya Sharma · New Phase III trial leadership",
              "Dr. Amina Hassan · Patient advocacy recognition",
              "Dr. Yuki Tanaka · International congress presentation",
              "Dr. Sofia Martinez · New IBD publication",
            ].map((s) => (
              <div className="recommendation" key={s}>
                <div className="insight-icon">
                  <FlaskConical />
                </div>
                <strong className="text-xs">{s}</strong>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Footer />
    </main>
  );
}
export function CommandCenter() {
  const [scheduled, setScheduled] = useState(false);
  return (
    <main className="content">
      <PageHeading
        title="Medical Affairs command center"
        description="Your strategic view of opportunities, coverage, and scientific impact."
        engine
      />
      <div className="kpi-grid large-kpis">
        {[
          { label: "KOL coverage", v: "84.2%", note: "+6.3% vs. last quarter", icon: Users },
          {
            label: "Scientific exchange effectiveness",
            v: "92%",
            note: "High-relevance interactions",
            icon: Target,
          },
          {
            label: "Engagement opportunities",
            v: "28",
            note: "12 ready for action",
            icon: Sparkles,
          },
          {
            label: "High-risk engagement gaps",
            v: "7",
            note: "Require proactive attention",
            icon: ShieldAlert,
          },
        ].map((k) => (
          <div className="kpi" key={k.label}>
            <div className="kpi-top">
              {k.label}
              <k.icon size={15} />
            </div>
            <div className="kpi-value">{k.v}</div>
            <div className="kpi-foot">{k.note}</div>
          </div>
        ))}
      </div>
      <div className="grid-two">
        <Panel
          title="Top engagement opportunities"
          subtitle="Focus your next scientific conversations"
        >
          <div className="panel-content">
            {hcps.slice(0, 3).map((h, i) => (
              <div className="opportunity" key={h.id}>
                <Avatar hcp={h} />
                <div>
                  <h3>{h.name}</h3>
                  <p>
                    {
                      [
                        "New research publication creates timely exchange opportunity",
                        "Strong scientific leadership · Advisory board candidate",
                        "Upcoming UEG Week plenary speaker",
                      ][i]
                    }
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setScheduled(true)}>
                  Engage
                  <ArrowRight />
                </Button>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="High-risk engagement gaps"
          subtitle="Scientific relationships requiring attention"
          action={<ShieldAlert size={16} className="text-primary" />}
        >
          <div className="panel-content">
            {hcps.filter((_, i) => [8, 12, 18].includes(i)).map((h, i) => (
              <Link to="/hcp/$id" params={{ id: h.id }} key={h.id} className="opportunity">
                <Avatar hcp={h} />
                <div>
                  <h3>{h.name}</h3>
                  <p>
                    No scientific exchange in {90 + i * 15} days · {h.region}
                  </p>
                </div>
                <span className="badge">Re-engage</span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>
      <div className="grid-two">
        <Panel
          title="Upcoming scientific events"
          subtitle="Align engagement with scientific milestones"
        >
          <div className="panel-content">
            {[
              {
                date: 17,
                month: "OCT",
                title: "UEG Week 2026",
                place: "Vienna, Austria · 42 priority HCPs",
              },
              {
                date: 6,
                month: "NOV",
                title: "IBD Scientific Advisory Board",
                place: "London, UK · 12 scientific leaders",
              },
              {
                date: 14,
                month: "NOV",
                title: "Regional IBD Research Forum",
                place: "Singapore · 28 regional HCPs",
              },
            ].map((e) => (
              <div className="event-list" key={e.title}>
                <div className="event-date">
                  <strong>{e.date}</strong>
                  <span>{e.month}</span>
                </div>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.place}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setScheduled(true)}
                  aria-label={`Plan engagement at ${e.title}`}
                >
                  <CalendarDays />
                </Button>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="Regional scientific performance"
          subtitle="KOL coverage across key geographies"
        >
          <div className="panel-content">
            {regions.map((r, i) => (
              <div className="coverage-row" key={r.name}>
                <span>{r.name}</span>
                <div className="coverage-track">
                  <div style={{ width: `${91 - i * 6}%` }} />
                </div>
                <strong>{91 - i * 6}%</strong>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <span>Coverage based on quarterly engagement</span>
            <Link to="/explorer" className="link-action">
              Explore HCPs
              <ArrowRight />
            </Link>
          </div>
        </Panel>
      </div>
      <Panel
        title="AI-generated strategic recommendations"
        subtitle="Scientific intelligence to support your planning"
        className="insight-panel"
        action={<Sparkles size={17} className="text-primary" />}
      >
        <div className="panel-content grid-two mb-0">
          <div className="insight-item">
            <div className="insight-icon">
              <TrendingUp />
            </div>
            <div>
              <strong>Expand scientific exchange in Asia Pacific</strong>
              <p>
                18% engagement growth and rising clinical research activity create a timely
                opportunity to strengthen scientific relationships.
              </p>
              <Link to="/explorer" search={{ region: "Asia Pacific" }}>
                View regional opportunities
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="insight-item">
            <div className="insight-icon">
              <Target />
            </div>
            <div>
              <strong>Prioritize emerging IBD thought leaders</strong>
              <p>
                Engage rapidly rising physicians through targeted scientific discussions and
                appropriate clinical initiatives.
              </p>
              <Link to="/emerging">
                Explore emerging influencers
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </Panel>
      <Footer />
      {scheduled && (
        <ScheduleModal name="the selected scientific leader" onClose={() => setScheduled(false)} />
      )}
    </main>
  );
}
export function Profile({ id }: { id: string }) {
  const h = hcps.find((h) => h.id === id);
  const [tab, setTab] = useState("Publications");
  const [scheduled, setScheduled] = useState(false);
  if (!h)
    return (
      <main className="content">
        <h1>Physician not found</h1>
        <Button asChild>
          <Link to="/explorer">Return to explorer</Link>
        </Button>
      </main>
    );
  return (
    <main className="content">
      <div className="flex justify-between items-center">
        <Link to="/explorer" className="link-action">
          ← Back to HCP explorer
        </Link>
        <Button onClick={() => setScheduled(true)}>
          <CalendarDays />
          Plan engagement
        </Button>
      </div>
      <div className="profile-banner">
        {h.id === "1" ? (
          <img
            src={physician}
            alt="Fictional physician Dr. Jane Smith"
            width={92}
            height={92}
            className="profile-photo"
          />
        ) : (
          <div className="profile-photo user-avatar">{h.initials}</div>
        )}
        <div>
          <div className="eyebrow">360° SCIENTIFIC PROFILE</div>
          <h1>{h.name}</h1>
          <p className="profile-meta">
            {h.specialty} · {h.institution}
          </p>
          <div className="flex gap-3 items-center mt-3">
            <Badge priority={h.priority} />
            <span className="text-xs text-muted-foreground">
              {h.region} · Rank #{h.rank}
            </span>
          </div>
        </div>
        <div className="profile-stats">
          <div>
            <span>Quarterly alignment</span>
            <strong>
              {h.alignment}
              <small className="text-sm text-muted-foreground">/100</small>
            </strong>
          </div>
          <div>
            <span>Dynamic engagement</span>
            <strong className="text-primary">
              {h.score}
              <small className="text-sm text-muted-foreground">/10</small>
            </strong>
          </div>
          <div>
            <span>Scientific influence</span>
            <strong>{((h.alignment / 10 + h.score) / 2).toFixed(1)}</strong>
            <Trend value={h.growth} />
          </div>
        </div>
      </div>
      <div className="grid-two">
        <Panel
          title="Scientific influence dimensions"
          subtitle="A multidimensional view of scientific engagement"
        >
          <ProfileRadar />
        </Panel>
        <Panel
          title="Scientific collaboration network"
          subtitle="Research, peer relationships and clinical connections"
        >
          <KnowledgeGraph />
        </Panel>
      </div>
      <div className="toolbar">
        <div className="filter-group">
          {["Publications", "Clinical trials", "Advisory boards", "Speaking & congress"].map(
            (t) => (
              <Button key={t} variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)}>
                {t}
              </Button>
            ),
          )}
        </div>
      </div>
      <div className="grid-two">
        <Panel title={`${tab} history`} subtitle={`${h.name} · Recent scientific contributions`}>
          <div className="panel-content">
            {(tab === "Publications"
              ? [
                  "Biologic treatment sequencing in moderate-to-severe IBD",
                  "Real-world outcomes in ulcerative colitis",
                  "Optimizing long-term disease control in Crohn’s disease",
                ]
              : tab === "Clinical trials"
                ? [
                    "Phase III · Novel biologic therapy in ulcerative colitis",
                    "Multicenter observational study · IBD treatment outcomes",
                    "Long-term maintenance therapy research",
                  ]
                : tab === "Advisory boards"
                  ? [
                      "IBD treatment optimization scientific advisory board",
                      "Regional inflammatory bowel disease research council",
                      "Patient-centered care scientific steering committee",
                    ]
                  : [
                      "UEG Week 2026 · Invited plenary speaker",
                      "ECCO Congress · Scientific symposium",
                      "Regional IBD Forum · Research presentation",
                    ]
            ).map((s, i) => (
              <div className="recommendation" key={s}>
                <div className="insight-icon">
                  {tab === "Publications" ? <FileText /> : <FlaskConical />}
                </div>
                <div>
                  <strong>{s}</strong>
                  <small>
                    {
                      [
                        "October 2026 · Lead contributor",
                        "September 2026 · Scientific collaborator",
                        "July 2026 · Active participation",
                      ][i]
                    }
                  </small>
                </div>
                <span className="badge green ml-auto">Verified</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          title="Scientific areas of focus"
          subtitle="Current research and scientific exchange interests"
        >
          <div className="panel-content">
            <div className="flex flex-wrap gap-2">
              {[
                "Inflammatory bowel disease",
                "Ulcerative colitis",
                "Crohn’s disease",
                "Biologic therapies",
                "Treatment sequencing",
                "Real-world evidence",
                "Patient outcomes",
              ].map((s) => (
                <span className="badge" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <div className="insight-item mt-4">
              <div className="insight-icon">
                <Sparkles />
              </div>
              <div>
                <strong>AI engagement outlook</strong>
                <p>
                  Strong scientific momentum and sustained research leadership suggest a timely
                  opportunity for focused exchange on evolving IBD treatment approaches.
                </p>
                <Link to="/recommendations">
                  View recommended actions
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </Panel>
      </div>
      <Footer />
      {scheduled && <ScheduleModal name={h.name} onClose={() => setScheduled(false)} />}
    </main>
  );
}
