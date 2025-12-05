




import React, { useState, useEffect, lazy, Suspense } from 'react';
import Hero from './components/Hero';
import ProfileHeader from './components/ProfileHeader';
import ExperienceTimeline from './components/ExperienceTimeline';
import Thoughts from './components/Thoughts';
import Consultation from './components/Consultation';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load heavy components
const SkillsChart = lazy(() => import('./components/SkillsChart'));
const VibeCoding = lazy(() => import('./components/VibeCoding'));
const ActivityLog = lazy(() => import('./components/ActivityLog'));
import { CONTENT } from './constants';
import { Language, ActivityItem, Project, Note } from './types';
import { User, Terminal, BookOpen, Menu, X, Languages, Radio, Lock, Unlock, Sparkles, AlertCircle, Home as HomeIcon } from 'lucide-react';

enum Tab {
  HOME = 'Home',
  PROFILE = 'Profile',
  VIBE = 'Vibe Coding',
  ACTIVITIES = 'Activities',
  THOUGHTS = 'Thoughts',
  CONSULTATION = 'Consultation'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  
  // Initialize Language from localStorage or default to 'zh'
  const [lang, setLang] = useState<Language>(() => {
      const savedLang = localStorage.getItem('app_language');
      return (savedLang === 'en' || savedLang === 'zh') ? savedLang : 'zh';
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  
  // Admin & Data State
  const [isAdmin, setIsAdmin] = useState(false);
  const [customActivities, setCustomActivities] = useState<ActivityItem[]>([]);
  const [customProjects, setCustomProjects] = useState<Project[]>([]);
  const [customThoughts, setCustomThoughts] = useState<Note[]>([]);

  const data = { ...CONTENT[lang], lang, projects: customProjects.length > 0 ? customProjects : CONTENT[lang].projects, thoughts: customThoughts.length > 0 ? customThoughts : CONTENT[lang].thoughts };

  // Initialize Activities from LocalStorage or Constants
  useEffect(() => {
    const saved = localStorage.getItem(`activities_${lang}`);
    if (saved) {
        try {
            setCustomActivities(JSON.parse(saved));
        } catch (e) {
            setCustomActivities(CONTENT[lang].activities);
        }
    } else {
        setCustomActivities(CONTENT[lang].activities);
    }
  }, [lang]);

  // Initialize Projects from LocalStorage or Constants
  useEffect(() => {
    const saved = localStorage.getItem(`projects_${lang}`);
    if (saved) {
        try {
            setCustomProjects(JSON.parse(saved));
        } catch (e) {
            setCustomProjects(CONTENT[lang].projects);
        }
    } else {
        setCustomProjects(CONTENT[lang].projects);
    }
  }, [lang]);

  // Initialize Thoughts from LocalStorage or Constants
  useEffect(() => {
    const saved = localStorage.getItem(`thoughts_${lang}`);
    if (saved) {
        try {
            setCustomThoughts(JSON.parse(saved));
        } catch (e) {
            setCustomThoughts(CONTENT[lang].thoughts);
        }
    } else {
        setCustomThoughts(CONTENT[lang].thoughts);
    }
  }, [lang]);

  // Persist Language
  useEffect(() => {
      localStorage.setItem('app_language', lang);
  }, [lang]);

  // Handle Updates to Activities with Quota Safety
  const handleUpdateActivities = (updated: ActivityItem[]) => {
      try {
          const serialized = JSON.stringify(updated);
          localStorage.setItem(`activities_${lang}`, serialized);
          setCustomActivities(updated);
          setStorageError(null);
      } catch (e: any) {
          console.error("Storage failed:", e);
          if (e.name === 'QuotaExceededError' || e.code === 22) {
              setStorageError("Storage full! Image might be too large. Try deleting old activities or smaller images.");
          } else {
              setStorageError("Failed to save changes.");
          }
      }
  };

  // Handle Updates to Projects
  const handleUpdateProjects = (updated: Project[]) => {
      try {
          const serialized = JSON.stringify(updated);
          localStorage.setItem(`projects_${lang}`, serialized);
          setCustomProjects(updated);
          setStorageError(null);
      } catch (e: any) {
          console.error("Storage failed:", e);
          if (e.name === 'QuotaExceededError' || e.code === 22) {
              setStorageError("Storage full! Try deleting old projects or smaller images.");
          } else {
              setStorageError("Failed to save changes.");
          }
      }
  };

  // Handle Updates to Thoughts
  const handleUpdateThoughts = (updated: Note[]) => {
      try {
          const serialized = JSON.stringify(updated);
          localStorage.setItem(`thoughts_${lang}`, serialized);
          setCustomThoughts(updated);
          setStorageError(null);
      } catch (e: any) {
          console.error("Storage failed:", e);
          if (e.name === 'QuotaExceededError' || e.code === 22) {
              setStorageError("Storage full! Try deleting old notes.");
          } else {
              setStorageError("Failed to save changes.");
          }
      }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return (
             <div className="space-y-20 animate-in fade-in duration-500 pb-20">
                <Hero data={data} />
             </div>
        );
      case Tab.PROFILE:
        return (
          <div className="space-y-12 animate-in fade-in duration-500 pt-32 pb-20">
            {/* 个人履历 + 核心能力 - 左右布局 */}
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                {/* 左侧：个人履历 (占2列) */}
                <div className="lg:col-span-2 flex flex-col">
                  <ProfileHeader data={data} />
                </div>

                {/* 右侧：核心能力雷达图 (占1列) */}
                <div className="lg:col-span-1 flex flex-col">
                  <Suspense fallback={<LoadingSpinner />}>
                    <SkillsChart data={data} />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* 工作经历时间线 */}
            <section className="max-w-6xl mx-auto px-6">
              <ExperienceTimeline data={data} />
            </section>
          </div>
        );
      case Tab.VIBE:
        return (
          <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
            {storageError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 animate-pulse">
                    <AlertCircle size={20} />
                    {storageError}
                </div>
            )}
            <Suspense fallback={<LoadingSpinner />}>
              <VibeCoding
                data={data}
                projects={customProjects}
                isAdmin={isAdmin}
                onUpdateProjects={handleUpdateProjects}
              />
            </Suspense>
          </div>
        );
      case Tab.ACTIVITIES:
        return (
           <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
              {storageError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 animate-pulse">
                      <AlertCircle size={20} />
                      {storageError}
                  </div>
              )}
              <Suspense fallback={<LoadingSpinner />}>
                <ActivityLog
                  data={data}
                  activities={customActivities}
                  isAdmin={isAdmin}
                  onUpdateActivities={handleUpdateActivities}
                />
              </Suspense>
           </div>
        );
      case Tab.THOUGHTS:
        return (
          <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
            {storageError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2 animate-pulse">
                    <AlertCircle size={20} />
                    {storageError}
                </div>
            )}
            <Thoughts
              data={data}
              thoughts={customThoughts}
              isAdmin={isAdmin}
              onUpdateThoughts={handleUpdateThoughts}
            />
          </div>
        );
      case Tab.CONSULTATION:
        return (
           <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
               <Consultation data={data} />
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 text-slate-900 font-sans selection:bg-brand-200 selection:text-brand-900">
      
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || activeTab !== Tab.HOME
            ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-xl font-bold font-mono tracking-tighter text-slate-900 cursor-pointer flex items-center gap-2 group"
            onClick={() => setActiveTab(Tab.HOME)}
          >
            <span className="text-brand-600 group-hover:rotate-12 transition-transform">&lt;</span>
            Frank_Chen
            <span className="text-accent-600 group-hover:-rotate-12 transition-transform">/&gt;</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-white/80 p-1.5 rounded-full border border-slate-200 shadow-sm backdrop-blur-sm">
            {[
              { id: Tab.HOME, label: data.navigation.home, icon: HomeIcon },
              { id: Tab.PROFILE, label: data.navigation.profile, icon: User },
              { id: Tab.VIBE, label: data.navigation.vibe, icon: Terminal },
              { id: Tab.ACTIVITIES, label: data.navigation.activities, icon: Radio },
              { id: Tab.THOUGHTS, label: data.navigation.thoughts, icon: BookOpen },
              { id: Tab.CONSULTATION, label: data.navigation.consultation, icon: Sparkles },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo(0, 0);
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === item.id 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
            
            <div className="w-px h-6 bg-slate-200 mx-1"></div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all flex items-center gap-1 text-xs font-bold font-mono"
            >
              <Languages size={16} />
              {lang === 'en' ? 'EN' : '中'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={toggleLanguage}
                className="text-slate-600 font-bold font-mono"
            >
                {lang === 'en' ? 'EN' : '中'}
            </button>
            <button 
                className="text-slate-900"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
           <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2">
              {[
                  { id: Tab.HOME, label: data.navigation.home },
                  { id: Tab.PROFILE, label: data.navigation.profile },
                  { id: Tab.VIBE, label: data.navigation.vibe },
                  { id: Tab.ACTIVITIES, label: data.navigation.activities },
                  { id: Tab.THOUGHTS, label: data.navigation.thoughts },
                  { id: Tab.CONSULTATION, label: data.navigation.consultation }
              ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                        setActiveTab(t.id);
                        setMobileMenuOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === t.id ? 'bg-slate-100 text-brand-600' : 'text-slate-600'}`}
                  >
                    {t.label}
                  </button>
              ))}
           </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen pt-2">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="flex items-center gap-2">
             <p>© {new Date().getFullYear()} Frank Chen.</p>
             <button 
                onClick={() => setIsAdmin(!isAdmin)}
                className={`p-1 rounded hover:bg-slate-100 transition-colors ${isAdmin ? 'text-brand-600' : 'text-slate-300'}`}
                title="Toggle Admin Mode"
             >
                 {isAdmin ? <Unlock size={14} /> : <Lock size={14} />}
             </button>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0 font-mono">
            <a href="https://github.com/frankfika" target="_blank" rel="noreferrer" className="hover:text-brand-600 transition-colors">Github</a>
            <a href="mailto:fchen2020@163.com" className="hover:text-brand-600 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;