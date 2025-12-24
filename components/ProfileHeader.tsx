
import React, { useState } from 'react';
import { ContentData } from '../types';
import { Award, Briefcase, MapPin, Star, Users, Heart, Lightbulb, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface ProfileHeaderProps {
  data: ContentData;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ data }) => {
  const { personalInfo, personalTraits } = data;
  const lang = data.lang || 'en';
  const [showTraits, setShowTraits] = useState(false);

  // 社会职位和荣誉
  const positions = [
    {
      icon: Briefcase,
      title: lang === 'zh' ? '开放传神董事长助理' : 'Asst. to Chairman at OpenCSG',
      org: 'OpenCSG',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Users,
      title: lang === 'zh' ? 'HTXDAO 治理委员会成员' : 'HTXDAO Governance Committee',
      org: 'HTXDAO',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Award,
      title: lang === 'zh' ? '36氪特邀作者' : 'Featured Author at 36Kr',
      org: '36Kr',
      color: 'text-cyan-600 bg-cyan-50'
    },
    {
      icon: Star,
      title: lang === 'zh' ? '北欧模式联合创始人' : 'Co-Founder of Nordic Institute',
      org: lang === 'zh' ? '北欧模式' : 'Nordic Institute',
      color: 'text-amber-600 bg-amber-50'
    }
  ];


  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 h-full">
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl h-full flex flex-col justify-between">
        {/* 顶部个人信息 */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-start md:items-center mb-4 sm:mb-6 md:mb-8 pb-4 sm:pb-6 md:pb-8 border-b border-slate-200">
          {/* 左侧：头像或装饰 */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold shadow-2xl shadow-brand-500/30 transform hover:scale-105 transition-transform">
              {personalInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          {/* 右侧：基本信息 */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-1 sm:mb-2">
                {personalInfo.name}
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-brand-600 font-medium">
                {personalInfo.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-base text-slate-600">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPin size={16} className="text-brand-500 sm:w-[18px] sm:h-[18px]" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                <span className="text-xs sm:text-sm font-medium text-green-700">{personalInfo.availability}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {personalInfo.summary}
            </p>

            {/* Personal Traits Tags */}
            {personalTraits && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium border border-purple-200">
                  {personalTraits.mbti}
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-50 text-amber-700 rounded-full text-xs sm:text-sm font-medium border border-amber-200">
                  {personalTraits.zodiac}
                </span>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium border border-blue-200">
                  {personalTraits.hometown}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Personal Traits Section - Expandable */}
        {personalTraits && (
          <div className="mb-4 sm:mb-6 md:mb-8 pb-4 sm:pb-6 md:pb-8 border-b border-slate-200">
            <button
              onClick={() => setShowTraits(!showTraits)}
              className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all group"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Sparkles size={18} className="text-purple-600 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base text-slate-900">
                  {lang === 'zh' ? '了解更多关于我' : 'Learn More About Me'}
                </span>
              </div>
              {showTraits ? <ChevronUp size={18} className="text-slate-500 sm:w-5 sm:h-5" /> : <ChevronDown size={18} className="text-slate-500 sm:w-5 sm:h-5" />}
            </button>

            {showTraits && (
              <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                {/* Proud Moments */}
                <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                  <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-2 sm:mb-3 text-sm sm:text-base">
                    <Award size={16} className="sm:w-[18px] sm:h-[18px]" />
                    {lang === 'zh' ? '最骄傲的事' : 'Proudest Moments'}
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {personalTraits.proudMoments.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-amber-900">
                        <span className="text-amber-500 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Beliefs */}
                <div className="p-3 sm:p-4 md:p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                  <h4 className="flex items-center gap-2 font-bold text-purple-800 mb-2 sm:mb-3 text-sm sm:text-base">
                    <Heart size={16} className="sm:w-[18px] sm:h-[18px]" />
                    {lang === 'zh' ? '价值观与人生信条' : 'Values & Beliefs'}
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {personalTraits.beliefs.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-purple-900">
                        <Lightbulb size={12} className="text-purple-500 mt-0.5 flex-shrink-0 sm:w-[14px] sm:h-[14px]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 社会职位与荣誉 */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Award size={18} className="text-brand-600 sm:w-5 sm:h-5" />
            {lang === 'zh' ? '社会职位与荣誉' : 'Positions & Honors'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {positions.map((position, index) => (
              <div key={index} className="group flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all bg-white">
                <div className={`flex-shrink-0 p-1.5 sm:p-2 md:p-2.5 rounded-md sm:rounded-lg ${position.color}`}>
                  <position.icon size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 mb-0.5 sm:mb-1 text-xs sm:text-sm leading-snug group-hover:text-brand-600 transition-colors">
                    {position.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{position.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
