"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ease } from "./motion";
import { cx, Glyph, Pill, RouteChain } from "./ui";

type Tone = "cmd" | "ok" | "warn" | undefined;
// [time, text, tone, step this line completes]
const LOG: [string, string, Tone?, number?][] = [
  ["12:04:01", "› clone blog @ 4f2a91c", "cmd", 0],
  ["12:04:03", "› detected Next.js 16 · building with Railpack", "cmd"],
  ["12:05:11", "  image built in 68s (cache hit: deps)", undefined, 1],
  ["12:05:13", "  starting container · 1 vCPU · 512 MB", undefined, 2],
  ["12:05:17", "  waiting for port 3000…", "warn"],
  ["12:05:19", "  ✓ health check passed · 200 in 41ms", "ok", 3],
  ["12:05:19", "› switched blog.unstakd.com → #42", "ok", 4],
  ["12:05:49", "  retired #41 (kept for rollback)"],
];
const tone = { cmd: "text-log-cmd", ok: "text-log-ok", warn: "text-log-warn" };
const STEPS = ["Clone", "Build", "Start", "Health", "Switch"];
const LIVE_AT = LOG.findIndex(([, , , s]) => s === STEPS.length - 1) + 1;

// The hero's picture of the dashboard, playing one deploy: log lines stream in, the step chips
// pass in step with them, and the card flips from Building to Live once traffic switches.
export function HeroMock() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let n = 0;
    let tick: ReturnType<typeof setInterval> | undefined;
    // Let the hero settle before the "build" starts.
    const start = setTimeout(() => {
      tick = setInterval(() => {
        n += 1;
        setShown(n);
        if (n >= LOG.length) clearInterval(tick);
      }, 420);
    }, 900);
    return () => {
      clearTimeout(start);
      clearInterval(tick);
    };
  }, [reduce]);

  const lines = reduce ? LOG.length : shown;
  const done = LOG.slice(0, lines).reduce((a, [, , , s]) => (s != null ? s + 1 : a), 0);
  const live = lines >= LIVE_AT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.25 }}
      style={{ transformPerspective: 1200 }}
      className="overflow-hidden rounded-[22px] border border-border bg-bg shadow-float"
      aria-label="The Unstakd dashboard deploying a project"
      role="img"
    >
      <div className="flex items-center gap-4 border-b border-border bg-panel px-4 py-3">
        <Glyph className="scale-75" />
        <div className="flex gap-1 text-xs" aria-hidden>
          {["Dashboard", "Projects", "Databases", "Domains"].map((l, i) => (
            <span key={l} className={cx("rounded-full px-2.5 py-1 font-medium", i === 1 ? "bg-panel-2 text-text" : "text-muted max-sm:hidden")}>
              {l}
            </span>
          ))}
        </div>
        <span className="ml-auto rounded-lg bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-ink">New project</span>
      </div>
      <div className="grid gap-3 p-3 sm:grid-cols-[0.85fr_1.15fr] sm:p-4">
        <div className="flex flex-col gap-3.5 rounded-[16px] border border-border bg-panel p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold">blog</span>
            <motion.span key={live ? "live" : "building"} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease }}>
              {live ? <Pill>Live</Pill> : <Pill tone="warn">Building</Pill>}
            </motion.span>
          </div>
          <RouteChain domain="blog.unstakd.com" app={live ? "Next.js 16 · just now" : "Next.js 16 · build #42"} data="blog-pg · Postgres 17" />
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] text-muted">
              <span>CPU · 1 vCPU allocated</span>
              <span className="font-semibold text-text tabular-nums">{live ? "38%" : "—"}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-track" aria-hidden>
              <motion.div className="h-1.5 rounded-full bg-accent" initial={false} animate={{ width: live ? "38%" : "0%" }} transition={{ duration: 0.9, ease }} />
            </div>
          </div>
          <div className="mt-auto flex justify-end gap-1.5 text-xs">
            <span className="rounded-lg bg-panel-2 px-2.5 py-1.5 font-medium">Logs</span>
            <span className="rounded-lg bg-ink px-2.5 py-1.5 font-semibold text-on-ink">Deploy</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col overflow-hidden rounded-[16px] bg-log-bg text-log-text">
          <div className="flex items-center justify-between gap-2 border-b border-log-border px-4 py-3">
            <div className="flex min-w-0 flex-col">
              <span className="text-[13px] font-semibold">blog · build #42</span>
              <span className="truncate text-[11px] text-log-muted">Add RSS feed</span>
            </div>
            <span className="flex gap-0.5 rounded-lg bg-log-chip p-0.5 text-[11px]">
              <span className="rounded-md bg-log-chip-on px-2 py-0.5">Build</span>
              <span className="px-2 py-0.5 text-log-muted">Runtime</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 px-4 pt-3">
            {STEPS.map((s, i) => {
              const passed = i < done;
              const running = i === done && lines > 0 && !live;
              return (
                <span
                  key={s}
                  className={cx(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] transition-colors duration-300",
                    passed ? "bg-[color-mix(in_srgb,var(--log-ok)_14%,transparent)] text-log-ok" : "bg-log-chip text-log-muted",
                    running && "text-log-warn",
                  )}
                >
                  <span className={cx("size-1 rounded-full bg-current", running && "animate-pulse")} />
                  {s}
                </span>
              );
            })}
          </div>
          <div className="overflow-x-auto px-4 pt-3 pb-4 font-mono text-[11px] leading-[1.75]">
            {LOG.map(([time, text, t], i) => (
              <motion.div
                key={i}
                className="flex gap-3 whitespace-pre"
                initial={false}
                animate={i < lines ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                transition={{ duration: 0.35, ease }}
              >
                <span className="text-log-dim">{time}</span>
                <span className={t ? tone[t] : "text-log-text"}>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
