import { cn } from "@/lib/cn";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground backdrop-blur p-5",
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
    <span className="text-xs rounded-md bg-muted text-muted-foreground px-2 py-1">{children}</span>
  );
}
