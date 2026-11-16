import type { Metadata } from "next";
import { CompetitorExplorer } from "@/components/competitor-explorer";

export const metadata: Metadata = {
  title: "竞品研究 | Beaver",
  description: "全球具身智能机器人竞品地图：机器人产品、具身智能模型、重点案例与 Beaver 研究机会。",
};

export default function CompetitorsPage() {
  return <CompetitorExplorer />;
}
