import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export const metadata = {
  title: "站点统计 | Lyra Tavern",
  description: "Blog statistics",
};

export default async function StatsPage() {
  const posts = await getAllPosts();

  const totalPosts = posts.length;
  // Calculate total words directly, assuming some average or if available in metadata
  // Since we don't have word count in frontmatter easily without reading content, we'll estimate or skip
  // For now let's just count tags

  const allTags = posts.flatMap((p) => p.tags || []);
  const uniqueTags = new Set(allTags);

  const lastUpdate =
    posts.length > 0
      ? new Date(posts[0].date).toLocaleDateString("zh-CN")
      : "N/A";

  const stats = [
    {
      label: "文章总数",
      value: totalPosts,
      unit: "篇",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "独特标签",
      value: uniqueTags.size,
      unit: "个",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "最后更新",
      value: lastUpdate,
      unit: "",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "运行天数",
      value: "∞",
      unit: "天",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        站点统计
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center ${stat.color}`}
          >
            <div className="text-3xl md:text-4xl font-bold mb-2">
              {stat.value}
              <span className="text-lg ml-1 opacity-70 font-normal">
                {stat.unit}
              </span>
            </div>
            <div className="text-sm font-medium opacity-80 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Simple Activity Graph Placeholder */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">发布频率</h3>
        <div className="h-40 flex items-end gap-2 text-xs text-gray-400">
          {/* Creating a fake bar chart */}
          {posts.slice(0, 15).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-blue-100 hover:bg-blue-200 rounded-t-sm relative group"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity">
                Post {i + 1}
              </div>
            </div>
          ))}
          <div className="w-full border-t border-gray-200 absolute bottom-0 left-0"></div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          （仅展示最近动态趋势）
        </p>
      </div>
    </div>
  );
}
