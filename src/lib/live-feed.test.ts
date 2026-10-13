import { describe, expect, it } from "vitest";
import { recencyMultiplier, signalContribution, signalTypes } from "./live-feed";
describe("Live feed scoring", () => {
  it("weights recent activity more", () => {
    expect(recencyMultiplier(3)).toBe(1.2);
    expect(recencyMultiplier(20)).toBe(1);
    expect(recencyMultiplier(60)).toBe(0.8);
    expect(recencyMultiplier(200)).toBe(0.5);
  });
  it("high impact sources outweigh low impact ones", () => {
    const high = signalTypes.find((s) => s.tier === "High")!;
    const low = signalTypes.find((s) => s.tier === "Low")!;
    expect(signalContribution(high.points, high.reliability, 1, 0)).toBeGreaterThan(
      signalContribution(low.points, low.reliability, 1, 0),
    );
  });
  it("applies reliability, recency and frequency", () => {
    expect(signalContribution(10, 1, 1, 0)).toBe(12);
    expect(signalContribution(10, 1, 1, 2)).toBe(13.2);
  });
});
