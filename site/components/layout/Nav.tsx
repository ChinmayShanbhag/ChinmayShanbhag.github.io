"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/dashboards", label: "Dashboards" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScrollY && current > 64);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="backdrop-blur bg-background/80 text-foreground border-b border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            Chinmay Shanbhag
          </Link>
          <div className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm",
                  pathname === l.href ? "bg-muted" : "hover:bg-muted",
                )}
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => setOpen(!open)} aria-label="Menu">
              Menu
            </Button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border px-4 py-3 space-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm",
                  pathname === l.href ? "bg-muted" : "hover:bg-muted",
                )}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
