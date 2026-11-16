import { notFound } from "next/navigation";
import ResearchBrief from "@/content/research-brief.mdx";
import { DiagramViewer } from "@/components/diagram-viewer";
import { HomeMap, ResearchFlow, CapabilityMap, ValidationLoop } from "@/components/diagrams";

const titles: Record<string,string> = { project:"项目", research:"研究", "spatial-design":"空间设计", "product-design":"产品设计", validation:"验证" };
const phases = [
  ["项目立项与研究框架","研究什么问题？边界与证据标准是什么？","项目说明书"],
  ["行业与技术研究","具身智能的发展现状、关键能力与技术限制是什么？","行业报告 / 技术路线图"],
  ["竞品研究","不同产品形态如何解决真实家庭任务？","竞品报告 / 对比矩阵"],
  ["用户研究","家庭成员、宠物与访客的真实需求和顾虑是什么？","用户画像 / 旅程图 / 需求清单"],
  ["建筑空间与人机共居","空间、家具、动线和边界如何影响机器人参与生活？","户型 / 活动区域 / 动线 / 风险图"],
  ["用户需求与产品机会","哪些问题值得由具身智能解决，优先级如何？","需求分析 / 机会矩阵"],
  ["产品定位与定义","产品为谁创造什么价值，能力边界在哪里？","产品定义文档 / 架构图"],
  ["机器人本体与交互设计","何种本体与交互方式最适合被验证的任务？","产品方案 / 原型 / PRD"],
  ["技术可行性与产品验证","关键任务能否稳定、安全、可解释地完成？","技术分析 / 测试报告 / 优化方案"],
  ["作品集整理与发布","如何完整呈现研究过程、决策依据与验证结果？","Beaver 完整作品集网站"]
];
const scenes = [
  ["日常居家","玄关、客厅、餐厨、卧室之间的高频动线","少打扰、流程顺畅、个人空间可控","避免占道；主动服务必须可关闭"],
  ["宠物共居","宠物休息、饮水、活动和躲避区域","安全、稳定、避免惊吓","限制突然移动、噪声与未经授权的接触"],
  ["朋友聚会","多人聚集、临时座位、餐饮与出入动线","社交连续性、访客隐私","明确访客权限，不默认采集或记录"],
  ["老人短住","临时卧室、卫生间路径、夜间照明与求助点","易理解、易操作、安全感","低学习成本；不替代必要的人类照护"]
];
const validation = [
  ["需求真实性","情境访谈、家庭日记、任务观察","尚未执行","待收集一手证据"],
  ["空间适配性","户型分析、动线走查、障碍与风险标注","框架已建立","当前示意图为概念研究底图，非实测户型"],
  ["交互可理解性","任务流程原型、可用性走查","尚未执行","待定义关键任务后开展"],
  ["技术可行性","能力拆解、技术验证、异常场景测试","尚未执行","不预设已具备的硬件或模型能力"],
  ["安全与隐私","危害分析、权限测试、人工接管演练","框架已建立","待形成可测试的安全要求"]
];

function Intro({ eyebrow,title,description,meta }:{eyebrow:string;title:string;description:string;meta:string}) {
  return <section className="page-intro"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p><div className="intro-meta">{meta}</div></section>;
}
function Heading({index,title,description}:{index:string;title:string;description:string}) {
  return <div className="section-heading"><div className="section-title-wrap"><span className="section-index">{index}</span><h2>{title}</h2></div><p>{description}</p></div>;
}
function Pill({children,tone="neutral"}:{children:React.ReactNode;tone?:"neutral"|"green"|"amber"}) {
  return <span className={"status-pill "+tone}>{children}</span>;
}
function ProjectPage() {
  return <>
    <Intro eyebrow="01 / PROJECT CHARTER" title="先定义问题，再定义产品。" description="Beaver 是一个以人为本的具身智能通用机器人产品研究与设计项目。V0.1 建立研究边界、推进路径与证据标准，为后续行业、用户、空间及产品研究提供统一框架。" meta="PROJECT / BEAVER V0.1 / 2026" />
    <section className="project-summary-grid">
      <article className="summary-panel dark"><span className="panel-label">PROJECT INTENT</span><h2>研究一种真正融入家庭生活的具身智能通用机器人。</h2><p>不从既定机器人形态或功能清单出发，而是从人的生活目标、家庭空间和真实任务出发，逐步推导产品定义。</p></article>
      <article className="summary-panel"><span className="panel-label">TARGET AUDIENCE</span><h3>一线城市年轻职场人及家庭</h3><ul><li>工作节奏快，家庭时间有限</li><li>养宠，与宠物共同生活</li><li>偶尔邀请朋友到家中聚会</li><li>父母或长辈有短期居住需求</li></ul></article>
      <article className="summary-panel"><span className="panel-label">DESIGN BOUNDARY</span><h3>先研究生活，再判断形态</h3><ul><li>不预设人形、轮式或固定式本体</li><li>不提前承诺未验证的机器人能力</li><li>空间图纸标注概念或实测属性</li><li>隐私、安全与人工接管优先</li></ul></article>
    </section>
    <section className="content-section"><Heading index="02" title="十阶段研究与交付" description="每一阶段都有明确研究问题和可交付成果；只有实际完成的工作才会标记为已完成。" /><div className="phase-list">{phases.map((phase,index)=><article className="phase-row" key={phase[0]}><div className="phase-number">{String(index+1).padStart(2,"0")}</div><div className="phase-main"><div className="phase-title-line"><h3>{phase[0]}</h3>{index===0?<Pill tone="green">当前基础</Pill>:<Pill>待开展</Pill>}</div><p>{phase[1]}</p><div className="phase-output"><span>交付物</span>{phase[2]}</div></div></article>)}</div></section>
    <section className="content-section"><Heading index="03" title="项目决策原则" description="用可追溯的研究证据控制产品方向，避免从技术想象直接跳到产品结论。" /><div className="principle-grid"><div><span>01</span><h3>People first</h3><p>先明确谁在什么情境下遇到什么问题。</p></div><div><span>02</span><h3>Home first</h3><p>人的生活空间不为机器人让位，机器人需要适应家庭。</p></div><div><span>03</span><h3>Evidence first</h3><p>事实、假设和待验证问题分层呈现。</p></div><div><span>04</span><h3>Safety first</h3><p>隐私、身体安全、宠物安全与人工接管不可后置。</p></div></div></section>
  </>;
}
function ResearchPage() {
  const tracks = [["市场与产业","产业链、产品类别、商业模式、家庭场景渗透与发展趋势。","行业图谱 / 趋势判断"],["机器人能力","感知、定位、导航、操作、规划、学习、人机交互与安全。","能力地图 / 技术路线"],["家庭环境","户型、家具、门槛、地面材质、网络与能源条件。","环境约束清单"],["人因与信任","可控性、可解释性、隐私、接受度、容错与责任边界。","体验原则 / 风险清单"]];
  return <>
    <Intro eyebrow="02–04 / RESEARCH" title="把复杂问题拆成可研究的问题。" description="行业与技术研究、竞品研究、用户研究并行推进，但最终都要回到家庭任务：谁需要帮助、在什么环境、完成什么目标，以及为什么现有方式不够好。" meta="RESEARCH / INDUSTRY · TECHNOLOGY · USERS" />
    <section className="content-section"><Heading index="01" title="研究逻辑" description="从生活事实到产品机会，避免先有方案、再寻找需求。" /><ResearchFlow /></section>
    <section className="content-section"><Heading index="02" title="四条研究主线" description="每条主线都需要形成可追溯的证据、判断与未解问题。" /><div className="research-track-grid">{tracks.map((track,index)=><article className="research-track-card" key={track[0]}><span>0{index+1}</span><h3>{track[0]}</h3><p>{track[1]}</p><div><small>预期交付</small><strong>{track[2]}</strong></div></article>)}</div></section>
    <section className="content-section"><Heading index="03" title="竞品研究框架" description="先按产品类别建立观察维度，再基于实际资料补充具体产品，不把宣传能力等同于稳定能力。" /><div className="table-wrap"><table className="data-table"><thead><tr><th>研究类别</th><th>重点观察</th><th>关键问题</th><th>需要验证的证据</th></tr></thead><tbody><tr><td>人形 / 双足机器人</td><td>全身运动、双手操作、环境适应</td><td>复杂家庭环境中的可靠性如何？</td><td>任务演示条件、成功率、失败恢复</td></tr><tr><td>移动操作机器人</td><td>移动底盘、机械臂、物体操作</td><td>移动与操作能力如何协同？</td><td>可达范围、负载、定位与操作边界</td></tr><tr><td>家庭服务机器人</td><td>家庭任务、交互、长期使用</td><td>解决的是高频痛点还是单点功能？</td><td>真实用户反馈、持续使用与维护成本</td></tr><tr><td>具身智能平台</td><td>模型、数据、训练与工具链</td><td>泛化能力在何种任务和环境下成立？</td><td>公开技术资料、复现实验与限制说明</td></tr></tbody></table></div><div className="research-caution"><strong>研究提醒</strong><p>以上为竞品分类与分析维度，不代表已完成具体竞品调研。具体产品结论需补充来源、日期、测试条件和证据等级。</p></div></section>
    <section className="content-section research-note"><div><div className="eyebrow">RESEARCH NOTE</div><h2>研究结论必须有证据。</h2><p>所有研究记录都区分事实、推断与假设；未采集的一手数据不写成用户结论，未验证的技术能力不写成产品承诺。</p></div><div className="mdx-card"><ResearchBrief /></div></section>
    <section className="page-bottom-status"><Pill tone="green">研究框架已建立</Pill><span>行业资料、竞品证据与用户访谈将在后续阶段持续补充。</span></section>
  </>;
}
function SpatialPage() {
  return <>
    <Intro eyebrow="05 / SPATIAL DESIGN" title="先理解家，再讨论机器人如何进入家。" description="家庭不是机器人运行的空白场地。户型、家具、动线、宠物活动、访客与私密边界共同决定产品能做什么、不能做什么。" meta="SPATIAL DESIGN / HUMAN–ROBOT CO-LIVING" />
    <section className="content-section"><div className="section-heading-row"><Heading index="01" title="家庭空间概念分区" description="用于建立研究视角的示意底图，不代表真实用户户型或工程测量结果。" /><Pill tone="amber">概念示意 · 非比例</Pill></div><DiagramViewer title="家庭生活空间 / 概念分区图" caption="后续需以真实户型、家具尺寸、门宽、地面材质和家庭成员活动记录替换本示意。"><HomeMap /></DiagramViewer></section>
    <section className="content-section"><Heading index="02" title="不同场景的空间研究重点" description="场景变化会改变空间使用方式，也会改变机器人进入空间的权限与边界。" /><div className="table-wrap"><table className="data-table"><thead><tr><th>场景</th><th>空间关注点</th><th>人 / 宠物的需求</th><th>产品设计约束</th></tr></thead><tbody>{scenes.map((row)=><tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td></tr>)}</tbody></table></div></section>
    <section className="content-section"><Heading index="03" title="空间分析需要落到图纸" description="每张图纸都应有比例、标注、图例、数据来源和分析结论，避免只展示装饰性平面图。" /><div className="spatial-method-grid"><article><span>01 / PLAN</span><h3>户型与功能分区</h3><p>标注空间尺寸、门洞、家具、收纳、固定设施与可变化区域。</p></article><article><span>02 / FLOW</span><h3>人员与宠物动线</h3><p>按时段记录移动路径、交汇点、拥堵点与不可进入区域。</p></article><article><span>03 / RISK</span><h3>风险与边界</h3><p>识别跌落、夹碰、绊倒、宠物应激、隐私暴露与紧急通行风险。</p></article><article><span>04 / OPPORTUNITY</span><h3>产品机会标注</h3><p>将空间问题映射为任务需求，而不是直接映射成某种机器人形态。</p></article></div></section>
  </>;
}
function ProductPage() {
  const principles = [["P1","以人为中心","从人的目标、习惯和情绪出发，而不是从机器人能做什么倒推需求。"],["P2","空间先于本体","先研究真实家庭空间与任务，再决定移动、操作或固定式能力的组合。"],["P3","主动有边界","主动服务必须可理解、可撤销、可设置；不以持续打扰换取存在感。"],["P4","安全与隐私默认优先","家庭成员、宠物与访客都应拥有清晰的安全边界和数据控制权。"],["P5","能力可验证","每项关键能力都要对应任务、环境条件、成功标准和失败处理。"]];
  return <>
    <Intro eyebrow="07–08 / PRODUCT DESIGN" title="产品形态不是起点，而是研究结果。" description="Beaver 面向家庭生活中的真实任务，探索具身智能通用机器人的产品定位、能力组合与交互方式。当前阶段不预设人形、轮式或固定式本体，先建立需求到能力的推导关系。" meta="PRODUCT DESIGN / DEFINITION · BODY · INTERACTION" />
    <section className="content-section"><Heading index="01" title="产品设计原则" description="产品价值、空间适配与人机关系优先于外观和技术炫技。" /><div className="principle-list">{principles.map((row)=><article key={row[0]}><span>{row[0]}</span><div><h3>{row[1]}</h3><p>{row[2]}</p></div></article>)}</div></section>
    <section className="content-section"><Heading index="02" title="从任务推导能力" description="以下是研究阶段需要拆解的能力维度，不代表 Beaver 已经具备这些能力。" /><div className="capability-panel"><div className="capability-panel-head"><div><div className="eyebrow">CAPABILITY MAP</div><h3>具身智能能力框架</h3></div><Pill tone="amber">待研究 / 待验证</Pill></div><CapabilityMap /></div></section>
    <section className="content-section"><Heading index="03" title="交互需要明确控制权" description="家庭场景涉及不同成员、访客与宠物，交互必须让人知道机器人正在做什么、为什么做，以及如何停止。" /><div className="interaction-grid"><article><span>01</span><h3>可理解</h3><p>说明当前状态、任务目标、信息来源与不确定性。</p></article><article><span>02</span><h3>可授权</h3><p>涉及隐私、物品操作或主动服务时，先明确权限与范围。</p></article><article><span>03</span><h3>可打断</h3><p>用户可随时暂停、取消、撤销或切换人工处理。</p></article><article><span>04</span><h3>可恢复</h3><p>任务失败时说明原因、风险和下一步，不擅自重复尝试。</p></article></div></section>
    <section className="content-section decision-gate"><div><div className="eyebrow">DESIGN GATE</div><h2>先有证据，再决定本体。</h2><p>只有当用户任务、家庭空间约束和技术可行性被充分研究后，才进入本体形态比较与方案选择。</p></div><div className="gate-list"><div><span>01</span>用户任务与优先级明确</div><div><span>02</span>空间限制与安全边界明确</div><div><span>03</span>关键能力具备验证路径</div><div><span>04</span>不同形态方案完成对比</div></div></section>
  </>;
}
function ValidationPage() {
  return <>
    <Intro eyebrow="09–10 / VALIDATION" title="每个判断，都要有验证路径。" description="Beaver 不把概念方案包装成已经实现的能力。验证从任务定义开始，逐步检查需求真实性、空间适配、交互可理解性、技术可行性与安全边界。" meta="VALIDATION / TESTING · ITERATION · PORTFOLIO" />
    <section className="content-section"><Heading index="01" title="验证闭环" description="以最小验证成本优先回答影响产品方向的关键问题。" /><ValidationLoop /></section>
    <section className="content-section"><Heading index="02" title="当前验证状态" description="状态反映实际进展，不以计划、设计稿或推测代替测试结果。" /><div className="validation-status-list">{validation.map((row,index)=><article key={row[0]}><span className="validation-no">0{index+1}</span><div className="validation-main"><h3>{row[0]}</h3><p>{row[1]}</p></div><div className="validation-result"><Pill tone={row[2]==="框架已建立"?"green":"amber"}>{row[2]}</Pill><small>{row[3]}</small></div></article>)}</div></section>
    <section className="content-section"><Heading index="03" title="测试记录模板" description="每次验证至少记录以下信息，确保结论可复查、可复现。" /><div className="test-template-grid"><div><span>01</span><strong>测试目标</strong><small>本次要回答的具体问题</small></div><div><span>02</span><strong>对象与环境</strong><small>参与者、户型、设备与条件</small></div><div><span>03</span><strong>任务与步骤</strong><small>操作流程、输入与预期结果</small></div><div><span>04</span><strong>观察与数据</strong><small>成功、失败、异常与用户反馈</small></div><div><span>05</span><strong>结论与限制</strong><small>证据等级、适用范围与未知项</small></div><div><span>06</span><strong>后续动作</strong><small>保留、修改、补测或停止</small></div></div></section>
    <section className="validation-disclaimer"><strong>当前结论</strong><p>Beaver V0.1 已建立项目定位、研究框架与网站结构；用户访谈、实体空间测量、机器人原型测试和工程验证尚未执行，因此不展示虚构的成功率、用户满意度或技术性能数据。</p></section>
  </>;
}

export function generateStaticParams() {
  return Object.keys(titles).map((section)=>({section}));
}
export async function generateMetadata({params}:{params:Promise<{section:string}>}) {
  const values = await params;
  return { title: titles[values.section] || "Beaver" };
}
export default async function SectionPage({params}:{params:Promise<{section:string}>}) {
  const {section} = await params;
  let content;
  if (section==="project") content=<ProjectPage />;
  else if (section==="research") content=<ResearchPage />;
  else if (section==="spatial-design") content=<SpatialPage />;
  else if (section==="product-design") content=<ProductPage />;
  else if (section==="validation") content=<ValidationPage />;
  else notFound();
  return <div className="page-container">{content}</div>;
}
