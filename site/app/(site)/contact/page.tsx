import Link from "next/link";
import { getProfile } from "@/lib/data";

export default function ContactPage() {
  const profile = getProfile();
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      <p className="opacity-80">Reach out by email or connect on social.</p>
      <div className="flex items-center gap-6">
        <Link href={`mailto:${profile.email}`} className="underline">
          {profile.email}
        </Link>
        <Link href="/resume.pdf" className="underline">
          Resume
        </Link>
      </div>
    </section>
  );
}
