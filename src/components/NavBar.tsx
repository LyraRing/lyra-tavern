"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SiteLogo from "@/components/SiteLogo";
import Search from "@/components/Search";

type NavItem =
  | {
      label: string;
      href: string;
      icon?: string;
    }
  | {
      label: string;
      icon?: string;
      children: Array<
        | { label: string; href: string; icon?: string }
        | { label: string; disabled: true; icon?: string }
      >;
    };

const navItems: NavItem[] = [
  { label: "主页", href: "/", icon: "🏠" },
  {
    label: "博客",
    icon: "📝",
    children: [
      { label: "博客主页", href: "/blog", icon: "📖" },
      { label: "时间轴", href: "/blog/timeline", icon: "📅" },
      { label: "归档", href: "/blog/archive", icon: "📁" },
      { label: "标签", href: "/blog/tags", icon: "🏷️" },
      { label: "统计", href: "/blog/stats", icon: "📊" },
    ],
  },
  {
    label: "文档",
    icon: "📚",
    children: [{ label: "文档中心", href: "/docs", icon: "📋" }],
  },
  {
    label: "八宝盒",
    icon: "🎁",
    children: [
      { label: "资源分享", href: "/treasures", icon: "💎" },
      { label: "留言板", href: "/guestbook", icon: "💬" },
    ],
  },
  { label: "关于", href: "/about", icon: "👤" },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <SiteLogo />

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-1"
            aria-label="主导航"
          >
            <div className="mr-2">
              <Search />
            </div>
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  "children" in item && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {"href" in item ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <>
                    <button
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                        item.children.some(
                          (c) => "href" in c && isActive(c.href)
                        )
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                      aria-expanded={openDropdown === item.label}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 transition-all duration-200 ${
                        openDropdown === item.label
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      {item.children.map((child) => (
                        <div key={child.label}>
                          {"href" in child ? (
                            <Link
                              href={child.href}
                              className={`flex items-center gap-2 px-4 py-2.5 transition-colors ${
                                isActive(child.href)
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                              }`}
                            >
                              <span>{child.icon}</span>
                              <span>{child.label}</span>
                            </Link>
                          ) : (
                            <span className="flex items-center gap-2 px-4 py-2.5 text-gray-400 cursor-not-allowed">
                              <span>{child.icon}</span>
                              <span>{child.label}</span>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-screen pb-4" : "max-h-0"
          }`}
        >
          <nav className="space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {"href" in item ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <details className="group">
                    <summary className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer list-none">
                      <span>{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-200 group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="pl-8 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <div key={child.label}>
                          {"href" in child ? (
                            <Link
                              href={child.href}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                                isActive(child.href)
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span>{child.icon}</span>
                              <span>{child.label}</span>
                            </Link>
                          ) : (
                            <span className="flex items-center gap-2 px-4 py-2.5 text-gray-400 cursor-not-allowed">
                              <span>{child.icon}</span>
                              <span>{child.label}</span>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
