"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define the type for search results items
type SearchItem = {
  type: "blog" | "docs";
  title: string;
  description: string;
  slug: string;
  tags?: string[];
};

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle hotkey (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch search index when opened
  useEffect(() => {
    if (isOpen && allItems.length === 0) {
      setLoading(true);
      fetch("/api/search")
        .then((res) => {
          if (!res.ok) throw new Error("Search API failed");
          return res.text(); // First get text to check validation
        })
        .then((text) => {
          if (!text || !text.trim()) {
            return [];
          }
          try {
            return JSON.parse(text);
          } catch (e) {
            console.error(
              "Search: Invalid JSON response",
              text.substring(0, 100),
              e
            );
            return [];
          }
        })
        .then((data) => {
          setAllItems(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search fetch error:", err);
          setLoading(false);
        });
    }
  }, [isOpen, allItems.length]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Filter results
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
    setResults(filtered.slice(0, 10)); // Limit to 10
  }, [query, allItems]);

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors border border-transparent hover:border-gray-300"
        aria-label="Search"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden lg:inline">搜索...</span>
        <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-xs font-mono text-gray-400 bg-white rounded border border-gray-200 shadow-sm">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeSearch}
      ></div>

      <div className="flex min-h-screen items-start justify-center pt-16 px-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="relative flex items-center border-b border-gray-100 px-4">
            <svg
              className="w-5 h-5 text-gray-400 absolute left-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              className="w-full py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none text-lg bg-transparent border-none focus:ring-0"
              placeholder="搜索文章、文档、标签..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute right-4">
              <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded">
                ESC
              </kbd>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {loading ? (
              <div className="py-12 text-center text-gray-500">
                加载索引中...
              </div>
            ) : query && results.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                没有找到相关内容 "{query}"
              </div>
            ) : results.length > 0 ? (
              <ul className="py-2">
                {results.map((item) => (
                  <li key={item.slug}>
                    <div
                      onClick={() => {
                        router.push(item.slug);
                        closeSearch();
                      }}
                      className="cursor-pointer px-4 py-3 hover:bg-amber-50 transition-colors group flex items-start gap-3"
                    >
                      <div
                        className={`mt-1 shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-xs font-bold ring-1 overflow-hidden ${
                          item.type === "blog"
                            ? "bg-amber-100 text-amber-600 ring-amber-200"
                            : "bg-green-100 text-green-600 ring-green-200"
                        }`}
                      >
                        {item.type === "blog" ? "文" : "档"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 group-hover:text-amber-700 truncate">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 truncate mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 px-8 text-center">
                <p className="text-gray-400 text-sm mb-2">尝试搜索</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setQuery("React")}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-600 transition-colors"
                  >
                    React
                  </button>
                  <button
                    onClick={() => setQuery("Blog")}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-600 transition-colors"
                  >
                    Blog
                  </button>
                  <button
                    onClick={() => setQuery("教程")}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-600 transition-colors"
                  >
                    教程
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-4 py-2 text-xs text-gray-400 flex justify-between border-t border-gray-100">
            <span>Search by Lyra Tavern</span>
            <span className="flex gap-2">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
