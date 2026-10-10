import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Download,
  CalendarDays,
  ChevronDown,
  X,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { hcps, type HCP } from "@/lib/demo-data";
import physician from "@/assets/physician.jpg";
export function Avatar({ hcp }: { hcp: HCP }) {
  return hcp.id === "1" ? (
    <img src={physician} alt="" className="avatar" width={46} height={46} />
  ) : (
    <span className="avatar">{hcp.initials}</span>
  );
}
export function Badge({ priority }: { priority: string }) {
  return <span className={`badge ${priority}`}>{priority} priority</span>;
}
export function Trend({ value }: { value: number }) {
  return (
    <span className={`trend ${value < 0 ? "down" : ""}`}>
      {value < 0 ? <ArrowDownRight /> : <ArrowUpRight />}
      {value > 0 ? "+" : ""}
      {value}%
    </span>
  );
}
export function Panel({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-heading">
        <div>
          <h2 className="panel-title">{title}</h2>
          {subtitle && <p className="panel-subtitle">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
export function PageHeading({
  title,
  description,
  engine = false,
}: {
  title: string;
  description: string;
  engine?: boolean;
}) {
  const [period, setPeriod] = useState(false);
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          <span className="status-dot" /> MEDICAL AFFAIRS INTELLIGENCE
        </div>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      <div className="heading-actions">
        <Button variant="outline" onClick={() => setPeriod(!period)}>
          <CalendarDays />
          {period ? "Q3 2026" : "Q4 2026"}
          <ChevronDown />
        </Button>
        <Button variant="outline" onClick={() => exportData()}>
          <Download />
          Export report
        </Button>
        {engine && (
          <Button asChild>
            <Link to="/engine">
              <Sparkles />
              Run AI analysis
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
export function exportData(rows = hcps) {
  const fields = [
    "Rank",
    "Physician",
    "Institution",
    "Region",
    "Alignment",
    "Engagement",
    "Priority",
  ];
  const csv = [
    fields.join(","),
    ...rows.map((h) =>
      [h.rank, h.name, h.institution, h.region, h.alignment, h.score, h.priority]
        .map((v) => `"${String(v).replaceAll('"', '""')}"`)
        .join(","),
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "IBD-scientific-engagement-report.csv";
  a.click();
  URL.revokeObjectURL(url);
}
export function HCPTable({ rows = hcps, compact = false }: { rows?: HCP[]; compact?: boolean }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Physician</th>
            {!compact && (
              <>
                <th>Institution</th>
                <th>Region</th>
                <th>Alignment</th>
              </>
            )}
            <th>Engagement score</th>
            {!compact && <th>Influence score</th>}
            <th>Priority</th>
            <th>Trend</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((h) => (
            <tr key={h.id}>
              <td>{h.rank <= 3 ? <span className="score">#{h.rank}</span> : `#${h.rank}`}</td>
              <td>
                <Link to="/hcp/$id" params={{ id: h.id }} className="physician-cell">
                  <Avatar hcp={h} />
                  <div>
                    <strong>{h.name}</strong>
                    <small>{compact ? h.institution : h.specialty}</small>
                  </div>
                </Link>
              </td>
              {!compact && (
                <>
                  <td>{h.institution}</td>
                  <td>{h.region}</td>
                  <td>
                    {h.alignment}
                    <span className="text-muted-foreground"> /100</span>
                  </td>
                </>
              )}
              <td>
                <span className="score">{h.score.toFixed(1)}</span>
                <span className="text-muted-foreground"> /10</span>
              </td>
              {!compact && <td>{((h.alignment / 10 + h.score) / 2).toFixed(1)}</td>}
              <td>
                <Badge priority={h.priority} />
              </td>
              <td>
                <Trend value={h.growth} />
              </td>
              <td>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/hcp/$id" params={{ id: h.id }} aria-label={`View ${h.name}`}>
                    <ArrowRight />
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <div className="empty-state">No physicians match your filters.</div>}
    </div>
  );
}
export function Footer() {
  return (
    <footer className="demo-footer">
      <span>© 2026 Takeda Medical Affairs · IBD Scientific Engagement Intelligence</span>
      <span>Synthetic data · Executive demo</span>
    </footer>
  );
}
export function ScheduleModal({ name, onClose }: { name: string; onClose: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Plan scientific engagement"
      >
        {done ? (
          <>
            <div className="eyebrow">
              <Check size={16} />
              ENGAGEMENT PLANNED
            </div>
            <h2>Scientific exchange scheduled</h2>
            <p className="page-description">
              Your engagement with {name} has been added to this demo session.
            </p>
            <div className="modal-actions">
              <Button onClick={onClose}>Done</Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2>Plan scientific engagement</h2>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                <X />
              </Button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <p className="page-description">{name}</p>
              <label htmlFor="engagement-type">Engagement type</label>
              <select id="engagement-type">
                <option>Scientific exchange</option>
                <option>Advisory board invitation</option>
                <option>Congress meeting</option>
                <option>Clinical initiative</option>
              </select>
              <label htmlFor="engagement-date">Date</label>
              <input
                id="engagement-date"
                type="date"
                min="2026-10-10"
                defaultValue="2026-10-20"
                required
              />
              <label htmlFor="engagement-note">Scientific focus</label>
              <textarea
                id="engagement-note"
                defaultValue="Biologic treatment sequencing in IBD"
                rows={3}
              />
              <div className="modal-actions">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  <CalendarDays />
                  Schedule exchange
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
