import { notFound } from "next/navigation";
import { ModuleTabs, type ModuleItem } from "@/components/module-tabs";

type SectionConfig = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  modules: ModuleItem[];
};

const sections: Record<string, SectionConfig> = {
  project: {
    id: "project", index: "01", eyebrow: "PROJECT / ABOUT BEAVER", title: "项目概览",
    description: "从真实生活出发，建立一套完整的具身智能机器人研究与设计方法。机器人形态、能力和技术路线将由后续研究逐步确定。",
    modules: [
      { id: "background", label: "项目背景", title: "从人的生活出发", intro: "我们要研究的不是某一种家电，而是能适应真实人类生活环境的具身智能通用机器人。", planned: ["项目缘起与现实问题", "项目边界与设计原则", "家庭作为首期研究场景"] },
      { id: "goal", label: "研究目标", title: "明确真正值得解决的问题", intro: "以年轻职场人及其家庭为首期对象，研究人、空间与机器人之间的关系。", planned: ["目标人群与研究假设", "核心研究问题", "成果与验证标准"] },
      { id: "process", label: "研究流程", title: "先研究，后定义", intro: "以统一的研究方法推进，不提前确定本体形态或功能列表。", planned: ["行业与技术 → 竞品 → 用户", "建筑空间与人体尺度 → 需求机会", "产品定义 → 设计 → 验证 → 作品集"] },
      { id: "status", label: "项目进度", title: "让过程清晰可追溯", intro: "先搭建网站框架，再逐步补充有来源、有依据的研究内容。", planned: ["V0.2 页面框架与交互", "后续：行业及技术研究", "后续：用户、空间与产品研究"], takeaway: "当前处于网站框架阶段，研究结果尚未形成。" }
    ]
  },
  industry: {
    id: "industry", index: "02", eyebrow: "RESEARCH / INDUSTRY", title: "行业研究",
    description: "梳理具身智能与通用机器人产业、核心技术、产品形态及发展约束，为后续产品设计建立客观基础。",
    modules: [
      { id: "overview", label: "产业概览", title: "机器人产业研究", intro: "理解行业类别、参与者及价值链，而不是只关注某一款人形机器人。", planned: ["产业范围与定义", "产业链与市场参与者", "发展阶段和商业化模式"] },
      { id: "technology", label: "技术路线", title: "具身智能技术能力", intro: "研究感知、规划、运动、操作与交互等技术如何组成机器人系统。", planned: ["感知与环境理解", "运动、操作与控制", "模型、数据和泛化能力"] },
      { id: "form", label: "产品形态", title: "不预设机器人外形", intro: "比较人形、移动操作等路线在真实任务中的优势与约束。", planned: ["本体形态与空间适应", "成本、可靠性和安全性", "技术与目标任务匹配"] },
      { id: "sources", label: "资料来源", title: "建立可信研究资料库", intro: "将官方技术文档、公开演示、论文和第三方评测分层管理。", planned: ["来源与调研日期", "证据等级与验证条件", "尚待确认的问题"] }
    ]
  },
  competitors: {
    id: "competitors", index: "03", eyebrow: "RESEARCH / COMPETITORS", title: "竞品研究",
    description: "比较不同具身智能机器人的产品定义、真实能力与使用限制，寻找尚未被充分解决的人类需求。",
    modules: [
      { id: "catalog", label: "竞品目录", title: "建立产品观察范围", intro: "核心关注通用机器人本体，家庭机器人仅作为部分场景和能力参考。", planned: ["人形机器人", "移动操作机器人", "其他具身智能机器人与参考产品"] },
      { id: "compare", label: "能力对比", title: "比较能力，而非展示功能数量", intro: "关注任务完成条件、稳定性与安全边界。", planned: ["形态与操作范围", "感知、移动与任务规划", "任务失败和人工干预"] },
      { id: "feedback", label: "用户反馈", title: "从真实体验寻找证据", intro: "观察用户评价、体验实测与长期使用问题，不直接采用宣传结论。", planned: ["正负面反馈与样本", "高频使用摩擦", "真实价值与替代方案"] },
      { id: "insights", label: "研究结论", title: "机会点来自对比与验证", intro: "只有充分分析后，才将发现转化为 Beaver 的设计机会。", planned: ["共同能力与局限", "尚未解决的需求", "可验证的产品假设"] }
    ]
  },
  "user-research": {
    id: "user-research", index: "04", eyebrow: "RESEARCH / PEOPLE", title: "用户研究",
    description: "以一线城市年轻职场人及其家庭为首期研究对象，关注生活习惯、家庭成员变化和真实行为，而不是功能偏好问卷。",
    modules: [
      { id: "audience", label: "目标人群", title: "年轻职场人与动态家庭", intro: "先以明确的生活画像建立研究范围，再通过真实样本检验其代表性。", planned: ["工作与居住状态", "家庭成员与宠物", "时间、隐私与生活节奏"] },
      { id: "scenarios", label: "生活场景", title: "不同状态下的同一个家", intro: "观察日常居家、宠物共居、朋友聚会和老人短住等场景。", planned: ["日常居家", "宠物与朋友来访", "老人短期居住"] },
      { id: "journey", label: "行为与需求", title: "从行为追溯真实需求", intro: "识别高频任务、阻碍、权衡和替代方案。", planned: ["用户旅程与任务记录", "现有解决方式", "需求优先级与限制"] },
      { id: "interviews", label: "访谈计划", title: "建立真实研究证据", intro: "通过情境访谈、家庭观察等方式验证假设。", planned: ["招募范围与伦理说明", "访谈提纲与记录规范", "证据整理与研究结论"], takeaway: "当前尚未执行用户访谈，不展示虚构的数据和发现。" }
    ]
  },
  "spatial-design": {
    id: "spatial-design", index: "05", eyebrow: "RESEARCH / SPATIAL DESIGN", title: "空间设计",
    description: "建筑空间为人服务，机器人也必须如此。以人的日常活动为前提，研究空间尺度、动线、安全和人机共居。",
    modules: [
      { id: "plans", label: "户型研究", title: "先理解真实的家", intro: "通过户型图研究空间功能、布局与家庭活动，而不是为了机器人重新设计住宅。", planned: ["基础户型与空间分区", "家具和固定设施", "不同居住状态的变化"] },
      { id: "ergonomics", label: "人体尺度", title: "机器人需要适应人体尺度", intro: "关注人体工学、无障碍与真实操作高度，为未来本体定义提供依据。", planned: ["人体尺度和可达范围", "通行与转身空间", "老人和不同身体条件的人群"] },
      { id: "circulation", label: "生活动线", title: "人的动线优先", intro: "研究家庭成员和宠物如何使用空间，再观察机器人可以在哪里安全行动。", planned: ["人的日常活动动线图", "宠物与访客动态行为", "路径交汇和行为冲突"] },
      { id: "risks", label: "空间风险", title: "风险来自真实的生活环境", intro: "标注跌落、绊倒、夹碰、隐私与紧急通行风险。", planned: ["空间风险区域图", "敏感区域与权限边界", "安全介入与人工接管"] },
      { id: "co-living", label: "人机共居", title: "让机器人自然融入生活", intro: "在人的动线与空间约束之上，研究机器人移动、操作和协作的条件。", planned: ["机器人路径分析图", "人机空间关系图", "空间适配与本体约束"] }
    ]
  },
  "product-design": {
    id: "product-design", index: "06", eyebrow: "DESIGN / PRODUCT", title: "产品设计",
    description: "让研究推动产品定义。Beaver 的机器人本体形态、任务能力和交互方案均在机会分析之后确定。",
    modules: [
      { id: "opportunities", label: "机会分析", title: "什么问题需要机器人解决？", intro: "把需求、价值、可行性与风险组合起来，确定优先设计的任务。", planned: ["需求机会矩阵", "任务优先级", "产品边界与不做清单"] },
      { id: "form", label: "本体形态", title: "形态是一项产品决策", intro: "研究任务与空间约束后，比较候选形态，而不是直接指定人形或轮式。", planned: ["候选本体结构", "尺寸与运动能力要求", "方案权衡与选择依据"] },
      { id: "capabilities", label: "能力定义", title: "从任务定义智能能力", intro: "将用户目标拆解为感知、规划、执行、反馈和异常恢复。", planned: ["任务和能力映射", "能力边界及指标", "安全与人工协作要求"] },
      { id: "interaction", label: "交互设计", title: "人始终拥有控制权", intro: "建立用户授权、任务反馈、暂停、拒绝和接管机制。", planned: ["人机交互流程", "任务状态与异常处理", "多成员与访客权限"] },
      { id: "deliverables", label: "设计交付", title: "从概念到可验证的产品方案", intro: "逐步沉淀功能架构、产品原型、PRD及本体设计依据。", planned: ["产品定义文档", "交互原型和任务流程", "PRD与设计决策记录"] }
    ]
  },
  validation: {
    id: "validation", index: "07", eyebrow: "DESIGN / VALIDATION", title: "验证",
    description: "不把设计概念当作真实能力。使用可观察、可重复的验证方法检验需求、空间适配、交互和技术可行性。",
    modules: [
      { id: "plan", label: "验证计划", title: "明确要验证什么", intro: "每次验证都有研究假设、测试对象、任务和成功标准。", planned: ["测试目标与假设", "样本和使用环境", "成功标准与失败定义"] },
      { id: "feasibility", label: "技术可行性", title: "设计方案需要经得起技术验证", intro: "梳理能力依赖和技术风险，明确可用技术与未知项。", planned: ["能力拆解和技术限制", "测试条件与可靠性", "安全约束与升级路径"] },
      { id: "testing", label: "场景测试", title: "还原真实任务", intro: "结合家庭空间、人、宠物和访客的场景测试核心任务。", planned: ["任务流程测试", "异常和人工干预", "数据、观察与限制"] },
      { id: "iterations", label: "迭代记录", title: "用证据迭代，而非反复改外观", intro: "记录问题、推导依据与方案变更，留下可复盘的产品判断。", planned: ["问题清单", "修改前后的权衡", "最终设计结论"], takeaway: "目前未执行机器人实测；此页面仅为验证结构。" }
    ]
  }
};

export function generateStaticParams() {
  return [...Object.keys(sections), "research"].map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const config = sections[section === "research" ? "industry" : section];
  return { title: config ? config.title + " | Beaver" : "Beaver" };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const config = sections[section === "research" ? "industry" : section];
  if (!config) notFound();
  return (
    <div className="section-page">
      <div className="page-topline">
        <span>{config.eyebrow}</span>
        <span>V0.2 / FRAMEWORK</span>
      </div>
      <header className="section-head">
        <p className="section-caption">BEAVER PROJECT / {config.index}</p>
        <h1>{config.title}</h1>
        <p className="section-lead">{config.description}</p>
      </header>
      <ModuleTabs items={config.modules} pageKey={config.id} />
    </div>
  );
}
