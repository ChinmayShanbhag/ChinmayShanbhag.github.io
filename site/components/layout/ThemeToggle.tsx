"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = resolvedTheme === "dark" || theme === "dark";
  return (
    <button
      aria-label="Toggle theme"
      className="rounded-md p-2 hover:bg-muted"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="text-sm">{isDark ? "🌙" : "☀️"}</span>
    </button>
  );
}
