-- Frank Chen Portfolio - Supabase Seed Data
-- Run this AFTER running supabase/migration.sql
-- This will populate your database with the initial content

-- =====================
-- PERSONAL INFO
-- =====================
INSERT INTO personal_info (lang, name, tagline, email, github, mobile, location, summary, availability, contact_btn, resume_btn, years_exp, money_managed, years_label, money_label) VALUES
('en', 'Frank Chen', 'Cross-Functional Strategic Operations Expert & AI Engineer', 'fchen2020@163.com', 'https://github.com/frankfika', '13916784060', 'China', 'Cross-Functional Strategic Operations Expert with 6+ years of experience in AI strategy and management, investment, and business operations. Excel at driving cross-departmental collaboration and strategic execution in complex organizations. Possess a Finance + Engineering + Operations composite background.', 'Open to opportunities', 'Contact Me', 'Resume', '6+', '100M+', 'Years Experience', 'RMB Managed'),
('zh', 'Frank Chen', '战略运营专家 & AI工程师', 'fchen2020@163.com', 'https://github.com/frankfika', '13916784060', '中国', '拥有6年以上AI战略管理、投资及业务运营经验的跨职能战略专家。擅长在复杂组织中推动跨部门协作与战略落地。具备"金融+工程+运营"复合背景，深度理解AI/Web3技术，能够将技术洞察转化为商业价值。', '寻求新机会', '联系我', '简历', '6年+', '1亿+', '工作经验', '管理资金规模 (RMB)')
ON CONFLICT (lang) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  email = EXCLUDED.email,
  github = EXCLUDED.github,
  mobile = EXCLUDED.mobile,
  location = EXCLUDED.location,
  summary = EXCLUDED.summary,
  availability = EXCLUDED.availability,
  contact_btn = EXCLUDED.contact_btn,
  resume_btn = EXCLUDED.resume_btn,
  years_exp = EXCLUDED.years_exp,
  money_managed = EXCLUDED.money_managed,
  years_label = EXCLUDED.years_label,
  money_label = EXCLUDED.money_label;

-- =====================
-- NAVIGATION
-- =====================
INSERT INTO navigation (lang, home, profile, vibe, activities, thoughts, consultation) VALUES
('en', 'Home', 'About Me', 'Vibe Coding', 'Activities', 'Thoughts', 'Consultation'),
('zh', '首页', '个人介绍', 'VibeCoding', '活动足迹', '思考笔记', '付费咨询')
ON CONFLICT (lang) DO UPDATE SET
  home = EXCLUDED.home,
  profile = EXCLUDED.profile,
  vibe = EXCLUDED.vibe,
  activities = EXCLUDED.activities,
  thoughts = EXCLUDED.thoughts,
  consultation = EXCLUDED.consultation;

-- =====================
-- HEADERS
-- =====================
INSERT INTO headers (lang, experience, education, skills, highlights, socials) VALUES
('en', 'Professional Experience', 'Education', 'Core Competencies', 'Highlights', 'Social & Influence'),
('zh', '工作经历', '教育背景', '核心能力', '亮点数据', '社会影响力与链接')
ON CONFLICT (lang) DO UPDATE SET
  experience = EXCLUDED.experience,
  education = EXCLUDED.education,
  skills = EXCLUDED.skills,
  highlights = EXCLUDED.highlights,
  socials = EXCLUDED.socials;

-- =====================
-- SKILLS
-- =====================
INSERT INTO skills (lang, subject, score, full_mark, display_order) VALUES
('en', 'AI/Tech', 95, 100, 0),
('en', 'Strategy', 90, 100, 1),
('en', 'Investment', 85, 100, 2),
('en', 'Ops/Mgmt', 92, 100, 3),
('en', 'Web3', 80, 100, 4),
('en', 'Bilingual', 100, 100, 5),
('zh', 'AI/技术', 95, 100, 0),
('zh', '战略规划', 90, 100, 1),
('zh', '投资管理', 85, 100, 2),
('zh', '运营管理', 92, 100, 3),
('zh', 'Web3', 80, 100, 4),
('zh', '双语能力', 100, 100, 5);

-- =====================
-- EXPERIENCE
-- =====================
INSERT INTO experience (lang, role, company, period, description, achievements, display_order) VALUES
('en', 'Assistant to Chairman', 'OpenCSG (Beijing Kaifang Chuanshen Technology)', '2025.06 - Present', 'Lenovo angel-round investment, valued at nearly RMB 1B. AgenticOps integrated platform.', '["Led cross-functional projects coordinating sales, HR, branding, and R&D.", "Spearheaded government-enterprise cooperation with Hong Kong Cyberport and CAICT.", "Established local partnership networks in Singapore and Hong Kong; interfaced with Web3 partners.", "Designed 50+ hour AI curriculum and managed a 2,000-member AI community."]', 0),
('en', 'Board Secretary & Strategic Director', 'Jiangsu Fantai Technology Co., Ltd.', '2022.08 - 2025.06', 'AI (Computer Vision) Unicorn Enterprise.', '["Led mid-to-long-term strategic formulation using AI for market analysis.", "Spearheaded full IPO preparation process and investor relations.", "Led external PR strategy, securing features in authoritative media like 36kr.", "Stepped up as Project Leader to deliver a million-user Web3 project."]', 1),
('en', 'Investment Director', 'Paradise Silicon Valley Asset Management', '2020.04 - 2022.08', 'Zhejiang''s largest private equity firm.', '["Led 6 AI/software projects (RMB 100M+ scale) through full investment cycle.", "Completed exit cases including star projects like GitLab JiHu.", "Organized 200+ attendee AI investment conference at zero cost.", "Applied AI algorithms for risk assessment and return forecasting."]', 2),
('en', 'COO & Domestic Lead', 'Jiangsu Global Buyer Co., Ltd.', '2017.07 - 2018.08', 'Tencent-incubated cross-border e-commerce project.', '["Managed R&D team and coordinated product/ops for rapid iteration.", "Optimized AI recommendation algorithms enhancing conversion rates.", "Achieved maximum brand communication at minimal cost."]', 3),
('en', 'Full-Stack Engineer & CTO Assistant', 'Shanghai Yibu Network Technology', '2015.11 - 2017.01', 'Shanghai Airport''s bus booking Robotaxi project.', '["Developed city-level AI route recommendation system.", "Completed 3-month development task in 1 month solo.", "Received company''s only employee commendation for execution efficiency."]', 4),
('zh', '董事长助理', '开放传神 (OpenCSG)', '2025.06 - 至今', '联想天使轮投资，估值近10亿，AgenticOps集成平台。', '["统筹销售、HR、品牌及研发团队的跨职能项目。", "主导与香港数码港及信通院的百万级政企合作项目。", "开拓新加坡及香港市场，建立本地合作网络；对接Huobi、ICP等Web3伙伴。", "独立设计50+小时AI课程，管理2000+成员AI社区。"]', 0),
('zh', '董秘 & 战略总监', '江苏凡泰科技', '2022.08 - 2025.06', 'AI（计算机视觉）独角兽企业。', '["主导公司中长期战略制定，利用AI技术进行市场分析。", "牵头IPO全流程准备，统筹券商、会计师、律师及投资人关系。", "负责外部PR战略，成功在36kr等权威媒体进行品牌曝光。", "在关键时刻担任项目负责人，成功交付百万用户级Web3项目。"]', 1),
('zh', '投资总监', '天堂硅谷资产管理集团', '2020.04 - 2022.08', '浙江省最大的私募股权公司，国内Top 10。', '["主导6个AI/软件项目（规模超1亿）的全周期投资管理。", "成功完成包括GitLab极狐在内的多个明星项目退出。", "零成本组织并执行200+人规模的AI投资峰会。", "应用AI算法进行投资项目风险评估和回报预测。"]', 2),
('zh', 'COO & 国内负责人', '江苏环球买手', '2017.07 - 2018.08', '腾讯孵化的跨境电商项目。', '["管理研发团队，协调产品/运营部门实现快速迭代。", "优化AI推荐算法，显著提升转化率。", "通过跨界合作策略，以极低成本实现最大化品牌传播（10万+曝光）。"]', 3),
('zh', '全栈工程师 & CTO助理', '上海一步网络科技', '2015.11 - 2017.01', '上海机场巴士订票及Robotaxi项目。', '["开发城市级AI路线推荐系统，负责后端架构。", "单人1个月完成原定3个月的开发任务。", "因卓越的执行效率获得公司唯一的员工表彰。"]', 4);

-- =====================
-- EDUCATION
-- =====================
INSERT INTO education (lang, school, degree, period, details, display_order) VALUES
('en', 'Stockholm School of Economics', 'M.Sc. in Business and Management', '2018 - 2020', '["Sweden''s No.1 Business School", "Co-founded ''Nordic Institute'' media platform"]', 0),
('en', 'Indian Institute of Management Ahmedabad', 'Exchange Student', '2019 - 2020', '["India''s No.1 Business School", "Assisted medical supply procurement during 2020 pandemic"]', 1),
('en', 'RMIT University', 'Bachelor of Information Technology', '2012 - 2015', '["Founding member of startup Tripalocal", "Investment from Telstra"]', 2),
('zh', '斯德哥尔摩经济学院', '商业与管理硕士', '2018 - 2020', '["瑞典排名第一商学院", "联合创始人：北欧最大的华人自媒体平台"北欧模式""]', 0),
('zh', '印度管理学院 (IIMA)', '交换生', '2019 - 2020', '["印度排名第一商学院", "疫情期间协助政府采购医疗物资"]', 1),
('zh', '墨尔本皇家理工大学', '信息技术学士', '2012 - 2015', '["Tripalocal创始成员", "获得Telstra投资"]', 2);

-- =====================
-- PROJECTS (managed via admin panel, not seeded)
-- =====================
-- No seed data: projects are added dynamically via the admin dashboard

-- =====================
-- ACTIVITIES (managed via admin panel, not seeded)
-- =====================
-- No seed data: activities are added dynamically via the admin dashboard

-- =====================
-- THOUGHTS (managed via admin panel, not seeded)
-- =====================
-- No seed data: thoughts are added dynamically via the admin dashboard

-- =====================
-- SOCIALS
-- =====================
INSERT INTO socials (lang, platform, username, url, icon, color, display_order) VALUES
('en', 'WeChat', '13916784060', 'tel:13916784060', 'MessageCircle', 'bg-green-500', 0),
('en', 'WeChat Public', 'Nordic Institute', '#', 'Rss', 'bg-green-600', 1),
('en', 'LinkedIn', 'Frank Chen', 'https://www.linkedin.com/in/frankfika', 'Linkedin', 'bg-blue-700', 2),
('en', 'X (Twitter)', '@frankfika', 'https://x.com/frankfika', 'Twitter', 'bg-black', 3),
('en', 'Bilibili', 'Frank的AI视界', 'https://bilibili.com', 'Video', 'bg-pink-400', 4),
('en', 'GitHub', '@frankfika', 'https://github.com/frankfika', 'Github', 'bg-slate-800', 5),
('en', 'Email', 'fchen2020@163.com', 'mailto:fchen2020@163.com', 'Mail', 'bg-blue-500', 6),
('en', '36Kr', 'Featured Author', 'https://36kr.com/search/articles/Frank%20Chen', 'Newspaper', 'bg-blue-600', 7),
('en', 'HTXDAO', 'Committee Member', 'https://www.htxdao.com', 'Vote', 'bg-indigo-600', 8),
('zh', '微信 / Mobile', '13916784060', 'tel:13916784060', 'MessageCircle', 'bg-green-500', 0),
('zh', '微信公众号', '北欧模式', '#', 'Rss', 'bg-green-600', 1),
('zh', 'LinkedIn', 'Frank Chen', 'https://www.linkedin.com/in/frankfika', 'Linkedin', 'bg-blue-700', 2),
('zh', 'X (推特)', '@frankfika', 'https://x.com/frankfika', 'Twitter', 'bg-black', 3),
('zh', 'Bilibili', 'Frank的AI视界', 'https://bilibili.com', 'Video', 'bg-pink-400', 4),
('zh', 'GitHub', '@frankfika', 'https://github.com/frankfika', 'Github', 'bg-slate-800', 5),
('zh', '邮箱', 'fchen2020@163.com', 'mailto:fchen2020@163.com', 'Mail', 'bg-blue-500', 6),
('zh', '36Kr', '特邀作者', 'https://36kr.com/search/articles/Frank%20Chen', 'Newspaper', 'bg-blue-600', 7),
('zh', 'HTXDAO', '治理委员会', 'https://www.htxdao.com', 'Vote', 'bg-indigo-600', 8);

-- =====================
-- CONSULTATION
-- =====================
INSERT INTO consultation (lang, title, price, description, topics, cta) VALUES
('en', 'Strategic Consultation', '3,000 RMB / hr', '1-on-1 strategic advisory session tailored to your specific needs in AI, Investment, or Career Development.', '["Business Financing & Fundraising", "Vibe Coding Practices & AI Tooling", "AI Entrepreneurship & Product Strategy", "Career Planning & Future Outlook", "Web3 & Community Operations"]', 'Book a Session'),
('zh', '付费咨询', '3000 元 / 小时', '一对一的深度战略咨询，针对您在融资、创业或职业规划方面的具体问题提供解决方案。', '["商业融资与BP优化", "Vibe Coding 实践与AI工具链", "AI 创业方向与产品逻辑", "未来职业规划与转型", "Web3 社区运营策略"]', '预约咨询')
ON CONFLICT (lang) DO UPDATE SET
  title = EXCLUDED.title,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  topics = EXCLUDED.topics,
  cta = EXCLUDED.cta;

-- =====================
-- PERSONAL TRAITS
-- =====================
INSERT INTO personal_traits (lang, mbti, zodiac, hometown, hangouts, worked_in, personalities, proud_moments, beliefs) VALUES
('en', 'ENFJ-A', 'Aries', 'Qingdao, Shandong', 'Beijing, Qingdao, Wuxi, Shanghai, Nanjing', 'Singapore, Sweden, India, Australia', 'Proud post-90s, passionate Aries with a deep Scorpio rising, straightforward, typical Shandong native.', '["Despite changing careers many times, I always get promoted or receive a raise within 1-2 years", "Studied in India and made significant contributions during the pandemic", "Always have opportunities to keep starting businesses and hustling, with companions along the way", "Positive mindset and open thinking"]', '["Do good deeds without asking about the future", "If not dead, keep hustling", "What''s there to fear? Just start doing it, the worst is failure", "If you can''t fit into others'' circles, create your own", "Don''t shun meeting swindlers - they know reliable people too", "Sincerity is the biggest trick"]'),
('zh', 'ENFJ-A', '白羊座', '山东青岛', '北京、青岛、无锡、上海、南京', '新加坡、瑞典、印度、澳大利亚', '骄傲的90后、热情的白羊座加上深邃的上升天蝎、真诚直率、超级典型的山东人。', '["虽然换了很多次职业方向，但基本每个工作在1-2年内必然会升职/加薪", "去过印度读书，并且在疫情期间做了很多贡献", "一直有机会在不断创业和折腾，前路一直有小伙伴陪伴", "心态好，思路开拓"]', '["但行好事，莫问前程", "不死就折腾", "怕啥，先干起来再说，大不了就是失败嘛", "如果你融入不了别人的圈子，就自己造一个圈子", "不要排斥认识骗子，骗子可以认识靠谱的人，靠谱的人可以认识骗子", "真诚是最大的套路"]')
ON CONFLICT (lang) DO UPDATE SET
  mbti = EXCLUDED.mbti,
  zodiac = EXCLUDED.zodiac,
  hometown = EXCLUDED.hometown,
  hangouts = EXCLUDED.hangouts,
  worked_in = EXCLUDED.worked_in,
  personalities = EXCLUDED.personalities,
  proud_moments = EXCLUDED.proud_moments,
  beliefs = EXCLUDED.beliefs;

-- =====================
-- RECOMMENDATIONS
-- =====================
-- English Books
INSERT INTO recommendations (lang, type, category, items, display_order) VALUES
('en', 'book', 'Biography', '["Steve Jobs", "I Walked at the Brink of Collapse"]', 0),
('en', 'book', 'Finance', '["Currency Wars"]', 1),
('en', 'book', 'History & Philosophy', '["Siddhartha", "Quotations from Chairman Mao", "The Stories of the Ming Dynasty"]', 2),
('en', 'book', 'Others', '["Being Part of It: The Chinese Government and Economic Development", "The Sovereign Individual"]', 3),
-- English Movies
('en', 'movie', 'Drama', '["Joker", "Let the Bullets Fly", "Farewell My Concubine", "The Shepherd"]', 0),
('en', 'movie', 'Comedy', '["Goodbye Mr. Loser", "Fame and Fortune", "Crazy Stone", "Breakup Buddies"]', 1),
('en', 'movie', 'Other', '["The Truman Show"]', 2),
-- English TV Shows
('en', 'tv_show', 'History', '["Towards the Republic", "Han Wu the Great Emperor", "Yongzheng Dynasty", "New Three Kingdoms"]', 0),
('en', 'tv_show', 'War', '["My Chief and My Regiment", "Drawing Sword", "Liberation"]', 1),
('en', 'tv_show', 'Documentary', '["The Embassy", "Guardian West Liberation", "National Geographic", "A Bite of China"]', 2),
('en', 'tv_show', 'Spy/Crime', '["The Kite", "Undercover", "Day and Night", "Detective Di Renjie"]', 3),
('en', 'tv_show', 'Other', '["Nirvana in Fire 1 & 2"]', 4),
-- Chinese Books
('zh', 'book', '传记', '["《乔布斯传》", "《我曾走在崩溃的边缘》"]', 0),
('zh', 'book', '金融', '["《货币战争》"]', 1),
('zh', 'book', '历史与哲学', '["《悉达多》", "《毛主席语录》", "《明朝那些事儿》"]', 2),
('zh', 'book', '其他', '["《置身事内：中国政府与经济发展》", "《主权个人》"]', 3),
-- Chinese Movies
('zh', 'movie', '剧情片', '["《小丑》", "《让子弹飞》", "《霸王别姬》", "《牧马人》"]', 0),
('zh', 'movie', '喜剧', '["《夏洛特烦恼》", "《扬名立万》", "《疯狂的石头》", "《心花怒放》"]', 1),
('zh', 'movie', '其他', '["《楚门的世界》"]', 2),
-- Chinese TV Shows
('zh', 'tv_show', '历史剧', '["《走向共和》", "《汉武大帝》", "《雍正王朝》", "《新三国》"]', 0),
('zh', 'tv_show', '战争剧', '["《我的团长我的团》", "《亮剑》", "《解放》"]', 1),
('zh', 'tv_show', '纪录片', '["《差馆》", "《守护解放西》", "《国家地理》", "《舌尖上的中国》"]', 2),
('zh', 'tv_show', '谍战/刑侦', '["《风筝》", "《潜伏》", "《白夜追凶》", "《神探狄仁杰》"]', 3),
('zh', 'tv_show', '其他', '["《琅琊榜1和2》"]', 4);

-- =====================
-- Done! Your database is now populated with content.
-- =====================
