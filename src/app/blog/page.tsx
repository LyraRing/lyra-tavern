// src/app/blog/page.tsx
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/markdown";
import PostCard from "@/components/PostCard";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  // 模拟置顶文章或最新推荐
  const featuredPosts = posts.slice(0, 2);
  const restPosts = posts.slice(2);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Banner - Butterfly Style */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg tracking-tight">
            我的博客
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90 drop-shadow-md">
            记录 · 思考 · 分享
          </p>
        </div>

        {/* Wave effect at bottom could be added here using SVG */}
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content (Posts) */}
          <div className="lg:col-span-3 space-y-8">
            {/* 特别置顶/最新 (如果有) */}
            {featuredPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-6 mb-8">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} direction="row" />
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restPosts.map((post) => (
                <PostCard key={post.slug} post={post} direction="col" />
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-20 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
                暂无文章，敬请期待...
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24 h-fit">
            {/* Author Profile */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center group hover:shadow-md transition-shadow">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">站长</h3>
              <p className="text-gray-500 text-sm mt-2">Full Stack Developer</p>

              <div className="flex justify-around mt-6 border-t border-gray-100 pt-4">
                <div className="text-center">
                  <div className="font-bold text-gray-800">{posts.length}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    文章
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800">{tags.length}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    标签
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  className="text-gray-400 hover:text-gray-800 transition-colors"
                >
                  Github
                </a>
                {/* Add more social icons here */}
              </div>
            </div>

            {/* Tags Cloud */}
            {tags.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  🏷️ 标签云
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tags?tag=${tag}`}
                      className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Announcement */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                📢 公告
              </h3>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p>欢迎来到我的新版个人网站！</p>
                <p className="mt-2">
                  这里采用了 Next.js + Tailwind CSS 构建，模仿了 Hexo Butterfly
                  的设计风格。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
