import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export const metadata = {
  title: "归档 | Lyra Tavern",
  description: "Blog archives",
};

export default async function ArchivePage() {
  const posts = await getAllPosts();

  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-16 text-center">
        文章归档
      </h1>

      <div className="relative border-l-2 border-dashed border-gray-200 ml-4 md:ml-12 space-y-16">
        {years.map((year) => (
          <div key={year} className="relative pl-8 md:pl-12">
            {/* Year Label */}
            <div className="absolute -left-[1.35rem] top-0 flex items-center justify-center w-10 h-10 bg-white border-2 border-blue-500 rounded-full text-blue-600 font-bold shadow-sm z-10 pb-1">
              <span className="text-sm pt-1">{year}</span>
            </div>

            <div className="space-y-6 pt-1">
              {postsByYear[year].map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex items-start gap-4"
                >
                  {/* Line connector/dot */}
                  <div className="absolute -left-[2.5rem] md:-left-[3.5rem] top-2.5 w-3 h-3 bg-gray-300 rounded-full group-hover:bg-blue-400 ring-4 ring-white transition-colors"></div>

                  <div className="flex-1 bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-100 group-hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0"></span>
                          {post.title}
                        </Link>
                      </h3>
                      <time className="text-sm text-gray-400 font-mono shrink-0 bg-gray-50 px-2 py-1 rounded">
                        {new Date(post.date).toLocaleDateString("zh-CN", {
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </time>
                    </div>
                    {post.tags && (
                      <div className="flex gap-2 relative z-10">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-gray-400">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
