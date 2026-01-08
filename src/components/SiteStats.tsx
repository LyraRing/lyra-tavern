"use client";

interface SiteStatsProps {
  postCount: number;
  totalWords: number;
  lastUpdate: string;
}

export default function SiteStats({
  postCount,
  totalWords,
  lastUpdate,
}: SiteStatsProps) {
  // Mock Data for visitors (Since we don't have a real DB)
  const mockVisitors = 176421;
  const mockPageViews = 893898;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4 pb-3 border-b border-gray-50">
        <span className="text-xl">📊</span> 小站资讯
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">文章数目 :</span>
          <span className="font-medium text-gray-800">{postCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">本站总字数 :</span>
          <span className="font-medium text-gray-800">
            {(totalWords / 1000).toFixed(1)}k
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">本站访客数 :</span>
          <span className="font-medium text-gray-800">
            {mockVisitors.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">本站总访问量 :</span>
          <span className="font-medium text-gray-800">
            {mockPageViews.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-gray-500">最后更新时间 :</span>
          <span className="font-medium text-gray-800">
            {new Date(lastUpdate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
