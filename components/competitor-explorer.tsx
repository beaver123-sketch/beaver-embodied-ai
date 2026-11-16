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
                  <small>{signal.note}</small>
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
    return <img src={record.image} alt={record.imageAlt || record.name} loading="lazy" />;
  }
  const isPlatform = record.category === "platform";
  const isWheeled = /轮式|底盘/.test(record.form);
  const isHumanoid = /双足|人形/.test(record.form);
  return (
    <div className={"product-placeholder " + (isPlatform ? "platform-art" : isWheeled ? "wheeled-art" : isHumanoid ? "humanoid-art" : "adjacent-art")}>
      {isPlatform ? (
        <svg viewBox="0 0 260 180" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".72">
            <path d="M130 38 68 82 130 130 194 82 130 38M68 82 68 142 130 130 194 142 194 82M130 38V130M68 82 194 142M194 82 68 142" />
            <circle cx="130" cy="38" r="12"/><circle cx="68" cy="82" r="10"/><circle cx="194" cy="82" r="10"/><circle cx="68" cy="142" r="8"/><circle cx="194" cy="142" r="8"/><circle cx="130" cy="130" r="13"/>
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 260 180" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".8">
            <circle cx="130" cy="28" r="15" />
            <path d="M130 43V95M130 58 88 78 78 111M130 58 172 78 182 111" />
            {isWheeled ? <><path d="M130 95V126"/><rect x="98" y="124" width="64" height="24" rx="8"/><circle cx="111" cy="153" r="7"/><circle cx="149" cy="153" r="7"/></> : <><path d="M130 95 105 128 96 161M130 95 155 128 164 161"/><path d="M84 163h23M153 163h23"/></>}
          </g>
        </svg>
      )}
      <span>{isPlatform ? "EMBODIED AI" : isWheeled ? "MOBILE MANIPULATION" : isHumanoid ? "HUMANOID ROBOT" : "HOME ROBOT"}</span>
      <strong>{record.name}</strong>
    </div>
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
          {jumpLinks.map(([id, label]) => <a key={id} href={"#" + id}>{label}</a>)}
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
              <h4>产品阶段与能力边界</h4>
              <ul>{(record.boundaries?.length ? record.boundaries : [record.stage, record.beaverValue]).map((item) => <li key={item}>{item}</li>)}</ul>
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
