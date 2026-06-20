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
    { lang: 'zh', home: '首页', profile: '个人介绍', vibe: 'VibeCoding', activities: '活动足迹', thoughts: '思考笔记', consultation: '付费咨询' }
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

  // Projects (managed via admin panel, not seeded)
  console.log('7. Projects...');
  console.log('  ⏭️  Skipped (managed via admin panel)');

  // Thoughts (managed via admin panel, not seeded)
  console.log('8. Thoughts...');
  console.log('  ⏭️  Skipped (managed via admin panel)');

  // Activities (managed via admin panel, not seeded)
  console.log('9. Activities...');
  console.log('  ⏭️  Skipped (managed via admin panel)');

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
