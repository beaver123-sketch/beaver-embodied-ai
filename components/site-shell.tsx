"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "首页" },
  { href: "/project", label: "项目" },
  { href: "/industry", label: "行业研究" },
  { href: "/competitors", label: "竞品研究" },
  { href: "/user-research", label: "用户研究" },
  { href: "/spatial-design", label: "空间设计" },
  { href: "/product-design", label: "产品设计" },
  { href: "/validation", label: "验证" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="site">
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="wordmark" aria-label="Beaver 返回首页">Beaver</Link>
          <nav aria-label="网站主导航" className="primary-nav">
            {navigation.map((item) => {
              const selected = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/")) || (item.href === "/industry" && pathname === "/research");
              return <Link
                key={item.href}
                href={item.href}
                className={"nav-item" + (selected ? " is-active" : "")}
                aria-current={selected ? "page" : undefined}
              >{item.label}</Link>;
            })}
          </nav>
          <span className="version-tag" aria-label="项目版本 V0.2">V0.2</span>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <span>Beaver © 2026</span>
        <span>以人为本的具身智能机器人产品研究与设计</span>
        <span>Research in progress · V0.2</span>
      </footer>
    </div>
  );
}
