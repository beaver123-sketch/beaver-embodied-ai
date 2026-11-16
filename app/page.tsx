import Link from "next/link";
import { HomeMap } from "@/components/diagrams";

const scenes = [
  ["A","日常居家","Everyday living","围绕作息、家务协助、信息提醒与家庭日常协同，先理解高频生活流程。","任务频率 · 打断成本 · 主动程度"],
  ["B","宠物共居","Living with pets","理解人与宠物共享空间时的行为、动线、卫生、安全与照护边界。","宠物应激 · 误触风险 · 主人控制权"],
  ["C","朋友聚会","Friends gathering","观察多人在家中的临时动线、社交氛围、服务需求与隐私边界。","多人协作 · 访客授权 · 空间占用"],
  ["D","老人短住","Older family members staying","研究短期居住者的便利性、安全感、可理解性与家庭照护协同。","易用性 · 跌倒风险 · 紧急求助"],
];
const phases = ["项目立项与研究框架","行业与技术研究","竞品研究","用户研究","建筑空间与人机共居","用户需求与产品机会","产品定位与定义","机器人本体与交互设计","技术可行性与产品验证","作品集整理与发布"];

export default function HomePage() {
  return <>
    <section className="hero-section">
      <div className="hero-copy"><div className="eyebrow">BEAVER / HUMAN-CENTERED EMBODIED AI</div><div className="hero-kicker">以人为本的具身智能通用机器人</div>
        <h1>让机器人适应人的生活，<em>而不是让生活迁就机器人。</em></h1>
        <p className="hero-description">面向一线城市年轻职场人及家庭，从真实家庭生活、空间与人的关系出发，研究并设计下一代具身智能机器人产品。</p>
        <div className="hero-actions"><Link href="/project" className="button button-primary">了解项目 <span>↗</span></Link><Link href="/research" className="text-link">查看研究框架 <span>→</span></Link></div>
        <div className="hero-note"><span className="note-dot" />研究先行 · 形态开放 · 证据驱动</div>
      </div>
      <div className="hero-visual"><div className="visual-topline"><span>HOME AS THE STARTING POINT</span><span>FIG. 01</span></div><div className="hero-visual-title">先理解生活，<br />再定义机器人。</div><div className="hero-map-wrap"><HomeMap /></div><div className="visual-legend"><span><i className="legend-green" />人的活动区域</span><span><i className="legend-ochre" />日常活动关联</span><span>概念示意 / 非比例</span></div></div>
    </section>
    <section className="principle-strip"><div><span>01</span><strong>人先于技术</strong><small>从真实需求出发</small></div><div><span>02</span><strong>空间先于本体</strong><small>先理解家庭环境</small></div><div><span>03</span><strong>形态保持开放</strong><small>不预设机器人外形</small></div><div><span>04</span><strong>验证先于结论</strong><small>不把假设写成结果</small></div></section>
    <section className="content-section"><div className="section-heading"><div className="section-title-wrap"><span className="section-index">01</span><h2>从四种家庭生活场景开始</h2></div><p>首期研究聚焦一线城市年轻职场人的真实家庭情境。场景用于提出问题，不代表功能已经确定。</p></div>
      <div className="scenario-grid">{scenes.map((scene)=><article className="scenario-card" key={scene[0]}><div className="scenario-card-top"><span>{scene[0]}</span><span>{scene[2]}</span></div><h3>{scene[1]}</h3><p>{scene[3]}</p><div className="scenario-note">关注：{scene[4]}</div></article>)}</div>
    </section>
    <section className="content-section research-preview"><div><div className="section-heading"><div className="section-title-wrap"><span className="section-index">02</span><h2>不从机器人出发，从人的生活出发</h2></div><p>先看人如何生活、空间如何被使用，再识别真正值得解决的任务。</p></div><Link href="/research" className="arrow-link">查看研究方法 <span>↗</span></Link></div>
      <div className="preview-flow"><div><span>01</span><strong>人的生活</strong><small>目标 · 习惯 · 情绪</small></div><div><span>02</span><strong>家庭空间</strong><small>动线 · 家具 · 边界</small></div><div><span>03</span><strong>真实任务</strong><small>频率 · 成本 · 风险</small></div><div><span>04</span><strong>产品机会</strong><small>价值 · 优先级 · 可行性</small></div></div>
    </section>
    <section className="content-section project-progress-section"><div className="section-heading-row"><div className="section-heading"><div className="section-title-wrap"><span className="section-index">03</span><h2>Beaver 研究路径</h2></div><p>十个阶段，从研究框架逐步走向产品定义与验证。</p></div><span className="status-pill green">V0.1 · 框架建立</span></div>
      <div className="phase-progress"><div className="phase-progress-fill" /></div><div className="phase-progress-meta"><span>01 / 10 · 项目立项与研究框架</span><span>后续阶段按证据推进</span></div>
      <div className="phase-mini-grid">{phases.map((phase,index)=><div key={phase}><span>{String(index+1).padStart(2,"0")}</span><strong>{phase}</strong></div>)}</div><div className="section-bottom-link"><Link href="/project" className="arrow-link">查看完整项目计划 <span>↗</span></Link></div>
    </section>
    <section className="closing-band"><div><div className="eyebrow">THE BEAVER PRINCIPLE</div><h2>家，是产品设计的起点。<br /><em>人，始终是产品的中心。</em></h2></div><Link href="/spatial-design" className="button button-light">进入空间研究 <span>↗</span></Link></section>
  </>;
}
