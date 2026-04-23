"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // fire and forget
    }
  }

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-teal-500" />
          PriceMatch
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <a href="/try" className="hidden sm:inline hover:opacity-70">
            Try it
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-teal-100 via-teal-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
            Personal finance
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Stop undercharging. Freelancers, we see you.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Tell us the project, the city, the seniority. We tell you what to charge — backed by real industry rates.
          </p>

          {submitted ? (
            <p className="mt-12 text-sm font-medium text-teal-700">
              Thanks. We will ping you the day we launch.
            </p>
          ) : (
            <form
              id="waitlist"
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Join the waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                Senior brand designer · 4-week project · remote
              </div>
              <div className="mt-5">
                <div className="text-xs text-neutral-500">Recommended range</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <div className="text-4xl font-bold text-teal-700">$18K – $28K</div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-neutral-50 p-2">
                  <div className="font-semibold">$14K</div>
                  <div className="text-neutral-500">25th pct</div>
                </div>
                <div className="rounded-lg bg-teal-50 p-2 border border-teal-200">
                  <div className="font-semibold">$22K</div>
                  <div className="text-teal-700">median</div>
                </div>
                <div className="rounded-lg bg-neutral-50 p-2">
                  <div className="font-semibold">$34K</div>
                  <div className="text-neutral-500">75th pct</div>
                </div>
              </div>
              <p className="mt-4 text-xs text-neutral-500">
                Based on 312 comparable projects in the last 90 days
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">📊</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Real rate data</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Not LinkedIn fantasies. Actual invoices, scraped and verified from 30+ industries.
              </p>
            </div>
            <div>
              <div className="text-3xl">📝</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Generates the quote</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Hourly, project-based, retainer. Whatever fits the job. Ready to send in one click.
              </p>
            </div>
            <div>
              <div className="text-3xl">🧠</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Coaches the negotiation</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                When they push back, we tell you what to say — and what to hold firm on.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Sign up in seconds</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Email only. No credit card. You&apos;re in before you can overthink it.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Set up your context</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Tell us what you&apos;re working on. The whole product tunes around that.
              </p>
            </div>
            <div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Get value on day one</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Not week two. Day one. That&apos;s how fast you&apos;ll know it&apos;s working.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-teal-600 px-7 py-3.5 font-medium text-white transition hover:bg-teal-700"
        >
          Reserve my spot
        </a>
      </section>

      <footer className="border-t border-neutral-200">
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
