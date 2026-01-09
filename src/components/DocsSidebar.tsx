// src/components/DocsSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContentItem } from "@/lib/markdown";
import { useState } from "react";

interface DocsSidebarProps {
  docs: ContentItem[];
}

interface TreeNode {
  name: string;
  path?: string;
  doc?: ContentItem;
  children: { [key: string]: TreeNode };
}

// 辅助函数：将扁平的 docs 列表转换为树
function buildDocTree(docs: ContentItem[]): TreeNode {
  const root: TreeNode = { name: "root", children: {} };

  docs.forEach((doc) => {
    const parts = doc.slug.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (!current.children[part]) {
        current.children[part] = { name: part, children: {} };
      }
      current = current.children[part];
      if (index === parts.length - 1) {
        current.path = `/docs/${doc.slug}`;
        current.doc = doc;
      }
    });
  });

  return root;
}

const TreeNodeView = ({
  node,
  depth = 0,
}: {
  node: TreeNode;
  depth?: number;
}) => {
  const pathname = usePathname();
  const isActive = node.path === pathname;
  const hasChildren = Object.keys(node.children).length > 0;
  const [isOpen, setIsOpen] = useState(true); // 默认展开

  return (
    <li className="list-none">
      {node.name !== "root" && node.path ? (
        <Link
          href={node.path}
          className={`block py-1.5 pr-2 pl-3 text-sm rounded-r-md border-l-2 transition-colors ${
            isActive
              ? "border-amber-500 bg-amber-50 text-amber-700 font-medium"
              : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
          }`}
          style={{ marginLeft: `${depth * 12}px` }}
        >
          {node.doc?.title || node.name}
        </Link>
      ) : node.name !== "root" ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center w-full text-left py-1.5 pr-2 pl-3 text-sm font-semibold text-gray-900 mt-2 hover:bg-gray-50 rounded"
          style={{ marginLeft: `${depth * 12}px` }}
        >
          <span
            className="mr-1 transform transition-transform duration-200"
            style={{ rotate: isOpen ? "90deg" : "0deg" }}
          >
            ▶
          </span>
          <span className="capitalize">{node.name.replace(/[-_]/g, " ")}</span>
        </button>
      ) : null}

      {hasChildren && isOpen && (
        <ul className="mt-1">
          {Object.entries(node.children)
            .sort((a, b) => {
              // 简单的排序逻辑，文件夹优先还是文件优先？ 或者按字母序
              // 这里可以扩展排序逻辑，比如读取 folder 的 index 信息
              const aName = a[0];
              const bName = b[0];
              return aName.localeCompare(bName);
            })
            .map(([key, child]) => (
              <TreeNodeView
                key={key}
                node={child}
                depth={node.name === "root" ? 0 : depth + 1}
              />
            ))}
        </ul>
      )}
    </li>
  );
};

export default function DocsSidebar({ docs }: DocsSidebarProps) {
  const tree = buildDocTree(docs);

  return (
    <nav className="space-y-1">
      <ul className="space-y-1">
        {Object.entries(tree.children).map(([key, child]) => (
          <TreeNodeView key={key} node={child} />
        ))}
      </ul>
    </nav>
  );
}
