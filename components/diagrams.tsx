export function HomeMap() {
  return <svg className="home-map" viewBox="0 0 760 470" role="img" aria-label="家庭空间概念分区图">
    <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#dfe4dc" strokeWidth="1" /></pattern></defs>
    <rect x="12" y="12" width="736" height="446" rx="18" fill="#f6f7f1" /><rect x="12" y="12" width="736" height="446" rx="18" fill="url(#grid)" />
    <rect x="70" y="56" width="620" height="352" rx="5" fill="#fff" stroke="#526b61" strokeWidth="5" /><path d="M70 210H330M330 56V408M500 56V210M500 210H690M500 210V408" fill="none" stroke="#526b61" strokeWidth="5" />
    <rect x="90" y="76" width="200" height="112" rx="8" fill="#e7eee8" /><text x="190" y="123" textAnchor="middle" className="map-label">客厅 / 社交区</text><text x="190" y="145" textAnchor="middle" className="map-sub">日常活动 · 朋友聚会</text>
    <rect x="350" y="76" width="130" height="112" rx="8" fill="#f2eee3" /><text x="415" y="123" textAnchor="middle" className="map-label">餐厨区</text><text x="415" y="145" textAnchor="middle" className="map-sub">准备 · 用餐</text>
    <rect x="520" y="76" width="150" height="112" rx="8" fill="#e9edf1" /><text x="595" y="123" textAnchor="middle" className="map-label">弹性房间</text><text x="595" y="145" textAnchor="middle" className="map-sub">老人短住 · 临时使用</text>
    <rect x="90" y="232" width="200" height="152" rx="8" fill="#f1eae5" /><text x="190" y="295" textAnchor="middle" className="map-label">宠物活动区</text><text x="190" y="317" textAnchor="middle" className="map-sub">休息 · 饮水 · 自由活动</text>
    <rect x="350" y="232" width="130" height="152" rx="8" fill="#e9edf1" /><text x="415" y="295" textAnchor="middle" className="map-label">卧室</text><text x="415" y="317" textAnchor="middle" className="map-sub">私密空间</text>
    <rect x="520" y="232" width="150" height="152" rx="8" fill="#e7eee8" /><text x="595" y="295" textAnchor="middle" className="map-label">玄关 / 收纳</text><text x="595" y="317" textAnchor="middle" className="map-sub">出入 · 物品暂存</text>
    <path d="M44 232H70M44 232l9 -6m-9 6l9 6" stroke="#48675d" strokeWidth="2" fill="none" /><text x="42" y="214" className="map-sub">入户</text>
    <path d="M190 194V224H415V220M415 220H595V194" fill="none" stroke="#9b795e" strokeWidth="3" strokeDasharray="7 6" /><circle cx="190" cy="194" r="5" fill="#9b795e" /><circle cx="415" cy="220" r="5" fill="#9b795e" /><circle cx="595" cy="194" r="5" fill="#9b795e" />
    <text x="380" y="438" textAnchor="middle" className="map-sub">概念分区示意 · 非比例图 · 需结合真实住宅调研修订</text>
  </svg>;
}
export function ResearchFlow() {
  const nodes = [["人的生活","目标 / 习惯 / 情绪"],["家庭空间","动线 / 家具 / 边界"],["真实任务","频率 / 成本 / 风险"],["产品机会","价值 / 优先级 / 可行性"],["方案验证","原型 / 测试 / 迭代"]];
  return <div className="research-flow">{nodes.map((node,index)=><div className="flow-step" key={node[0]}><span className="flow-no">0{index+1}</span><strong>{node[0]}</strong><small>{node[1]}</small>{index<nodes.length-1?<span className="flow-arrow">→</span>:null}</div>)}</div>;
}
export function CapabilityMap() {
  const rows = [["感知","理解家庭环境、物体、人员与状态","数据边界 / 误识别 / 环境变化"],["空间能力","定位、移动、避障与路径规划","狭窄通道 / 地面差异 / 动态障碍"],["操作能力","与物品、家具或设备发生物理交互","接触安全 / 力控制 / 失败恢复"],["认知与规划","理解意图、拆解任务并判断下一步","不确定性 / 任务边界 / 人工确认"],["交互与信任","让用户理解、授权、打断和接管","隐私 / 可解释 / 主动程度"]];
  return <div className="capability-map">{rows.map((row,index)=><div className="capability-row" key={row[0]}><span className="capability-index">0{index+1}</span><strong>{row[0]}</strong><p>{row[1]}</p><small>{row[2]}</small></div>)}</div>;
}
export function ValidationLoop() {
  const nodes = [["定义任务","明确用户目标与边界"],["建立基线","记录当前流程与问题"],["构建原型","只验证关键假设"],["测试观察","记录成功、失败与异常"],["复盘迭代","更新需求与技术判断"]];
  return <div className="validation-loop">{nodes.map((node,index)=><div className={"loop-node " + (index===0?"primary":"")} key={node[0]}><span>0{index+1}</span><strong>{node[0]}</strong><small>{node[1]}</small></div>)}<div className="loop-return">↺ 证据驱动下一轮</div></div>;
}
