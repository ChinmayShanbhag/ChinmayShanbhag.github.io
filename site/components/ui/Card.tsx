import { cn } from "@/lib/cn";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-black/10 dark:border-white/15 bg-[var(--color-background)]/70 text-[var(--color-foreground)] backdrop-blur p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="text-xs rounded-full border px-2 py-1 opacity-80">{children}</span>;
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs rounded-md bg-black/5 dark:bg-white/10 px-2 py-1">{children}</span>
  );
}
