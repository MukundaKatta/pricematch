"use client";

import { useState } from "react";
import {
  RATE_TABLE,
  COMPLEXITY_LABELS,
  computePriceBand,
  fmt,
  type ProjectType,
  type RateEntry,
  type PriceBand,
} from "./pricing";

export default function TryPage() {
  const [projectType, setProjectType] = useState<ProjectType>("web-dev");
  const [complexity, setComplexity] = useState(3);
  const [hours, setHours] = useState<number | "">(40);
  const [result, setResult] = useState<PriceBand | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hours || hours <= 0) return;
    setResult(computePriceBand(projectType, complexity, hours));
  }

  function handleReset() {
    setResult(null);
  }

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-teal-500" />
          PriceMatch
        </a>
        <a
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </a>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
            Price estimator
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            What should you charge?
          </h1>
          <p className="mt-4 text-neutral-600">
            Fill in the details and get a market-rate price band in seconds.
          </p>
        </div>

        {result === null ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm space-y-8"
          >
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Project type
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value as ProjectType)}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10"
              >
                {(Object.entries(RATE_TABLE) as [ProjectType, RateEntry][]).map(
                  ([key, { label }]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Complexity —{" "}
                <span className="font-normal text-teal-700">
                  {COMPLEXITY_LABELS[complexity]}
                </span>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
              <div className="mt-1 flex justify-between text-xs text-neutral-400">
                <span>Simple</span>
                <span>Highly complex</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Estimated hours
              </label>
              <input
                type="number"
                min={1}
                placeholder="e.g. 40"
                required
                value={hours}
                onChange={(e) =>
                  setHours(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 py-4 font-medium text-white transition hover:bg-neutral-700"
            >
              Show my price band
            </button>
          </form>
        ) : (
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">
              {RATE_TABLE[projectType].label} · {COMPLEXITY_LABELS[complexity]} · {hours}h
            </div>
            <div className="mt-4">
              <div className="text-xs text-neutral-500">Recommended range</div>
              <div className="mt-1 flex items-baseline gap-2">
                <div className="text-4xl font-bold text-teal-700">
                  {fmt(result.low)} – {fmt(result.high)}
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-xl bg-neutral-50 p-4">
                <div className="font-semibold">{fmt(result.low)}</div>
                <div className="mt-1 text-xs text-neutral-500">Low end</div>
              </div>
              <div className="rounded-xl bg-teal-50 p-4 border border-teal-200">
                <div className="font-semibold">{fmt(result.typical)}</div>
                <div className="mt-1 text-xs text-teal-700">Typical</div>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4">
                <div className="font-semibold">{fmt(result.high)}</div>
                <div className="mt-1 text-xs text-neutral-500">High end</div>
              </div>
            </div>
            <p className="mt-4 text-xs text-neutral-400">
              Based on market rates for {RATE_TABLE[projectType].label.toLowerCase()} projects.
              This is a v0 preview with hardcoded rate data.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleReset}
                className="flex-1 rounded-full border border-neutral-200 bg-white py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                Try another project
              </button>
              <a
                href="/#waitlist"
                className="flex-1 rounded-full bg-teal-600 py-3 text-center text-sm font-medium text-white transition hover:bg-teal-700"
              >
                Get early access
              </a>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-neutral-200 mt-16">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-teal-500" />
            PriceMatch
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
