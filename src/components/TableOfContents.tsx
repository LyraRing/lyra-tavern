"use client";

import { useState, useEffect } from "react";
import { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  toc: TocItem[];
  className?: string;
}

export default function TableOfContents({
  toc,
  className = "",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    // 观察所有标题元素
    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  if (toc.length === 0) {
    return null;
  }

  const minLevel = Math.min(...toc.map((item) => item.level));

  return (
    <nav className={`toc ${className}`}>
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
        目录
      </h3>
      <ul className="space-y-1 text-sm">
        {toc.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            style={{ paddingLeft: `${(item.level - minLevel) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block py-1.5 px-2 rounded transition-colors duration-200 ${
                activeId === item.id
                  ? "bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
