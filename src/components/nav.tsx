import { ThemeToggle } from "./theme-toggle";
import { Brand, Button, DASHBOARD_URL, Wrap } from "./ui";

const links = [
  ["#features", "Features"],
  ["#how", "How it works"],
  ["#cli", "CLI"],
  ["#faq", "FAQ"],
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/80 backdrop-blur-md">
      <Wrap className="flex h-16 items-center gap-7">
        <a href="#top" aria-label="Unstakd home">
          <Brand />
        </a>
        <nav aria-label="Sections" className="hidden gap-6 text-sm text-muted sm:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-text">
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <Button variant="secondary" href={DASHBOARD_URL} className="max-sm:hidden">
            Dashboard
          </Button>
          <ThemeToggle />
        </div>
      </Wrap>
    </header>
  );
}
