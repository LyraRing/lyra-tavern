import Link from "next/link";

export default function BlogUp() {
  return (
    <div className="text-sm text-gray-700 space-y-2">
      <p className="text-gray-900 font-semibold">嗨，这里是我的博客。</p>
      <p className="text-gray-600">
        我会在这里记录学习笔记、项目进展与一些随想。
      </p>
      <div className="flex flex-wrap gap-3 pt-1">
        <Link href="/about" className="text-amber-600 hover:underline">
          关于我
        </Link>
        <Link href="/" className="text-amber-600 hover:underline">
          返回主页
        </Link>
      </div>
    </div>
  );
}
