// src/components/Layout.tsx
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  // 保持接口兼容
  title?: string;
  description?: string;
  header?: React.ReactNode | null;
  footer?: React.ReactNode | null;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // 只返回 children，因为 RootLayout 已经处理了全局布局
  return <>{children}</>;
};

export default Layout;
