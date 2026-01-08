type TreasureCategory = {
  name: string;
  items: {
    title: string;
    description: string;
    url: string;
    icon?: string;
  }[];
};

const treasures: TreasureCategory[] = [
  {
    name: "开发工具",
    items: [
      {
        title: "VS Code",
        description: "最强大的代码编辑器",
        url: "https://code.visualstudio.com/",
        icon: "💻",
      },
      {
        title: "Warp",
        description: "面向 21 世纪的终端",
        url: "https://www.warp.dev/",
        icon: "⌨️",
      },
    ],
  },
  {
    name: "设计灵感",
    items: [
      {
        title: "Dribbble",
        description: "发现世界顶尖的设计师作品",
        url: "https://dribbble.com/",
        icon: "🎨",
      },
      {
        title: "Unsplash",
        description: "免费的高质量图片素材",
        url: "https://unsplash.com/",
        icon: "📷",
      },
    ],
  },
  {
    name: "学习资源",
    items: [
      {
        title: "MDN Web Docs",
        description: "Web 开发者参考手册",
        url: "https://developer.mozilla.org/",
        icon: "📚",
      },
      {
        title: "Next.js 官方文档",
        description: "Next.js 学习的最佳去处",
        url: "https://nextjs.org/docs",
        icon: "⚛️",
      },
    ],
  },
];

export const metadata = {
  title: "八宝盒 | Lyra Tavern",
  description: "Collection of useful tools and resources",
};

export default function TreasuresPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">八宝盒</h1>
        <p className="text-lg text-gray-500">
          收集各种好用的工具、资源和有趣的网站。
        </p>
      </div>

      <div className="space-y-16">
        {treasures.map((category) => (
          <section key={category.name}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 pb-2 border-b border-gray-100">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              {category.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-2xl group-hover:bg-blue-50 group-hover:scale-110 transition-all">
                      {item.icon || "🔗"}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
