"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface ProfileCardProps {
  postCount: number;
  tagCount: number;
  categoryCount: number;
}

export default function ProfileCard({
  postCount,
  tagCount,
  categoryCount,
}: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 group hover:shadow-md transition-shadow">
      {/* Cover Image with Glass Effect */}
      <div className="h-32 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 relative">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20"></div>
        {/* Floating Circles Decoration */}
        <div className="absolute top-4 right-8 w-12 h-12 rounded-full border-2 border-white/30 blur-[2px]"></div>
        <div className="absolute bottom-4 left-8 w-8 h-8 rounded-full bg-white/20 blur-[1px]"></div>
      </div>

      {/* Avatar & Info */}
      <div className="px-6 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="w-24 h-24 rounded-full border-[4px] border-white shadow-md overflow-hidden bg-white relative group-hover:scale-105 transition-transform duration-500">
            <Image
              src="https://github.com/github.png"
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          {/* Status Dot */}
          <div className="absolute bottom-1 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-sm">🥝</span>
          </div>
        </div>

        <div className="mt-14 text-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            {siteConfig.author}
            <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full">
              Lv.100
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Future is now 🍭🍭🍭
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-6 mb-6 text-center">
          <div className="hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
            <div className="text-xs text-gray-400 mb-1">文章</div>
            <div className="font-bold text-gray-800 text-lg">{postCount}</div>
          </div>
          <div className="hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
            <div className="text-xs text-gray-400 mb-1">标签</div>
            <div className="font-bold text-gray-800 text-lg">{tagCount}</div>
          </div>
          <div className="hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer">
            <div className="text-xs text-gray-400 mb-1">分类</div>
            <div className="font-bold text-gray-800 text-lg">
              {categoryCount}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/"
          className="block w-full py-2.5 bg-gradient-to-r from-orange-400 to-rose-400 text-white text-center rounded-full font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all mb-6"
        >
          前往小窝 🚗
        </Link>

        {/* Social Icons Row (Simulated) */}
        <div className="flex justify-center gap-6 pb-6 border-t border-gray-50 pt-4">
          {/* Use simple emojis or SVGs as placeholders */}
          <div className="text-green-500 cursor-pointer hover:scale-110 transition-transform">
            💬
          </div>
          <div className="text-blue-400 cursor-pointer hover:scale-110 transition-transform">
            🐦
          </div>
          <div className="text-indigo-500 cursor-pointer hover:scale-110 transition-transform">
            🤖
          </div>
          <div className="text-gray-700 cursor-pointer hover:scale-110 transition-transform">
            🐙
          </div>
        </div>
      </div>
    </div>
  );
}
