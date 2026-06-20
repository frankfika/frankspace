

export type Language = 'en' | 'zh';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  details: string[];
}

export interface SkillMetric {
  subject: string;
  A: number;
  fullMark: number;
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  description: string;
  link?: string;
  githubLink?: string;
  image?: string;
  stats?: string;
}

export interface Note {
  id: string;
  title: string;
  date: string;
  tags: string[];
  snippet: string;
  content?: string; // Full article text for inline reading
  link?: string;    // External URL to the full article
  readTime: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  role: string;
  date: string;
  location: string;
  description: string;
  images: string[]; 
  videoUrl?: string; // Added for third-party video links
  tag: 'Conference' | 'Community' | 'Governance' | 'Media';
  link?: string;
}

export interface SocialLink {
  platform: string;
  username: string;
  url: string;
  icon: string;
  color: string;
}

export interface ConsultationService {
    title: string;
    price: string;
    description: string;
    topics: string[];
    cta: string;
}

// New types for recommendations
export interface BookRecommendation {
  category: string;
  books: string[];
}

export interface MediaRecommendation {
  category: string;
  items: string[];
}

export interface ArticleLink {
  id: string;
  title: string;
  url: string;
}

export interface PersonalTraits {
  mbti: string;
  zodiac: string;
  hometown: string;
  hangouts: string;
  workedIn: string;
  personalities: string;
  proudMoments: string[];
  beliefs: string[];
}

export interface Recommendations {
  books: BookRecommendation[];
  movies: MediaRecommendation[];
  tvShows: MediaRecommendation[];
}

export interface ContentData {
  personalInfo: {
    name: string;
    tagline: string;
    email: string;
    github: string;
    mobile: string;
    location: string;
    summary: string;
    availability: string;
    contactBtn: string;
    resumeBtn: string;
    yearsExp: string;
    moneyManaged: string;
    yearsLabel: string;
    moneyLabel: string;
  };
  personalTraits?: PersonalTraits;
  navigation: {
    home: string;
    profile: string;
    vibe: string;
    activities: string;
    thoughts: string;
    consultation: string;
  };
  headers: {
    experience: string;
    education: string;
    skills: string;
    highlights: string;
    socials: string;
  };
  skills: SkillMetric[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  thoughts: Note[];
  activities: ActivityItem[];
  socials: SocialLink[];
  consultation: ConsultationService;
  recommendations?: Recommendations;
  articles?: ArticleLink[];
}