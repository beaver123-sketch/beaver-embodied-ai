"use client";

import { useEffect, useMemo, useState } from "react";
import {
  categoryLabels,
  comparisonIds,
  focusIds,
  marketSignals,
  marketSource,
  platforms,
  researchInsights,
  robots,
  type CompetitorCategory,
  type CompetitorRecord,
  type TaskFlow,
  type VisualFeature,
} from "@/content/competitor-data";

type ResearchModule = "landscape" | "database" | "cases" | "comparison" | "insights";

const modules: { id: ResearchModule; number: string; title: string; hint: string }[] = [
  { id: "landscape", number: "01", title: "行业全景", hint: "行业与发展方向" },
  { id: "database", number: "02", title: "竞品数据库", hint: "产品与企业目录" },
  { id: "cases", number: "03", title: "重点案例", hint: "代表产品深度分析" },
  { id: "comparison", number: "04", title: "横向对比", hint: "本体、任务与成熟度" },
  { id: "insights", number: "05", title: "Beaver 研究机会", hint: "产品设计启发" },
];

const allRecords = [...robots, ...platforms];
const categories: ("all" | CompetitorCategory)[] = ["all", "home", "humanoid", "mobile", "platform", "adjacent"];
const categoryNames: Record<string, string> = { all: "全部", ...categoryLabels };

function getRecord(id: string) {
  return allRecords.find((record) => record.id === id);
}

export function CompetitorExplorer() {
  const [activeModule, setActiveModule] = useState<ResearchModule>("landscape");
  const [activeCategory, setActiveCategory] = useState<"all" | CompetitorCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<CompetitorRecord | null>(null);

  useEffect(() => {
    if (!selectedRecord) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedRecord(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedRecord]);

  const filteredRecords = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return allRecords.filter((record) => {
      const matchesCategory = activeCategory === "all" || record.category === activeCategory;
      const haystack = [record.name, record.company, record.country, record.form, record.positioning].join(" ").toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [activeCategory, searchTerm]);

  const robotCount = robots.length;
  const platformCount = platforms.length;
  const countries = new Set(allRecords.map((record) => record.country.replace(/^[^\s]+\s/, ""))).size;

  return (
    <div className="competitor-page">
      <header className="competitor-heading">
        <p className="competitor-eyebrow">BEAVER / GLOBAL ROBOTICS LANDSCAPE</p>
        <h1>全球具身智能<br className="competitor-mobile-break" />竞品地图</h1>
        <p className="competitor-intro">
          从机器人本体、家庭应用到具身智能模型，理解不同产品如何进入真实世界。
        </p>
      </header>

      <nav className="research-route" aria-label="竞品研究模块" role="tablist">
        {modules.map((module, index) => (
          <button
            key={module.id}
            type="button"
            role="tab"
            aria-selected={activeModule === module.id}
            className={"route-node" + (activeModule === module.id ? " active" : "")}
            onClick={() => setActiveModule(module.id)}
          >
            <span className="route-dot">{module.number}</span>
            <span className="route-title">{module.title}</span>
            <span className="route-hint">{module.hint}</span>
            {index < modules.length - 1 ? <span className="route-connector" aria-hidden="true" /> : null}
          </button>
        ))}
      </nav>

      <main className="research-content">
        {activeModule === "landscape" ? (
          <section className="research-panel" aria-labelledby="landscape-title">
            <div className="panel-heading-row">
              <div>
                <p className="panel-kicker">01 / INDUSTRY MAP</p>
                <h2 id="landscape-title">行业全景</h2>
                <p className="panel-lead">机器人本体、家庭产品与智能模型，正在沿不同路线并行发展。</p>
              </div>
            </div>

            <div className="landscape-stats">
              <div className="landscape-stat"><strong>{robotCount}</strong><span>代表性机器人产品</span></div>
              <div className="landscape-stat"><strong>{platformCount}</strong><span>具身智能模型 / 平台</span></div>
              <div className="landscape-stat"><strong>{countries}+</strong><span>国家 / 地区</span></div>
              <div className="landscape-stat"><strong>5</strong><span>产品与技术路线</span></div>
            </div>

            <div className="landscape-section-title">
              <h3>行业发展信号</h3>
              <a href={marketSource.url} target="_blank" rel="noreferrer">{marketSource.label} ↗</a>
            </div>
            <div className="market-signal-grid">
              {marketSignals.map((signal) => (
                <div className="market-signal" key={signal.label}>
                  <strong>{signal.value}</strong>
                  <span>{signal.label}</span>
                </div>
              ))}
            </div>

            <div className="landscape-section-title">
              <h3>五条产品与技术路线</h3>
              <span>选择路线，查看代表产品</span>
            </div>
            <div className="route-category-list">
              {(["home", "humanoid", "mobile", "platform", "adjacent"] as CompetitorCategory[]).map((category) => {
                const count = allRecords.filter((record) => record.category === category).length;
                return (
                  <button key={category} type="button" className="route-category" onClick={() => { setActiveCategory(category); setActiveModule("database"); }}>
                    <span className="route-category-name">{categoryLabels[category]}</span>
                    <strong>{count.toString().padStart(2, "0")}</strong>
                    <span className="route-category-arrow">浏览产品 →</span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {activeModule === "database" ? (
          <section className="research-panel" aria-labelledby="database-title">
            <div className="panel-heading-row">
              <div>
                <p className="panel-kicker">02 / COMPETITOR DATABASE</p>
                <h2 id="database-title">竞品数据库</h2>
                <p className="panel-lead">按产品路线浏览，选择产品查看结构化分析。</p>
              </div>
              <span className="panel-index">{filteredRecords.length} 款产品</span>
            </div>
            <div className="database-controls">
              <div className="category-filters" aria-label="按类别筛选">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    className={"category-filter" + (activeCategory === category ? " selected" : "")}
                    onClick={() => setActiveCategory(category)}
                  >{categoryNames[category]}</button>
                ))}
              </div>
              <label className="competitor-search">
                <span>搜索产品 / 企业 / 国家</span>
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="例如：Sunday、美国、轮式" />
              </label>
            </div>
            <div className="competitor-card-grid">
              {filteredRecords.map((record) => (
                <button type="button" className="competitor-card" key={record.id} onClick={() => setSelectedRecord(record)}>
                  <div className="competitor-card-visual">
                    <ProductVisual record={record} />
                    <span className="competitor-card-category">{categoryLabels[record.category]}</span>
                    {record.featured ? <em>重点案例</em> : null}
                  </div>
                  <div className="competitor-card-body">
                    <div className="competitor-card-title">
                      <div><strong>{record.name}</strong><small>{record.company}</small></div>
                      <span>{record.country}</span>
                    </div>
                    <p>{record.positioning}</p>
                    <div className="competitor-card-bottom">
                      <span>{record.form}</span>
                      <b>查看分析 ↗</b>
                    </div>
                  </div>
                </button>
              ))}
              {filteredRecords.length === 0 ? <p className="empty-state">没有找到匹配的产品，请调整搜索条件。</p> : null}
            </div>
          </section>
        ) : null}

        {activeModule === "cases" ? (
          <section className="research-panel" aria-labelledby="cases-title">
            <div className="panel-heading-row">
              <div>
                <p className="panel-kicker">03 / FOCUS CASES</p>
                <h2 id="cases-title">重点案例</h2>
                <p className="panel-lead">以家庭真实任务为切入点，对照不同本体和智能路线。</p>
              </div>
            </div>

            <button type="button" className="memo-feature-v2" onClick={() => setSelectedRecord(getRecord("memo") ?? null)}>
              <div className="memo-feature-image"><ProductVisual record={getRecord("memo")!} /></div>
              <div className="memo-feature-copy">
                <span className="memo-feature-label">PRIMARY CASE · SUNDAY ROBOTICS</span>
                <p className="memo-country">🇺🇸 美国</p>
                <h3>Memo</h3>
                <p className="memo-tagline">The helpful home robot.</p>
                <p className="memo-description">从餐后清理、咖啡制作和衣物整理出发，以人的操作示范持续扩展家庭技能。</p>
                <div className="memo-feature-pills">
                  <span>轮式移动</span><span>升降结构</span><span>双臂操作</span><span>Skill Library</span>
                </div>
                <strong className="memo-feature-link">查看产品分析 ↗</strong>
              </div>
            </button>

            <div className="focus-list-heading">
              <h3>重点对照产品</h3>
              <span>按产品路线展开</span>
            </div>
            <div className="focus-grid-v2">
              {focusIds.filter((id) => id !== "memo").map((id) => {
                const record = getRecord(id);
                if (!record) return null;
                return (
                  <button key={record.id} type="button" className="focus-card-v2" onClick={() => setSelectedRecord(record)}>
                    <div className="focus-card-image"><ProductVisual record={record} /></div>
                    <div className="focus-card-copy">
                      <span>{record.country}</span>
                      <strong>{record.name}</strong>
                      <small>{record.company}</small>
                      <p>{record.positioning}</p>
                      <b>查看分析 ↗</b>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {activeModule === "comparison" ? (
          <section className="research-panel" aria-labelledby="comparison-title">
            <div className="panel-heading-row">
              <div>
                <p className="panel-kicker">04 / CROSS-COMPARISON</p>
                <h2 id="comparison-title">横向对比</h2>
                <p className="panel-lead">从移动方式、操作结构、任务方向和产品阶段看差异。</p>
              </div>
            </div>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead><tr><th>产品</th><th>国家 / 企业</th><th>本体路线</th><th>主要任务方向</th><th>产品阶段</th><th></th></tr></thead>
                <tbody>
                  {comparisonIds.map((id) => {
                    const record = getRecord(id);
                    if (!record) return null;
                    return (
                      <tr key={record.id}>
                        <td><strong>{record.name}</strong>{record.featured ? <em>重点</em> : null}</td>
                        <td>{record.country}<small>{record.company}</small></td>
                        <td>{record.form}</td>
                        <td>{record.positioning}</td>
                        <td>{record.stage}</td>
                        <td><button type="button" onClick={() => setSelectedRecord(record)}>详情 ↗</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {activeModule === "insights" ? (
          <section className="research-panel" aria-labelledby="insights-title">
            <div className="panel-heading-row">
              <div>
                <p className="panel-kicker">05 / BEAVER RESEARCH OPPORTUNITIES</p>
                <h2 id="insights-title">Beaver 研究机会</h2>
                <p className="panel-lead">从现有产品路线中提炼值得深入研究的产品问题。</p>
              </div>
            </div>
            <div className="insight-list">
              {researchInsights.map((insight, index) => (
                <article className="insight-row" key={insight.title}>
                  <span className="insight-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="insight-copy">
                    <h3>{insight.title}</h3>
                    <p>{insight.detail}</p>
                    <div><strong>研究问题</strong>{insight.question}</div>
                  </div>
                </article>
              ))}
            </div>
            <div className="insight-conclusion">
              <span>BEAVER / PRODUCT PRINCIPLE</span>
              <strong>不先决定机器人应该长什么样，先理解人在什么情境下需要它完成什么任务。</strong>
            </div>
          </section>
        ) : null}
      </main>

      {selectedRecord ? (
        <CompetitorModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      ) : null}
    </div>
  );
}

function ProductVisual({ record }: { record: CompetitorRecord }) {
  if (record.image) {
    return (
      <div className="product-photo">
        <img src={record.image} alt={record.imageAlt || record.name} loading="lazy" />
        <span className="product-visual-label">官方产品图</span>
      </div>
    );
  }

  const diagramType =
    record.category === "platform" ? "platform" :
    record.category === "mobile" ? "mobile" :
    record.category === "adjacent" ? "adjacent" : "humanoid";

  return (
    <div className={"product-placeholder " + diagramType + "-art"}>
      <div className="product-art-overline">
        <span>{diagramType === "platform" ? "AI / MODEL ARCHITECTURE" : diagramType === "mobile" ? "MOBILE MANIPULATION" : diagramType === "adjacent" ? "HOME ROBOT FORM" : "HUMANOID ROBOT FORM"}</span>
        <span>研究示意</span>
      </div>
      {diagramType === "platform" ? <PlatformIllustration record={record} /> :
       diagramType === "mobile" ? <MobileIllustration record={record} /> :
       diagramType === "adjacent" ? <AdjacentIllustration record={record} /> :
       <HumanoidIllustration record={record} />}
      <div className="product-art-caption">
        <strong>{record.name}</strong>
        <small>{record.form}</small>
        <span>结构 / 技术路线示意，非官方产品照片</span>
      </div>
    </div>
  );
}

function HumanoidIllustration({ record }: { record: CompetitorRecord }) {
  const compact = ["unitree-g1", "agibot-x2"].includes(record.id);
  const broad = ["atlas", "engineai-t800", "digit5"].includes(record.id);
  const soft = ["fourier-gr3", "neura"].includes(record.id);
  const digit = record.id === "digit5";
  const modular = ["apollo2", "hmnd01", "leju-kuavo"].includes(record.id);
  const face = record.id === "walker-s2" ? "#6c7d91" : record.id === "xpeng-iron" ? "#55565c" : "#62636a";
  const shoulder = broad ? 58 : compact ? 42 : 50;
  const torsoWidth = broad ? 76 : compact ? 58 : soft ? 62 : 68;
  const torsoPath = "M" + (210-torsoWidth/2) + " 61 Q210 54 " + (210+torsoWidth/2) + " 61 L" + (210+torsoWidth/2-4) + " 130 Q210 145 " + (210-torsoWidth/2+4) + " 130Z";
  const leftArm = "M" + (210-shoulder/2) + " 73 L" + (210-shoulder/2-25) + " 88 L" + (210-shoulder/2-32) + " 139";
  const rightArm = "M" + (210+shoulder/2) + " 73 L" + (210+shoulder/2+25) + " 88 L" + (210+shoulder/2+32) + " 139";
  return (
    <svg className="schematic-svg humanoid-svg" viewBox="0 0 420 250" role="img" aria-label={record.name + " 本体结构示意图"}>
      <path d="M42 220H378" stroke="#d6d7da" strokeWidth="1.5" />
      <path d="M82 224H338" stroke="#ececef" strokeWidth="5" strokeLinecap="round" />
      <g transform={compact ? "translate(0 18) scale(.9)" : "translate(0 0)"}>
        <rect x="196" y="43" width="28" height="15" rx="6" fill="#8f9197" />
        {soft ? (
          <ellipse cx="210" cy="28" rx="25" ry="24" fill="#e1e2e5" stroke="#85878d" strokeWidth="2" />
        ) : (
          <rect x="187" y="7" width="46" height="43" rx={digit ? 11 : 8} fill="#e1e2e5" stroke="#85878d" strokeWidth="2" />
        )}
        <rect x="195" y="22" width="30" height="7" rx="3.5" fill={face} />
        <circle cx="201" cy="25.5" r="1.5" fill="#e9eaec" />
        <circle cx="219" cy="25.5" r="1.5" fill="#e9eaec" />
        <path d={torsoPath} fill="#d2d4d8" stroke="#85878d" strokeWidth="2" />
        <path d="M190 72 Q210 82 230 72" fill="none" stroke="#b1b3b8" strokeWidth="2" />
        <rect x={210-shoulder/2} y="84" width={shoulder} height="28" rx="10" fill="#c7c9ce" opacity=".9" />
        <rect x="199" y="91" width="22" height="29" rx="5" fill="#777a82" />
        <rect x="204" y="96" width="12" height="17" rx="3" fill="#dfe0e3" />
        <path d={leftArm} fill="none" stroke="#d9dade" strokeWidth={broad ? 19 : 16} strokeLinecap="round" strokeLinejoin="round" />
        <path d={rightArm} fill="none" stroke="#d9dade" strokeWidth={broad ? 19 : 16} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={210-shoulder/2-25} cy="88" r="9" fill="#62656d" />
        <circle cx={210+shoulder/2+25} cy="88" r="9" fill="#62656d" />
        <circle cx={210-shoulder/2-32} cy="139" r="7" fill="#62656d" />
        <circle cx={210+shoulder/2+32} cy="139" r="7" fill="#62656d" />
        <path d={"M"+(210-shoulder/2-32)+" 139l-5 12 M"+(210+shoulder/2+32)+" 139l5 12"} stroke="#777981" strokeWidth="5" strokeLinecap="round" />
        <path d="M190 130 L185 151 L197 165 L196 197 L187 216" fill="none" stroke="#d5d7db" strokeWidth={broad ? 22 : 19} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M230 130 L235 151 L223 165 L224 197 L233 216" fill="none" stroke="#d5d7db" strokeWidth={broad ? 22 : 19} strokeLinecap="round" strokeLinejoin="round" />
        {digit ? (
          <>
            <path d="M185 151 L176 176 L188 190 L181 215 M235 151 L244 176 L232 190 L239 215" fill="none" stroke="#8e9299" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M181 216h-17M239 216h17" stroke="#62656c" strokeWidth="6" strokeLinecap="round" />
          </>
        ) : (
          <path d="M187 216h-18M233 216h18" stroke="#62656c" strokeWidth="7" strokeLinecap="round" />
        )}
        <circle cx="185" cy="151" r="8" fill="#62656d" />
        <circle cx="235" cy="151" r="8" fill="#62656d" />
        <circle cx="196" cy="197" r="7" fill="#62656d" />
        <circle cx="224" cy="197" r="7" fill="#62656d" />
        {modular ? (
          <>
            <path d="M170 58H148V48M250 58H272V48" fill="none" stroke="#a1a3a9" strokeWidth="1.2" strokeDasharray="3 3" />
            <rect x="130" y="34" width="42" height="18" rx="5" fill="#f7f7f8" stroke="#bfc1c5" />
            <rect x="248" y="34" width="42" height="18" rx="5" fill="#f7f7f8" stroke="#bfc1c5" />
          </>
        ) : null}
      </g>
      <g fill="#777980" fontSize="10" fontFamily="Arial, sans-serif">
        <text x="24" y="82">上肢操作</text>
        <path d="M78 79H130L166 91" stroke="#b4b6bb" strokeWidth="1" fill="none" />
        <text x="290" y="166">双足移动</text>
        <path d="M285 162H264L238 186" stroke="#b4b6bb" strokeWidth="1" fill="none" />
        {modular ? <text x="210" y="242" textAnchor="middle">模块化 / 双形态结构</text> : null}
      </g>
    </svg>
  );
}

function MobileIllustration({ record }: { record: CompetitorRecord }) {
  const singleArm = record.id === "stretch3" || record.id === "tiago";
  const tiago = record.id === "tiago";
  const stretch = record.id === "stretch3";
  const industrial = record.id === "galbot-s1";
  const baseX = industrial ? 118 : 132;
  const baseWidth = industrial ? 184 : 156;
  return (
    <svg className="schematic-svg mobile-svg" viewBox="0 0 420 250" role="img" aria-label={record.name + " 移动操作结构示意图"}>
      <path d="M38 214H382" stroke="#d7d8dc" strokeWidth="1.5" />
      <rect x={baseX} y="181" width={baseWidth} height="25" rx="9" fill="#d4d6da" stroke="#777a82" strokeWidth="2" />
      <circle cx={baseX+20} cy="210" r="11" fill="#62656d" stroke="#aeb0b5" strokeWidth="3" />
      <circle cx={baseX+baseWidth-20} cy="210" r="11" fill="#62656d" stroke="#aeb0b5" strokeWidth="3" />
      <rect x="198" y={stretch ? 83 : 65} width="24" height={stretch ? 99 : 117} rx="8" fill="#d4d6da" stroke="#777a82" strokeWidth="2" />
      {tiago ? (
        <>
          <rect x="186" y="35" width="48" height="30" rx="8" fill="#e1e2e5" stroke="#777a82" strokeWidth="2" />
          <rect x="197" y="45" width="26" height="8" rx="4" fill="#5d626b" />
        </>
      ) : (
        <rect x="183" y={stretch ? 57 : 42} width="54" height="22" rx="8" fill="#d9dade" stroke="#777a82" strokeWidth="2" />
      )}
      {singleArm ? (
        <>
          <path d="M210 93 L258 93 L292 112 L322 112" fill="none" stroke="#9b9ea5" strokeWidth={stretch ? 10 : 15} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="258" cy="93" r="8" fill="#666a72" />
          <circle cx="292" cy="112" r="7" fill="#666a72" />
          <path d="M322 112l13 -7m-13 7 13 7" stroke="#666a72" strokeWidth="3" strokeLinecap="round" />
          {tiago ? <path d="M210 95L165 113L147 141" fill="none" stroke="#c2c4c9" strokeWidth="12" strokeLinecap="round" /> : null}
        </>
      ) : (
        <>
          <path d="M194 80L151 97L136 132M226 80L269 97L284 132" fill="none" stroke="#aeb1b7" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="151" cy="97" r="8" fill="#666a72" /><circle cx="269" cy="97" r="8" fill="#666a72" />
          <path d="M136 132l-9 10m9-10 10 8M284 132l-10 10m10-10 10 8" stroke="#666a72" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      <g fill="#777980" fontSize="10" fontFamily="Arial, sans-serif">
        <text x="25" y="66">{stretch ? "伸缩机械臂" : tiago ? "模块化机械臂" : "双臂操作"}</text>
        <path d="M91 63H144L171 91" stroke="#b4b6bb" strokeWidth="1" fill="none" />
        <text x="288" y="166">{industrial ? "高负载底盘" : "升降 / 移动底盘"}</text>
        <path d="M286 162H268L255 184" stroke="#b4b6bb" strokeWidth="1" fill="none" />
        <text x="210" y="239" textAnchor="middle">轮式移动 · 定点操作 · 室内导航</text>
      </g>
    </svg>
  );
}

function AdjacentIllustration({ record }: { record: CompetitorRecord }) {
  const ballie = record.id === "ballie";
  return (
    <svg className="schematic-svg adjacent-svg" viewBox="0 0 420 250" role="img" aria-label={record.name + " 家庭机器人形态示意图"}>
      <path d="M40 213H380" stroke="#d7d8dc" strokeWidth="1.5" />
      {ballie ? (
        <>
          <ellipse cx="210" cy="163" rx="76" ry="20" fill="#dfe0e3" opacity=".55" />
          <circle cx="210" cy="124" r="77" fill="#e1e2e5" stroke="#85878d" strokeWidth="2" />
          <path d="M155 88Q210 49 265 88" fill="none" stroke="#a5a7ad" strokeWidth="3" />
          <rect x="184" y="105" width="52" height="20" rx="9" fill="#555961" />
          <circle cx="200" cy="115" r="3" fill="#e5e6e8" /><circle cx="220" cy="115" r="3" fill="#e5e6e8" />
          <path d="M255 76L322 40L308 92Z" fill="#e4e5e8" opacity=".5" />
          <circle cx="178" cy="195" r="8" fill="#777a82" /><circle cx="242" cy="195" r="8" fill="#777a82" />
          <text x="210" y="232" textAnchor="middle" fill="#777980" fontSize="10">球形移动 · 环境感知 · 投影交互</text>
        </>
      ) : (
        <>
          <rect x="164" y="157" width="92" height="48" rx="15" fill="#d4d6da" stroke="#85878d" strokeWidth="2" />
          <circle cx="184" cy="207" r="9" fill="#62656d" /><circle cx="236" cy="207" r="9" fill="#62656d" />
          <rect x="183" y="63" width="54" height="96" rx="12" fill="#d4d6da" stroke="#85878d" strokeWidth="2" />
          <rect x="177" y="47" width="66" height="83" rx="12" fill="#3f424a" stroke="#777a82" strokeWidth="2" />
          <rect x="184" y="55" width="52" height="66" rx="7" fill="#d8dadd" />
          <circle cx="210" cy="70" r="4" fill="#5f636b" />
          <path d="M176 148L148 131L139 113M244 148L272 131L281 113" stroke="#bfc1c6" strokeWidth="8" strokeLinecap="round" />
          <text x="210" y="232" textAnchor="middle" fill="#777980" fontSize="10">自主导航 · 家庭感知 · 屏幕交互</text>
        </>
      )}
    </svg>
  );
}

function PlatformIllustration({ record }: { record: CompetitorRecord }) {
  const labels: Record<string, string[]> = {
    "sunday-act": ["示范采集", "技能学习", "Skill Library", "任务执行"],
    "1x-redwood": ["多模态感知", "Redwood AI", "自主执行", "专家辅助"],
    "figure-helix": ["视觉 / 语言", "Helix 模型", "全身控制", "任务反馈"],
    "gemini-robotics": ["多模态输入", "推理规划", "动作生成", "本体适配"],
    "nvidia-gr00t": ["数据采集", "GR00T 模型", "仿真训练", "部署运行"],
    "physical-intelligence": ["示范数据", "π0.5 模型", "长程规划", "移动操作"],
    "x-square-wall": ["感知输入", "WALL 模型", "技能迁移", "真实执行"],
    "xiaomi-robotics": ["真实轨迹", "VLA 模型", "技能泛化", "机器人执行"],
    "skild-brain": ["跨形态数据", "Skild Brain", "策略迁移", "多本体执行"],
  };
  const steps = labels[record.id] || ["数据输入", "智能模型", "动作生成", "任务反馈"];
  return (
    <svg className="schematic-svg platform-svg" viewBox="0 0 420 250" role="img" aria-label={record.name + " 技术架构示意图"}>
      <path d="M32 177H388" stroke="#d9dade" strokeWidth="1.5" />
      {steps.map((step, index) => {
        const x = 17 + index * 101;
        return (
          <g key={step}>
            <rect x={x} y="75" width="83" height="74" rx="10" fill={index === 1 ? "#dedfe3" : "#f8f8f9"} stroke={index === 1 ? "#858890" : "#c8cacf"} strokeWidth="1.5" />
            <circle cx={x + 15} cy="91" r="5" fill={index === 1 ? "#62666f" : "#a0a3aa"} />
            <text x={x + 41.5} y="113" textAnchor="middle" fill="#4e5158" fontSize="10" fontWeight="600">{step.length > 8 ? step.slice(0, 8) : step}</text>
            <text x={x + 41.5} y="130" textAnchor="middle" fill="#999ca2" fontSize="8">{["INPUT", "MODEL", "POLICY", "OUTPUT"][index]}</text>
            {index < steps.length - 1 ? (
              <g stroke="#9699a0" fill="none" strokeWidth="1.5">
                <path d={"M" + (x + 84) + " 112H" + (x + 96)} />
                <path d={"M" + (x + 92) + " 108L" + (x + 97) + " 112L" + (x + 92) + " 116"} />
              </g>
            ) : null}
          </g>
        );
      })}
      <path d="M370 163V190H52V163" fill="none" stroke="#b3b5bb" strokeWidth="1.2" strokeDasharray="4 4" />
      <path d="M47 169L52 162L57 169" fill="none" stroke="#b3b5bb" strokeWidth="1.2" />
      <g fill="#858890" fontSize="10" fontFamily="Arial, sans-serif">
        <text x="210" y="211" textAnchor="middle">训练 / 推理 / 执行反馈闭环</text>
        <text x="210" y="230" textAnchor="middle" fontSize="8">EMBODIED AI SYSTEM</text>
      </g>
    </svg>
  );
}

function VisualFlow({ items }: { items: VisualFeature[] }) {
  return (
    <div className="visual-flow">
      {items.map((item, index) => (
        <div className="visual-flow-item" key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><strong>{item.title}</strong><p>{item.detail}</p></div>
          {index < items.length - 1 ? <i aria-hidden="true">→</i> : null}
        </div>
      ))}
    </div>
  );
}

function TaskFlowCard({ task }: { task: TaskFlow }) {
  return (
    <article className="task-flow-card">
      <div className="task-flow-head"><div><span>{task.context}</span><h4>{task.title}</h4></div><b>任务流程</b></div>
      <div className="task-step-list">
        {task.steps.map((step, index) => (
          <div className="task-step" key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
            {index < task.steps.length - 1 ? <i aria-hidden="true">↓</i> : null}
          </div>
        ))}
      </div>
      <div className="task-flow-outcome"><span>任务结果</span><strong>{task.outcome}</strong></div>
    </article>
  );
}

function FeatureGrid({ features }: { features: VisualFeature[] }) {
  return (
    <div className="detail-feature-grid">
      {features.map((feature, index) => (
        <article className="detail-feature" key={feature.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h4>{feature.title}</h4>
          <p>{feature.detail}</p>
        </article>
      ))}
    </div>
  );
}

function CompetitorModal({ record, onClose }: { record: CompetitorRecord; onClose: () => void }) {
  const jumpLinks = [
    ["profile", "产品概览"],
    ["tasks", "任务场景"],
    ["technology", "技术路径"],
    ["design", "产品设计"],
    ["beaver", "Beaver 启发"],
  ] as const;
  const hasDetailedVisuals = Boolean(record.taskFlows?.length || record.architecture?.length || record.designFeatures?.length);

  return (
    <div className="competitor-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="competitor-modal-v2" role="dialog" aria-modal="true" aria-labelledby="competitor-modal-title">
        <button type="button" className="modal-close-v2" onClick={onClose} aria-label="关闭分析弹窗">×</button>

        <header className="modal-hero-v2" id="profile">
          <div className="modal-hero-visual"><ProductVisual record={record} /></div>
          <div className="modal-hero-copy">
            <p className="modal-company">{record.country} · {record.company}</p>
            <h2 id="competitor-modal-title">{record.name}</h2>
            <p className="modal-positioning">{record.positioning}</p>
            <div className="modal-form-tags">
              <span>{categoryLabels[record.category]}</span>
              <span>{record.form}</span>
            </div>
            <div className="modal-stage"><small>产品阶段</small><strong>{record.stage}</strong></div>
          </div>
        </header>

        <nav className="modal-jump-nav" aria-label="产品分析目录">
          <a href="#profile">产品概览</a>
          {record.taskFlows?.length ? <a href="#tasks">任务场景</a> : null}
          {record.architecture?.length ? <a href="#technology">技术路径</a> : null}
          {record.designFeatures?.length ? <a href="#design">产品设计</a> : null}
          <a href="#beaver">Beaver 启发</a>
          <a href="#sources">资料来源</a>
        </nav>

        <section className="modal-section-v2">
          <div className="modal-section-title"><span>01</span><h3>产品关键参数</h3></div>
          {record.metrics?.length ? (
            <div className="metric-card-grid">
              {record.metrics.map((metric) => (
                <div className="metric-card" key={metric.label}><small>{metric.label}</small><strong>{metric.value}</strong></div>
              ))}
            </div>
          ) : (
            <div className="profile-fact-grid">
              <article><small>本体形态</small><strong>{record.form}</strong></article>
              <article><small>产品定位</small><strong>{record.positioning}</strong></article>
              <article><small>核心能力</small><strong>{record.keyFact}</strong></article>
              <article><small>产品阶段</small><strong>{record.stage}</strong></article>
            </div>
          )}
        </section>

        {record.taskFlows?.length ? (
          <section className="modal-section-v2" id="tasks">
            <div className="modal-section-title"><span>02</span><h3>任务场景拆解</h3></div>
            <div className="task-flow-grid">
              {record.taskFlows.map((task) => <TaskFlowCard key={task.title} task={task} />)}
            </div>
          </section>
        ) : null}

        {record.architecture?.length ? (
          <section className="modal-section-v2" id="technology">
            <div className="modal-section-title"><span>03</span><h3>技术与执行路径</h3></div>
            <VisualFlow items={record.architecture} />
          </section>
        ) : null}

        {record.designFeatures?.length ? (
          <section className="modal-section-v2" id="design">
            <div className="modal-section-title"><span>04</span><h3>本体与产品设计</h3></div>
            <FeatureGrid features={record.designFeatures} />
          </section>
        ) : null}

        <section className="modal-section-v2">
          <div className="modal-section-title"><span>{hasDetailedVisuals ? "05" : "02"}</span><h3>产品能力分析</h3></div>
          <div className="strength-boundary-grid">
            <article className="strength-panel">
              <h4>产品亮点</h4>
              <ul>{(record.advantages?.length ? record.advantages : [record.keyFact, record.positioning]).map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article className="boundary-panel">
              <h4>{record.boundaries?.length ? "产品阶段与能力边界" : "产品发展阶段"}</h4>
              <ul>{(record.boundaries?.length ? record.boundaries : [record.stage]).map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="modal-section-v2" id="beaver">
          <div className="modal-section-title"><span>{hasDetailedVisuals ? "06" : "03"}</span><h3>对 Beaver 的研究启发</h3></div>
          <div className="beaver-takeaway">
            <p>{record.beaverValue}</p>
            {record.beaverQuestions?.length ? (
              <div className="beaver-question-grid">
                {record.beaverQuestions.map((question, index) => (
                  <article key={question}><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong></article>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="modal-section-v2 modal-source-section" id="sources">
          <div className="modal-section-title"><span>↗</span><h3>资料来源</h3></div>
          <div className="modal-source-grid">
            {record.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                <span>{link.label}</span><strong>访问原文 ↗</strong>
              </a>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
