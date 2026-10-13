import { hcps } from "./demo-data";

export type Tier = "High" | "Medium" | "Low";
export const signalTypes = [
  { type: "Principal Investigator Clinical Trial", label: "Clinical Trial Milestone Achieved", tier: "High", points: 15, source: "Clinical Trial Registry", reliability: 1 },
  { type: "Major Scientific Publication", label: "New IBD Publication Detected", tier: "High", points: 15, source: "Publications Database", reliability: 1 },
  { type: "Congress Keynote Speaker", label: "Congress Speaker Session Announced", tier: "High", points: 12, source: "Congress & Conference Feed", reliability: 0.95 },
  { type: "National Advisory Board Participation", label: "Advisory Board Participation Logged", tier: "High", points: 10, source: "Advisory Board Network", reliability: 0.95 },
  { type: "MSL Scientific Discussion", label: "MSL Scientific Discussion Completed", tier: "Medium", points: 5, source: "MSL Interaction Feed", reliability: 0.9 },
  { type: "Research Collaboration", label: "Scientific Collaboration Identified", tier: "Medium", points: 6, source: "External Scientific Intelligence Sources", reliability: 0.8 },
  { type: "Publication Citation Growth", label: "Publication Citation Growth", tier: "Medium", points: 5, source: "Publications Database", reliability: 0.9 },
  { type: "Regional Speaker Event", label: "Peer Recognition Event", tier: "Medium", points: 4, source: "Congress & Conference Feed", reliability: 0.85 },
  { type: "Scientific Social Mentions", label: "Social Scientific Influence Signal", tier: "Low", points: 2, source: "Social Listening Platform", reliability: 0.6 },
  { type: "Conference Attendance", label: "Conference Attendance Logged", tier: "Low", points: 1, source: "Congress & Conference Feed", reliability: 0.8 },
  { type: "News Mentions", label: "Policy Influence Mention", tier: "Low", points: 2, source: "External Scientific Intelligence Sources", reliability: 0.6 },
] as const satisfies readonly { type: string; label: string; tier: Tier; points: number; source: string; reliability: number }[];

export const sources = [
  "Publications Database",
  "Clinical Trial Registry",
  "MSL Interaction Feed",
  "Congress & Conference Feed",
  "Advisory Board Network",
  "Social Listening Platform",
  "External Scientific Intelligence Sources",
];

/** Recency multiplier: last 7 days highest, then 30, 90, older reduced. */
export function recencyMultiplier(daysAgo: number) {
  if (daysAgo <= 7) return 1.2;
  if (daysAgo <= 30) return 1.0;
  if (daysAgo <= 90) return 0.8;
  return 0.5;
}
/** Repeated signals for the same physician add a small momentum bonus, capped at +15%. */
export function frequencyMultiplier(priorSignals: number) {
  return 1 + Math.min(3, priorSignals) * 0.05;
}
export function signalContribution(points: number, reliability: number, daysAgo: number, priorSignals: number) {
  return Math.round(points * reliability * recencyMultiplier(daysAgo) * frequencyMultiplier(priorSignals) * 10) / 10;
}
export function priorityFor(score: number) {
  return score >= 80 ? "High" : score >= 60 ? "Medium" : "Low";
}
export const whatIf = [
  { label: "Publishes another IBD paper", delta: 6 },
  { label: "Participates in an advisory board", delta: 4 },
  { label: "Presents at DDW Congress", delta: 8 },
] as const;

// Deterministic pseudo-random generator so every demo run plays the same story.
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
export const liveRoster = hcps.slice(0, 12).map((h) => ({
  id: h.id,
  name: h.name,
  initials: h.initials,
  institution: h.institution,
  region: h.region,
  score: Math.round(h.score * 10 - (h.id === "1" ? 12 : 0)),
}));
