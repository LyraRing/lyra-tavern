// src/app/docs/[...slug]/page_new.tsx
import { getDocBySlug, getAllDocs, ContentItem } from "@/lib/markdown";
import { notFound } from "next/navigation";
import { extractToc } from "@/lib/toc";
import TableOfContents from "@/components/TableOfContents";

export const dynamicParams = true;

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split("/").filter(Boolean),
  }));
}

interface DocPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: DocPageProps) {
  const { slug: slugParts } = await params;
  const slug = Array.isArray(slugParts) ? slugParts.join("/") : "";
  const doc = await getDocBySlug(slug);

  if (!doc) {
    return { title: "Doc Not Found" };
  }

  return {
    title: `${doc.title} - Docs`,
    description: doc.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  // 注意：Next.js 15+ 中 params 是 Promise
  const resolvedParams = await params;
  const { slug: slugParts } = resolvedParams;
  const slug = Array.isArray(slugParts) ? slugParts.join("/") : "";

  if (!slug) {
    notFound();
  }
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const toc = extractToc(doc.content);

  return (
    <div className="flex gap-8 xl:gap-12 relative">
      <article className="flex-1 min-w-0">
        <header className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {doc.title}
          </h1>
          <div className="text-sm text-gray-500">
            上次更新：
            {new Date(doc.date || Date.now()).toLocaleDateString("zh-CN")} ·
            阅读时间：{doc.readingTime} 分钟
          </div>
        </header>

        <div className="prose prose-blue max-w-none prose-headings:scroll-mt-24">
          <div dangerouslySetInnerHTML={{ __html: doc.content }} />
        </div>
      </article>

      {/* TOC - Desktop */}
      <aside className="w-48 hidden xl:block shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <TableOfContents toc={toc} />
        </div>
      </aside>
    </div>
  );
}
