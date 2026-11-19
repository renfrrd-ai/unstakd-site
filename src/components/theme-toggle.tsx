"use client";

import { MoonIcon, SunIcon } from "./icons";

// The inline script in layout.tsx sets data-theme before paint; CSS picks the icon from it,
// so nothing here depends on state at render time (no hydration mismatch).
export function ThemeToggle() {
  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    e.currentTarget.setAttribute("aria-label", `Switch to ${next === "dark" ? "light" : "dark"} mode`);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch theme"
      className="grid size-10 cursor-pointer place-items-center rounded-full border border-border-strong bg-panel text-muted hover:text-text"
    >
      <MoonIcon className="size-[17px] in-data-[theme=dark]:hidden" />
      <SunIcon className="hidden size-[17px] in-data-[theme=dark]:block" />
    </button>
  );
}
