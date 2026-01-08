"use client";

import { useEffect, useRef } from "react";

export default function MarkdownContent({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find all PRE elements that haven't been processed
    const preElements = containerRef.current.querySelectorAll("pre");

    preElements.forEach((pre) => {
      // Avoid double wrapping
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return;

      const code = pre.querySelector("code");
      // If just <pre> without <code>, might be ASCII art or raw text, wrap anyway to be consistent or skip.
      // Usually Markdown output is <pre><code>...</code></pre>

      // Extract Language
      let language = "text";
      if (code) {
        code.classList.forEach((cls) => {
          if (cls.startsWith("language-")) {
            language = cls.replace("language-", "");
          }
        });
      }

      // Create Wrapper
      const wrapper = document.createElement("div");
      wrapper.className =
        "code-block-wrapper my-8 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm relative group transition-all";

      // Create Header
      const header = document.createElement("div");
      header.className =
        "flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs text-gray-500 select-none";

      const langSpan = document.createElement("span");
      langSpan.className =
        "font-mono font-semibold uppercase tracking-wider text-gray-600";
      langSpan.textContent = language;

      const copyBtn = document.createElement("button");
      copyBtn.className =
        "flex items-center gap-1.5 hover:text-blue-600 hover:bg-white px-2 py-1 rounded transition-all cursor-pointer border border-transparent hover:border-gray-200";
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <span>复制</span>
      `;
      copyBtn.onclick = () => {
        const text = code ? code.innerText : pre.innerText;
        navigator.clipboard.writeText(text);
        copyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M20 6 9 17l-5-5"/></svg>
            <span class="text-green-500">已复制!</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                <span>复制</span>
            `;
        }, 2000);
      };

      header.appendChild(langSpan);
      header.appendChild(copyBtn);

      // Wrapper insertion
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      // Styles for Pre inside wrapper
      pre.style.margin = "0";
      pre.style.padding = "1rem";
      pre.style.backgroundColor = "#ffffff";
      pre.style.overflowX = "auto";

      // Collision Check: Check Height for Collapse Logic
      const MAX_HEIGHT = 400; // px
      const actualHeight = pre.getBoundingClientRect().height;

      if (actualHeight > MAX_HEIGHT) {
        pre.style.maxHeight = `${MAX_HEIGHT}px`;
        pre.style.overflowY = "hidden";
        pre.style.transition = "max-height 0.3s ease";

        // Gradient overlay when collapsed
        const gradientOverlay = document.createElement("div");
        gradientOverlay.className =
          "absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none";

        // Expand/Collapse Button Container
        const actionRow = document.createElement("div");
        actionRow.className =
          "absolute bottom-0 left-0 w-full flex justify-center pb-2 pt-8 bg-gradient-to-t from-white via-white/80 to-transparent";

        const expandBtn = document.createElement("button");
        expandBtn.className =
          "px-4 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-full shadow-sm border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer";
        expandBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            展开全部代码
        `;

        let isExpanded = false;
        expandBtn.onclick = () => {
          isExpanded = !isExpanded;
          if (isExpanded) {
            pre.style.maxHeight = "none";
            expandBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                收起代码
            `;
            actionRow.style.background = "transparent";
            actionRow.style.position = "static"; // Move to flow
            actionRow.style.paddingTop = "10px";
            wrapper.appendChild(actionRow); // Move to bottom
          } else {
            pre.style.maxHeight = `${MAX_HEIGHT}px`;
            expandBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                展开全部代码
            `;
            actionRow.style.background =
              "linear-gradient(to top, white, rgba(255,255,255,0.8), transparent)";
            actionRow.style.position = "absolute";
            actionRow.style.paddingTop = "2rem";
            // Check if actionRow is already in wrapper, if yes, just ensure styles
          }
        };

        actionRow.appendChild(expandBtn);
        wrapper.appendChild(actionRow);
      }
    });
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="prose-fomal"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
