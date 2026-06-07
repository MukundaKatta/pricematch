import { describe, it, expect } from "vitest";
import {
  computePriceBand,
  fmt,
  RATE_TABLE,
  COMPLEXITY_MULTIPLIERS,
  type ProjectType,
} from "./pricing";

describe("fmt", () => {
  it("formats values under 1000 as whole dollars", () => {
    expect(fmt(0)).toBe("$0");
    expect(fmt(75)).toBe("$75");
    expect(fmt(999)).toBe("$999");
  });

  it("rounds sub-1000 values to the nearest dollar", () => {
    expect(fmt(74.4)).toBe("$74");
    expect(fmt(74.6)).toBe("$75");
  });

  it("formats round thousands without a decimal", () => {
    expect(fmt(1000)).toBe("$1K");
    expect(fmt(18000)).toBe("$18K");
  });

  it("formats non-round thousands with one decimal", () => {
    expect(fmt(1500)).toBe("$1.5K");
    expect(fmt(18500)).toBe("$18.5K");
  });
});

describe("computePriceBand", () => {
  it("multiplies rate by complexity multiplier and hours", () => {
    // web-dev: low 75, typical 125, high 200; complexity 3 => 1.0; 40 hours
    expect(computePriceBand("web-dev", 3, 40)).toEqual({
      low: 3000,
      typical: 5000,
      high: 8000,
    });
  });

  it("applies the complexity multiplier", () => {
    // consulting: low 100, typical 175, high 300; complexity 5 => 1.45; 10 hours
    expect(computePriceBand("consulting", 5, 10)).toEqual({
      low: Math.round(100 * 1.45 * 10),
      typical: Math.round(175 * 1.45 * 10),
      high: Math.round(300 * 1.45 * 10),
    });
  });

  it("keeps low <= typical <= high for every project type and complexity", () => {
    const types = Object.keys(RATE_TABLE) as ProjectType[];
    const complexities = Object.keys(COMPLEXITY_MULTIPLIERS).map(Number);
    for (const t of types) {
      for (const c of complexities) {
        const band = computePriceBand(t, c, 40);
        expect(band.low).toBeLessThanOrEqual(band.typical);
        expect(band.typical).toBeLessThanOrEqual(band.high);
      }
    }
  });

  it("scales linearly with hours", () => {
    const one = computePriceBand("design", 3, 10);
    const two = computePriceBand("design", 3, 20);
    expect(two.low).toBe(one.low * 2);
    expect(two.typical).toBe(one.typical * 2);
    expect(two.high).toBe(one.high * 2);
  });
});
