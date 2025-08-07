import Link from "next/link";
import { siteConfig } from "@/content/config";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="opacity-70">
          © {new Date().getFullYear()} {siteConfig.siteName}
        </p>
        <div className="flex items-center gap-4">
          <Link className="hover:underline" href={siteConfig.social.linkedin}>
            LinkedIn
          </Link>
          <Link className="hover:underline" href={siteConfig.social.github}>
            GitHub
          </Link>
          <Link className="hover:underline" href={siteConfig.social.twitter}>
            X
          </Link>
        </div>
      </div>
    </footer>
  );
}
