// src/lib/markdown.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm"; // 支持 GFM 标准
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug"; // 给标题添加 ID
import rehypeAutolinkHeadings from "rehype-autolink-headings"; // 给标题添加锚点链接
import rehypeHighlight from "rehype-highlight"; // 代码高亮
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Custom plugin to cleanup escaped characters in code blocks
function remarkUnescapeCode() {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === "inlineCode" || node.type === "code") {
        if (node.value) {
          // Fix: Unescape \* which might have been incorrectly escaped in source
          node.value = node.value.replace(/\\\*/g, "*");
        }
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    };
    visit(tree);
  };
}

// 定义内容项的类型
export interface ContentItem {
  slug: string; // 文件名（不含扩展名）
  title: string;
  date: string;
  lastUpdated: string; // From file mtime
  description: string;
  tags: string[];
  category?: string; // Deprecated single category
  categories?: string[][]; // Multi-level categories: [['Level1', 'Level2'], ['Another1']]
  collection?: string; // 合集 Key
  order?: number; // 合集内的序号

  wordCount: number;
  readingTime: number; // 分钟
  excerpt?: string;
  [key: string]: any;

  rawContent: string;
  content: string; // HTML
}

const POSTS_DIR = path.join(process.cwd(), "public", "posts");
const DOCS_DIR = path.join(process.cwd(), "public", "docs");

function toPosixPath(value: string): string {
  return value.replace(/\\/g, "/");
}

function readMarkdownFilesRecursive(baseDir: string): string[] {
  const results: string[] = [];

  const walk = (currentDir: string) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(".md")) {
        results.push(fullPath);
      }
    }
  };

  walk(baseDir);
  return results;
}

function slugFromFilePath(baseDir: string, filePath: string): string {
  const relativePath = path.relative(baseDir, filePath);
  const posixRelative = toPosixPath(relativePath);
  return posixRelative.replace(/\.md$/i, "");
}

function resolveSlugToFilePath(baseDir: string, slug: string): string {
  const cleanSlug = toPosixPath(slug).replace(/^\/+/, "");
  const parts = cleanSlug.split("/").filter(Boolean);
  const candidate = path.join(baseDir, ...parts) + ".md";

  const resolvedBase = path.resolve(baseDir);
  const resolvedCandidate = path.resolve(candidate);

  // Prevent path traversal: candidate must stay within baseDir
  if (
    resolvedCandidate !== resolvedBase &&
    !resolvedCandidate.startsWith(resolvedBase + path.sep)
  ) {
    throw new Error(`Invalid slug path: ${slug}`);
  }

  return resolvedCandidate;
}

/**
 * 解析 Markdown 文件，提取 Frontmatter、内容和生成摘要
 */
async function parseMarkdownFile(
  filePath: string,
  slug: string
): Promise<ContentItem> {
  const fileStats = fs.statSync(filePath);
  const fileContents = fs.readFileSync(filePath, "utf8");

  if (!fileContents || !fileContents.trim()) {
    console.warn(`Warning: Empty markdown file found at ${filePath}`);
    return {
      slug,
      title: slug,
      date: new Date().toISOString(),
      lastUpdated: fileStats.mtime.toISOString(),
      description: "",
      tags: [],
      categories: [],
      wordCount: 0,
      readingTime: 0,
      excerpt: "",
      rawContent: "",
      content: "<p>Empty content</p>",
    };
  }

  // 使用 gray-matter 解析 Frontmatter 和内容
  const matterResult = matter(fileContents);

  const rawContent = matterResult.content;
  const wordCount = rawContent.trim()
    ? rawContent.trim().split(/\s+/).length
    : 0;
  const readingTime = Math.ceil(wordCount / 200);

  // 使用 unified 处理 pipeline: markdown -> html
  let processedContent;
  try {
    processedContent = await unified()
      .use(remarkParse) // 解析 markdown
      .use(remarkUnescapeCode) // Fix escaped characters in code
      .use(remarkGfm) // 支持表格等 GFM 语法
      .use(remarkMath) // 支持数学公式
      .use(remarkRehype) // markdown 转 html AST
      .use(rehypeKatex) // 渲染数学公式
      .use(rehypeSlug) // 给 headers 添加 id
      .use(rehypeAutolinkHeadings, { behavior: "wrap" }) // 添加锚点
      .use(rehypeHighlight) // 代码高亮
      .use(rehypeStringify) // 序列化为 HTML 字符串
      .process(rawContent);
  } catch (error) {
    console.error(`Error processing markdown for ${slug}:`, error);
    return {
      slug,
      title: matterResult.data.title || slug,
      date: matterResult.data.date || "",
      lastUpdated: fileStats.mtime.toISOString(),
      description: "Error processing content",
      tags: [],
      categories: [],
      wordCount: 0,
      readingTime: 0,
      excerpt: "",
      rawContent: rawContent,
      content: `<p>Error rendering content: ${String(error)}</p>`,
    };
  }

  const contentHtml = processedContent.toString();

  // 生成摘要：取内容前 150 个字符，或第一个段落
  let excerpt = "";
  if (matterResult.content.trim()) {
    // 简单处理：移除 Markdown 标记以获得纯文本摘要
    const plainTextContent = matterResult.content
      .replace(/[#*`_～\[\]\(\)]/g, "")
      .trim();
    excerpt = plainTextContent.substring(0, 150);
    if (plainTextContent.length > 150) {
      excerpt += "...";
    }
  }

  // 返回包含 slug、Frontmatter 数据、HTML 内容和摘要的对象
  return {
    slug,
    title: matterResult.data.title || slug,
    date: matterResult.data.date || "",
    lastUpdated: fileStats.mtime.toISOString(), // Use file modification time
    description: matterResult.data.description || "",
    tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
    category: matterResult.data.category,
    categories: Array.isArray(matterResult.data.categories)
      ? matterResult.data.categories
      : [],

    wordCount,
    readingTime,
    excerpt,

    rawContent,
    content: contentHtml,

    ...matterResult.data,
  };
}

/**
 * 根据 slug 获取单个博客文章
 */
export async function getPostBySlug(
  slug: string,
  dir = POSTS_DIR
): Promise<ContentItem | null> {
  try {
    const filePath = resolveSlugToFilePath(dir, slug);
    return await parseMarkdownFile(filePath, slug);
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * 获取上一篇和下一篇文章
 * 优先基于 collection 和 order，否则基于日期
 */
export async function getAdjacentPosts(
  currentSlug: string
): Promise<{ prev: ContentItem | null; next: ContentItem | null }> {
  const currentPost = await getPostBySlug(currentSlug);
  if (!currentPost) return { prev: null, next: null };

  const allPosts = await getAllPosts();

  let sortedPosts = allPosts;

  // 如果属于某个合集，则仅在合集内查找，并按 order 排序
  if (currentPost.collection) {
    sortedPosts = allPosts
      .filter((p) => p.collection === currentPost.collection)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } else {
    // 否则按日期倒序排列（新 -> 旧）
    // 在这里定义：Next 为更新的一篇（索引更小），Prev 为更旧的一篇（索引更大）
    // 或者按照阅读顺序：Prev (Older) <--- Current ---> Next (Newer) ?
    // 传统的博客通常： Previous Post (link to older), Next Post (link to newer)
    // 但如果是有序列表，则 Previous (order-1), Next (order+1)

    // 保持一致性：如果是日期排序 (descending): [Newest, ..., Oldest]
    // Index i. Next = i-1 (Newer), Prev = i+1 (Older).
    sortedPosts = allPosts; // getAllPosts 默认按日期倒序
  }

  const currentIndex = sortedPosts.findIndex(
    (p) => p.slug === currentPost.slug
  );

  if (currentIndex === -1) return { prev: null, next: null };

  let prev: ContentItem | null = null;
  let next: ContentItem | null = null;

  if (currentPost.collection) {
    // 合集按 Order 正序: [1, 2, 3]
    // i=1 (2). Prev=0 (1), Next=2 (3).
    if (currentIndex > 0) prev = sortedPosts[currentIndex - 1];
    if (currentIndex < sortedPosts.length - 1)
      next = sortedPosts[currentIndex + 1];
  } else {
    // 日期倒序: [New, Mid, Old]
    // i=1 (Mid).
    // 下一篇 (Newer) -> i-1
    // 上一篇 (Older) -> i+1
    if (currentIndex > 0) next = sortedPosts[currentIndex - 1];
    if (currentIndex < sortedPosts.length - 1)
      prev = sortedPosts[currentIndex + 1];
  }

  return { prev, next };
}

/**
 * 根据 slug 获取单个文档
 */
export async function getDocBySlug(slug: string): Promise<ContentItem | null> {
  return await getPostBySlug(slug, DOCS_DIR);
}

/**
 * 获取所有博客文章列表
 */
export async function getAllPosts(): Promise<ContentItem[]> {
  const filePaths = readMarkdownFilesRecursive(POSTS_DIR);
  const posts = await Promise.all(
    filePaths.map(async (filePath) => {
      const slug = slugFromFilePath(POSTS_DIR, filePath);
      return parseMarkdownFile(filePath, slug);
    })
  );

  return posts.sort((a, b) => {
    const aTime = Number.isFinite(new Date(a.date).getTime())
      ? new Date(a.date).getTime()
      : 0;
    const bTime = Number.isFinite(new Date(b.date).getTime())
      ? new Date(b.date).getTime()
      : 0;
    return bTime - aTime;
  });
}

/**
 * 获取所有文档列表
 */
export async function getAllDocs(): Promise<ContentItem[]> {
  const filePaths = readMarkdownFilesRecursive(DOCS_DIR);
  const docs = await Promise.all(
    filePaths.map(async (filePath) => {
      const slug = slugFromFilePath(DOCS_DIR, filePath);
      return parseMarkdownFile(filePath, slug);
    })
  );

  return docs.sort((a, b) => {
    const aTime = Number.isFinite(new Date(a.date).getTime())
      ? new Date(a.date).getTime()
      : 0;
    const bTime = Number.isFinite(new Date(b.date).getTime())
      ? new Date(b.date).getTime()
      : 0;
    return bTime - aTime;
  });
}

/**
 * 获取所有唯一的标签
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort(); // 返回排序后的标签数组
}

/**
 * 根据标签获取文章列表
 */
export async function getPostsByTag(tag: string): Promise<ContentItem[]> {
  const posts = await getAllPosts();
  return posts.filter(
    (post) => Array.isArray(post.tags) && post.tags.includes(tag)
  );
}

/**
 * 获取博客统计信息
 */
export async function getBlogStats() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  const totalWords = posts.reduce(
    (sum, post) => sum + (post.wordCount || 0),
    0
  );
  const lastUpdate =
    posts.length > 0 ? posts[0].date : new Date().toISOString();

  // 简单的 Category 统计 (Assuming category is stored in frontmatter)
  const categories = new Set(posts.map((p) => p.category).filter(Boolean));

  return {
    postCount: posts.length,
    tagCount: tags.length,
    categoryCount: categories.size,
    totalWords,
    lastUpdate,
  };
}
