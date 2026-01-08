import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-50">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-90"></div>

        {/* Abstract Background Pattern - Subtle dots or grid */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.03]"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm tracking-tight pb-2">
            Lyra Tavern
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            在数字的海洋中构建思想的港湾。
            <br />
            记录代码，分享生活，探索未知。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/blog"
              className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              开始阅读
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-full border border-gray-300 hover:border-blue-600 text-gray-600 hover:text-blue-600 font-medium transition-all bg-white/50 hover:bg-white"
            >
              了解更多
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Link
              href="/blog"
              className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                📝
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                技术博客
              </h3>
              <p className="text-gray-500 leading-relaxed">
                分享全栈开发经验、算法心得与技术前沿资讯。
              </p>
            </Link>

            <Link
              href="/docs"
              className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                文档中心
              </h3>
              <p className="text-gray-500 leading-relaxed">
                结构化的知识库，包含学习笔记、Gitbook 风格的教程系列。
              </p>
            </Link>

            <Link
              href="/treasures"
              className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                💎
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                八宝盒
              </h3>
              <p className="text-gray-500 leading-relaxed">
                收集的好用工具、设计资源与有趣的互联网发现。
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                最新文章
              </h2>
              <p className="text-gray-500">探索最新的思考与创作</p>
            </div>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              查看全部 posts <span className="text-xl">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <div key={post.slug} className="h-full">
                  <PostCard post={post} direction="col" />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                还没有发布文章...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quote / Decoration */}
      <section className="py-20 bg-blue-50 text-slate-700 text-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <blockquote className="text-2xl md:text-3xl font-serif italic text-slate-800 opacity-80 max-w-3xl mx-auto">
            "Code is like humor. When you have to explain it, it’s bad."
          </blockquote>
          <cite className="block mt-6 text-slate-500 font-medium not-italic">
            — Cory House
          </cite>
        </div>
      </section>
    </div>
  );
}
