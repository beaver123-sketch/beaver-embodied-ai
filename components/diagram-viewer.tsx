"use client";
import { useState, type ReactNode } from "react";

export function DiagramViewer({ title, caption, children }: { title: string; caption?: string; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  return <>
    <div className="diagram-card"><div className="diagram-card-head"><span>{title}</span><button type="button" onClick={() => setExpanded(true)}>放大查看 ↗</button></div><div className="diagram-content">{children}</div>{caption ? <div className="diagram-caption">{caption}</div> : null}</div>
    {expanded ? <div className="diagram-modal" role="dialog" aria-modal="true" aria-label={title} onClick={() => setExpanded(false)}><div className="diagram-modal-inner" onClick={(event) => event.stopPropagation()}><div className="diagram-card-head"><span>{title}</span><button type="button" onClick={() => setExpanded(false)}>关闭 ×</button></div><div className="diagram-content expanded">{children}</div>{caption ? <div className="diagram-caption">{caption}</div> : null}</div></div> : null}
  </>;
}
