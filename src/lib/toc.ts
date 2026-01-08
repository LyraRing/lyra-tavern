// src/lib/toc.ts

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * 从 HTML 内容中提取标题生成目录
 */
export function extractToc(html: string): TocItem[] {
  const headingRegex =
    /<h([1-6])\s*(?:id="([^"]*)")?\s*[^>]*>([\s\S]*?)<\/h\1>/gi;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2] || generateId(stripHtml(match[3]));
    const text = stripHtml(match[3]);

    if (level >= 1 && level <= 6) {
      toc.push({ id, text, level });
    }
  }

  return toc;
}

/**
 * 从 Markdown 原始内容中提取标题生成目录
 */
export function extractTocFromMarkdown(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateId(text);
      toc.push({ id, text, level });
    }
  }

  return toc;
}

/**
 * 生成标题 ID
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * 移除 HTML 标签
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * 为 HTML 内容中的标题添加 ID
 */
export function addIdsToHeadings(html: string): string {
  return html.replace(
    /<h([1-6])(\s*[^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, content) => {
      const text = stripHtml(content);
      const id = generateId(text);

      // 如果已经有 id 属性，不要重复添加
      if (attrs.includes("id=")) {
        return match;
      }

      return `<h${level} id="${id}"${attrs}>${content}</h${level}>`;
    }
  );
}
