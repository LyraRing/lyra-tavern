import Link from "next/link";
import { ContentItem } from "@/lib/markdown";

interface PostCardProps {
  post: ContentItem;
  direction?: "row" | "col";
}

export default function PostCard({ post, direction = "row" }: PostCardProps) {
  const placeholders = [
    "bg-gradient-to-br from-pink-400 via-rose-400 to-red-500",
    "bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-500",
    "bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500",
    "bg-gradient-to-br from-amber-200 via-yellow-400 to-orange-500",
  ];
  const randomPlaceholder =
    placeholders[post.slug.length % placeholders.length];

  return (
    <article
      className={`group bg-white rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-gray-100 flex ${
        direction === "row"
          ? "flex-col md:flex-row h-full md:h-72" // Increased height slightly
          : "flex-col h-full"
      }`}
    >
      {/* Cover Image/Placeholder */}
      <div
        className={`relative overflow-hidden shrink-0 ${
          direction === "row"
            ? "w-full md:w-5/12 h-56 md:h-full"
            : "w-full h-56"
        }`}
      >
        <Link href={`/blog/${post.slug}`} className="block w-full h-full">
          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className={`w-full h-full ${randomPlaceholder} flex items-center justify-center p-6 relative`}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('/patterns/grid.svg')]"></div>

              <div className="text-white text-center">
                <span className="block text-4xl mb-2 opacity-50">📝</span>
                <span className="font-bold opacity-90 text-2xl tracking-widest uppercase">
                  Lyra Tavern
                </span>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>

        {/* Category Badge overlay if useful */}
        {post.tags && post.tags.length > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-800 rounded-lg shadow-sm">
              {post.tags[0]}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col p-6 md:p-8 flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-medium">
          <time className="flex items-center gap-1">
            📅 {new Date(post.date).toLocaleDateString()}
          </time>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              ⏱️ {post.readingTime} min
            </span>
          )}
        </div>

        <h2
          className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 ${
            direction === "row" ? "text-2xl" : "text-xl"
          }`}
        >
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
          {post.description || post.excerpt || "暂无描述..."}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex gap-2">
            {post.tags?.slice(1, 3).map(
              (
                tag // Skip first tag as it's often on cover
              ) => (
                <span
                  key={tag}
                  className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md"
                >
                  #{tag}
                </span>
              )
            )}
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-600 font-medium text-sm hover:translate-x-1 transition-transform inline-flex items-center gap-1"
          >
            Read Article <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
