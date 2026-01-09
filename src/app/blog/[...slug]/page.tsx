// src/app/blog/[...slug]/page.tsx
import { getPostBySlug, getAdjacentPosts, ContentItem } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { extractToc } from "@/lib/toc";
import TableOfContents from "@/components/TableOfContents";
import Comments from "@/components/Comments";
import Link from "next/link";
import "katex/dist/katex.min.css"; // Math support check
import "highlight.js/styles/github.css"; // Code highlighting
import MarkdownContent from "@/components/MarkdownContent";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  // Static params logic remains
  return [];
}

interface BlogPostPageProps {
  params: {
    slug: string[];
  };
}

async function getBlogPostData(slug: string): Promise<ContentItem | null> {
  return await getPostBySlug(slug);
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug: slugParts } = await params;
  const slug = Array.isArray(slugParts)
    ? slugParts.map((s) => decodeURIComponent(s)).join("/")
    : "";
  const post = await getBlogPostData(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - My Blog`,
    description: post.description || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug: slugParts } = await params;
  const slug = Array.isArray(slugParts)
    ? slugParts.map((s) => decodeURIComponent(s)).join("/")
    : "";

  if (!slug) {
    notFound();
  }
  const post = await getBlogPostData(slug);

  if (!post) {
    notFound();
  }

  // Get Neighbors
  const { prev: prevPost, next: nextPost } = await getAdjacentPosts(slug);

  // 提取 TOC
  const toc = extractToc(post.content);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header / Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        {/* If post has cover, use it, else use gradient */}
        {post.cover ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600"></div>
        )}

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-5xl mx-auto text-white z-10">
          <div className="mb-4">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 bg-blue-600/80 backdrop-blur-sm rounded-md text-xs font-bold mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base opacity-90">
            <time className="flex items-center gap-1">
              📅 {new Date(post.date).toLocaleDateString("zh-CN")}
            </time>
            <span className="flex items-center gap-1">
              ⏱️ {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1">
              📝 {post.wordCount} words
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <article className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
            <MarkdownContent content={post.content} />

            <hr className="my-10 border-gray-100" />

            {/* Post Footer */}
            <div className="flex justify-between items-center text-gray-500 text-sm">
              <div>Last updated: {new Date().toLocaleDateString()}</div>
            </div>

            {/* Post Navigation */}
            <div className="grid md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-xs text-gray-400 mb-1 group-hover:text-blue-500">
                    上一篇
                  </div>
                  <div className="font-bold text-gray-800 group-hover:text-blue-700 line-clamp-1">
                    {prevPost.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-right"
                >
                  <div className="text-xs text-gray-400 mb-1 group-hover:text-blue-500">
                    下一篇
                  </div>
                  <div className="font-bold text-gray-800 group-hover:text-blue-700 line-clamp-1">
                    {nextPost.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <Comments />
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block relative">
            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              {toc.length > 0 && (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <TableOfContents toc={toc} />
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
