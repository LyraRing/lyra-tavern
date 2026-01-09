import React from "react";
import { siteConfig } from "@/config/site";

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();
  const startYear = new Date(siteConfig.startDate).getFullYear();
  const yearString =
    startYear === currentYear ? `${startYear}` : `${startYear}-${currentYear}`;

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-slate-500">
        <div>
          © {yearString} {siteConfig.author}.{" "}
          <a
            href={siteConfig.links.github}
            className="hover:text-amber-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <div>
          <a href="/about" className="hover:text-amber-600">
            关于本站
          </a>
          <span className="mx-2">|</span>
          <a href="/guestbook" className="hover:text-amber-600">
            留言板
          </a>
        </div>
      </div>
    </footer>
  );
}
