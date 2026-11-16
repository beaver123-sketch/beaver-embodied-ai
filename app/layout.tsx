import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Beaver | 以人为本的具身智能机器人产品研究与设计",
    template: "%s",
  },
  description: "Beaver：面向一线城市年轻职场人及家庭，以真实家庭空间为首期场景，探索具身智能通用机器人如何适应人的生活。",
  openGraph: {
    title: "Beaver — 以人为本的具身智能机器人产品研究与设计",
    description: "面向真实家庭环境，从人、空间与生活需求出发研究通用机器人。",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteShell>{children}</SiteShell></body></html>;
}
