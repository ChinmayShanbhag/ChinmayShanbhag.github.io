import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { InlineChart } from "@/ui/charts/InlineChart";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "posts");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const file = path.join(process.cwd(), "content", "posts", `${slug}.mdx`);
  const source = fs.readFileSync(file, "utf-8");
  const { content } = matter(source);
  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-4 py-12">
      <MDXRemote source={content} components={{ InlineChart }} />
    </article>
  );
}
