
import React from 'react';
import { ContentData } from '../types';
import { Download, Terminal } from 'lucide-react';
import SocialLinks from './SocialLinks';

interface HeroProps {
  data: ContentData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { personalInfo } = data;
  const lang = data.lang || 'en';

  return (
    <section className="relative px-6 overflow-hidden h-screen flex items-center">
      {/* Enhanced Gradient Background - More Vibrant */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-100/40 via-transparent to-accent-100/40 pointer-events-none -z-20" />

      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:48px_48px] pointer-events-none -z-20" />

      {/* Animated Gradient Orbs - Stronger Colors */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-10 right-5 md:top-20 md:right-10 w-80 h-80 md:w-[500px] md:h-[500px] bg-gradient-to-br from-brand-400/30 via-purple-400/25 to-accent-400/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 left-5 md:left-20 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-cyan-400/25 via-blue-400/20 to-brand-300/25 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-purple-300/20 via-brand-400/15 to-accent-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Radial Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(255,255,255,0.3)_100%)] pointer-events-none -z-10" />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10 w-full">
        <div className="space-y-4 md:space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-brand-300 shadow-lg text-brand-700 text-sm font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-600"></span>
            </span>
            {personalInfo.availability}
          </div>

          {/* Name with Enhanced Gradient */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="text-slate-900">{personalInfo.name.split(' ')[0]} </span>
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-600 animate-gradient">
                  {personalInfo.name.split(' ')[1] || 'Chen'}
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-brand-600 to-accent-600 rounded-full opacity-40"></span>
              </span>
            </h1>
          </div>

          {/* Tagline with Glass Effect */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-accent-500/10 rounded-lg blur-sm group-hover:blur-md transition-all"></div>
            <h2 className="relative text-lg sm:text-xl md:text-2xl text-slate-700 font-light border-l-4 border-brand-500 pl-4 py-2 bg-white/50 backdrop-blur-sm rounded-r-lg">
              {personalInfo.tagline}
            </h2>
          </div>

          {/* Social Links with Better Mobile Spacing */}
          <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              <SocialLinks data={data} />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          </div>

          {/* Summary with Better Typography */}
          <p className="text-slate-600 max-w-lg leading-relaxed text-sm md:text-base line-clamp-3">
            {personalInfo.summary}
          </p>

          {/* Enhanced CTA Buttons - Chinese and English Resume */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/resume-zh.pdf"
              download="陈方简历.pdf"
              className="group relative flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl font-medium shadow-2xl hover:shadow-brand-500/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Download size={18} className="relative z-10 group-hover:scale-110 transition-transform" />
              <span className="relative z-10">{lang === 'zh' ? '下载中文简历' : 'Resume (CN)'}</span>
            </a>

            <a
              href="/resume-en.pdf"
              download="Frank-Chen-Resume.pdf"
              className="group relative flex items-center justify-center gap-2 px-6 py-3.5 bg-white/90 backdrop-blur-sm text-slate-900 rounded-xl font-medium border-2 border-slate-200 hover:border-brand-500 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Download size={18} className="group-hover:scale-110 group-hover:text-brand-600 transition-all" />
              <span className="group-hover:text-brand-600 transition-colors">{lang === 'zh' ? '下载英文简历' : 'Resume (EN)'}</span>
            </a>
          </div>
        </div>

        {/* Visual/Decoration Right Side - Tech Card */}
        <div className="hidden md:flex justify-center items-center relative animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="relative w-full aspect-square max-w-md bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden p-6 group rotate-1 hover:rotate-0 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-white/0" />
            
            {/* Mock Code Editor - Light Theme */}
            <div className="h-full flex flex-col font-mono text-sm relative z-10">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                 </div>
                <span className="text-xs text-slate-400">profile.ts</span>
              </div>
              <div className="flex-1 pt-6 text-slate-600 space-y-3 overflow-hidden leading-relaxed">
                <p><span className="text-brand-600">const</span> frank <span className="text-brand-600">=</span> <span className="text-amber-600">{`{`}</span></p>
                <p className="pl-6">role: <span className="text-emerald-600">'Strategic Ops Expert'</span>,</p>
                <p className="pl-6">focus: <span className="text-amber-600">['AI', 'Finance', 'Web3']</span>,</p>
                <p className="pl-6">location: <span className="text-emerald-600">'{personalInfo.location}'</span>,</p>
                <p className="pl-6">years_exp: <span className="text-blue-600">{parseInt(personalInfo.yearsExp)}</span>,</p>
                <p className="pl-6">status: <span className="text-emerald-600">'Building the Future'</span></p>
                <p className="text-amber-600">{`}`}</p>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-brand-600">
                    <Terminal size={16} />
                    <span className="animate-pulse">_cursor</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                     <span className="px-2 py-1 bg-brand-100 text-brand-700 text-xs rounded">Typescript</span>
                     <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded">Python</span>
                     <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">Solidity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
