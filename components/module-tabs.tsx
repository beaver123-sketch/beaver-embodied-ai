"use client";

import { useState } from "react";

export type ModuleItem = {
  id: string;
  label: string;
  title: string;
  intro: string;
  planned: string[];
  takeaway?: string;
};

export function ModuleTabs({ items, pageKey }: { items: ModuleItem[]; pageKey: string }) {
  const [current, setCurrent] = useState(items[0]?.id ?? "");
  const active = items.find((item) => item.id === current) ?? items[0];
  if (!active) return null;

  return (
    <section className="module-section" aria-label="模块内容">
      <div className="tab-list" role="tablist" aria-label="切换当前研究模块">
        {items.map((item) => (
          <button
            key={item.id}
            id={pageKey + "-tab-" + item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active.id}
            aria-controls={pageKey + "-panel"}
            tabIndex={item.id === active.id ? 0 : -1}
            className={"tab-button" + (item.id === active.id ? " selected" : "")}
            onClick={() => setCurrent(item.id)}
            onKeyDown={(event) => {
              const index = items.findIndex((candidate) => candidate.id === item.id);
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % items.length;
              else if (event.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = items.length - 1;
              else return;
              event.preventDefault();
              setCurrent(items[next].id);
              document.getElementById(pageKey + "-tab-" + items[next].id)?.focus();
            }}
          >{item.label}</button>
        ))}
      </div>
      <div className="module-panel" id={pageKey + "-panel"} role="tabpanel" aria-labelledby={pageKey + "-tab-" + active.id} tabIndex={0}>
        <div className="module-panel-index">MODULE / {String(items.findIndex((item) => item.id === active.id) + 1).padStart(2, "0")}</div>
        <div className="module-content-grid">
          <div className="module-summary">
            <h2>{active.title}</h2>
            <p>{active.intro}</p>
            <span className="draft-status"><span aria-hidden="true" /> 研究内容待补充</span>
          </div>
          <div className="module-outline">
            <span className="outline-kicker">本模块规划</span>
            {active.planned.map((point, index) => (
              <div className="outline-row" key={point}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{point}</strong>
              </div>
            ))}
            {active.takeaway ? <p className="outline-note">{active.takeaway}</p> : null}
          </div>
        </div>
      </div>
      <div className="module-legend">V0.2 为网站结构演示。尚未完成的研究、图纸与测试不会被展示为既有成果。</div>
    </section>
  );
}
