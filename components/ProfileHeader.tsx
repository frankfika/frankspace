
import React from 'react';
import { ContentData } from '../types';
import { Award, Briefcase, MapPin, Star, Users } from 'lucide-react';

interface ProfileHeaderProps {
  data: ContentData;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ data }) => {
  const { personalInfo } = data;
  const lang = data.lang || 'en';

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
      <div className="glass-panel rounded-3xl p-8 md:p-12 shadow-xl h-full flex flex-col justify-between">
        {/* 顶部个人信息 */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8 pb-8 border-b border-slate-200">
          {/* 左侧：头像或装饰 */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-2xl shadow-brand-500/30 transform hover:scale-105 transition-transform">
              {personalInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          {/* 右侧：基本信息 */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2">
                {personalInfo.name}
              </h1>
              <p className="text-xl md:text-2xl text-brand-600 font-medium">
                {personalInfo.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-brand-500" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                <span className="text-sm font-medium text-green-700">{personalInfo.availability}</span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed max-w-3xl">
              {personalInfo.summary}
            </p>
          </div>
        </div>


        {/* 社会职位与荣誉 */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Award size={20} className="text-brand-600" />
            {lang === 'zh' ? '社会职位与荣誉' : 'Positions & Honors'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {positions.map((position, index) => (
              <div key={index} className="group flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all bg-white">
                <div className={`flex-shrink-0 p-2.5 rounded-lg ${position.color}`}>
                  <position.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 mb-1 text-sm leading-snug group-hover:text-brand-600 transition-colors">
                    {position.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">{position.org}</p>
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
