"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  ["/", "首页", "HOME"], ["/project", "项目", "PROJECT"], ["/research", "研究", "RESEARCH"],
  ["/spatial-design", "空间设计", "SPATIAL DESIGN"], ["/product-design", "产品设计", "PRODUCT DESIGN"], ["/validation", "验证", "VALIDATION"]
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <div className="site-frame">
    <header className="topbar">
      <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Beaver 首页">
        <span className="brand-mark"><i /><i /><i /></span><span className="brand-word">BEAVER<span>LAB</span></span>
      </Link>
      <div className="topbar-center">HUMAN-CENTERED EMBODIED AI</div>
      <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label="切换导航" aria-expanded={open}><span /><span /></button>
      <nav className={"main-nav " + (open ? "is-open" : "")} aria-label="主导航">
        {nav.map(([href, label, en]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={"nav-link " + (pathname === href || (href !== "/" && pathname.startsWith(href)) ? "active" : "")}><span>{label}</span><small>{en}</small></Link>)}
      </nav>
    </header>
    <main>{children}</main>
    <footer className="site-footer">
      <div className="footer-brand"><span className="brand-mark small"><i /><i /><i /></span><strong>BEAVER</strong></div>
      <p>以人为本的具身智能机器人产品研究与设计</p>
      <div className="footer-meta"><span>V0.1 · RESEARCH FRAMEWORK</span><span>PEOPLE FIRST / HOME FIRST</span></div>
    </footer>
  </div>;
}
