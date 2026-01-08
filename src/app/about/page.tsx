import { getBlogStats } from "@/lib/markdown";
import ProfileCard from "@/components/ProfileCard";
import SiteStats from "@/components/SiteStats";
import CalendarCard from "@/components/CalendarCard";
import MarkdownContent from "@/components/MarkdownContent";
import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export const metadata = {
  title: "关于我 | Lyra Tavern",
  description: "About the author",
};

async function getAboutContent() {
  const filePath = path.join(process.cwd(), "src", "data", "about.md");
  let fileContents = "";

  try {
    fileContents = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.warn("About content not found, using fallback.");
    fileContents = "# About\n\nContent file not found at `src/data/about.md`";
  }

  const processedContent = await remark()
    .use(html, { sanitize: false }) // Allow HTML inside MD
    .use(remarkGfm)
    .process(fileContents);

  return processedContent.toString();
}

export default async function AboutPage() {
  const stats = await getBlogStats();
  const aboutHtml = await getAboutContent();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <ProfileCard
              postCount={stats.postCount}
              tagCount={stats.tagCount}
              categoryCount={stats.categoryCount}
            />
            <SiteStats
              postCount={stats.postCount}
              totalWords={stats.totalWords}
              lastUpdate={stats.lastUpdate}
            />
            <CalendarCard />
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 min-h-[800px]">
              <MarkdownContent content={aboutHtml} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
