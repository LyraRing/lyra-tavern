export const metadata = {
  title: "留言板 | Lyra Tavern",
  description: "Leave a message",
};

export default function GuestbookPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">留言板</h1>
        <p className="text-lg text-gray-500">
          欢迎留下你的足迹，分享你的想法。
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px] flex flex-col items-center justify-center text-gray-400">
        <div className="text-6xl mb-6">💬</div>
        <p className="text-xl">评论系统正在施工中...</p>
        <p className="text-sm mt-2">（未来将集成 Giscus 或其它评论组件）</p>
      </div>
    </div>
  );
}
