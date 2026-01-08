import { getAllDocs } from "@/lib/markdown";
import DocsSidebar from "@/components/DocsSidebar";
import MobileDocsNav from "@/components/MobileDocsNav";
import React from "react";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = await getAllDocs();

  return (
    <div className="flex w-full max-w-[90rem] mx-auto px-4 lg:px-6 gap-6 xl:gap-10">
      <MobileDocsNav docs={docs} />

      {/* Sidebar - Desktop */}
      <aside className="w-64 shrink-0 hidden lg:block py-8 border-r border-gray-100 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto custom-scrollbar">
        <h2 className="font-bold text-gray-900 px-3 mb-4 text-lg tracking-tight">
          文档中心
        </h2>
        <DocsSidebar docs={docs} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-8 min-w-0">
        {/* Mobile Warning or Nav could go here if we had a mobile drawer */}
        {children}
      </main>
    </div>
  );
}
