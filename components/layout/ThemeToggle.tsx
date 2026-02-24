"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "erler-theme";

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      const nextTheme =
        storedTheme === "dark" || storedTheme === "light"
          ? storedTheme
          : getSystemTheme();

      setTheme(nextTheme);
      applyTheme(nextTheme);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      return nextTheme;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Acik temaya gec" : "Koyu temaya gec"}
      className={[
        "inline-flex h-10 items-center gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 text-sm font-semibold text-[color:var(--color-muted)] transition hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
