import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export const metadata = {
  title: "标签云 | Lyra Tavern",
  description: "Blog tags",
};

export default async function TagsPage() {
  const posts = await getAllPosts();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const tags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">标签云</h1>
      <p className="text-gray-500 mb-12">共 {tags.length} 个标签</p>

      <div className="bg-white p-8 md:p-16 rounded-3xl shadow-lg shadow-blue-900/5 border border-gray-100 flex flex-wrap justify-center items-center gap-6">
        {tags.length > 0 ? (
          tags.map(([tag, count], index) => {
            // Randomize colors for a bit of fun, or based on index to be deterministic
            const colors = [
              "text-pink-500 hover:text-pink-600 bg-pink-50 hover:bg-pink-100",
              "text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100",
              "text-emerald-500 hover:text-emerald-600 bg-emerald-50 hover:bg-emerald-100",
              "text-purple-500 hover:text-purple-600 bg-purple-50 hover:bg-purple-100",
              "text-amber-500 hover:text-amber-600 bg-amber-50 hover:bg-amber-100",
              "text-cyan-500 hover:text-cyan-600 bg-cyan-50 hover:bg-cyan-100",
            ];
            const colorClass = colors[index % colors.length];
            // Simple font size scaling
            const fontSize =
              count > 5 ? "text-3xl" : count > 2 ? "text-xl" : "text-base";

            return (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className={`
                     px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110
                     ${colorClass} ${fontSize} font-medium
                  `}
              >
                #{tag}
                <span className="text-xs opacity-60 ml-1 align-top bg-white/50 px-1.5 rounded-full">
                  {count}
                </span>
              </Link>
            );
          })
        ) : (
          <p className="text-gray-400">暂无标签</p>
        )}
      </div>
    </div>
  );
}
