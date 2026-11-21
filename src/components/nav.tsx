import Link from "next/link";
import { ScrollProgress } from "./motion";
import { ThemeToggle } from "./theme-toggle";
import { Brand, Button, cx, DASHBOARD_URL, Wrap } from "./ui";

const links = [
  ["/#features", "Features"],
  ["/#how", "How it works"],
  ["/#cli", "CLI"],
  ["/#faq", "FAQ"],
  ["/docs", "Docs"],
];

export function Nav({ current }: { current?: "/docs" }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-panel/85 backdrop-blur-md">
      <Wrap className="flex h-16 items-center gap-8">
        <Link href="/" aria-label="Unstakd home">
          <Brand />
        </Link>
        <nav aria-label="Main" className="hidden gap-1 md:flex">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={current === href ? "page" : undefined}
              className={cx("rounded-full px-3.5 py-2 text-sm font-medium text-muted hover:text-text", current === href && "bg-panel-2 font-semibold text-text")}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <Link href="/docs" className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:text-text md:hidden">
            Docs
          </Link>
          <Button href={DASHBOARD_URL} className="max-sm:hidden">
            Open dashboard
          </Button>
          <ThemeToggle />
        </div>
      </Wrap>
      <ScrollProgress />
    </header>
  );
}
