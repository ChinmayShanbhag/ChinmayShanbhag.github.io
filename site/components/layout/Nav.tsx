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
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      <nav className="backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80 border-b border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            [Your Name]
          </Link>
          <div className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm",
                  pathname === l.href
                    ? "bg-black/5 dark:bg-white/10"
                    : "hover:bg-black/5 dark:hover:bg-white/10",
                )}
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
