---
title: "Next.js 13+ App Router 初探"
date: "2024-05-20"
description: "深入了解 Next.js App Router 的新特性与最佳实践"
tags: ["Next.js", "React", "Frontend"]
cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
---

# Next.js App Router

Next.js 13 引入了全新的 App Router，基于 React Server Components。

## 核心概念

1. **Server Components**: 默认组件都是服务端的。
2. **File-system Routing**: `page.tsx` 定义路由。
3. **Data Fetching**: 直接在组件中使用 `async/await`。

```tsx
async function getData() {
  const res = await fetch("https://api.example.com/...");
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <main>{/* ... */}</main>;
}
```

## 总结

这是未来的方向。
