// Script to seed Supabase database using REST API
const SUPABASE_URL = 'https://ydrnelssejbwsopfsumh.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkcm5lbHNzZWpid3NvcGZzdW1oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjU3NDg2MSwiZXhwIjoyMDgyMTUwODYxfQ.hCw327qVqhzqx_JYfn8he-whs82WQ0a1_wZ4maKCJjk';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SERVICE_ROLE_KEY,
  'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
  'Prefer': 'return=minimal'
};

async function upsert(table, data, onConflict = null) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const options = {
    method: 'POST',
    headers: {
      ...headers,
      'Prefer': onConflict ? `resolution=merge-duplicates,return=minimal` : 'return=minimal'
    },
    body: JSON.stringify(Array.isArray(data) ? data : [data])
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${table}: ${response.status} - ${text}`);
  }
  return true;
}

async function deleteAll(table) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?id=neq.00000000-0000-0000-0000-000000000000`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers
  });
  return response.ok;
}

async function checkTable(table) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?limit=1`;
  const response = await fetch(url, { headers });
  return response.ok;
}

async function main() {
  console.log('🚀 Starting Database Seed...\n');

  // Check if tables exist
  console.log('📋 Checking tables...');
  const tables = ['personal_info', 'navigation', 'headers', 'skills', 'experience',
                  'education', 'projects', 'thoughts', 'activities', 'socials',
                  'consultation', 'personal_traits', 'recommendations'];

  const missingTables = [];
  for (const table of tables) {
    const exists = await checkTable(table);
    if (!exists) {
      missingTables.push(table);
    } else {
      console.log(`  ✅ ${table}`);
    }
  }

  if (missingTables.length > 0) {
    console.log('\n❌ Missing tables:', missingTables.join(', '));
    console.log('\n⚠️  Please run supabase/migration.sql in Supabase Dashboard SQL Editor first!');
    console.log('URL: https://supabase.com/dashboard/project/ydrnelssejbwsopfsumh/sql/new\n');
    process.exit(1);
  }

  console.log('\n🗑️  Clearing existing data...');
  for (const table of tables) {
    await deleteAll(table);
    console.log(`  Cleared ${table}`);
  }

  console.log('\n📝 Inserting data...\n');

  // Personal Info
  console.log('1. Personal Info...');
  await upsert('personal_info', [
    {
      lang: 'en',
      name: 'Frank Chen',
      tagline: 'Cross-Functional Strategic Operations Expert & AI Engineer',
      email: 'fchen2020@163.com',
      github: 'https://github.com/frankfika',
      mobile: '13916784060',
      location: 'China',
      summary: 'Cross-Functional Strategic Operations Expert with 6+ years of experience in AI strategy and management, investment, and business operations. Excel at driving cross-departmental collaboration and strategic execution in complex organizations. Possess a Finance + Engineering + Operations composite background.',
      availability: 'Open to opportunities',
      contact_btn: 'Contact Me',
      resume_btn: 'Resume',
      years_exp: '6+',
      money_managed: '100M+',
      years_label: 'Years Experience',
      money_label: 'RMB Managed'
    },
    {
      lang: 'zh',
      name: 'Frank Chen',
      tagline: '战略运营专家 & AI工程师',
      email: 'fchen2020@163.com',
      github: 'https://github.com/frankfika',
      mobile: '13916784060',
      location: '中国',
      summary: '拥有6年以上AI战略管理、投资及业务运营经验的跨职能战略专家。擅长在复杂组织中推动跨部门协作与战略落地。具备"金融+工程+运营"复合背景，深度理解AI/Web3技术，能够将技术洞察转化为商业价值。',
      availability: '寻求新机会',
      contact_btn: '联系我',
      resume_btn: '简历',
      years_exp: '6年+',
      money_managed: '1亿+',
      years_label: '工作经验',
      money_label: '管理资金规模 (RMB)'
    }
  ]);
  console.log('  ✅ Done');

  // Navigation
  console.log('2. Navigation...');
  await upsert('navigation', [
    { lang: 'en', home: 'Home', profile: 'About Me', vibe: 'Vibe Coding', activities: 'Activities', thoughts: 'Thoughts', consultation: 'Consultation' },
    { lang: 'zh', home: '首页', profile: '个人介绍', vibe: '灵感编程', activities: '活动足迹', thoughts: '思考笔记', consultation: '付费咨询' }
  ]);
  console.log('  ✅ Done');

  // Headers
  console.log('3. Headers...');
  await upsert('headers', [
    { lang: 'en', experience: 'Professional Experience', education: 'Education', skills: 'Core Competencies', highlights: 'Highlights', socials: 'Social & Influence' },
    { lang: 'zh', experience: '工作经历', education: '教育背景', skills: '核心能力', highlights: '亮点数据', socials: '社会影响力与链接' }
  ]);
  console.log('  ✅ Done');

  // Skills
  console.log('4. Skills...');
  await upsert('skills', [
    { lang: 'en', subject: 'AI/Tech', score: 95, full_mark: 100, display_order: 0 },
    { lang: 'en', subject: 'Strategy', score: 90, full_mark: 100, display_order: 1 },
    { lang: 'en', subject: 'Investment', score: 85, full_mark: 100, display_order: 2 },
    { lang: 'en', subject: 'Ops/Mgmt', score: 92, full_mark: 100, display_order: 3 },
    { lang: 'en', subject: 'Web3', score: 80, full_mark: 100, display_order: 4 },
    { lang: 'en', subject: 'Bilingual', score: 100, full_mark: 100, display_order: 5 },
    { lang: 'zh', subject: 'AI/技术', score: 95, full_mark: 100, display_order: 0 },
    { lang: 'zh', subject: '战略规划', score: 90, full_mark: 100, display_order: 1 },
    { lang: 'zh', subject: '投资管理', score: 85, full_mark: 100, display_order: 2 },
    { lang: 'zh', subject: '运营管理', score: 92, full_mark: 100, display_order: 3 },
    { lang: 'zh', subject: 'Web3', score: 80, full_mark: 100, display_order: 4 },
    { lang: 'zh', subject: '双语能力', score: 100, full_mark: 100, display_order: 5 }
  ]);
  console.log('  ✅ Done');

  // Experience
  console.log('5. Experience...');
  await upsert('experience', [
    { lang: 'en', role: 'Assistant to Chairman', company: 'OpenCSG (Beijing Kaifang Chuanshen Technology)', period: '2025.06 - Present', description: 'Lenovo angel-round investment, valued at nearly RMB 1B. AgenticOps integrated platform.', achievements: ["Led cross-functional projects coordinating sales, HR, branding, and R&D.", "Spearheaded government-enterprise cooperation with Hong Kong Cyberport and CAICT.", "Established local partnership networks in Singapore and Hong Kong; interfaced with Web3 partners.", "Designed 50+ hour AI curriculum and managed a 2,000-member AI community."], display_order: 0 },
    { lang: 'en', role: 'Board Secretary & Strategic Director', company: 'Jiangsu Fantai Technology Co., Ltd.', period: '2022.08 - 2025.06', description: 'AI (Computer Vision) Unicorn Enterprise.', achievements: ["Led mid-to-long-term strategic formulation using AI for market analysis.", "Spearheaded full IPO preparation process and investor relations.", "Led external PR strategy, securing features in authoritative media like 36kr.", "Stepped up as Project Leader to deliver a million-user Web3 project."], display_order: 1 },
    { lang: 'en', role: 'Investment Director', company: 'Paradise Silicon Valley Asset Management', period: '2020.04 - 2022.08', description: "Zhejiang's largest private equity firm.", achievements: ["Led 6 AI/software projects (RMB 100M+ scale) through full investment cycle.", "Completed exit cases including star projects like GitLab JiHu.", "Organized 200+ attendee AI investment conference at zero cost.", "Applied AI algorithms for risk assessment and return forecasting."], display_order: 2 },
    { lang: 'en', role: 'COO & Domestic Lead', company: 'Jiangsu Global Buyer Co., Ltd.', period: '2017.07 - 2018.08', description: 'Tencent-incubated cross-border e-commerce project.', achievements: ["Managed R&D team and coordinated product/ops for rapid iteration.", "Optimized AI recommendation algorithms enhancing conversion rates.", "Achieved maximum brand communication at minimal cost."], display_order: 3 },
    { lang: 'en', role: 'Full-Stack Engineer & CTO Assistant', company: 'Shanghai Yibu Network Technology', period: '2015.11 - 2017.01', description: "Shanghai Airport's bus booking Robotaxi project.", achievements: ["Developed city-level AI route recommendation system.", "Completed 3-month development task in 1 month solo.", "Received company's only employee commendation for execution efficiency."], display_order: 4 },
    { lang: 'zh', role: '董事长助理', company: '开放传神 (OpenCSG)', period: '2025.06 - 至今', description: '联想天使轮投资，估值近10亿，AgenticOps集成平台。', achievements: ["统筹销售、HR、品牌及研发团队的跨职能项目。", "主导与香港数码港及信通院的百万级政企合作项目。", "开拓新加坡及香港市场，建立本地合作网络；对接Huobi、ICP等Web3伙伴。", "独立设计50+小时AI课程，管理2000+成员AI社区。"], display_order: 0 },
    { lang: 'zh', role: '董秘 & 战略总监', company: '江苏凡泰科技', period: '2022.08 - 2025.06', description: 'AI（计算机视觉）独角兽企业。', achievements: ["主导公司中长期战略制定，利用AI技术进行市场分析。", "牵头IPO全流程准备，统筹券商、会计师、律师及投资人关系。", "负责外部PR战略，成功在36kr等权威媒体进行品牌曝光。", "在关键时刻担任项目负责人，成功交付百万用户级Web3项目。"], display_order: 1 },
    { lang: 'zh', role: '投资总监', company: '天堂硅谷资产管理集团', period: '2020.04 - 2022.08', description: '浙江省最大的私募股权公司，国内Top 10。', achievements: ["主导6个AI/软件项目（规模超1亿）的全周期投资管理。", "成功完成包括GitLab极狐在内的多个明星项目退出。", "零成本组织并执行200+人规模的AI投资峰会。", "应用AI算法进行投资项目风险评估和回报预测。"], display_order: 2 },
    { lang: 'zh', role: 'COO & 国内负责人', company: '江苏环球买手', period: '2017.07 - 2018.08', description: '腾讯孵化的跨境电商项目。', achievements: ["管理研发团队，协调产品/运营部门实现快速迭代。", "优化AI推荐算法，显著提升转化率。", "通过跨界合作策略，以极低成本实现最大化品牌传播（10万+曝光）。"], display_order: 3 },
    { lang: 'zh', role: '全栈工程师 & CTO助理', company: '上海一步网络科技', period: '2015.11 - 2017.01', description: '上海机场巴士订票及Robotaxi项目。', achievements: ["开发城市级AI路线推荐系统，负责后端架构。", "单人1个月完成原定3个月的开发任务。", "因卓越的执行效率获得公司唯一的员工表彰。"], display_order: 4 }
  ]);
  console.log('  ✅ Done');

  // Education
  console.log('6. Education...');
  await upsert('education', [
    { lang: 'en', school: 'Stockholm School of Economics', degree: 'M.Sc. in Business and Management', period: '2018 - 2020', details: ["Sweden's No.1 Business School", "Co-founded 'Nordic Institute' media platform"], display_order: 0 },
    { lang: 'en', school: 'Indian Institute of Management Ahmedabad', degree: 'Exchange Student', period: '2019 - 2020', details: ["India's No.1 Business School", "Assisted medical supply procurement during 2020 pandemic"], display_order: 1 },
    { lang: 'en', school: 'RMIT University', degree: 'Bachelor of Information Technology', period: '2012 - 2015', details: ["Founding member of startup Tripalocal", "Investment from Telstra"], display_order: 2 },
    { lang: 'zh', school: '斯德哥尔摩经济学院', degree: '商业与管理硕士', period: '2018 - 2020', details: ["瑞典排名第一商学院", "联合创始人：北欧最大的华人自媒体平台「北欧模式」"], display_order: 0 },
    { lang: 'zh', school: '印度管理学院 (IIMA)', degree: '交换生', period: '2019 - 2020', details: ["印度排名第一商学院", "疫情期间协助政府采购医疗物资"], display_order: 1 },
    { lang: 'zh', school: '墨尔本皇家理工大学', degree: '信息技术学士', period: '2012 - 2015', details: ["Tripalocal创始成员", "获得Telstra投资"], display_order: 2 }
  ]);
  console.log('  ✅ Done');

  // Projects
  console.log('7. Projects...');
  await upsert('projects', [
    { lang: 'en', title: 'Nordic Institute', category: 'Media', description: 'Co-founded renowned Nordic public account becoming a major information platform for the Nordic Chinese community.', tech_stack: ["Content Strategy", "WeChat Eco", "Branding"], stats: '10K+ Followers', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop', link: 'https://mp.weixin.qq.com/s/nordic-institute', display_order: 0 },
    { lang: 'en', title: 'AI Risk Assessment', category: 'FinTech', description: 'Applied AI algorithms for investment project risk assessment and return forecasting to improve decision efficiency.', tech_stack: ["Python", "Scikit-learn", "Financial Modeling"], stats: 'RMB 100M+ Managed', image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=800&auto=format&fit=crop', link: 'https://github.com/frankfika/ai-risk-assessment', display_order: 1 },
    { lang: 'en', title: 'City Route AI', category: 'Engineering', description: 'City-level AI route recommendation system for Robotaxi/Bus booking services.', tech_stack: ["Node.js", "React", "Graph Algorithms"], stats: '3x Dev Efficiency', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop', link: 'https://github.com/frankfika/city-route-ai', display_order: 2 },
    { lang: 'en', title: 'Web3 Operations', category: 'Blockchain', description: 'Leading technical and cross-departmental teams to deliver million-user Web3 project.', tech_stack: ["Solidity", "Community Mgmt", "Tokenomics"], stats: '1M+ Users', image: 'https://images.unsplash.com/photo-1621504450168-38f6854b13eb?q=80&w=800&auto=format&fit=crop', link: 'https://www.htxdao.com', display_order: 3 },
    { lang: 'zh', title: '北欧模式 (Nordic Institute)', category: '媒体与传播', description: '联合创办北欧知名公众号，成为北欧华人社区的主要信息平台。', tech_stack: ["内容战略", "微信生态", "品牌建设"], stats: '1万+ 关注者', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop', link: 'https://mp.weixin.qq.com/s/nordic-institute', display_order: 0 },
    { lang: 'zh', title: 'AI 风险评估模型', category: '金融科技', description: '应用AI算法对投资项目进行风险评估和回报预测，提高决策效率。', tech_stack: ["Python", "Scikit-learn", "金融建模"], stats: '管理 1亿+ 资金', image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=800&auto=format&fit=crop', link: 'https://github.com/frankfika/ai-risk-assessment', display_order: 1 },
    { lang: 'zh', title: '城市路线AI推荐', category: '工程开发', description: '用于Robotaxi/巴士预订服务的城市级AI路线推荐系统。', tech_stack: ["Node.js", "React", "图算法"], stats: '3倍 开发效率', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop', link: 'https://github.com/frankfika/city-route-ai', display_order: 2 },
    { lang: 'zh', title: 'Web3 运营交付', category: '区块链', description: '带领技术和跨部门团队成功交付百万用户级Web3项目。', tech_stack: ["Solidity", "社群管理", "通证经济"], stats: '100万+ 用户', image: 'https://images.unsplash.com/photo-1621504450168-38f6854b13eb?q=80&w=800&auto=format&fit=crop', link: 'https://www.htxdao.com', display_order: 3 }
  ]);
  console.log('  ✅ Done');

  // Thoughts
  console.log('8. Thoughts...');
  await upsert('thoughts', [
    { lang: 'en', title: 'The Convergence of AI and Investment Ops', date: '2024-10-15', tags: ["AI Strategy", "Finance"], snippet: 'How machine learning models are reshaping due diligence processes in private equity...', content: 'The landscape of private equity is undergoing a seismic shift. Traditionally, due diligence was a manual, labor-intensive process involving endless spreadsheets and expert interviews. Today, Agentic Workflows and LLMs can analyze market sentiment, predict churn from user reviews, and even audit codebases in minutes.', link: 'https://36kr.com/', read_time: '5 min read', display_order: 0 },
    { lang: 'en', title: 'Managing Cross-Cultural Tech Teams', date: '2024-08-22', tags: ["Management", "Culture"], snippet: 'Lessons learned from Stockholm to Shanghai: Bridging the gap between engineering and business units.', content: 'Having led teams in Sweden, India, and China, I\'ve observed that the "Tech" language is universal, but the "Business" language is highly dialectal.', link: 'https://36kr.com/', read_time: '8 min read', display_order: 1 },
    { lang: 'en', title: 'Zero Cost Marketing: The 36kr Strategy', date: '2024-05-10', tags: ["Growth Hacking", "PR"], snippet: 'Leveraging personal influence and authoritative media to gain traction without ad spend.', content: 'When we launched our Web3 project, we had zero marketing budget. Instead of buying ads, we focused on "Narrative Fit".', link: 'https://36kr.com/', read_time: '4 min read', display_order: 2 },
    { lang: 'en', title: 'Investment Methodology | How do investors really view projects?', date: '2023-06-15', tags: ["Investment", "Methodology"], snippet: 'A detailed mind map breaking down how investors evaluate startup projects from multiple dimensions.', content: null, link: 'https://mp.weixin.qq.com/s/yRAphxCu4rFsLEjehJyK6A', read_time: '10 min read', display_order: 3 },
    { lang: 'en', title: 'Dirty Jobs and Hard Tech', date: '2023-05-20', tags: ["Tech", "Industry"], snippet: 'Why the most valuable tech companies often do the dirty work that others avoid.', content: null, link: 'https://mp.weixin.qq.com/s/rQMjdqCqWFlGETH0G-0x5A', read_time: '8 min read', display_order: 4 },
    { lang: 'en', title: 'A Debate on the Rise of India', date: '2023-04-10', tags: ["India", "Geopolitics"], snippet: 'My thoughts on India\'s economic trajectory and what it means for global tech.', content: null, link: 'https://mp.weixin.qq.com/s/i5Zf7s-oDMpXantd5nFjKg', read_time: '12 min read', display_order: 5 },
    { lang: 'en', title: 'AI Companies in China: High-Tech Construction Crew', date: '2023-08-15', tags: ["AI", "China"], snippet: 'An analysis of China\'s AI industry - the reality behind the hype.', content: null, link: 'https://mp.weixin.qq.com/s/cKCRcZrn9v_R5TKP0fodZA', read_time: '15 min read', display_order: 6 },
    { lang: 'en', title: 'From L0 to L3: Understanding Generative AI Technology Layers', date: '2023-09-20', tags: ["AI", "Technology"], snippet: 'A liberal arts student\'s interpretation of the four-layer technology system of Generative AI.', content: null, link: 'https://mp.weixin.qq.com/s/6-oj-8v9TYi8ZphUgDWjqA', read_time: '20 min read', display_order: 7 },
    { lang: 'en', title: 'Build a Personal Website + AI Assistant in One Day', date: '2024-01-10', tags: ["AI", "Tutorial"], snippet: 'How I built this personal website with an integrated AI chatbot without writing much code.', content: null, link: 'https://mp.weixin.qq.com/s/u_B6-22Tl9ZVFMepkv0cXg', read_time: '8 min read', display_order: 8 },
    { lang: 'zh', title: 'AI与投资运营的融合', date: '2024-10-15', tags: ["AI战略", "金融"], snippet: '机器学习模型如何重塑私募股权的尽职调查流程...', content: '私募股权投资的版图正在发生巨变。传统上，尽职调查是一个依赖人工、劳动密集型的过程，涉及无数的电子表格和专家访谈。如今，Agentic Workflows和大语言模型可以在几分钟内分析市场情绪、根据用户评论预测流失率，甚至审计代码库。', link: 'https://36kr.com/', read_time: '5分钟阅读', display_order: 0 },
    { lang: 'zh', title: '跨文化技术团队管理', date: '2024-08-22', tags: ["管理", "文化"], snippet: '从斯德哥尔摩到上海：弥合工程与业务部门之间的鸿沟。', content: '曾在瑞典、印度和中国领导团队，我观察到"技术"语言是通用的，但"商业"语言却有很强的地方口音。', link: 'https://36kr.com/', read_time: '8分钟阅读', display_order: 1 },
    { lang: 'zh', title: '零成本营销：36kr攻略', date: '2024-05-10', tags: ["增长黑客", "公关"], snippet: '如何利用个人影响力和权威媒体在不投放广告的情况下获得关注。', content: '当我们启动Web3项目时，营销预算为零。我们没有购买广告，而是专注于"叙事契合度"。', link: 'https://36kr.com/', read_time: '4分钟阅读', display_order: 2 },
    { lang: 'zh', title: '投资方法论 | 投资人究竟是怎么看项目的？', date: '2023-06-15', tags: ["投资", "方法论"], snippet: '一张详细的脑图，从多个维度解析投资人如何评估创业项目。', content: null, link: 'https://mp.weixin.qq.com/s/yRAphxCu4rFsLEjehJyK6A', read_time: '10分钟阅读', display_order: 3 },
    { lang: 'zh', title: '"脏活累活"与硬科技', date: '2023-05-20', tags: ["科技", "行业"], snippet: '为什么最有价值的科技公司往往在做别人不愿意做的脏活累活。', content: null, link: 'https://mp.weixin.qq.com/s/rQMjdqCqWFlGETH0G-0x5A', read_time: '8分钟阅读', display_order: 4 },
    { lang: 'zh', title: '胡说八道｜记一场关于"印度崛起"的小辩论', date: '2023-04-10', tags: ["印度", "地缘政治"], snippet: '我对印度经济发展轨迹的思考，以及它对全球科技的意义。', content: null, link: 'https://mp.weixin.qq.com/s/i5Zf7s-oDMpXantd5nFjKg', read_time: '12分钟阅读', display_order: 5 },
    { lang: 'zh', title: '中国的AI企业现状：聚光灯下的「高科技施工队」', date: '2023-08-15', tags: ["AI", "中国"], snippet: '对中国AI行业的深度分析——繁华背后的真实现状。', content: null, link: 'https://mp.weixin.qq.com/s/cKCRcZrn9v_R5TKP0fodZA', read_time: '15分钟阅读', display_order: 6 },
    { lang: 'zh', title: '从L0到L3：文科生对「生成式AI」四层技术体系的解读', date: '2023-09-20', tags: ["AI", "技术"], snippet: '一个文科生视角下的生成式AI四层技术体系解读。', content: null, link: 'https://mp.weixin.qq.com/s/6-oj-8v9TYi8ZphUgDWjqA', read_time: '20分钟阅读', display_order: 7 },
    { lang: 'zh', title: '就不写代码 | 花一天时间打造一个[个人网站]+[大模型助手]', date: '2024-01-10', tags: ["AI", "教程"], snippet: '如何在不写太多代码的情况下搭建一个带AI聊天助手的个人网站。', content: null, link: 'https://mp.weixin.qq.com/s/u_B6-22Tl9ZVFMepkv0cXg', read_time: '8分钟阅读', display_order: 8 }
  ]);
  console.log('  ✅ Done');

  // Activities
  console.log('9. Activities...');
  await upsert('activities', [
    { lang: 'en', title: 'AI Investment Conference', role: 'Organizer', date: '2021-09-15', location: 'Hefei, China', description: 'Organized and executed a 200+ attendee AI investment conference at zero cost, successfully building a government-enterprise-investor collaboration platform.', images: ["https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800&auto=format&fit=crop"], video_url: null, tag: 'Conference', display_order: 0 },
    { lang: 'en', title: 'HTXDAO Governance', role: 'Committee Member', date: '2024-03-01', location: 'Global', description: 'Serving as a key member of the HTXDAO Governance Committee, influencing decentralized decision-making processes.', images: ["https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop"], video_url: null, tag: 'Governance', display_order: 1 },
    { lang: 'en', title: 'Medical Supply Coordination', role: 'Volunteer Lead', date: '2020-02-10', location: 'India / China', description: 'Independently coordinated cross-border supply chain for medical supplies during the pandemic. Featured in 36kr special report.', images: ["https://images.unsplash.com/photo-1584036561566-b93a50208c3c?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=800&auto=format&fit=crop"], video_url: null, tag: 'Community', display_order: 2 },
    { lang: 'en', title: 'AI Community Builder', role: 'Community Manager', date: '2025-01-15', location: 'Online', description: 'Managed a 2,000-member AI developer community, enhancing the company\'s influence within developer circles.', images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"], video_url: 'https://www.youtube.com/watch?v=lxRwEPvL-mQ', tag: 'Community', display_order: 3 },
    { lang: 'zh', title: 'AI 投资峰会', role: '组织者', date: '2021-09-15', location: '中国合肥', description: '零成本组织并执行200+人规模的AI投资峰会，成功搭建政企投合作平台。', images: ["https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800&auto=format&fit=crop"], video_url: null, tag: 'Conference', display_order: 0 },
    { lang: 'zh', title: 'HTXDAO 治理委员会', role: '委员会成员', date: '2024-03-01', location: '全球', description: '担任HTXDAO治理委员会关键成员，影响去中心化决策进程。', images: ["https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop"], video_url: null, tag: 'Governance', display_order: 1 },
    { lang: 'zh', title: '医疗物资协调', role: '志愿负责人', date: '2020-02-10', location: '印度 / 中国', description: '疫情期间独立协调跨国医疗物资供应链。获36kr专题报道。', images: ["https://images.unsplash.com/photo-1584036561566-b93a50208c3c?q=80&w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=800&auto=format&fit=crop"], video_url: null, tag: 'Community', display_order: 2 },
    { lang: 'zh', title: 'AI 开发者社区', role: '社区负责人', date: '2025-01-15', location: '线上', description: '管理2000+成员的AI开发者社区，提升公司在开发者圈层的影响力。', images: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"], video_url: null, tag: 'Community', display_order: 3 }
  ]);
  console.log('  ✅ Done');

  // Socials
  console.log('10. Socials...');
  await upsert('socials', [
    { lang: 'en', platform: 'WeChat', username: '13916784060', url: 'tel:13916784060', icon: 'MessageCircle', color: 'bg-green-500', display_order: 0 },
    { lang: 'en', platform: 'WeChat Public', username: 'Nordic Institute', url: '#', icon: 'Rss', color: 'bg-green-600', display_order: 1 },
    { lang: 'en', platform: 'LinkedIn', username: 'Frank Chen', url: 'https://www.linkedin.com/in/frankfika', icon: 'Linkedin', color: 'bg-blue-700', display_order: 2 },
    { lang: 'en', platform: 'X (Twitter)', username: '@frankfika', url: 'https://x.com/frankfika', icon: 'Twitter', color: 'bg-black', display_order: 3 },
    { lang: 'en', platform: 'Bilibili', username: 'Frank的AI视界', url: 'https://bilibili.com', icon: 'Video', color: 'bg-pink-400', display_order: 4 },
    { lang: 'en', platform: 'GitHub', username: '@frankfika', url: 'https://github.com/frankfika', icon: 'Github', color: 'bg-slate-800', display_order: 5 },
    { lang: 'en', platform: 'Email', username: 'fchen2020@163.com', url: 'mailto:fchen2020@163.com', icon: 'Mail', color: 'bg-blue-500', display_order: 6 },
    { lang: 'en', platform: '36Kr', username: 'Featured Author', url: 'https://36kr.com/search/articles/Frank%20Chen', icon: 'Newspaper', color: 'bg-blue-600', display_order: 7 },
    { lang: 'en', platform: 'HTXDAO', username: 'Committee Member', url: 'https://www.htxdao.com', icon: 'Vote', color: 'bg-indigo-600', display_order: 8 },
    { lang: 'zh', platform: '微信 / Mobile', username: '13916784060', url: 'tel:13916784060', icon: 'MessageCircle', color: 'bg-green-500', display_order: 0 },
    { lang: 'zh', platform: '微信公众号', username: '北欧模式', url: '#', icon: 'Rss', color: 'bg-green-600', display_order: 1 },
    { lang: 'zh', platform: 'LinkedIn', username: 'Frank Chen', url: 'https://www.linkedin.com/in/frankfika', icon: 'Linkedin', color: 'bg-blue-700', display_order: 2 },
    { lang: 'zh', platform: 'X (推特)', username: '@frankfika', url: 'https://x.com/frankfika', icon: 'Twitter', color: 'bg-black', display_order: 3 },
    { lang: 'zh', platform: 'Bilibili', username: 'Frank的AI视界', url: 'https://bilibili.com', icon: 'Video', color: 'bg-pink-400', display_order: 4 },
    { lang: 'zh', platform: 'GitHub', username: '@frankfika', url: 'https://github.com/frankfika', icon: 'Github', color: 'bg-slate-800', display_order: 5 },
    { lang: 'zh', platform: '邮箱', username: 'fchen2020@163.com', url: 'mailto:fchen2020@163.com', icon: 'Mail', color: 'bg-blue-500', display_order: 6 },
    { lang: 'zh', platform: '36Kr', username: '特邀作者', url: 'https://36kr.com/search/articles/Frank%20Chen', icon: 'Newspaper', color: 'bg-blue-600', display_order: 7 },
    { lang: 'zh', platform: 'HTXDAO', username: '治理委员会', url: 'https://www.htxdao.com', icon: 'Vote', color: 'bg-indigo-600', display_order: 8 }
  ]);
  console.log('  ✅ Done');

  // Consultation
  console.log('11. Consultation...');
  await upsert('consultation', [
    { lang: 'en', title: 'Strategic Consultation', price: '3,000 RMB / hr', description: '1-on-1 strategic advisory session tailored to your specific needs in AI, Investment, or Career Development.', topics: ["Business Financing & Fundraising", "Vibe Coding Practices & AI Tooling", "AI Entrepreneurship & Product Strategy", "Career Planning & Future Outlook", "Web3 & Community Operations"], cta: 'Book a Session' },
    { lang: 'zh', title: '付费咨询', price: '3000 元 / 小时', description: '一对一的深度战略咨询，针对您在融资、创业或职业规划方面的具体问题提供解决方案。', topics: ["商业融资与BP优化", "Vibe Coding 实践与AI工具链", "AI 创业方向与产品逻辑", "未来职业规划与转型", "Web3 社区运营策略"], cta: '预约咨询' }
  ]);
  console.log('  ✅ Done');

  // Personal Traits
  console.log('12. Personal Traits...');
  await upsert('personal_traits', [
    { lang: 'en', mbti: 'ENFJ-A', zodiac: 'Aries', hometown: 'Qingdao, Shandong', hangouts: 'Beijing, Qingdao, Wuxi, Shanghai, Nanjing', worked_in: 'Singapore, Sweden, India, Australia', personalities: 'Proud post-90s, passionate Aries with a deep Scorpio rising, straightforward, typical Shandong native.', proud_moments: ["Despite changing careers many times, I always get promoted or receive a raise within 1-2 years", "Studied in India and made significant contributions during the pandemic", "Always have opportunities to keep starting businesses and hustling, with companions along the way", "Positive mindset and open thinking"], beliefs: ["Do good deeds without asking about the future", "If not dead, keep hustling", "What's there to fear? Just start doing it, the worst is failure", "If you can't fit into others' circles, create your own", "Don't shun meeting swindlers - they know reliable people too", "Sincerity is the biggest trick"] },
    { lang: 'zh', mbti: 'ENFJ-A', zodiac: '白羊座', hometown: '山东青岛', hangouts: '北京、青岛、无锡、上海、南京', worked_in: '新加坡、瑞典、印度、澳大利亚', personalities: '骄傲的90后、热情的白羊座加上深邃的上升天蝎、真诚直率、超级典型的山东人。', proud_moments: ["虽然换了很多次职业方向，但基本每个工作在1-2年内必然会升职/加薪", "去过印度读书，并且在疫情期间做了很多贡献", "一直有机会在不断创业和折腾，前路一直有小伙伴陪伴", "心态好，思路开拓"], beliefs: ["但行好事，莫问前程", "不死就折腾", "怕啥，先干起来再说，大不了就是失败嘛", "如果你融入不了别人的圈子，就自己造一个圈子", "不要排斥认识骗子，骗子可以认识靠谱的人，靠谱的人可以认识骗子", "真诚是最大的套路"] }
  ]);
  console.log('  ✅ Done');

  // Recommendations
  console.log('13. Recommendations...');
  await upsert('recommendations', [
    { lang: 'en', type: 'book', category: 'Biography', items: ["Steve Jobs", "I Walked at the Brink of Collapse"], display_order: 0 },
    { lang: 'en', type: 'book', category: 'Finance', items: ["Currency Wars"], display_order: 1 },
    { lang: 'en', type: 'book', category: 'History & Philosophy', items: ["Siddhartha", "Quotations from Chairman Mao", "The Stories of the Ming Dynasty"], display_order: 2 },
    { lang: 'en', type: 'book', category: 'Others', items: ["Being Part of It: The Chinese Government and Economic Development", "The Sovereign Individual"], display_order: 3 },
    { lang: 'en', type: 'movie', category: 'Drama', items: ["Joker", "Let the Bullets Fly", "Farewell My Concubine", "The Shepherd"], display_order: 0 },
    { lang: 'en', type: 'movie', category: 'Comedy', items: ["Goodbye Mr. Loser", "Fame and Fortune", "Crazy Stone", "Breakup Buddies"], display_order: 1 },
    { lang: 'en', type: 'movie', category: 'Other', items: ["The Truman Show"], display_order: 2 },
    { lang: 'en', type: 'tv_show', category: 'History', items: ["Towards the Republic", "Han Wu the Great Emperor", "Yongzheng Dynasty", "New Three Kingdoms"], display_order: 0 },
    { lang: 'en', type: 'tv_show', category: 'War', items: ["My Chief and My Regiment", "Drawing Sword", "Liberation"], display_order: 1 },
    { lang: 'en', type: 'tv_show', category: 'Documentary', items: ["The Embassy", "Guardian West Liberation", "National Geographic", "A Bite of China"], display_order: 2 },
    { lang: 'en', type: 'tv_show', category: 'Spy/Crime', items: ["The Kite", "Undercover", "Day and Night", "Detective Di Renjie"], display_order: 3 },
    { lang: 'en', type: 'tv_show', category: 'Other', items: ["Nirvana in Fire 1 & 2"], display_order: 4 },
    { lang: 'zh', type: 'book', category: '传记', items: ["《乔布斯传》", "《我曾走在崩溃的边缘》"], display_order: 0 },
    { lang: 'zh', type: 'book', category: '金融', items: ["《货币战争》"], display_order: 1 },
    { lang: 'zh', type: 'book', category: '历史与哲学', items: ["《悉达多》", "《毛主席语录》", "《明朝那些事儿》"], display_order: 2 },
    { lang: 'zh', type: 'book', category: '其他', items: ["《置身事内：中国政府与经济发展》", "《主权个人》"], display_order: 3 },
    { lang: 'zh', type: 'movie', category: '剧情片', items: ["《小丑》", "《让子弹飞》", "《霸王别姬》", "《牧马人》"], display_order: 0 },
    { lang: 'zh', type: 'movie', category: '喜剧', items: ["《夏洛特烦恼》", "《扬名立万》", "《疯狂的石头》", "《心花怒放》"], display_order: 1 },
    { lang: 'zh', type: 'movie', category: '其他', items: ["《楚门的世界》"], display_order: 2 },
    { lang: 'zh', type: 'tv_show', category: '历史剧', items: ["《走向共和》", "《汉武大帝》", "《雍正王朝》", "《新三国》"], display_order: 0 },
    { lang: 'zh', type: 'tv_show', category: '战争剧', items: ["《我的团长我的团》", "《亮剑》", "《解放》"], display_order: 1 },
    { lang: 'zh', type: 'tv_show', category: '纪录片', items: ["《差馆》", "《守护解放西》", "《国家地理》", "《舌尖上的中国》"], display_order: 2 },
    { lang: 'zh', type: 'tv_show', category: '谍战/刑侦', items: ["《风筝》", "《潜伏》", "《白夜追凶》", "《神探狄仁杰》"], display_order: 3 },
    { lang: 'zh', type: 'tv_show', category: '其他', items: ["《琅琊榜1和2》"], display_order: 4 }
  ]);
  console.log('  ✅ Done');

  console.log('\n✨ Database seed completed successfully!\n');
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
