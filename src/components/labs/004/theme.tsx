"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type OrbitTheme = "light" | "dark";

const THEME_VARS: Record<OrbitTheme, CSSProperties> = {
  light: {
    "--orbit-bg": "#F5F6F7",
    "--orbit-surface": "#FFFFFF",
    "--orbit-ink": "#111214",
    "--orbit-secondary": "#5B6672",
    "--orbit-border": "#E4E6E9",
    "--orbit-accent": "#136156",
    "--orbit-accent-ink": "#FFFFFF",
    "--orbit-negative": "#B4433B",
  } as CSSProperties,
  dark: {
    "--orbit-bg": "#0E0F11",
    "--orbit-surface": "#17191C",
    "--orbit-ink": "#EDEFF1",
    "--orbit-secondary": "#9AA0A6",
    "--orbit-border": "#2A2D31",
    "--orbit-accent": "#24A088",
    "--orbit-accent-ink": "#0E0F11",
    "--orbit-negative": "#E5766D",
  } as CSSProperties,
};

type OrbitThemeContextValue = {
  theme: OrbitTheme;
  setTheme: (theme: OrbitTheme) => void;
  toggle: () => void;
};

const OrbitThemeContext = createContext<OrbitThemeContextValue | null>(null);

/**
 * Local theme system scoped entirely to the Orbit lab (labs/004/experiencia).
 * Does not touch ALUMNA's own dark-mode system. Defaults to light mode.
 */
export function OrbitThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<OrbitTheme>("light");

  const value = useMemo<OrbitThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [theme],
  );

  return (
    <OrbitThemeContext.Provider value={value}>
      <div
        data-orbit-theme={theme}
        style={THEME_VARS[theme]}
        className="min-h-screen bg-[var(--orbit-bg)] font-[family-name:var(--font-inter)] text-[var(--orbit-ink)] antialiased transition-colors duration-200"
      >
        {children}
        {/*
         * ALUMNA's global `:focus-visible` rule (globals.css) uses `var(--accent)`,
         * which — as a CSS custom property — inherits down into this subtree since
         * nothing here redefines `--accent` itself, only `--orbit-*`. That makes the
         * ring's color an accident of inheritance from an unrelated palette rather
         * than a deliberate choice, so it's pinned explicitly here to this lab's own
         * `--orbit-accent`/`--orbit-border`, verified against both theme modes.
         */}
        <style jsx global>{`
          [data-orbit-theme] :focus-visible {
            outline-width: 2px;
            outline-style: solid;
            outline-color: var(--orbit-accent);
            outline-offset: 2px;
            border-radius: 2px;
          }
        `}</style>
      </div>
    </OrbitThemeContext.Provider>
  );
}

export function useOrbitTheme() {
  const ctx = useContext(OrbitThemeContext);
  if (!ctx) {
    throw new Error("useOrbitTheme must be used within OrbitThemeProvider");
  }
  return ctx;
}
