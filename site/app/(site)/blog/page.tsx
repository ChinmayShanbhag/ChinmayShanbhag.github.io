import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

type Post = { slug: string; title: string; date: string; summary?: string };

function getPosts(): Post[] {
  const dir = path.join(process.cwd(), "content", "posts");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const source = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(source);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title ?? file,
      date: data.date ?? "",
      summary: data.summary,
    };
  });
}

export default function BlogPage() {
  const posts = getPosts();
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      <div className="grid gap-6">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`}>
            <Card>
              <h3 className="font-medium">{p.title}</h3>
              {p.summary && <p className="text-sm opacity-80">{p.summary}</p>}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
