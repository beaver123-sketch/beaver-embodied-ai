"use client";

import { useEffect, useMemo, useState } from "react";
import {
  categoryLabels,
  comparisonIds,
  focusIds,
  marketSignals,
  marketSource,
  methodologyNotes,
  platforms,
  researchInsights,
  robots,
  type CompetitorCategory,
  type CompetitorRecord,
} from "@/content/competitor-data";

type ResearchModule = "landscape" | "database" | "cases" | "comparison" | "insights";

const modules: { id: ResearchModule; number: string; title: string; hint: string }[] = [
  { id: "landscape", number: "01", title: "行业全景", hint: "行业与发展方向" },
  { id: "database", number: "02", title: "竞品数据库", hint: "产品与企业目录" },
  { id: "cases", number: "03", title: "重点案例", hint: "重点产品深度入口" },
  { id: "comparison", number: "04", title: "横向对比", hint: "本体、任务与成熟度" },
  { id: "insights", number: "05", title: "Beaver 研究机会", hint: "问题与设计启发" },
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
      <div className="competitor-topline">
        <span>BEAVER / COMPETITOR RESEARCH</span>
        <span>COMP-001—006 · UPDATED 2026.11.16</span>
      </div>

      <header className="competitor-heading">
        <p className="competitor-eyebrow">GLOBAL EMBODIED AI LANDSCAPE</p>
        <h1>全球具身智能<br className="competitor-mobile-break" />竞品地图</h1>
        <p className="competitor-intro">
          从机器人本体到具身智能模型，梳理全球代表性产品、技术路线与应用阶段。
          <br className="competitor-desktop-break" />
          Sunday Memo 作为重点研究案例，其他路线共同构成 Beaver 的行业参照。
        </p>
        <div className="competitor-meta">
          <span>研究范围：机器人产品 + 具身智能模型</span>
          <span>资料口径：截至 2026.11.16</span>
          <span>国家：按总部 / 主要运营所在地标注</span>
        </div>
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
              <span className="panel-index">GLOBAL VIEW</span>
            </div>

            <div className="landscape-stats">
              <div className="landscape-stat"><strong>{robotCount}</strong><span>代表性机器人产品</span></div>
              <div className="landscape-stat"><strong>{platformCount}</strong><span>具身智能模型 / 平台</span></div>
              <div className="landscape-stat"><strong>{countries}+</strong><span>国家 / 地区标注</span></div>
              <div className="landscape-stat"><strong>5</strong><span>研究类别</span></div>
            </div>

            <div className="landscape-section-title">
              <h3>行业信号</h3>
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
              <h3>五条研究路线</h3>
              <span>点击下方路线进入对应产品目录</span>
            </div>
            <div className="route-category-list">
              {(["home", "humanoid", "mobile", "platform", "adjacent"] as CompetitorCategory[]).map((category) => {
                const count = allRecords.filter((record) => record.category === category).length;
                return (
                  <button key={category} type="button" className="route-category" onClick={() => { setActiveCategory(category); setActiveModule("database"); }}>
                    <span className="route-category-name">{categoryLabels[category]}</span>
                    <strong>{count.toString().padStart(2, "0")}</strong>
                    <span className="route-category-arrow">查看目录 →</span>
                  </button>
                );
              })}
            </div>

            <div className="method-note">
              <strong>资料口径</strong>
              <ul>{methodologyNotes.map((note) => <li key={note}>{note}</li>)}</ul>
            </div>
          </section>
        ) : null}

        {activeModule === "database" ? (
          <section className="research-panel" aria-labelledby="database-title">
            <div className="panel-heading-row">
              <div>
                <p className="panel-kicker">02 / COMPETITOR DATABASE</p>
                <h2 id="database-title">竞品数据库</h2>
                <p className="panel-lead">按产品路线筛选。点击产品名称，打开独立分析弹窗与真实资料链接。</p>
              </div>
              <span className="panel-index">{filteredRecords.length} RECORDS</span>
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
            <div className="competitor-list">
              {filteredRecords.map((record) => (
                <button type="button" className={"competitor-row" + (record.featured ? " memo-row" : "")} key={record.id} onClick={() => setSelectedRecord(record)}>
                  <span className="competitor-row-main">
                    <span className="competitor-row-title">
                      <strong>{record.name}</strong>
                      {record.featured ? <em>重点研究</em> : null}
                      {record.priority === "重点对比" ? <i>重点对比</i> : null}
                    </span>
                    <small>{record.company}</small>
                  </span>
                  <span className="competitor-row-country">{record.country}</span>
                  <span className="competitor-row-form">{record.form}</span>
                  <span className="competitor-row-stage">{record.stage}</span>
                  <span className="competitor-row-open">查看分析 ↗</span>
                </button>
              ))}
              {filteredRecords.length === 0 ? <p className="empty-state">没有找到匹配的产品，请调整搜索条件。</p> : null}
            </div>
            <p className="panel-footnote">产品阶段依据公开资料归纳；“未披露 / 待验证”不代表产品没有相关能力。</p>
          </section>
        ) : null}

        {activeModule === "cases" ? (
          <section className="research-panel" aria-labelledby="cases-title">
            <div className="panel-heading-row">
              <div>
                <p className="panel-kicker">03 / FOCUS CASES</p>
                <h2 id="cases-title">重点案例</h2>
                <p className="panel-lead">以 Sunday Memo 为主案例，其他代表产品用于对照不同路线。</p>
              </div>
              <span className="panel-index">DEEP DIVE</span>
            </div>

            <button type="button" className="memo-feature" onClick={() => setSelectedRecord(getRecord("memo") ?? null)}>
              <div className="memo-feature-top">
                <span>PRIMARY CASE / 01</span>
                <em>重点研究对象</em>
              </div>
              <div className="memo-feature-body">
                <div>
                  <p className="memo-country">🇺🇸 美国 · Sunday Robotics</p>
                  <h3>Memo</h3>
                  <p className="memo-tagline">The helpful home robot.</p>
                  <p className="memo-description">从家庭重复事务出发，以人的操作数据训练技能，探索可持续扩展的家庭机器人能力。</p>
                </div>
                <div className="memo-facts">
                  <span><small>本体形态</small><strong>轮式移动 + 双臂</strong></span>
                  <span><small>核心机制</small><strong>Skill Capture Glove</strong></span>
                  <span><small>产品阶段</small><strong>2026 年末 Beta 计划</strong></span>
                  <span><small>研究重点</small><strong>家庭任务 / 技能学习 / 安全</strong></span>
                </div>
              </div>
              <div className="memo-feature-bottom"><span>打开九部分深度分析</span><strong>查看 Memo 分析 ↗</strong></div>
            </button>

            <div className="focus-list-heading">
              <h3>重点对照产品</h3>
              <span>点击查看独立分析</span>
            </div>
            <div className="focus-grid">
              {focusIds.filter((id) => id !== "memo").map((id) => {
                const record = getRecord(id);
                if (!record) return null;
                return (
                  <button key={record.id} type="button" className="focus-item" onClick={() => setSelectedRecord(record)}>
                    <span className="focus-item-country">{record.country}</span>
                    <strong>{record.name}</strong>
                    <small>{record.company}</small>
                    <span className="focus-item-note">{record.beaverValue}</span>
                    <span className="focus-item-open">查看分析 ↗</span>
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
                <p className="panel-lead">不以单一总分排名，先比较产品形态、任务定位和成熟度。</p>
              </div>
              <span className="panel-index">8 KEY PRODUCTS</span>
            </div>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead><tr><th>产品</th><th>国家 / 企业</th><th>本体路线</th><th>主要任务方向</th><th>公开阶段</th><th></th></tr></thead>
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
            <p className="panel-footnote">不同产品的任务、测试条件与商业阶段不同，不适合直接用同一分数排序。下一轮可围绕同一任务建立统一测试维度。</p>
          </section>
        ) : null}

        {activeModule === "insights" ? (
          <section className="research-panel" aria-labelledby="insights-title">
            <div className="panel-heading-row">
              <div>
                <p className="panel-kicker">05 / BEAVER RESEARCH OPPORTUNITIES</p>
                <h2 id="insights-title">Beaver 研究机会</h2>
                <p className="panel-lead">以下是基于公开竞品资料形成的研究问题，不是已经验证的用户结论。</p>
              </div>
              <span className="panel-index">OPEN QUESTIONS</span>
            </div>
            <div className="insight-list">
              {researchInsights.map((insight, index) => (
                <article className="insight-row" key={insight.title}>
                  <span className="insight-number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="insight-copy">
                    <h3>{insight.title}</h3>
                    <p>{insight.detail}</p>
                    <div><strong>待研究：</strong>{insight.question}</div>
                  </div>
                </article>
              ))}
            </div>
            <div className="insight-conclusion">
              <span>BEAVER / RESEARCH PRINCIPLE</span>
              <strong>不先决定机器人应该长什么样，先证明人在什么情境下需要它完成什么任务。</strong>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="competitor-footer">
        <span>COMP-001—006 / BEAVER</span>
        <span>公开资料研究 · 持续更新</span>
        <span>下一步：Sunday Memo 深度分析与竞品能力验证</span>
      </footer>

      {selectedRecord ? (
        <CompetitorModal record={selectedRecord} onClose={() => setSelectedRecord(null)} />
      ) : null}
    </div>
  );
}

function CompetitorModal({ record, onClose }: { record: CompetitorRecord; onClose: () => void }) {
  const isMemo = record.id === "memo";
  return (
    <div className="competitor-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="competitor-modal" role="dialog" aria-modal="true" aria-labelledby="competitor-modal-title">
        <header className="modal-header">
          <div>
            <p className="modal-kicker">{record.company.toUpperCase()} / {categoryLabels[record.category].toUpperCase()}</p>
            <h2 id="competitor-modal-title">{record.name}</h2>
            <p className="modal-subtitle">{record.country} · {record.form}</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="关闭分析弹窗">×</button>
        </header>

        <div className="modal-highlight-grid">
          <div><small>产品定位</small><strong>{record.positioning}</strong></div>
          <div><small>发展阶段</small><strong>{record.stage}</strong></div>
          <div><small>重点信息</small><strong>{record.keyFact}</strong></div>
          <div><small>对 Beaver 的研究价值</small><strong>{record.beaverValue}</strong></div>
        </div>

        {record.sections?.length ? (
          <div className="modal-analysis">
            <div className="modal-section-heading">
              <h3>{isMemo ? "九部分产品深度分析" : "产品分析"}</h3>
              <span>{record.sections.length} SECTIONS</span>
            </div>
            {record.sections.map((section, index) => (
              <article className="modal-analysis-row" key={section.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{section.title}</h4>
                  <p>{section.content}</p>
                  <small>{section.evidence}</small>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="modal-analysis compact-analysis">
            <div className="modal-section-heading"><h3>产品观察</h3><span>PUBLIC INFORMATION</span></div>
            <article className="modal-analysis-row">
              <span>01</span><div><h4>产品路线</h4><p>{record.form}。产品定位为：{record.positioning}。</p><small>官方资料归纳</small></div>
            </article>
            <article className="modal-analysis-row">
              <span>02</span><div><h4>关键能力与任务</h4><p>{record.keyFact}</p><small>以公开产品资料为准</small></div>
            </article>
            <article className="modal-analysis-row">
              <span>03</span><div><h4>发展阶段</h4><p>{record.stage}</p><small>截至 2026.11.16 的公开信息</small></div>
            </article>
            <article className="modal-analysis-row">
              <span>04</span><div><h4>Beaver 研究价值</h4><p>{record.beaverValue}。该观察用于提出后续研究问题，不代表已形成产品方案。</p><small>研究判断</small></div>
            </article>
          </div>
        )}

        <div className="modal-sources">
          <div className="modal-section-heading"><h3>真实资料来源</h3><span>{record.links.length} LINKS</span></div>
          <div className="modal-source-list">
            {record.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                <span>{link.label}</span><strong>打开网页 ↗</strong>
              </a>
            ))}
          </div>
        </div>
        <div className="modal-disclaimer">说明：企业官网资料代表企业公开披露；产品能力、交付状态和测试结果仍需独立验证。未公开的信息不作推断。</div>
      </section>
    </div>
  );
}
