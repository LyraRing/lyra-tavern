import Link from "next/link";
import { getAllDocs, ContentItem } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "文档中心 | Lyra Tavern",
  description: "Documentation center",
};

export default async function DocsIndexPage() {
  const docs = await getAllDocs();

  // Group docs by category (first segment of slug)
  const docsByCategory: Record<string, ContentItem[]> = {};

  docs.forEach((doc) => {
    // slug format example: "category/page" or "page" or "category/subcategory/page"
    // We'll take the first segment as the top-level category
    const parts = doc.slug.split("/");
    const category = parts.length > 1 ? parts[0] : "general";

    if (!docsByCategory[category]) {
      docsByCategory[category] = [];
    }
    docsByCategory[category].push(doc);
  });

  const categories = Object.keys(docsByCategory).sort();

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-blue-600 hover:prose-a:text-blue-500">
      <h1>文档中心</h1>
      <p className="lead">
        欢迎来到文档中心。这里记录了各种结构化的学习笔记、教程和项目文档。
      </p>

      <hr />

      <div className="not-prose grid md:grid-cols-2 gap-6 mt-8">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category}
              className="border rounded-xl p-6 hover:shadow-md transition-shadow bg-white"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                {category === "general" ? "未分类" : category}
              </h2>
              <div className="space-y-2">
                {docsByCategory[category].map((doc) => {
                  // link target needs to handle if doc.slug already includes category or not
                  // actually our dynamic route is [...slug], so we can just link to /docs/${doc.slug}
                  return (
                    <Link
                      key={doc.slug}
                      href={`/docs/${doc.slug}`}
                      className="block text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {doc.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 bg-gray-50 rounded-lg text-gray-500">
            暂无文档
          </div>
        )}
      </div>

      <div className="mt-12 p-4 bg-blue-50 text-blue-800 rounded-lg">
        <strong>提示：</strong> 您可以通过左侧的侧边栏快速导航到具体的文档章节。
      </div>
    </div>
  );
}
