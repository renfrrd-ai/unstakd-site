import type { ReactNode } from "react";
import { cx } from "./ui";

// Building blocks for /docs: prose sections, numbered steps, callouts, code and small tables.

export function DocSection({ id, title, lead, children }: { id: string; title: string; lead?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-border pt-10 first:border-t-0 first:pt-0">
      <h2 id={`${id}-h`} className="mb-3 text-[26px] sm:text-[28px]">
        <a href={`#${id}`} className="hover:text-accent-text">{title}</a>
      </h2>
      {lead && <p className="mb-6 text-[16px] text-muted">{lead}</p>}
      <div className="flex flex-col gap-5 text-[15px] text-soft [&_strong]:font-semibold [&_strong]:text-text">{children}</div>
    </section>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-2 text-lg tracking-[-0.02em] text-text">{children}</h3>;
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="m-0 flex list-none flex-col gap-3 p-0 [counter-reset:step]">{children}</ol>;
}

export function Step({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <li className="flex gap-4 rounded-[18px] border border-border bg-panel p-5 [counter-increment:step] before:grid before:size-7 before:flex-none before:place-items-center before:rounded-full before:bg-accent-soft before:text-[13px] before:font-bold before:text-accent-strong before:content-[counter(step)]">
      <div className="flex min-w-0 flex-col gap-1.5">
        <span className="font-semibold text-text">{title}</span>
        {children && <div className="space-y-2 text-[14.5px] text-muted">{children}</div>}
      </div>
    </li>
  );
}

const calloutTone = {
  note: "bg-accent-soft text-soft [&_b]:text-accent-strong",
  warn: "bg-warn-bg text-warn [&_b]:text-warn",
  ok: "bg-ok-bg text-ok [&_b]:text-ok",
};

export function Callout({ tone = "note", title, children }: { tone?: keyof typeof calloutTone; title: string; children: ReactNode }) {
  return (
    <div className={cx("rounded-[14px] px-5 py-4 text-[14.5px]", calloutTone[tone])}>
      <b className="mb-1 block font-semibold">{title}</b>
      {children}
    </div>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="rounded-md bg-panel-2 px-1.5 py-0.5 font-mono text-[13px] text-text">{children}</code>;
}

// Dark terminal block. Lines starting with "$ " are commands; the rest is output.
export function Terminal({ lines, label }: { lines: string[]; label?: string }) {
  return (
    <div className="overflow-hidden rounded-[16px] bg-log-bg text-log-text">
      {label && <div className="border-b border-log-border px-4 py-2.5 text-xs text-log-muted">{label}</div>}
      <pre className="m-0 overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-[1.8]">
        {lines.map((l, i) => (
          <div key={i}>
            {l.startsWith("$ ") ? (
              <>
                <span className="select-none text-log-ok">$ </span>
                <span>{l.slice(2)}</span>
              </>
            ) : (
              <span className="text-log-dim">{l}</span>
            )}
          </div>
        ))}
      </pre>
    </div>
  );
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-[16px] border border-border bg-panel">
      <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="border-b border-border px-4 py-3 text-xs font-medium text-muted">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="[&:not(:last-child)>td]:border-b [&:not(:last-child)>td]:border-border">
              {r.map((c, j) => (
                <td key={j} className={cx("px-4 py-3 align-top", j === 0 ? "font-medium text-text" : "text-muted")}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Grey "where to click" breadcrumb, e.g. Project › Settings › Standby.
export function Path({ children }: { children: string }) {
  const parts = children.split(" › ");
  return (
    <span className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-panel-2 px-2 py-0.5 text-[13px] font-medium text-text">
      {parts.map((p, i) => (
        <span key={i} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-dim">›</span>}
          {p}
        </span>
      ))}
    </span>
  );
}
