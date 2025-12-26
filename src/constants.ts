




import { ContentData, PersonalTraits, Recommendations } from './types';

// Personal traits data from old site
const PERSONAL_TRAITS_EN: PersonalTraits = {
  mbti: "ENFJ-A",
  zodiac: "Aries",
  hometown: "Qingdao, Shandong",
  hangouts: "Beijing, Qingdao, Wuxi, Shanghai, Nanjing",
  workedIn: "Singapore, Sweden, India, Australia",
  personalities: "Proud post-90s, passionate Aries with a deep Scorpio rising, straightforward, typical Shandong native.",
  proudMoments: [
    "Despite changing careers many times, I always get promoted or receive a raise within 1-2 years",
    "Studied in India and made significant contributions during the pandemic",
    "Always have opportunities to keep starting businesses and hustling, with companions along the way",
    "Positive mindset and open thinking"
  ],
  beliefs: [
    "Do good deeds without asking about the future",
    "If not dead, keep hustling",
    "What's there to fear? Just start doing it, the worst is failure",
    "If you can't fit into others' circles, create your own",
    "Don't shun meeting swindlers - they know reliable people too",
    "Sincerity is the biggest trick"
  ]
};

const PERSONAL_TRAITS_ZH: PersonalTraits = {
  mbti: "ENFJ-A",
  zodiac: "白羊座",
  hometown: "山东青岛",
  hangouts: "北京、青岛、无锡、上海、南京",
  workedIn: "新加坡、瑞典、印度、澳大利亚",
  personalities: "骄傲的90后、热情的白羊座加上深邃的上升天蝎、真诚直率、超级典型的山东人。",
  proudMoments: [
    "虽然换了很多次职业方向，但基本每个工作在1-2年内必然会升职/加薪",
    "去过印度读书，并且在疫情期间做了很多贡献",
    "一直有机会在不断创业和折腾，前路一直有小伙伴陪伴",
    "心态好，思路开拓"
  ],
  beliefs: [
    "但行好事，莫问前程",
    "不死就折腾",
    "怕啥，先干起来再说，大不了就是失败嘛",
    "如果你融入不了别人的圈子，就自己造一个圈子",
    "不要排斥认识骗子，骗子可以认识靠谱的人，靠谱的人可以认识骗子",
    "真诚是最大的套路"
  ]
};

// Recommendations data from old site
const RECOMMENDATIONS_EN: Recommendations = {
  books: [
    { category: "Biography", books: ["Steve Jobs", "I Walked at the Brink of Collapse"] },
    { category: "Finance", books: ["Currency Wars"] },
    { category: "History & Philosophy", books: ["Siddhartha", "Quotations from Chairman Mao", "The Stories of the Ming Dynasty"] },
    { category: "Others", books: ["Being Part of It: The Chinese Government and Economic Development", "The Sovereign Individual"] }
  ],
  movies: [
    { category: "Drama", items: ["Joker", "Let the Bullets Fly", "Farewell My Concubine", "The Shepherd"] },
    { category: "Comedy", items: ["Goodbye Mr. Loser", "Fame and Fortune", "Crazy Stone", "Breakup Buddies"] },
    { category: "Other", items: ["The Truman Show"] }
  ],
  tvShows: [
    { category: "History", items: ["Towards the Republic", "Han Wu the Great Emperor", "Yongzheng Dynasty", "New Three Kingdoms"] },
    { category: "War", items: ["My Chief and My Regiment", "Drawing Sword", "Liberation"] },
    { category: "Documentary", items: ["The Embassy", "Guardian West Liberation", "National Geographic", "A Bite of China"] },
    { category: "Spy/Crime", items: ["The Kite", "Undercover", "Day and Night", "Detective Di Renjie"] },
    { category: "Other", items: ["Nirvana in Fire 1 & 2"] }
  ]
};

const RECOMMENDATIONS_ZH: Recommendations = {
  books: [
    { category: "传记", books: ["《乔布斯传》", "《我曾走在崩溃的边缘》"] },
    { category: "金融", books: ["《货币战争》"] },
    { category: "历史与哲学", books: ["《悉达多》", "《毛主席语录》", "《明朝那些事儿》"] },
    { category: "其他", books: ["《置身事内：中国政府与经济发展》", "《主权个人》"] }
  ],
  movies: [
    { category: "剧情片", items: ["《小丑》", "《让子弹飞》", "《霸王别姬》", "《牧马人》"] },
    { category: "喜剧", items: ["《夏洛特烦恼》", "《扬名立万》", "《疯狂的石头》", "《心花怒放》"] },
    { category: "其他", items: ["《楚门的世界》"] }
  ],
  tvShows: [
    { category: "历史剧", items: ["《走向共和》", "《汉武大帝》", "《雍正王朝》", "《新三国》"] },
    { category: "战争剧", items: ["《我的团长我的团》", "《亮剑》", "《解放》"] },
    { category: "纪录片", items: ["《差馆》", "《守护解放西》", "《国家地理》", "《舌尖上的中国》"] },
    { category: "谍战/刑侦", items: ["《风筝》", "《潜伏》", "《白夜追凶》", "《神探狄仁杰》"] },
    { category: "其他", items: ["《琅琊榜1和2》"] }
  ]
};

const SKILLS_DATA = [
  { subject: 'AI/Tech', A: 95, fullMark: 100 },
  { subject: 'Strategy', A: 90, fullMark: 100 },
  { subject: 'Investment', A: 85, fullMark: 100 },
  { subject: 'Ops/Mgmt', A: 92, fullMark: 100 },
  { subject: 'Web3', A: 80, fullMark: 100 },
  { subject: 'Bilingual', A: 100, fullMark: 100 },
];

const SOCIALS_DATA = [
    { platform: 'WeChat', username: '13916784060', url: 'tel:13916784060', icon: 'MessageCircle', color: 'bg-green-500' },
    { platform: 'WeChat Public', username: 'Nordic Institute', url: '#', icon: 'Rss', color: 'bg-green-600' },
    { platform: 'LinkedIn', username: 'Frank Chen', url: 'https://www.linkedin.com/in/frankfika', icon: 'Linkedin', color: 'bg-blue-700' },
    { platform: 'X (Twitter)', username: '@frankfika', url: 'https://x.com/frankfika', icon: 'Twitter', color: 'bg-black' },
    { platform: 'Bilibili', username: 'Frank的AI视界', url: 'https://bilibili.com', icon: 'Video', color: 'bg-pink-400' },
    { platform: 'GitHub', username: '@frankfika', url: 'https://github.com/frankfika', icon: 'Github', color: 'bg-slate-800' },
    { platform: 'Email', username: 'fchen2020@163.com', url: 'mailto:fchen2020@163.com', icon: 'Mail', color: 'bg-blue-500' },
    { platform: '36Kr', username: 'Featured Author', url: 'https://36kr.com/search/articles/Frank%20Chen', icon: 'Newspaper', color: 'bg-blue-600' },
    { platform: 'HTXDAO', username: 'Committee Member', url: 'https://www.htxdao.com', icon: 'Vote', color: 'bg-indigo-600' },
];

export const CONTENT: { en: ContentData; zh: ContentData } = {
  en: {
    personalTraits: PERSONAL_TRAITS_EN,
    recommendations: RECOMMENDATIONS_EN,
    personalInfo: {
      name: "Frank Chen",
      tagline: "Cross-Functional Strategic Operations Expert & AI Engineer",
      email: "fchen2020@163.com",
      github: "https://github.com/frankfika",
      mobile: "13916784060",
      location: "China",
      summary: "Cross-Functional Strategic Operations Expert with 6+ years of experience in AI strategy and management, investment, and business operations. Excel at driving cross-departmental collaboration and strategic execution in complex organizations. Possess a Finance + Engineering + Operations composite background.",
      availability: "Open to opportunities",
      contactBtn: "Contact Me",
      resumeBtn: "Resume",
      yearsExp: "6+",
      moneyManaged: "100M+",
      yearsLabel: "Years Experience",
      moneyLabel: "RMB Managed"
    },
    navigation: {
      home: "Home",
      profile: "About Me",
      vibe: "Vibe Coding",
      activities: "Activities",
      thoughts: "Thoughts",
      consultation: "Consultation"
    },
    headers: {
      experience: "Professional Experience",
      education: "Education",
      skills: "Core Competencies",
      highlights: "Highlights",
      socials: "Social & Influence"
    },
    skills: SKILLS_DATA,
    socials: SOCIALS_DATA,
    consultation: {
        title: "Strategic Consultation",
        price: "3,000 RMB / hr",
        description: "1-on-1 strategic advisory session tailored to your specific needs in AI, Investment, or Career Development.",
        topics: [
            "Business Financing & Fundraising",
            "Vibe Coding Practices & AI Tooling",
            "AI Entrepreneurship & Product Strategy",
            "Career Planning & Future Outlook",
            "Web3 & Community Operations"
        ],
        cta: "Book a Session"
    },
    experience: [
      {
        id: 'opencsg',
        role: "Assistant to Chairman",
        company: "OpenCSG (Beijing Kaifang Chuanshen Technology)",
        period: "2025.06 - Present",
        description: "Lenovo angel-round investment, valued at nearly RMB 1B. AgenticOps integrated platform.",
        achievements: [
          "Led cross-functional projects coordinating sales, HR, branding, and R&D.",
          "Spearheaded government-enterprise cooperation with Hong Kong Cyberport and CAICT.",
          "Established local partnership networks in Singapore and Hong Kong; interfaced with Web3 partners.",
          "Designed 50+ hour AI curriculum and managed a 2,000-member AI community."
        ]
      },
      {
        id: 'jiangsu-fantai',
        role: "Board Secretary & Strategic Director",
        company: "Jiangsu Fantai Technology Co., Ltd.",
        period: "2022.08 - 2025.06",
        description: "AI (Computer Vision) Unicorn Enterprise.",
        achievements: [
          "Led mid-to-long-term strategic formulation using AI for market analysis.",
          "Spearheaded full IPO preparation process and investor relations.",
          "Led external PR strategy, securing features in authoritative media like 36kr.",
          "Stepped up as Project Leader to deliver a million-user Web3 project."
        ]
      },
      {
        id: 'paradise-silicon',
        role: "Investment Director",
        company: "Paradise Silicon Valley Asset Management",
        period: "2020.04 - 2022.08",
        description: "Zhejiang's largest private equity firm.",
        achievements: [
          "Led 6 AI/software projects (RMB 100M+ scale) through full investment cycle.",
          "Completed exit cases including star projects like GitLab JiHu.",
          "Organized 200+ attendee AI investment conference at zero cost.",
          "Applied AI algorithms for risk assessment and return forecasting."
        ]
      },
      {
        id: 'jiangsu-global',
        role: "COO & Domestic Lead",
        company: "Jiangsu Global Buyer Co., Ltd.",
        period: "2017.07 - 2018.08",
        description: "Tencent-incubated cross-border e-commerce project.",
        achievements: [
          "Managed R&D team and coordinated product/ops for rapid iteration.",
          "Optimized AI recommendation algorithms enhancing conversion rates.",
          "Achieved maximum brand communication at minimal cost."
        ]
      },
      {
        id: 'shanghai-yibu',
        role: "Full-Stack Engineer & CTO Assistant",
        company: "Shanghai Yibu Network Technology",
        period: "2015.11 - 2017.01",
        description: "Shanghai Airport's bus booking Robotaxi project.",
        achievements: [
          "Developed city-level AI route recommendation system.",
          "Completed 3-month development task in 1 month solo.",
          "Received company's only employee commendation for execution efficiency."
        ]
      }
    ],
    education: [
      {
        school: "Stockholm School of Economics",
        degree: "M.Sc. in Business and Management",
        period: "2018 - 2020",
        details: ["Sweden's No.1 Business School", "Co-founded 'Nordic Institute' media platform"]
      },
      {
        school: "Indian Institute of Management Ahmedabad",
        degree: "Exchange Student",
        period: "2019 - 2020",
        details: ["India's No.1 Business School", "Assisted medical supply procurement during 2020 pandemic"]
      },
      {
        school: "RMIT University",
        degree: "Bachelor of Information Technology",
        period: "2012 - 2015",
        details: ["Founding member of startup Tripalocal", "Investment from Telstra"]
      }
    ],
    projects: [
      {
        id: '1',
        title: "Nordic Institute",
        category: "Media",
        description: "Co-founded renowned Nordic public account becoming a major information platform for the Nordic Chinese community.",
        techStack: ["Content Strategy", "WeChat Eco", "Branding"],
        stats: "10K+ Followers",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
        link: "https://mp.weixin.qq.com/s/nordic-institute"
      },
      {
        id: '2',
        title: "AI Risk Assessment",
        category: "FinTech",
        description: "Applied AI algorithms for investment project risk assessment and return forecasting to improve decision efficiency.",
        techStack: ["Python", "Scikit-learn", "Financial Modeling"],
        stats: "RMB 100M+ Managed",
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=800&auto=format&fit=crop",
        link: "https://github.com/frankfika/ai-risk-assessment"
      },
      {
        id: '3',
        title: "City Route AI",
        category: "Engineering",
        description: "City-level AI route recommendation system for Robotaxi/Bus booking services.",
        techStack: ["Node.js", "React", "Graph Algorithms"],
        stats: "3x Dev Efficiency",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
        link: "https://github.com/frankfika/city-route-ai"
      },
      {
        id: '4',
        title: "Web3 Operations",
        category: "Blockchain",
        description: "Leading technical and cross-departmental teams to deliver million-user Web3 project.",
        techStack: ["Solidity", "Community Mgmt", "Tokenomics"],
        stats: "1M+ Users",
        image: "https://images.unsplash.com/photo-1621504450168-38f6854b13eb?q=80&w=800&auto=format&fit=crop",
        link: "https://www.htxdao.com"
      }
    ],
    activities: [
       {
           id: 'a1',
           title: "AI Investment Conference",
           role: "Organizer",
           date: "2021-09-15",
           location: "Hefei, China",
           description: "Organized and executed a 200+ attendee AI investment conference at zero cost, successfully building a government-enterprise-investor collaboration platform. The event brought together top-tier VCs and AI startups, facilitating over 500 connections.",
           tag: "Conference",
           images: [
               "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800&auto=format&fit=crop"
           ]
       },
       {
           id: 'a2',
           title: "HTXDAO Governance",
           role: "Committee Member",
           date: "2024-03-01",
           location: "Global",
           description: "Serving as a key member of the HTXDAO Governance Committee, influencing decentralized decision-making processes. Participating in bi-weekly governance calls and drafting proposals for ecosystem growth.",
           tag: "Governance",
           images: [
               "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop"
           ]
       },
       {
           id: 'a3',
           title: "Medical Supply Coordination",
           role: "Volunteer Lead",
           date: "2020-02-10",
           location: "India / China",
           description: "Independently coordinated cross-border supply chain for medical supplies during the pandemic. Featured in 36kr special report. Managed logistics across three time zones and ensured delivery of critical PPE to hospitals.",
           tag: "Community",
           images: [
               "https://images.unsplash.com/photo-1584036561566-b93a50208c3c?q=80&w=800&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=800&auto=format&fit=crop"
           ]
       },
       {
           id: 'a4',
           title: "AI Community Builder",
           role: "Community Manager",
           date: "2025-01-15",
           location: "Online",
           description: "Managed a 2,000-member AI developer community, enhancing the company's influence within developer circles. Hosted weekly AMAs and hackathons.",
           tag: "Community",
           videoUrl: "https://www.youtube.com/watch?v=lxRwEPvL-mQ", // Example video
           images: [
               "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
           ]
       }
    ],
    thoughts: [
      {
        id: 't1',
        title: "The Convergence of AI and Investment Ops",
        date: "2024-10-15",
        tags: ["AI Strategy", "Finance"],
        snippet: "How machine learning models are reshaping due diligence processes in private equity...",
        content: "The landscape of private equity is undergoing a seismic shift. Traditionally, due diligence was a manual, labor-intensive process involving endless spreadsheets and expert interviews. Today, Agentic Workflows and LLMs can analyze market sentiment, predict churn from user reviews, and even audit codebases in minutes. \n\nIn my recent work with the OpenCSG investment portfolio, we implemented a custom 'Due Diligence Agent' that scrapes GitHub repositories and Discord communities to verify technical claims made by startup founders. This not only reduced our initial screening time by 70% but also highlighted red flags that human analysts missed.",
        readTime: "5 min read",
        link: "https://36kr.com/"
      },
      {
        id: 't2',
        title: "Managing Cross-Cultural Tech Teams",
        date: "2024-08-22",
        tags: ["Management", "Culture"],
        snippet: "Lessons learned from Stockholm to Shanghai: Bridging the gap between engineering and business units.",
        content: "Having led teams in Sweden, India, and China, I've observed that the 'Tech' language is universal, but the 'Business' language is highly dialectal. \n\nIn Stockholm, consensus is king. Decisions take longer, but execution is seamless because everyone is on board. In Shanghai, speed is the currency. We often iterate on live products. \n\nThe challenge for a leader is not to force one style onto another, but to create an interface layer. I call this 'Protocol Leadership'—defining clear APIs for how teams communicate inputs and outputs, while being agnostic to the internal processing logic of each cultural unit.",
        readTime: "8 min read",
        link: "https://36kr.com/"
      },
      {
        id: 't3',
        title: "Zero Cost Marketing: The 36kr Strategy",
        date: "2024-05-10",
        tags: ["Growth Hacking", "PR"],
        snippet: "Leveraging personal influence and authoritative media to gain traction without ad spend.",
        content: "When we launched our Web3 project, we had zero marketing budget. Instead of buying ads, we focused on 'Narrative Fit'. We analyzed the editorial patterns of top tech media like 36kr and tailored our press release to fit their current themes (at the time, 'Real-world Asset tokenization'). \n\nThe result? A front-page feature that drove 50,000 unique visitors in 24 hours. The lesson: Journalists are hungry for good stories. If you package your product updates as industry insights, you don't need to pay for coverage.",
        readTime: "4 min read",
        link: "https://36kr.com/"
      },
      // WeChat Articles
      {
        id: 'w1',
        title: "Investment Methodology | How do investors really view projects?",
        date: "2023-06-15",
        tags: ["Investment", "Methodology"],
        snippet: "A detailed mind map breaking down how investors evaluate startup projects from multiple dimensions.",
        readTime: "10 min read",
        link: "https://mp.weixin.qq.com/s/yRAphxCu4rFsLEjehJyK6A"
      },
      {
        id: 'w2',
        title: "Dirty Jobs and Hard Tech",
        date: "2023-05-20",
        tags: ["Tech", "Industry"],
        snippet: "Why the most valuable tech companies often do the 'dirty work' that others avoid.",
        readTime: "8 min read",
        link: "https://mp.weixin.qq.com/s/rQMjdqCqWFlGETH0G-0x5A"
      },
      {
        id: 'w3',
        title: "A Debate on the 'Rise of India'",
        date: "2023-04-10",
        tags: ["India", "Geopolitics"],
        snippet: "My thoughts on India's economic trajectory and what it means for global tech.",
        readTime: "12 min read",
        link: "https://mp.weixin.qq.com/s/i5Zf7s-oDMpXantd5nFjKg"
      },
      {
        id: 'w4',
        title: "AI Companies in China: High-Tech Construction Crew",
        date: "2023-08-15",
        tags: ["AI", "China"],
        snippet: "An analysis of China's AI industry - the reality behind the hype.",
        readTime: "15 min read",
        link: "https://mp.weixin.qq.com/s/cKCRcZrn9v_R5TKP0fodZA"
      },
      {
        id: 'w5',
        title: "From L0 to L3: Understanding Generative AI's Technology Layers",
        date: "2023-09-20",
        tags: ["AI", "Technology"],
        snippet: "A liberal arts student's interpretation of the four-layer technology system of Generative AI.",
        readTime: "20 min read",
        link: "https://mp.weixin.qq.com/s/6-oj-8v9TYi8ZphUgDWjqA"
      },
      {
        id: 'w6',
        title: "Build a Personal Website + AI Assistant in One Day",
        date: "2024-01-10",
        tags: ["AI", "Tutorial"],
        snippet: "How I built this personal website with an integrated AI chatbot without writing much code.",
        readTime: "8 min read",
        link: "https://mp.weixin.qq.com/s/u_B6-22Tl9ZVFMepkv0cXg"
      }
    ]
  },
  zh: {
    personalTraits: PERSONAL_TRAITS_ZH,
    recommendations: RECOMMENDATIONS_ZH,
    personalInfo: {
      name: "Frank Chen",
      tagline: "战略运营专家 & AI工程师",
      email: "fchen2020@163.com",
      github: "https://github.com/frankfika",
      mobile: "13916784060",
      location: "中国",
      summary: "拥有6年以上AI战略管理、投资及业务运营经验的跨职能战略专家。擅长在复杂组织中推动跨部门协作与战略落地。具备“金融+工程+运营”复合背景，深度理解AI/Web3技术，能够将技术洞察转化为商业价值。",
      availability: "寻求新机会",
      contactBtn: "联系我",
      resumeBtn: "简历",
      yearsExp: "6年+",
      moneyManaged: "1亿+",
      yearsLabel: "工作经验",
      moneyLabel: "管理资金规模 (RMB)"
    },
    navigation: {
      home: "首页",
      profile: "个人介绍",
      vibe: "灵感编程",
      activities: "活动足迹",
      thoughts: "思考笔记",
      consultation: "付费咨询"
    },
    headers: {
      experience: "工作经历",
      education: "教育背景",
      skills: "核心能力",
      highlights: "亮点数据",
      socials: "社会影响力与链接"
    },
    skills: [
      { subject: 'AI/技术', A: 95, fullMark: 100 },
      { subject: '战略规划', A: 90, fullMark: 100 },
      { subject: '投资管理', A: 85, fullMark: 100 },
      { subject: '运营管理', A: 92, fullMark: 100 },
      { subject: 'Web3', A: 80, fullMark: 100 },
      { subject: '双语能力', A: 100, fullMark: 100 },
    ],
    socials: [
        { platform: '微信 / Mobile', username: '13916784060', url: 'tel:13916784060', icon: 'MessageCircle', color: 'bg-green-500' },
        { platform: '微信公众号', username: '北欧模式', url: '#', icon: 'Rss', color: 'bg-green-600' },
        { platform: 'LinkedIn', username: 'Frank Chen', url: 'https://www.linkedin.com/in/frankfika', icon: 'Linkedin', color: 'bg-blue-700' },
        { platform: 'X (推特)', username: '@frankfika', url: 'https://x.com/frankfika', icon: 'Twitter', color: 'bg-black' },
        { platform: 'Bilibili', username: 'Frank的AI视界', url: 'https://bilibili.com', icon: 'Video', color: 'bg-pink-400' },
        { platform: 'GitHub', username: '@frankfika', url: 'https://github.com/frankfika', icon: 'Github', color: 'bg-slate-800' },
        { platform: '邮箱', username: 'fchen2020@163.com', url: 'mailto:fchen2020@163.com', icon: 'Mail', color: 'bg-blue-500' },
        { platform: '36Kr', username: '特邀作者', url: 'https://36kr.com/search/articles/Frank%20Chen', icon: 'Newspaper', color: 'bg-blue-600' },
        { platform: 'HTXDAO', username: '治理委员会', url: 'https://www.htxdao.com', icon: 'Vote', color: 'bg-indigo-600' },
    ],
    consultation: {
        title: "付费咨询",
        price: "3000 元 / 小时",
        description: "一对一的深度战略咨询，针对您在融资、创业或职业规划方面的具体问题提供解决方案。",
        topics: [
            "商业融资与BP优化",
            "Vibe Coding 实践与AI工具链",
            "AI 创业方向与产品逻辑",
            "未来职业规划与转型",
            "Web3 社区运营策略"
        ],
        cta: "预约咨询"
    },
    experience: [
      {
        id: 'opencsg',
        role: "董事长助理",
        company: "开放传神 (OpenCSG)",
        period: "2025.06 - 至今",
        description: "联想天使轮投资，估值近10亿，AgenticOps集成平台。",
        achievements: [
          "统筹销售、HR、品牌及研发团队的跨职能项目。",
          "主导与香港数码港及信通院的百万级政企合作项目。",
          "开拓新加坡及香港市场，建立本地合作网络；对接Huobi、ICP等Web3伙伴。",
          "独立设计50+小时AI课程，管理2000+成员AI社区。"
        ]
      },
      {
        id: 'jiangsu-fantai',
        role: "董秘 & 战略总监",
        company: "江苏凡泰科技",
        period: "2022.08 - 2025.06",
        description: "AI（计算机视觉）独角兽企业。",
        achievements: [
          "主导公司中长期战略制定，利用AI技术进行市场分析。",
          "牵头IPO全流程准备，统筹券商、会计师、律师及投资人关系。",
          "负责外部PR战略，成功在36kr等权威媒体进行品牌曝光。",
          "在关键时刻担任项目负责人，成功交付百万用户级Web3项目。"
        ]
      },
      {
        id: 'paradise-silicon',
        role: "投资总监",
        company: "天堂硅谷资产管理集团",
        period: "2020.04 - 2022.08",
        description: "浙江省最大的私募股权公司，国内Top 10。",
        achievements: [
          "主导6个AI/软件项目（规模超1亿）的全周期投资管理。",
          "成功完成包括GitLab极狐在内的多个明星项目退出。",
          "零成本组织并执行200+人规模的AI投资峰会。",
          "应用AI算法进行投资项目风险评估和回报预测。"
        ]
      },
      {
        id: 'jiangsu-global',
        role: "COO & 国内负责人",
        company: "江苏环球买手",
        period: "2017.07 - 2018.08",
        description: "腾讯孵化的跨境电商项目。",
        achievements: [
          "管理研发团队，协调产品/运营部门实现快速迭代。",
          "优化AI推荐算法，显著提升转化率。",
          "通过跨界合作策略，以极低成本实现最大化品牌传播（10万+曝光）。"
        ]
      },
      {
        id: 'shanghai-yibu',
        role: "全栈工程师 & CTO助理",
        company: "上海一步网络科技",
        period: "2015.11 - 2017.01",
        description: "上海机场巴士订票及Robotaxi项目。",
        achievements: [
          "开发城市级AI路线推荐系统，负责后端架构。",
          "单人1个月完成原定3个月的开发任务。",
          "因卓越的执行效率获得公司唯一的员工表彰。"
        ]
      }
    ],
    education: [
      {
        school: "斯德哥尔摩经济学院",
        degree: "商业与管理硕士",
        period: "2018 - 2020",
        details: ["瑞典排名第一商学院", "联合创始人：北欧最大的华人自媒体平台“北欧模式”"]
      },
      {
        school: "印度管理学院 (IIMA)",
        degree: "交换生",
        period: "2019 - 2020",
        details: ["印度排名第一商学院", "疫情期间协助政府采购医疗物资"]
      },
      {
        school: "墨尔本皇家理工大学",
        degree: "信息技术学士",
        period: "2012 - 2015",
        details: ["Tripalocal创始成员", "获得Telstra投资"]
      }
    ],
    projects: [
      {
        id: '1',
        title: "北欧模式 (Nordic Institute)",
        category: "媒体与传播",
        description: "联合创办北欧知名公众号，成为北欧华人社区的主要信息平台。",
        techStack: ["内容战略", "微信生态", "品牌建设"],
        stats: "1万+ 关注者",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
        link: "https://mp.weixin.qq.com/s/nordic-institute"
      },
      {
        id: '2',
        title: "AI 风险评估模型",
        category: "金融科技",
        description: "应用AI算法对投资项目进行风险评估和回报预测，提高决策效率。",
        techStack: ["Python", "Scikit-learn", "金融建模"],
        stats: "管理 1亿+ 资金",
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=800&auto=format&fit=crop",
        link: "https://github.com/frankfika/ai-risk-assessment"
      },
      {
        id: '3',
        title: "城市路线AI推荐",
        category: "工程开发",
        description: "用于Robotaxi/巴士预订服务的城市级AI路线推荐系统。",
        techStack: ["Node.js", "React", "图算法"],
        stats: "3倍 开发效率",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
        link: "https://github.com/frankfika/city-route-ai"
      },
      {
        id: '4',
        title: "Web3 运营交付",
        category: "区块链",
        description: "带领技术和跨部门团队成功交付百万用户级Web3项目。",
        techStack: ["Solidity", "社群管理", "通证经济"],
        stats: "100万+ 用户",
        image: "https://images.unsplash.com/photo-1621504450168-38f6854b13eb?q=80&w=800&auto=format&fit=crop",
        link: "https://www.htxdao.com"
      }
    ],
    activities: [
       {
           id: 'a1',
           title: "AI 投资峰会",
           role: "组织者",
           date: "2021-09-15",
           location: "中国合肥",
           description: "零成本组织并执行200+人规模的AI投资峰会，成功搭建政企投合作平台。汇聚了顶级VC和AI初创企业，促成了超过500次对接。",
           tag: "Conference",
           images: [
               "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800&auto=format&fit=crop"
           ]
       },
       {
           id: 'a2',
           title: "HTXDAO 治理委员会",
           role: "委员会成员",
           date: "2024-03-01",
           location: "全球",
           description: "担任HTXDAO治理委员会关键成员，影响去中心化决策进程。参与双周治理会议，起草生态系统增长提案。",
           tag: "Governance",
           images: [
               "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop"
           ]
       },
       {
           id: 'a3',
           title: "医疗物资协调",
           role: "志愿负责人",
           date: "2020-02-10",
           location: "印度 / 中国",
           description: "疫情期间独立协调跨国医疗物资供应链。获36kr专题报道。跨越三个时区管理物流，确保关键PPE物资送达医院。",
           tag: "Community",
           images: [
               "https://images.unsplash.com/photo-1584036561566-b93a50208c3c?q=80&w=800&auto=format&fit=crop",
               "https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=800&auto=format&fit=crop"
           ]
       },
       {
           id: 'a4',
           title: "AI 开发者社区",
           role: "社区负责人",
           date: "2025-01-15",
           location: "线上",
           description: "管理2000+成员的AI开发者社区，提升公司在开发者圈层的影响力。主持每周AMA和黑客松活动。",
           tag: "Community",
           images: [
               "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
           ]
       }
    ],
    thoughts: [
      {
        id: 't1',
        title: 'AI与投资运营的融合',
        date: '2024-10-15',
        tags: ['AI战略', '金融'],
        snippet: '机器学习模型如何重塑私募股权的尽职调查流程...',
        content: '私募股权投资的版图正在发生巨变。传统上，尽职调查是一个依赖人工、劳动密集型的过程，涉及无数的电子表格和专家访谈。如今，Agentic Workflows（智能体工作流）和大语言模型可以在几分钟内分析市场情绪、根据用户评论预测流失率，甚至审计代码库。\n\n在我最近为OpenCSG投资组合进行的工作中，我们实施了一个定制的"尽职调查智能体"，抓取GitHub仓库和Discord社区数据，以验证初创公司创始人提出的技术主张。这不仅将我们的初步筛选时间减少了70%，还发现了人类分析师错过的危险信号。',
        readTime: '5分钟阅读',
        link: 'https://36kr.com/'
      },
      {
        id: 't2',
        title: '跨文化技术团队管理',
        date: '2024-08-22',
        tags: ['管理', '文化'],
        snippet: '从斯德哥尔摩到上海：弥合工程与业务部门之间的鸿沟。',
        content: '曾在瑞典、印度和中国领导团队，我观察到"技术"语言是通用的，但"商业"语言却有很强的地方口音。\n\n在斯德哥尔摩，共识为王。决策过程较长，但执行起来天衣无缝，因为每个人都已达成一致。在上海，速度是硬通货。我们经常在上线的产品上进行迭代。\n\n作为领导者，挑战不在于将一种风格强加于另一种，在于创建一个接口层。我称之为"协议式领导力"——为团队如何交流输入和输出定义清晰的API，同时对每个文化单元的内部处理逻辑保持不可知论。',
        readTime: '8分钟阅读',
        link: 'https://36kr.com/'
      },
      {
        id: 't3',
        title: '零成本营销：36kr攻略',
        date: '2024-05-10',
        tags: ['增长黑客', '公关'],
        snippet: '如何利用个人影响力和权威媒体在不投放广告的情况下获得关注。',
        content: '当我们启动Web3项目时，营销预算为零。我们没有购买广告，而是专注于"叙事契合度"（Narrative Fit）。我们分析了像36kr这样的顶级科技媒体的编辑模式，并定制了我们的新闻稿以适应他们当时的主题（当时是"RWA 现实世界资产代币化"）。\n\n结果如何？一篇头版专题报道在24小时内带来了50,000名独立访客。教训是：记者渴望好故事。如果你将产品更新包装成行业洞察，你就不需要为报道付费。',
        readTime: '4分钟阅读',
        link: 'https://36kr.com/'
      },
      {
        id: 'w1',
        title: '投资方法论 | 投资人究竟是怎么看项目的？',
        date: '2023-06-15',
        tags: ['投资', '方法论'],
        snippet: '一张详细的脑图，从多个维度解析投资人如何评估创业项目。',
        readTime: '10分钟阅读',
        link: 'https://mp.weixin.qq.com/s/yRAphxCu4rFsLEjehJyK6A'
      },
      {
        id: 'w2',
        title: '"脏活累活"与硬科技',
        date: '2023-05-20',
        tags: ['科技', '行业'],
        snippet: '为什么最有价值的科技公司往往在做别人不愿意做的脏活累活。',
        readTime: '8分钟阅读',
        link: 'https://mp.weixin.qq.com/s/rQMjdqCqWFlGETH0G-0x5A'
      },
      {
        id: 'w3',
        title: '胡说八道｜记一场关于"印度崛起"的小辩论',
        date: '2023-04-10',
        tags: ['印度', '地缘政治'],
        snippet: '我对印度经济发展轨迹的思考，以及它对全球科技的意义。',
        readTime: '12分钟阅读',
        link: 'https://mp.weixin.qq.com/s/i5Zf7s-oDMpXantd5nFjKg'
      },
      {
        id: 'w4',
        title: '中国的AI企业现状：聚光灯下的「高科技施工队」',
        date: '2023-08-15',
        tags: ['AI', '中国'],
        snippet: '对中国AI行业的深度分析——繁华背后的真实现状。',
        readTime: '15分钟阅读',
        link: 'https://mp.weixin.qq.com/s/cKCRcZrn9v_R5TKP0fodZA'
      },
      {
        id: 'w5',
        title: '从L0到L3：文科生对「生成式AI」四层技术体系的解读',
        date: '2023-09-20',
        tags: ['AI', '技术'],
        snippet: '一个文科生视角下的生成式AI四层技术体系解读。',
        readTime: '20分钟阅读',
        link: 'https://mp.weixin.qq.com/s/6-oj-8v9TYi8ZphUgDWjqA'
      },
      {
        id: 'w6',
        title: '就不写代码 | 花一天时间打造一个[个人网站]+[大模型助手]',
        date: '2024-01-10',
        tags: ['AI', '教程'],
        snippet: '如何在不写太多代码的情况下搭建一个带AI聊天助手的个人网站。',
        readTime: '8分钟阅读',
        link: 'https://mp.weixin.qq.com/s/u_B6-22Tl9ZVFMepkv0cXg'
      }
    ]
  }
};