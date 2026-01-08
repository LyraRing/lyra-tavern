import { NextResponse } from "next/server";
import { getAllPosts, getAllDocs } from "@/lib/markdown";

export async function GET() {
  const posts = await getAllPosts();
  const docs = await getAllDocs();

  const results = [
    ...posts.map((post) => ({
      type: "blog",
      title: post.title,
      description: post.description || "",
      slug: `/blog/${post.slug}`,
      tags: post.tags,
    })),
    ...docs.map((doc) => ({
      type: "docs",
      title: doc.title,
      description: doc.description || "",
      slug: `/docs/${doc.slug}`, // Assuming docs slug is full path or we construct it. logic in docs page was /docs/${slug}
      // Note: In docs page we split category, but here getAllDocs returns slug which includes path?
      // Let's check getAllDocs implementation again.
    })),
  ];

  // Fix Docs Slug:
  // In markdown.ts, slugFromFilePath returns relative path without extension.
  // In docs/page.tsx, I used `href={\`/docs/\${doc.slug}\`}` in one version and `docs/${category}/${doc.slug}` in another.
  // Wait, if `doc.slug` is `category/page`, then `/docs/${doc.slug}` is correct.
  // If `doc.slug` is just filename, we lose category.
  // `slugFromFilePath` usually returns "folder/file" if it's recursive.
  // `readMarkdownFilesRecursive` calls `slugFromFilePath(DOCS_DIR, filePath)`.
  // So `doc.slug` should be "category/my-doc".
  // So `/docs/${doc.slug}` is correct.

  return NextResponse.json(results);
}
