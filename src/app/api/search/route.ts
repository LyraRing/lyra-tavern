import { NextResponse } from "next/server";
import { getAllPosts, getAllDocs } from "@/lib/markdown";

export async function GET() {
  try {
    const posts = await getAllPosts();
    const docs = await getAllDocs();

    const results = [
      ...posts.map((post) => ({
        type: "blog" as const,
        title: post.title,
        description: post.description || "",
        slug: `/blog/${post.slug}`,
        tags: post.tags,
      })),
      ...docs.map((doc) => ({
        type: "docs" as const,
        title: doc.title,
        description: doc.description || "",
        slug: `/docs/${doc.slug}`,
      })),
    ];

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch search index" },
      { status: 500 }
    );
  }
}
