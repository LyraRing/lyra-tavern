// src/components/Comments.tsx
"use client";

// Placeholder for Giscus or other comment systems
export default function Comments() {
  return (
    <div className="mt-16 pt-8 border-t border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>💬</span> 评论
      </h3>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500 mb-4">评论系统接入中...</p>
        {/* 
            Instructions for Giscus:
            1. Install @giscus/react
            2. Configure repo, repoId, category, categoryId
            3. Replace this placeholder with <Giscus ... />
         */}
        <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
          加载评论
        </button>
      </div>
    </div>
  );
}
