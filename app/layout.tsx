import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: { default: "Beaver — 以人为本的具身智能机器人产品研究与设计", template: "%s · Beaver" },
  description: "面向一线城市年轻职场人及家庭，以真实家庭生活为起点的具身智能通用机器人产品研究与设计。",
  openGraph: { title: "Beaver — Human-centered Embodied AI", description: "People first. Home first.", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteShell>{children}</SiteShell></body></html>;
}
