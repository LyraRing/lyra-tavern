"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  toc: TocItem[];
  className?: string;
}

interface TocTreeNode extends TocItem {
  children: TocTreeNode[];
}

function buildTocTree(toc: TocItem[]): TocTreeNode[] {
  // Add a dummy root to hold top-level items
  const root: TocTreeNode = { id: "root", text: "", level: 0, children: [] };
  const stack: TocTreeNode[] = [root];

  toc.forEach((item) => {
    const node: TocTreeNode = { ...item, children: [] };
    // Backtrack: Find the correct parent for this level
    // We want the nearest parent with level < item.level
    while (stack.length > 1 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }
    stack[stack.length - 1].children.push(node);
    stack.push(node); // Push current node as potential parent for next items
  });

  return root.children;
}

// Recursive Node Component
const TocNode = ({
  node,
  activeId,
  collapsedIds,
  onToggle,
  onLinkClick,
}: {
  node: TocTreeNode;
  activeId: string;
  collapsedIds: Set<string>;
  onToggle: (id: string) => void;
  onLinkClick: (e: React.MouseEvent, id: string) => void;
}) => {
  const isCollapsed = collapsedIds.has(node.id);
  const hasChildren = node.children.length > 0;
  const isActive = activeId === node.id;

  return (
    <li className="relative group/item">
      <div
        className={`flex items-center gap-1 py-1 pr-2 rounded-r-lg transition-all duration-200 border-l-[3px] my-0.5 ${
          isActive
            ? "border-[#f59e0b] bg-amber-50"
            : "border-transparent hover:border-black/5 hover:bg-black/[0.02]"
        }`}
      >
        {/* Indent / Toggle Button Area */}
        <div className="shrink-0 w-5 flex justify-center">
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle(node.id);
              }}
              className="p-0.5 rounded-md hover:bg-black/10 text-gray-400 hover:text-amber-600 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  isCollapsed ? "-rotate-90" : "rotate-0"
                }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover/item:bg-amber-200 transition-colors"></span>
          )}
        </div>

        {/* Link Title */}
        <a
          href={`#${node.id}`}
          onClick={(e) => onLinkClick(e, node.id)}
          className={`flex-1 text-sm font-medium truncate transition-colors ${
            isActive
              ? "text-[#b45309]"
              : "text-gray-600 group-hover/item:text-[#b45309]"
          }`}
          title={node.text}
        >
          {node.text}
        </a>
      </div>

      {/* Children Recursion */}
      {hasChildren && (
        <div
          className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
            isCollapsed
              ? "grid-rows-[0fr] opacity-0"
              : "grid-rows-[1fr] opacity-100"
          }`}
        >
          <ul className="overflow-hidden pl-3 ml-2.5 border-l border-gray-100">
            {node.children.map((child) => (
              <TocNode
                key={child.id}
                node={child}
                activeId={activeId}
                collapsedIds={collapsedIds}
                onToggle={onToggle}
                onLinkClick={onLinkClick}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default function TableOfContents({
  toc,
  className = "",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isWidgetCollapsed, setIsWidgetCollapsed] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  // Build the tree only when toc changes
  const tree = useMemo(() => buildTocTree(toc), [toc]);

  const toggleSection = (id: string) => {
    const newSet = new Set(collapsedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCollapsedIds(newSet);
  };

  // Logic to auto-expand parent of active item?
  // Optional but good UX. Ideally if I scroll to an item, its parents should open.
  // For now, let's keep it manual or simple.

  // Reading Progress Listener
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Intersection Observer for Active ID
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav
      className={`toc bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 transition-all duration-300 flex flex-col ${className}`}
      style={{ maxHeight: "85vh" }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100/50 shrink-0">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2 select-none">
          <span className="text-amber-500">☰</span> 目录
          <span className="text-[10px] font-normal text-amber-700/80 bg-amber-50 px-1.5 py-0.5 rounded-full">
            {Math.round(readingProgress)}%
          </span>
        </h3>
        <button
          onClick={() => setIsWidgetCollapsed(!isWidgetCollapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          title={isWidgetCollapsed ? "展开面板" : "折叠面板"}
        >
          {isWidgetCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out flex flex-col ${
          isWidgetCollapsed
            ? "max-h-0 opacity-0 bg-transparent"
            : "max-h-full opacity-100"
        }`}
      >
        <div className="overflow-y-auto custom-scrollbar p-2 flex-1">
          <ul className="space-y-0.5">
            {tree.map((node) => (
              <TocNode
                key={node.id}
                node={node}
                activeId={activeId}
                collapsedIds={collapsedIds}
                onToggle={toggleSection}
                onLinkClick={handleLinkClick}
              />
            ))}
          </ul>
        </div>

        {/* Progress Bar at bottom */}
        <div className="h-1 bg-gray-100 w-full shrink-0">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>
      </div>
    </nav>
  );
}
