export type CompetitorCategory = "home" | "humanoid" | "mobile" | "platform" | "adjacent";

export type ResearchSection = {
  title: string;
  content: string;
  evidence: "官方公开" | "官方披露" | "待验证" | "研究判断";
};

export type SourceLink = {
  label: string;
  url: string;
};

export type VisualMetric = { label: string; value: string };
export type TaskFlow = { title: string; context: string; steps: string[]; outcome: string };
export type VisualFeature = { title: string; detail: string };

export type CompetitorRecord = {
  id: string;
  name: string;
  company: string;
  country: string;
  category: CompetitorCategory;
  form: string;
  positioning: string;
  stage: string;
  keyFact: string;
  beaverValue: string;
  image?: string;
  imageAlt?: string;
  metrics?: VisualMetric[];
  taskFlows?: TaskFlow[];
  architecture?: VisualFeature[];
  designFeatures?: VisualFeature[];
  advantages?: string[];
  boundaries?: string[];
  beaverQuestions?: string[];
  links: SourceLink[];
  sections?: ResearchSection[];
  featured?: boolean;
  priority?: "重点研究" | "重点对比" | "行业观察";
};

export const categoryLabels: Record<CompetitorCategory, string> = {
  home: "家庭与生活场景",
  humanoid: "通用人形机器人",
  mobile: "轮式移动操作",
  platform: "具身智能模型 / 平台",
  adjacent: "家庭相邻产品",
};

export const robots: CompetitorRecord[] = [
  {
    id: "memo",
    name: "Memo",
    company: "Sunday Robotics",
    country: "🇺🇸 美国",
    category: "home",
    form: "轮式底盘 · 升降结构 · 双臂",
    positioning: "面向忙碌家庭的日常事务机器人",
    stage: "2026 年末 Beta 计划；尚未开放零售",
    keyFact: "技能采集手套 + Skill Library；重点展示餐后清理、洗碗机装载、咖啡与衣物整理",
    image: "https://image.mux.com/xLLkokRSG7wrmPVmYfSE3Hz2TwlKI83Ohf8vHejgI4o/thumbnail.webp?time=0",
    imageAlt: "Sunday Memo 在家庭餐厅执行餐桌清理任务",
    metrics: [
      { label: "移动结构", value: "轮式底盘" },
      { label: "操作结构", value: "升降结构 + 双臂" },
      { label: "常用高度", value: "约 4 ft" },
      { label: "手臂可达", value: "最高约 7 ft" },
      { label: "当前阶段", value: "2026 年末 Beta" },
      { label: "手工制造成本", value: "约 $20,000 / 台" },
    ],
    taskFlows: [
      { title: "餐后清理", context: "厨房 / 餐厅", steps: ["收集餐具与杯具", "清理餐桌与食物残渣", "分类装入洗碗机", "启动洗碗机"], outcome: "完成餐后收尾流程" },
      { title: "咖啡制作", context: "厨房台面", steps: ["识别咖啡机与器具", "操作咖啡机", "完成咖啡萃取"], outcome: "执行一项连续的厨房操作任务" },
      { title: "衣物整理", context: "卧室 / 洗衣区", steps: ["识别袜子等衣物", "抓取并整理衣物", "完成折叠"], outcome: "处理柔性物体与重复整理动作" },
    ],
    architecture: [
      { title: "人的操作示范", detail: "Memory Developers 在真实生活环境中完成家务操作。" },
      { title: "动作数据采集", detail: "Skill Capture Glove 记录人的手部动作与操作过程。" },
      { title: "技能训练与沉淀", detail: "数据进入训练流程，形成可持续扩展的 Skill Library。" },
      { title: "机器人自主执行", detail: "Memo 调用已学习技能，在家庭中完成对应任务。" },
    ],
    designFeatures: [
      { title: "低重心与稳定轮距", detail: "以稳定的移动底盘支撑家庭环境中的双臂操作。" },
      { title: "柔软硅胶外壳", detail: "减少尖锐硬质外露，表面可使用家用清洁产品擦拭。" },
      { title: "轻量化机身", detail: "降低家庭共处环境中的碰撞与接触风险。" },
      { title: "可升降操作结构", detail: "手臂可降低接近地面，也可伸展至较高的家庭操作区域。" },
    ],
    advantages: [
      "以真实家庭任务作为产品能力的起点，而不是先限定单一功能。",
      "通过人的操作示范建立技能数据，再将技能沉淀为可扩展能力。",
      "低重心、柔性外壳和易清洁设计直接回应家庭使用环境。",
    ],
    boundaries: [
      "目前处于 Beta 计划阶段，尚未开放普通零售购买。",
      "Sunday 仍在持续提升技能可靠性与不同家庭环境下的泛化能力。",
      "约 $20,000 为当前手工制造成本，不是对外零售价。",
    ],
    beaverQuestions: [
      "不同户型、台面高度和家电布局下，机器人需要怎样的可达范围与移动能力？",
      "多步骤家务中断后，机器人如何识别进度并恢复任务？",
      "与儿童、老人和宠物共处时，如何设计接触、避让与人工接管机制？",
    ],
    beaverValue: "家庭任务定义、技能学习闭环、本体与家庭安全设计",
    featured: true,
    priority: "重点研究",
    links: [
      { label: "官方产品页", url: "https://www.sunday.ai/" },
      { label: "官方技术页", url: "https://www.sunday.ai/technology" },
      { label: "官方 Beta 计划", url: "https://www.sunday.ai/beta-program" },
    ],
    sections: [
      { title: "01 / 产品定位", content: "Memo 将自己定义为面向忙碌家庭的 helpful home robot，核心价值是接手重复性家务，让家庭成员把时间留给更重要的事情。目标不是单一清洁设备，而是持续扩展技能的家庭机器人。", evidence: "官方公开" },
      { title: "02 / 用户与价值", content: "官网围绕家庭日常事务展开，优先展示餐后清理、餐具收纳、咖啡和衣物整理。其价值主张是减少重复劳动；具体家庭人群细分、购买意愿和任务优先级仍需通过 Beta 与用户研究验证。", evidence: "官方公开" },
      { title: "03 / 场景与任务", content: "已公开展示的任务包括收集餐具、处理食物残渣、装载并启动洗碗机、制作咖啡、折叠袜子等。任务分析应继续拆解物体识别、抓取、分类、移动、放置、状态确认与失败恢复。", evidence: "官方公开" },
      { title: "04 / 本体与空间", content: "官方称 Memo 采用稳定轮距、低重心和轻量化机身；机身外覆柔软硅胶，无尖锐边角，表面可用家用清洁产品擦拭。手臂可降低接近地面，也可伸展至约 7 英尺；日常休息高度约 4 英尺。具体底盘尺寸、转弯半径、最小通行宽度和完整关节参数尚未公开。", evidence: "官方公开" },
      { title: "05 / AI 与技能学习", content: "Skill Capture Glove 采集人的操作动作，由 Memory Developers 在自己的环境中记录技能数据，再用于训练 Memo。Sunday 将硬件、软件、数据、训练和模型评估作为一体化技术栈，并通过 Skill Library 持续扩展技能。", evidence: "官方公开" },
      { title: "06 / 交互方式", content: "官网公开资料强调机器人自主执行和技能持续学习，但尚未完整披露日常指令入口、任务确认、任务中断、多人权限、错误解释和人工接管的完整交互流程。Beta 计划将交互质量列为重点改进项。", evidence: "待验证" },
      { title: "07 / 安全与隐私", content: "Sunday 表示 Memo 不需要通过家庭内的人类远程操控来学习，而是使用 Skill Capture Glove 获取训练数据；并强调低重心、稳定轮距、轻量机身和柔软外壳。家庭摄像头权限、数据留存、宠物碰撞测试和长期维护标准仍需进一步核实。", evidence: "官方公开" },
      { title: "08 / 商业化阶段", content: "官网标注 Beta launching late 2026，明确表示 Beta 完成前不会开放普通购买。公司披露单台手工制造成本约 20,000 美元，但这不是零售价；规模化制造后的定价尚未公布。", evidence: "官方披露" },
      { title: "09 / 评价与 Beaver 研究问题", content: "值得研究：以真实家庭任务驱动产品定义；将人的操作数据转化为可扩展技能；把低重心、柔性外壳和易清洁纳入家庭产品设计。待验证：跨户型任务成功率、长任务失败恢复、宠物与老人共处安全、维护成本、隐私控制和实际交付体验。Beaver 可借鉴其研究方法，但不预设采用轮式双臂结构。", evidence: "研究判断" },
    ],
  },
  {
    id: "neo",
    name: "NEO",
    company: "1X Technologies",
    country: "🇺🇸 美国（挪威创立）",
    category: "home",
    form: "双足人形 · 柔性织物外观",
    positioning: "面向消费者家庭的通用家用机器人",
    stage: "已开放预订；首批交付计划于 2026 年启动",
    keyFact: "Redwood AI 自主能力 + Scheduled Expert Mode 远程专家辅助",
    image: "https://cdn.sanity.io/images/qka6yvsc/production/8353aa0348b725209afd88990b7d51ca050176e2-4096x2730.jpg",
    imageAlt: "1X NEO 家庭机器人产品展示",
    metrics: [
      { label: "身高", value: "5 ft 6 in" },
      { label: "重量", value: "66 lb" },
      { label: "手部自由度", value: "22 × 2" },
      { label: "手臂自由度", value: "7 × 2" },
      { label: "手臂负载", value: "18 lb" },
      { label: "预订方式", value: "$200 定金" },
    ],
    taskFlows: [
      { title: "家庭任务执行", context: "家庭日常", steps: ["语音或 App 创建任务", "设定任务清单与执行时间", "NEO 自主执行已掌握的家务"], outcome: "把重复家务转化为可安排的日常任务" },
      { title: "新任务学习", context: "尚未掌握的家务", steps: ["用户安排任务", "预约 1X Expert", "专家远程指导执行", "NEO 学习并积累新能力"], outcome: "以专家辅助补足当前自主能力" },
    ],
    architecture: [
      { title: "用户指令", detail: "通过自然语音或 NEO App 创建、安排和管理家务。" },
      { title: "Redwood AI", detail: "理解家庭任务并调用机器人已有的自主能力。" },
      { title: "自主执行", detail: "完成已掌握的移动、抓取与家务操作。" },
      { title: "Scheduled Expert Mode", detail: "复杂或未知任务可预约 1X Expert 远程指导。" },
    ],
    designFeatures: [
      { title: "柔性外覆", detail: "定制 3D lattice 聚合物包覆内部硬件，提供缓冲。" },
      { title: "Tendon Drive", detail: "腱绳驱动结构支持低能量、柔和的动作控制。" },
      { title: "关节防夹设计", detail: "关节外部覆盖，降低手指接触活动关节的风险。" },
      { title: "可清洗织物外套", detail: "软质织物与鞋套可拆卸清洗。" },
    ],
    advantages: [
      "将语音、移动 App、任务排程和机器人执行整合为完整家庭体验。",
      "柔性外覆与腱绳驱动从结构层面考虑家庭接触安全。",
      "通过预约专家辅助处理机器人暂时无法独立完成的任务。",
    ],
    boundaries: [
      "Early Access 提供基础自主能力，产品能力仍会随使用和迭代逐步扩展。",
      "未知家务可通过 Scheduled Expert Mode 获得远程专家指导。",
      "远程辅助、App 控制和 VR 遥操作需要明确权限与使用边界。",
    ],
    beaverQuestions: [
      "用户如何区分自主执行、专家辅助和远程操作状态？",
      "专家接入前，用户需要看到哪些提示并授予哪些权限？",
      "人形机器人在家庭中如何兼顾通过性、续航、收纳和维护？",
    ],
    beaverValue: "家庭交互、人工协助边界、隐私授权与消费者产品体验",
    priority: "重点对比",
    links: [
      { label: "官方产品页", url: "https://www.1x.tech/neo" },
      { label: "官方预订页", url: "https://www.1x.tech/order" },
      { label: "NEO 工厂进展", url: "https://www.1x.tech/discover/neo-factory" },
    ],
  },
  {
    id: "figure03",
    name: "Figure 03",
    company: "Figure AI",
    country: "🇺🇸 美国",
    category: "home",
    form: "双足人形 · 双臂操作",
    positioning: "通用人形机器人；开展家庭任务泛化研究",
    stage: "家庭任务研究与企业场景验证；非普通家庭零售产品",
    keyFact: "Helix 2.5 在 30 个未见过的家庭中测试整理客厅、叠毛巾和铺床",
    image: "https://images.ctfassets.net/qx5k8y1u9drj/6rREWE2DjWe7W3AFbZYSyH/21889f6a8f17464410b45c9ae12b718a/human-form-module-figure-3-image-v3.png?fm=webp&q=70&w=3840",
    imageAlt: "Figure 03 全尺寸人形机器人",
    metrics: [
      { label: "身高", value: "5 ft 8 in" },
      { label: "重量", value: "61 kg" },
      { label: "负载", value: "20 kg" },
      { label: "运行时间", value: "5 h" },
      { label: "最高速度", value: "1.2 m/s" },
      { label: "核心模型", value: "Helix" },
    ],
    taskFlows: [
      { title: "家庭整理", context: "陌生家庭环境", steps: ["感知房间与物体", "规划整理顺序", "移动并操作物品", "完成客厅与卧室整理"], outcome: "测试跨家庭环境的任务泛化" },
      { title: "衣物整理", context: "卧室 / 洗衣区", steps: ["识别衣物与床铺状态", "抓取并处理柔性物体", "完成叠毛巾或铺床"], outcome: "处理柔性物体与长程操作任务" },
    ],
    architecture: [
      { title: "多视角视觉感知", detail: "头部相机与手掌相机提供环境和近距离视觉反馈。" },
      { title: "触觉感知", detail: "指尖触觉传感器感知接触压力与抓取状态。" },
      { title: "Helix 系列模型", detail: "将视觉、触觉与身体状态转化为连续动作控制。" },
      { title: "全身协同执行", detail: "协调双足移动、身体平衡与双臂操作。" },
    ],
    designFeatures: [
      { title: "掌心相机", detail: "在手部遮挡头部视角时，补充近距离视觉反馈。" },
      { title: "指尖触觉传感器", detail: "可感知轻微接触压力，支持更精细的抓取控制。" },
      { title: "柔性外覆与缓冲材料", detail: "在身体易接触区域采用软质织物和多密度泡棉。" },
      { title: "无线感应充电", detail: "通过脚部充电线圈与充电底座实现自动补能。" },
    ],
    advantages: [
      "将移动、平衡与双臂操作纳入统一的全身控制。",
      "掌心视觉与指尖触觉增强遮挡环境下的精细操作。",
      "围绕家庭环境改进软质外覆、声音交互和无线充电。",
    ],
    boundaries: [
      "家庭任务泛化结果来自企业公开测试，仍需关注任务类型与测试条件。",
      "家庭研究与消费级家庭交付是不同阶段，实际交付状态需单独判断。",
      "复杂家庭任务的长期稳定性、维护与用户接管体验仍需观察。",
    ],
    beaverQuestions: [
      "在家庭狭窄通道中，双足移动与轮式移动各自的任务优势是什么？",
      "手部视觉和触觉如何提升透明、柔软、易碎物品的操作可靠性？",
      "移动与操作连续发生时，如何定义整段任务的成功率？",
    ],
    beaverValue: "陌生户型泛化、长任务规划、移动与操作协同",
    priority: "重点对比",
    links: [
      { label: "Figure 官方", url: "https://www.figure.ai/" },
      { label: "Helix 2.5 / 30 个家庭测试", url: "https://www.figure.ai/news/helix-2-5-zero-shot-30-home-generalization" },
    ],
  },
  {
    id: "cloid",
    name: "CLOiD",
    company: "LG Electronics",
    country: "🇰🇷 韩国",
    category: "home",
    form: "轮式底盘 · 双臂 · 可调节躯干",
    positioning: "围绕 Zero Labor Home 的家庭服务机器人",
    stage: "CES 2026 展示；规模销售与交付信息尚未明确",
    keyFact: "与 ThinQ 家电生态协同，展示厨房、洗衣与家务流程",
    image: "https://www.lg.com/content/dam/channel/wcms/global/newsroom/news/home-appliance-solution/lg-electronics-presents-lg-cloid-home-robot-to-demonstrate-zero-labor-home-at-ces-2026/LG%20CLOiD%20Image%201.jpg",
    imageAlt: "LG CLOiD 在洗衣区域整理衣物",
    metrics: [
      { label: "移动结构", value: "轮式底盘" },
      { label: "操作结构", value: "双臂 + 五指手部" },
      { label: "躯干", value: "可调节高度" },
      { label: "家庭生态", value: "LG ThinQ" },
      { label: "公开展示", value: "CES 2026" },
    ],
    taskFlows: [
      { title: "厨房场景", context: "家庭厨房", steps: ["理解家庭用餐需求", "协同智能家电", "辅助完成厨房事务"], outcome: "连接机器人与厨房设备" },
      { title: "洗衣场景", context: "洗衣房", steps: ["识别待处理衣物", "抓取并整理衣物", "协同洗衣设备完成流程"], outcome: "覆盖衣物管理任务" },
      { title: "客厅照护", context: "家庭客厅", steps: ["感知家庭成员状态", "提供健康监测信息", "辅助日常照护"], outcome: "将家庭服务延伸至生活照护" },
    ],
    architecture: [
      { title: "家庭需求", detail: "来自厨房、洗衣与客厅等真实家庭场景。" },
      { title: "ThinQ 家庭生态", detail: "连接 LG 智能家电与 AI Home Platform。" },
      { title: "CLOiD 任务执行", detail: "通过移动底盘、双臂和手部操作处理家务。" },
      { title: "设备协同", detail: "机器人与家电共同完成家庭事务流程。" },
    ],
    designFeatures: [
      { title: "轮式移动底盘", detail: "在家庭平面空间中移动并接近家电与家具。" },
      { title: "双臂操作", detail: "支持全臂动作与手指级操作。" },
      { title: "可调节躯干", detail: "调整操作高度以适应不同家庭设备。" },
      { title: "家电生态连接", detail: "与 LG ThinQ 家庭设备和服务协同。" },
    ],
    advantages: [
      "将机器人能力与家庭设备生态结合，而非孤立执行任务。",
      "围绕厨房、洗衣和客厅照护展示完整家庭场景。",
      "轮式底盘与可调节躯干适配平面家庭空间中的多高度操作。",
    ],
    boundaries: [
      "目前以 CES 场景展示为主，规模销售与家庭交付信息尚未明确。",
      "任务能力与 ThinQ 家电生态的具体兼容范围仍需进一步观察。",
      "楼梯、门槛和多层住宅的移动适应能力尚未明确。",
    ],
    beaverQuestions: [
      "机器人与智能家电之间，哪些任务应该由机器人执行，哪些由家电完成？",
      "家庭设备协议不统一时，如何保证任务编排的连续性？",
      "轮式底盘在不同房间地面、门槛和狭窄区域中的通过性如何设计？",
    ],
    beaverValue: "家庭设备生态、任务编排、家庭成员与宠物安全",
    priority: "重点对比",
    links: [
      { label: "LG 官方发布", url: "https://www.lg.com/global/newsroom/news/home-appliance-solution/lg-electronics-presents-lg-cloid-home-robot-to-demonstrate-zero-labor-home-at-ces-2026/" },
      { label: "CES 2026 产品介绍", url: "https://www.ces.tech/ces-innovation-awards/2026/lg-cloid/" },
    ],
  },
  {
    id: "optimus",
    name: "Optimus",
    company: "Tesla",
    country: "🇺🇸 美国",
    category: "humanoid",
    form: "双足人形 · 双臂灵巧操作",
    positioning: "面向制造与未来通用任务的通用机器人",
    stage: "Tesla 2026 Q3 披露 Fremont 进入早期量产爬坡",
    keyFact: "汽车制造能力与机器人本体、供应链和规模化制造结合",
    beaverValue: "本体可制造性、硬件成本、任务泛化与规模化服务",
    priority: "重点对比",
    links: [
      { label: "Tesla 2026 Q3 更新", url: "https://assets-ir.tesla.com/tesla-contents/IR/TSLA-Q3-2026-Update.pdf" },
      { label: "Tesla 投资者关系", url: "https://ir.tesla.com/" },
    ],
  },
  {
    id: "neura",
    name: "4NE1 Gen 4",
    company: "NEURA Robotics",
    country: "🇩🇪 德国",
    category: "humanoid",
    form: "双足人形；另有轮式配置",
    positioning: "面向工作与生活场景的认知型人形机器人",
    stage: "Gen 4 已在 NEURA Gym 训练；准备系列化生产",
    keyFact: "NEURON AI、多模态感知、触觉与力觉、可共享技能",
    beaverValue: "多模态感知、近人安全、跨形态产品平台",
    priority: "重点对比",
    links: [
      { label: "4NE1 官方产品页", url: "https://neura-robotics.com/products/4ne1/" },
      { label: "NEURA 官方网站", url: "https://neura-robotics.com/" },
    ],
  },
  {
    id: "unitree-g1",
    name: "G1",
    company: "Unitree 宇树科技",
    country: "🇨🇳 中国",
    category: "humanoid",
    form: "小型双足人形",
    positioning: "人形机器人研发、运动控制与具身智能平台",
    stage: "公开销售；基础版与 EDU 版本能力不同",
    keyFact: "约 1.32 m、约 35 kg；23–43 个关节电机（依配置）",
    image: "https://shop.unitree.com/cdn/shop/files/1_968fd08b-9aaf-4f32-b895-5c786285ee52.jpg?v=1717575256",
    imageAlt: "Unitree G1 官方产品图",
    beaverValue: "人形尺度、关节自由度、运动与操作能力的权衡",
    priority: "重点对比",
    links: [
      { label: "G1 官方产品页", url: "https://www.unitree.com/g1/" },
      { label: "Unitree 官方产品目录", url: "https://www.unitree.com/" },
    ],
  },
  {
    id: "agibot-a2",
    name: "A2 Ultra",
    company: "AGIBOT 智元机器人",
    country: "🇨🇳 中国",
    category: "humanoid",
    form: "全尺寸双足人形",
    positioning: "商业服务、展厅接待与交互任务",
    stage: "官方披露多场景商业部署；具体任务边界需按场景核验",
    keyFact: "约 1.69 m、约 69 kg；支持多模态交互与自主导航",
    image: "https://store.agibot.com/cdn/shop/files/1_d5122551-3eb0-4784-8c7e-01963aeb46ca.png?v=1766128167&width=1600",
    imageAlt: "智元 AGIBOT A2 Ultra 全尺寸人形机器人",

    beaverValue: "商业服务任务、人体尺度与人机互动",
    links: [
      { label: "A2 Ultra 官方产品页", url: "https://www.agibot.com/products/A2_Ultra" },
      { label: "AGIBOT 官方产品目录", url: "https://www.agibot.com/" },
    ],
  },
  {
    id: "agibot-x2",
    name: "X2",
    company: "AGIBOT 智元机器人",
    country: "🇨🇳 中国",
    category: "humanoid",
    form: "中小型双足人形",
    positioning: "互动、导览、演出与服务场景",
    stage: "产品已公开；不同版本传感器与开发能力有差异",
    keyFact: "约 1.31 m、约 35–39 kg；X2 Ultra 配置更完整的感知能力",
    beaverValue: "亲和外观、互动表达与轻量人形结构",
    links: [
      { label: "X2 官方产品页", url: "https://www.agibot.com/products/X2" },
      { label: "AGIBOT 官方产品目录", url: "https://www.agibot.com/" },
    ],
  },
  {
    id: "walker-s2",
    name: "Walker S2",
    company: "UBTECH 优必选",
    country: "🇨🇳 中国",
    category: "humanoid",
    form: "全尺寸双足人形",
    positioning: "工业制造与连续作业",
    stage: "官方披露进入量产交付阶段",
    keyFact: "自主换电、双臂协同换电、工业搬运与上下料",
    image: "https://mma.prnewswire.com/media/2824516/photo1.jpg",
    imageAlt: "优必选 Walker S2 产品图",
    beaverValue: "续航补能、维护流程、长时间运行与安全机制",
    links: [
      { label: "Walker S2 官方产品页", url: "https://www.ubtrobot.com/cn/humanoid/products/walker-s2" },
    ],
  },
  {
    id: "fourier-gr3",
    name: "GR-3",
    company: "Fourier 傅利叶",
    country: "🇨🇳 中国",
    category: "humanoid",
    form: "双足人形 · 柔性外覆材料",
    positioning: "Care-bot；陪伴、交互与服务",
    stage: "产品技术资料公开；规模化家庭交付未证实",
    keyFact: "视觉、听觉、触觉融合；强调亲和外观与情感交互",
    image: "https://mma.prnewswire.com/media/2856122/9f1e8b0a6de0ab741c0e1afc788ac1c6.jpg",
    imageAlt: "傅利叶 GR-3 产品图",
    beaverValue: "机器人亲和感、触觉反馈与不同人群的交互体验",
    links: [
      { label: "GR-3 官方技术文档", url: "https://support.fftai.com/en/gr3/getting-started/general-information" },
      { label: "Fourier 官方网站", url: "https://www.fftai.com/" },
    ],
  },
  {
    id: "leju-kuavo",
    name: "KUAVO 5 / 5-W",
    company: "Leju Robotics 乐聚",
    country: "🇨🇳 中国",
    category: "humanoid",
    form: "双足 / 轮臂双形态",
    positioning: "通用人形机器人及行业应用平台",
    stage: "产品系列公开；面向科研、商业服务与工业应用",
    keyFact: "提供双足与轮臂形态，覆盖研究、商业服务和制造场景",
    image: "https://kuavo.lejurobot.com/leju_website/images/17a22251b4267788bf254dd22c543175.jpg",
    imageAlt: "乐聚 KUAVO 5 官方产品图",
    beaverValue: "同一产品平台如何根据任务切换移动形态",
    links: [
      { label: "乐聚官方产品页", url: "https://www.lejurobot.com/zh" },
      { label: "Leju 英文官网", url: "https://www.lejurobot.com/" },
    ],
  },
  {
    id: "engineai-t800",
    name: "T800",
    company: "EngineAI 众擎机器人",
    country: "🇨🇳 中国",
    category: "humanoid",
    form: "全尺寸双足人形",
    positioning: "工业与商业应用的高性能人形平台",
    stage: "产品配置及开发文档公开；不同版本能力不同",
    keyFact: "约 1.73 m；基础版与 PRO 版关节、灵巧手配置不同",
    beaverValue: "高动态运动、负载、散热与家庭环境的适配差异",
    links: [
      { label: "T800 官方产品页", url: "https://en.engineai.com.cn/product-t800.html" },
      { label: "T800 开发文档", url: "https://en.engineai.com.cn/open/docs/t800/t800/about-t800" },
    ],
  },
  {
    id: "xpeng-iron",
    name: "IRON",
    company: "XPENG 小鹏",
    country: "🇨🇳 中国",
    category: "humanoid",
    form: "全尺寸双足人形",
    positioning: "Physical AI 通用人形机器人",
    stage: "官方披露机器人生产线投运；规模商业交付仍需观察",
    keyFact: "VLT + VLA + VLM 技术组合；仿生脊柱、柔性外覆与灵巧手",
    beaverValue: "身体结构、柔性材料、表达界面与整机智能协同",
    links: [
      { label: "IRON 官方技术页", url: "https://www.xpeng.com/technology/ai_robot_iron" },
      { label: "IRON 生产线进展", url: "https://www.xpeng.com/pressroom/news/01a080371029a057bc8e8a02a2c6012b" },
    ],
  },
  {
    id: "atlas",
    name: "Atlas",
    company: "Boston Dynamics",
    country: "🇺🇸 美国（现代汽车集团旗下）",
    category: "humanoid",
    form: "全尺寸电动双足人形",
    positioning: "企业级工业人形机器人",
    stage: "产品版本公开；首批客户试点与企业部署",
    keyFact: "56 自由度、约 1.9 m；面向物料搬运与工业流程",
    beaverValue: "全身运动、可靠性、可维护性和任务级安全",
    links: [
      { label: "Atlas 官方产品页", url: "https://bostondynamics.com/products/atlas" },
      { label: "Atlas 产品发布", url: "https://bostondynamics.com/blog/boston-dynamics-unveils-new-atlas-robot-to-revolutionize-industry/" },
    ],
  },
  {
    id: "digit5",
    name: "Digit 5",
    company: "Agility Robotics",
    country: "🇺🇸 美国",
    category: "humanoid",
    form: "双足人形；专用末端执行器",
    positioning: "仓储、制造与物流的通用作业机器人",
    stage: "商业部署基础上推出新一代；Digit 5 早期访问计划 2027",
    keyFact: "官方披露累计超过 65,000 小时真实运营数据；最高负载约 22.7 kg",
    beaverValue: "真实部署反馈、安全协作和运营维护体系",
    links: [
      { label: "Digit 5 官方产品页", url: "https://www.agilityrobotics.com/solutions/digit-5" },
      { label: "Digit 5 发布信息", url: "https://www.agilityrobotics.com/content/agility-unveils-digit-5-humanoid-robot-built-for-cooperatively-safe-work-at-scale" },
    ],
  },
  {
    id: "apollo2",
    name: "Apollo 2",
    company: "Apptronik",
    country: "🇺🇸 美国",
    category: "humanoid",
    form: "双足 / 轮式模块化人形平台",
    positioning: "面向真实工作环境的通用人形机器人",
    stage: "工业合作与试点；与 Google DeepMind 合作测试",
    keyFact: "模块化移动方案；与 Gemini Robotics 2.5 合作开展汽车零件分拣验证",
    beaverValue: "同一智能系统适配不同本体、任务与工作空间",
    links: [
      { label: "Apollo 2 官方产品页", url: "https://apptronik.com/apollo/apollo-2" },
      { label: "Apptronik 官方网站", url: "https://apptronik.com/" },
    ],
  },
  {
    id: "hmnd01",
    name: "HMND 01",
    company: "Humanoid",
    country: "🇬🇧 英国",
    category: "humanoid",
    form: "双足 / 轮式配置",
    positioning: "面向物流、零售和制造的通用作业机器人",
    stage: "Alpha 产品与早期访问；以客户场景部署为主",
    keyFact: "模块化上身、下身与末端执行器；支持自主或遥操作部署",
    beaverValue: "本体模块化、按任务配置和全生命周期成本",
    links: [
      { label: "HMND 01 官方产品页", url: "https://thehumanoid.ai/product/" },
      { label: "HMND 01 Alpha Bipedal", url: "https://thehumanoid.ai/hmnd-01-alpha-bipedal/" },
    ],
  },
  {
    id: "galbot-g1",
    name: "G1",
    company: "Galbot 银河通用",
    country: "🇨🇳 中国",
    category: "mobile",
    form: "全向轮式底盘 · 升降躯干 · 双臂",
    positioning: "面向产业任务的通用移动操作机器人",
    stage: "面向工业、零售、康养等场景提供产品",
    keyFact: "约 92.5 kg；双臂总负载约 10 kg；支持全向移动",
    beaverValue: "轮式底盘、升降结构、可达范围与空间通行要求",
    priority: "重点对比",
    links: [
      { label: "G1 官方产品页", url: "https://www.galbot.com/g1/" },
      { label: "G1 官方开发文档", url: "https://developer.galbot.com/docs/g1/2.2.4/en/g1/" },
    ],
  },
  {
    id: "galbot-s1",
    name: "S1",
    company: "Galbot 银河通用",
    country: "🇨🇳 中国",
    category: "mobile",
    form: "全向轮式底盘 · 升降立柱 · 双臂",
    positioning: "面向工业搬运、上下料与拣选的移动操作机器人",
    stage: "官方提供产品规格与开发资料",
    keyFact: "官方规格：单臂负载 15 kg、双臂合计 30 kg；底盘约 730 × 730 mm",
    beaverValue: "高负载操作与家庭尺度、地面承载和碰撞风险的差异",
    links: [
      { label: "S1 官方产品页", url: "https://galbot.com/s1/" },
      { label: "S1 开发文档", url: "https://developer.galbot.com/docs/s1/" },
    ],
  },
  {
    id: "stretch3",
    name: "Stretch 3",
    company: "Hello Robot",
    country: "🇺🇸 美国",
    category: "mobile",
    form: "轻量轮式底盘 · 单伸缩机械臂",
    positioning: "移动操作研究与开发平台",
    stage: "公开销售；面向研究和开发人员",
    keyFact: "约 24.5 kg；底盘约 33 × 34 cm；额定负载约 2 kg",
    beaverValue: "小型移动底盘、单臂操作、开放开发与成本约束",
    links: [
      { label: "Stretch 3 官方产品页", url: "https://hello-stretch3.com/stretch-3-product" },
    ],
  },
  {
    id: "tiago",
    name: "TIAGo",
    company: "PAL Robotics",
    country: "🇪🇸 西班牙",
    category: "mobile",
    form: "轮式移动底盘 · 单臂或双臂可配置",
    positioning: "科研、导航、操作与人机交互平台",
    stage: "成熟研究平台；可按需求配置",
    keyFact: "模块化底盘、机械臂、末端执行器和 ROS 开发生态",
    beaverValue: "模块化本体、移动操作研究与人机协作",
    links: [
      { label: "TIAGo 官方产品页", url: "https://pal-robotics.com/robot/tiago/" },
    ],
  },
  {
    id: "astro",
    name: "Astro",
    company: "Amazon",
    country: "🇺🇸 美国",
    category: "adjacent",
    form: "轮式移动底盘 · 屏幕与传感器",
    positioning: "家庭巡检、沟通与智能家居辅助",
    stage: "区域与渠道受限；并非通用物理操作机器人",
    keyFact: "自主导航、家庭地图、视觉 ID、远程查看与隐私开关",
    beaverValue: "家庭地图、禁入区域、摄像头提示和用户控制权",
    links: [
      { label: "Amazon 官方产品介绍", url: "https://www.aboutamazon.com/news/devices/meet-astro-a-home-robot-unlike-any-other" },
      { label: "Astro 隐私说明", url: "https://digprjsurvey.amazon.com/csad/help/node/G2HDFAZG923JG4W7" },
    ],
  },
  {
    id: "ballie",
    name: "Ballie",
    company: "Samsung",
    country: "🇰🇷 韩国",
    category: "adjacent",
    form: "球形轮式移动机器人 · 投影与智能家居连接",
    positioning: "家庭陪伴、环境交互与智能家居控制",
    stage: "多次公开展示；当前正式上市状态未获官方确认",
    keyFact: "强调空间感知、投影交互与 SmartThings 家庭生态",
    beaverValue: "低高度移动设备、家庭交互和产品上市风险",
    links: [
      { label: "Samsung 官方网站", url: "https://www.samsung.com/" },
      { label: "Ballie 上市状态报道", url: "https://9to5google.com/2026/02/13/samsung-ballie-vanishes-from-website/" },
    ],
  },
];

export const platforms: CompetitorRecord[] = [
  {
    id: "sunday-act",
    name: "ACT-2 / Skill Library",
    company: "Sunday Robotics",
    country: "🇺🇸 美国",
    category: "platform",
    form: "家庭机器人技能学习系统",
    positioning: "将人的操作示范转化为机器人可执行技能",
    stage: "官方持续发布研究与技能数据",
    keyFact: "Skill Capture Glove、Memory Developers、Skill Library",
    beaverValue: "从真实家庭动作采集到技能迭代的完整数据闭环",
    links: [
      { label: "Sunday Technology", url: "https://www.sunday.ai/technology" },
      { label: "ACT-2 技术预览", url: "https://www.sunday.ai/blog/act-2-preview" },
    ],
  },
  {
    id: "1x-redwood",
    name: "Redwood AI",
    company: "1X Technologies",
    country: "🇺🇸 美国（挪威创立）",
    category: "platform",
    form: "通用机器人模型",
    positioning: "支持 NEO 学习、理解并重复家庭任务",
    stage: "随 NEO 产品迭代",
    keyFact: "基础自主能力与 Scheduled Expert Mode 结合",
    beaverValue: "自主能力不足时，人工专家辅助如何被产品化和授权",
    links: [
      { label: "NEO 官方产品说明", url: "https://www.1x.tech/neo" },
      { label: "NEO 预订与 Expert Mode", url: "https://www.1x.tech/order" },
    ],
  },
  {
    id: "figure-helix",
    name: "Helix 2.5",
    company: "Figure AI",
    country: "🇺🇸 美国",
    category: "platform",
    form: "视觉-语言-动作与全身控制模型",
    positioning: "提升人形机器人在陌生环境中的全身任务泛化",
    stage: "官方发布研究结果；仍处于能力扩展阶段",
    keyFact: "官方报告在 30 个未见家庭测试三类长程任务",
    beaverValue: "跨户型泛化、全身协调、错误恢复和评估指标",
    links: [
      { label: "Helix 2.5 官方研究", url: "https://www.figure.ai/news/helix-2-5-zero-shot-30-home-generalization" },
    ],
  },
  {
    id: "gemini-robotics",
    name: "Gemini Robotics 2.5",
    company: "Google DeepMind",
    country: "🇬🇧 英国 / 🇺🇸 美国",
    category: "platform",
    form: "VLA + Embodied Reasoning",
    positioning: "面向多种机器人本体的感知、推理与动作模型",
    stage: "2026 年 11 月发布 2.5 版本",
    keyFact: "支持多步骤规划、精细操作与不同机器人形态",
    beaverValue: "通用模型与具体本体之间的适配、任务安全与本地推理",
    links: [
      { label: "Gemini Robotics 官方", url: "https://deepmind.google/models/gemini-robotics/" },
      { label: "Gemini Robotics 2.5 发布", url: "https://deepmind.google/blog/gemini-robotics-2-5-accelerates-real-world-physical-intelligence/" },
    ],
  },
  {
    id: "nvidia-gr00t",
    name: "Isaac GR00T",
    company: "NVIDIA",
    country: "🇺🇸 美国",
    category: "platform",
    form: "人形机器人基础模型与开发平台",
    positioning: "支持机器人训练、仿真、测试和部署",
    stage: "持续更新模型、数据管线与仿真工具",
    keyFact: "模型、合成数据、仿真框架、运行时与开发工具组成平台",
    beaverValue: "机器人产品开发链路、仿真验证与训练数据体系",
    links: [
      { label: "NVIDIA Isaac GR00T", url: "https://developer.nvidia.com/isaac/gr00t" },
    ],
  },
  {
    id: "physical-intelligence",
    name: "π0.5",
    company: "Physical Intelligence",
    country: "🇺🇸 美国",
    category: "platform",
    form: "通用 VLA 机器人策略模型",
    positioning: "让移动操作机器人在未见家庭中执行多步骤任务",
    stage: "研究模型与论文公开",
    keyFact: "论文报告约 400 小时移动操作家庭数据，并融合多源数据训练",
    beaverValue: "跨本体数据、家庭场景泛化与长程任务规划",
    links: [
      { label: "π0.5 官方论文 PDF", url: "https://www.pi.website/download/pi05.pdf" },
      { label: "Physical Intelligence", url: "https://www.pi.website/" },
    ],
  },
  {
    id: "x-square-wall",
    name: "WALL-B / WALL-OSS",
    company: "X Square Robot",
    country: "🇨🇳 中国",
    category: "platform",
    form: "具身智能基础模型",
    positioning: "跨任务、跨场景的通用操作与移动操作",
    stage: "模型研究、开源与真实机器人演示持续推进",
    keyFact: "WALL-B 融合世界模型路线；WALL-OSS 提供开源模型与训练代码",
    beaverValue: "世界模型、长程操作、双臂协调与技能迁移",
    links: [
      { label: "X Square 官方模型", url: "https://x2robot.com/en/models" },
      { label: "X Square 官方研究", url: "https://x2robot.com/en/research" },
    ],
  },
  {
    id: "xiaomi-robotics",
    name: "Xiaomi-Robotics-1",
    company: "Xiaomi Robotics",
    country: "🇨🇳 中国",
    category: "platform",
    form: "VLA 机器人基础模型",
    positioning: "利用大规模真实操作轨迹训练通用机器人策略",
    stage: "2026 年 7 月公开技术报告与模型资源",
    keyFact: "官方披露超过 100,000 小时真实操作轨迹预训练数据",
    beaverValue: "跨场景数据规模、家庭操作数据和模型泛化",
    links: [
      { label: "Xiaomi-Robotics-1 官方技术页", url: "https://robotics.xiaomi.com/xiaomi-robotics-1.html" },
      { label: "官方 GitHub", url: "https://github.com/XiaomiRobotics/Xiaomi-Robotics-1" },
    ],
  },
  {
    id: "skild-brain",
    name: "Skild Brain",
    company: "Skild AI",
    country: "🇺🇸 美国",
    category: "platform",
    form: "跨机器人形态的通用智能模型",
    positioning: "让不同结构的机器人共享通用智能能力",
    stage: "公司持续研发与合作部署",
    keyFact: "官方提出 omni-bodied intelligence，覆盖四足、人形、桌面和移动操作机器人",
    beaverValue: "智能模型与机器人本体解耦、跨形态迁移",
    links: [
      { label: "Skild AI 技术介绍", url: "https://skild.ai/blogs/building-the-general-purpose-robotic-brain" },
    ],
  },
];

export const focusIds = ["memo", "neo", "figure03", "cloid", "galbot-g1", "unitree-g1", "agibot-a2", "optimus"];

export const comparisonIds = ["memo", "neo", "figure03", "cloid", "optimus", "galbot-g1", "stretch3", "unitree-g1"];

export const marketSignals = [
  { value: "22,000+", label: "2026 H1 全球人形机器人出货量", note: "Counterpoint Research 统计" },
  { value: "~300%", label: "同比增长", note: "Counterpoint Research 统计" },
  { value: ">60%", label: "娱乐演示与数据/研究用途占比", note: "仍需区分出货与生产性应用" },
  { value: "86%", label: "前五家厂商出货占比", note: "AGIBOT、Unitree、Galbot、UBTECH、Leju" },
];

export const marketSource = {
  label: "Counterpoint Research · H1 2026",
  url: "https://counterpointresearch.com/en/insights/global-humanoid-robot-shipments-soar-nearly-300-percent-yoy-in-h1-2026",
};

export const researchInsights = [
  {
    title: "家庭场景还没有被充分验证",
    detail: "家庭任务演示、实验室测试、陌生家庭测试和长期消费者交付，是不同成熟度层级。",
    question: "不同户型、家庭成员和宠物条件下，任务成功率与人工介入率如何变化？",
  },
  {
    title: "本体形态取决于任务与空间",
    detail: "双足强调人类环境通行；轮式底盘通常更稳定、结构更简单，但受楼梯、门槛和地面条件限制。",
    question: "哪些任务确实需要双足，哪些任务用轮式移动操作更合适？",
  },
  {
    title: "智能能力离不开数据闭环",
    detail: "Sunday、Figure、X Square、Xiaomi 等路线都在探索人类示范、机器人数据、模型训练与任务迭代。",
    question: "家庭数据如何采集、标注、授权，并转化为可复用的机器人技能？",
  },
  {
    title: "长程任务的可靠性比单次演示更重要",
    detail: "真实家务包含多个连续步骤、柔性物体、遮挡、物品变化和失败恢复。",
    question: "如何定义任务成功率、恢复率、人工接管率和长期稳定性？",
  },
  {
    title: "家庭安全与隐私是产品能力的一部分",
    detail: "机器人可能持续移动、感知、记录并接触家庭成员和私人空间。",
    question: "如何设计权限、禁入区、可见状态、物理急停和多成员控制？",
  },
];

export const methodologyNotes = [
  "国家按企业总部或主要运营所在地标注；跨国公司、创立地与母公司关系在条目中单独说明。",
  "“产品已发布”不等于“已规模交付”；演示、试点、Beta、预订和正式销售分别标注。",
  "官方能力、官方实验数据和 Beaver 的研究判断分开呈现；没有公开数据的项目不自行补数。",
  "本页为公开资料下的代表性行业地图，不宣称穷尽全球全部企业；后续持续补充新公司与新产品。",
];
