"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function MarkdownContent({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = () => setLightboxSrc(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightboxSrc) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [lightboxSrc]);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Image Processing ---
    const images = containerRef.current.querySelectorAll("img");
    images.forEach((img) => {
      img.loading = "lazy";
      Object.assign(img.style, {
        maxWidth: "85%",
        maxHeight: "600px",
        // Ensure aspect ratio is preserved
        width: "auto",
        height: "auto",
        margin: "2rem auto",
        display: "block",
        borderRadius: "1rem",
        boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
        cursor: "zoom-in",
        transition: "all 0.3s ease",
      });
      img.onmouseenter = () => {
        img.style.transform = "scale(1.02)";
        img.style.boxShadow = "0 0 30px rgba(245, 158, 11, 0.6)";
      };
      img.onmouseleave = () => {
        img.style.transform = "scale(1.0)";
        img.style.boxShadow = "0 0 20px rgba(245, 158, 11, 0.4)";
      };
      img.onclick = (e) => {
        e.stopPropagation();
        setLightboxSrc(img.src);
      };
    });

    // Find all PRE elements that haven't been processed
    const preElements = containerRef.current.querySelectorAll("pre");

    preElements.forEach((pre) => {
      // Avoid double wrapping
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return;
      // Also check if we are already inside a Content Row (avoid nested processing)
      if (pre.parentElement?.classList.contains("code-content-row")) return;

      const code = pre.querySelector("code");

      // Extract Language
      let language = "text";
      if (code) {
        code.classList.forEach((cls) => {
          if (cls.startsWith("language-")) {
            language = cls.replace("language-", "");
          }
        });
      }

      // 1. Calculate Line Numbers
      const rawText = pre.innerText || "";
      // Smart split: Handle CRLF, LF, CR. Filter empty last line if it exists due to trailing newline
      const lines = rawText.split(/\r\n|\r|\n/);
      if (lines.length > 0 && lines[lines.length - 1].trim() === "") {
        lines.pop(); // Remove trailing empty line often added by editors
      }
      const lineCount = lines.length || 1;

      // Create Wrapper
      const wrapper = document.createElement("div");
      // Enhanced 3D Effect: Deeper shadow, border, and amber glow on hover
      wrapper.className =
        "code-block-wrapper my-8 border border-gray-100 rounded-xl overflow-hidden bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] relative group transition-all hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.15)] transform hover:-translate-y-1 duration-300";

      // Create Header
      const header = document.createElement("div");
      header.className =
        "flex items-center justify-between px-4 py-2.5 bg-gray-50/80 backdrop-blur-md border-b border-gray-100 text-xs text-gray-500 select-none";

      const langSpan = document.createElement("div");
      langSpan.className = "flex items-center gap-2";
      langSpan.innerHTML = `
        <span class="w-3 h-3 rounded-full bg-red-400 opacity-80"></span>
        <span class="w-3 h-3 rounded-full bg-amber-400 opacity-80"></span>
        <span class="w-3 h-3 rounded-full bg-green-400 opacity-80"></span>
        <span class="ml-2 font-mono font-bold uppercase tracking-wider text-gray-600">${language}</span>
      `;

      const copyBtn = document.createElement("button");
      copyBtn.className =
        "flex items-center gap-1.5 hover:text-amber-600 hover:bg-white px-2.5 py-1 rounded-md transition-all cursor-pointer border border-transparent hover:border-gray-200 hover:shadow-sm active:scale-95";
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

      // Create Content Container (Line Numbers + Code)
      const contentRow = document.createElement("div");
      contentRow.className =
        "code-content-row flex flex-row items-stretch bg-white relative";

      // Line Numbers Column
      const lineNumbers = document.createElement("div");
      lineNumbers.className =
        "flex-shrink-0 select-none text-right bg-gray-50/50 border-r border-gray-100 text-gray-300 font-mono text-[0.95rem] leading-[1.6] pt-5 pb-5 px-3 min-w-[3rem]";
      lineNumbers.style.fontFamily =
        "'JetBrains Mono', 'Fira Code', Consolas, monospace";

      let numbersHtml = "";
      for (let i = 1; i <= lineCount; i++) {
        numbersHtml += `<div>${i}</div>`;
      }
      lineNumbers.innerHTML = numbersHtml;

      // Wrapper insertion
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(contentRow);
      contentRow.appendChild(lineNumbers);
      contentRow.appendChild(pre);

      // Styles for Pre inside wrapper
      pre.className = "custom-scrollbar block flex-1"; // Use tailwind or custom class for scrolling
      pre.style.setProperty("margin", "0", "important");
      pre.style.setProperty(
        "padding",
        "1.25rem 1.25rem 1.25rem 1rem",
        "important"
      );
      pre.style.setProperty("background-color", "transparent", "important");
      pre.style.overflowX = "auto";
      pre.style.whiteSpace = "pre"; // Force no wrap as per standard code block behavior
      pre.style.fontSize = "0.95rem"; // Balanced font size
      pre.style.lineHeight = "1.6"; // Better line height for readability
      pre.style.fontFamily =
        "'JetBrains Mono', 'Fira Code', Consolas, monospace"; // Ensure good monospace font if available

      // Collision Check: Check Height for Collapse Logic on the Wrapper Content primarily
      // Use logic after paint ideally, but here we estimate
      const MAX_HEIGHT = 500; // px
      // We check contentRow height roughly, but it might not be rendered fully yet.
      // However, pre is still flow content.

      // We apply max-height logic to the contentRow primarily
      // Wait for next frame or simple approximation
      // Since we modified DOM, let's just use inline style on contentRow for scrolling if needed,
      // but the requirement is "collapse logic".

      // Let's attach a resize observer or just check immediately
      // Since it's client side, we can just check offsetHeight after a tick? No, just set logic based on expectation.

      // Simplification: We apply the collapse to the contentRow, not just PRE.
      contentRow.style.maxHeight = "none";

      // We need to measure 'pre' height now that it's in the document (it was moved).
      const actualHeight = pre.clientHeight || pre.scrollHeight;

      if (actualHeight > MAX_HEIGHT) {
        contentRow.style.maxHeight = `${MAX_HEIGHT}px`;
        contentRow.style.overflowY = "hidden";
        contentRow.style.position = "relative"; // For gradient overlay

        const gradientOverlay = document.createElement("div");
        gradientOverlay.className =
          "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10";
        contentRow.appendChild(gradientOverlay);

        const expandBtnContainer = document.createElement("div");
        expandBtnContainer.className =
          "absolute bottom-4 left-0 right-0 flex justify-center z-20 pointer-events-none"; // Container centers button

        const expandBtn = document.createElement("button");
        expandBtn.className =
          "pointer-events-auto px-5 py-2 bg-white/90 backdrop-blur shadow-md border border-gray-200 rounded-full text-amber-600 text-sm font-medium hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 transition-all flex items-center gap-2 group/btn";
        expandBtn.innerHTML = `
            <svg class="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            展开代码 (${lineCount} 行)
         `;

        expandBtnContainer.appendChild(expandBtn);
        gradientOverlay.appendChild(expandBtnContainer); // Put button inside overlay or ensuring it stays at bottom

        let isExpanded = false;
        expandBtn.onclick = () => {
          isExpanded = !isExpanded;
          if (isExpanded) {
            contentRow.style.maxHeight = "none";
            gradientOverlay.style.display = "none";
            // Move button to bottom of wrapper? Or changes text to "Collapse"
            // For simplicity, we remove the overlay and add a collapse button at bottom of wrapper
            // But for now, let's just Hide the overlay and let user see full code.
            // To allow collapse again, we can append a button at the very bottom of contentRow or Wrapper.

            const collapseRow = document.createElement("div");
            collapseRow.className =
              "w-full flex justify-center py-4 border-t border-gray-50 bg-gray-50/30";
            const collapseBtn = expandBtn.cloneNode(true) as HTMLButtonElement;
            collapseBtn.innerHTML = `
                    <svg class="w-4 h-4 rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    收起代码
                 `;
            collapseBtn.onclick = () => {
              isExpanded = false;
              contentRow.style.maxHeight = `${MAX_HEIGHT}px`;
              gradientOverlay.style.display = "block";
              collapseRow.remove();
              wrapper.scrollIntoView({ behavior: "smooth", block: "center" });
            };
            collapseRow.appendChild(collapseBtn);
            wrapper.appendChild(collapseRow);
          }
        };
      }
    });
  }, [content]);

  return (
    <>
      <div
        ref={containerRef}
        className="prose-fomal"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {lightboxSrc &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeLightbox}
          >
            <img
              src={lightboxSrc}
              className="max-w-[95vw] max-h-[95vh] rounded-lg shadow-2xl object-contain cursor-zoom-out animate-in zoom-in-95 duration-300 drop-shadow-2xl"
              alt="Full screen view"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-wide">
              点击任意处关闭
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
