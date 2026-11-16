import Link from "next/link";

const facts = [
  {
    label: "PROJECT TYPE",
    title: "具身智能通用机器人",
    note: "具体本体形态通过研究确定",
  },
  {
    label: "TARGET USERS",
    title: "一线城市年轻职场人及其家庭",
    note: "关注真实家庭成员与生活方式",
  },
  {
    label: "CORE SCENARIO",
    title: "真实家庭生活空间",
    note: "日常居家 · 宠物 · 朋友 · 长辈",
  },
  {
    label: "RESEARCH SCOPE",
    title: "人 · 空间 · 机器人",
    note: "需求理解、共居关系与产品定义",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-sheen" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow">Beaver Project</div>
            <h1 id="home-title">以人为本的具身智能机器人<br />产品研究与设计</h1>
            <p className="hero-lead">
              面向真实人类生活环境的具身智能通用机器人。<br className="desktop-only" />
              以一线城市年轻职场人及其家庭为首期研究对象，<br className="desktop-only" />
              探索机器人如何理解人的需求、适应家庭空间，并与人自然、安全地协作。
            </p>
            <div className="hero-action-row">
              <Link className="primary-button" href="/project">了解项目 <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-facts" aria-label="Beaver 项目关键信息">
        <div className="facts-inner">
          {facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <div className="fact-label">{fact.label}</div>
              <h2>{fact.title}</h2>
              <p>{fact.note}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
