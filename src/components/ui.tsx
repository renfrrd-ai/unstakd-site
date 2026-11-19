import type { ComponentProps, ReactNode } from "react";

export const GITHUB_URL = "https://github.com/renfrrd-ai/Unstakd";
export const DASHBOARD_URL = "https://dash.unstakd.com";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Wrap({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto max-w-[1200px] px-4 sm:px-8", className)} {...props} />;
}

export function Brand({ name = "unstakd" }: { name?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-mono text-base font-bold">
      <i className="h-[18px] w-2.5 rounded-[1.5px] bg-accent" aria-hidden />
      {name}
    </span>
  );
}

const buttonStyles = {
  primary: "border-transparent bg-accent font-bold text-accent-ink hover:bg-[color-mix(in_srgb,var(--accent)_88%,var(--text))]",
  secondary: "border-border-strong bg-panel hover:border-muted",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof buttonStyles; size?: "md" | "lg" }) {
  return (
    <a
      className={cx(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-semibold transition active:translate-y-px",
        size === "lg" ? "h-[52px] px-6 text-[15px]" : "h-11 px-[18px] text-sm",
        buttonStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cx("scroll-mt-16 py-16 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function SectionHead({ eyebrow, title, children, className }: { eyebrow: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={cx("mb-12 max-w-[640px]", className)}>
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">{eyebrow}</span>
      <h2 className="mt-3.5 mb-3.5 text-[32px] sm:text-[40px]">{title}</h2>
      {children && <p className="text-[17px] text-muted">{children}</p>}
    </div>
  );
}

export function Card({ className, ...props }: ComponentProps<"article">) {
  return <article className={cx("rounded-xl border border-border bg-panel p-[26px]", className)} {...props} />;
}

export function LivePill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-bg px-2.5 py-[3px] text-xs font-semibold text-accent-text">
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      Live
    </span>
  );
}
