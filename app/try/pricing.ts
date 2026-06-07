export type ProjectType =
  | "web-dev"
  | "mobile-dev"
  | "design"
  | "data"
  | "devops"
  | "writing"
  | "marketing"
  | "consulting";

export interface RateEntry {
  label: string;
  low: number;
  typical: number;
  high: number;
}

export const RATE_TABLE: Record<ProjectType, RateEntry> = {
  "web-dev": { label: "Web Development", low: 75, typical: 125, high: 200 },
  "mobile-dev": { label: "Mobile Development", low: 85, typical: 140, high: 225 },
  design: { label: "Design / Branding", low: 60, typical: 100, high: 175 },
  data: { label: "Data / Analytics", low: 80, typical: 135, high: 210 },
  devops: { label: "DevOps / Infrastructure", low: 90, typical: 150, high: 240 },
  writing: { label: "Writing / Content", low: 40, typical: 75, high: 125 },
  marketing: { label: "Marketing / Strategy", low: 55, typical: 90, high: 150 },
  consulting: { label: "Consulting", low: 100, typical: 175, high: 300 },
};

export const COMPLEXITY_LABELS: Record<number, string> = {
  1: "Simple",
  2: "Straightforward",
  3: "Medium",
  4: "Complex",
  5: "Highly complex",
};

export const COMPLEXITY_MULTIPLIERS: Record<number, number> = {
  1: 0.75,
  2: 0.9,
  3: 1.0,
  4: 1.2,
  5: 1.45,
};

export function fmt(n: number): string {
  if (n >= 1000) {
    return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  }
  return `$${Math.round(n)}`;
}

export interface PriceBand {
  low: number;
  typical: number;
  high: number;
}

export function computePriceBand(
  projectType: ProjectType,
  complexity: number,
  hours: number
): PriceBand {
  const rates = RATE_TABLE[projectType];
  const multiplier = COMPLEXITY_MULTIPLIERS[complexity];
  return {
    low: Math.round(rates.low * multiplier * hours),
    typical: Math.round(rates.typical * multiplier * hours),
    high: Math.round(rates.high * multiplier * hours),
  };
}
