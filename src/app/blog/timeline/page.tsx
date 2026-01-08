import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export const metadata = {
  title: "时间轴 | Lyra Tavern",
  description: "Blog timeline",
};

export default async function TimelinePage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        时间轴
      </h1>

      <div className="relative pl-8 md:pl-0">
        {/* Vertical center line - Desktop: Center, Mobile: Left */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gray-200"></div>

        {posts.map((post, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={post.slug}
              className={`mb-12 flex flex-col md:flex-row items-center justify-between w-full relative ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block md:w-5/12"></div>

              {/* Dot */}
              <div className="absolute left-[-2.25rem] md:static z-10 w-4 h-4 bg-white border-4 border-blue-500 rounded-full shadow-sm shrink-0 md:mx-auto"></div>

              {/* Content Card */}
              <div
                className={`w-full md:w-5/12 ${
                  isEven ? "md:text-right" : "md:text-left"
                }`}
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <time className="text-xs text-blue-500 font-bold block mb-1 tracking-wider uppercase">
                      {new Date(post.date).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.tags && post.tags.length > 0 && (
                      <div
                        className={`flex flex-wrap gap-2 mt-3 ${
                          isEven ? "md:justify-end" : ""
                        }`}
                      >
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded text-xs group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12 text-gray-400 text-sm flex flex-col items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <p>THE END</p>
      </div>
    </div>
  );
}
