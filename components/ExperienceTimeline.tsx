import React from 'react';
import { ContentData } from '../types';
import { Briefcase, GraduationCap } from 'lucide-react';

interface ExperienceTimelineProps {
  data: ContentData;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ data }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Work Experience */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <div className="p-2 bg-brand-100 rounded-lg">
             <Briefcase className="text-brand-600" size={24} />
          </div>
          {data.headers.experience}
        </h3>
        <div className="space-y-8 border-l-2 border-slate-200 ml-3 pl-8 relative">
          {data.experience.map((job) => (
            <div key={job.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-slate-300 group-hover:bg-brand-500 transition-colors shadow-sm" />
              
              <div className="glass-panel p-6 rounded-xl border-slate-200/60 hover:border-brand-200 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {job.role}
                  </h4>
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                    {job.period}
                  </span>
                </div>
                <h5 className="text-sm font-semibold text-brand-600 mb-3">{job.company}</h5>
                <p className="text-sm text-slate-600 italic mb-4">{job.description}</p>
                <ul className="space-y-2">
                  {job.achievements.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-accent-500 mt-1.5 text-[10px]">►</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <div className="p-2 bg-brand-100 rounded-lg">
            <GraduationCap className="text-brand-600" size={24} />
          </div>
          {data.headers.education}
        </h3>
        <div className="space-y-8 border-l-2 border-slate-200 ml-3 pl-8 relative">
          {data.education.map((edu, index) => (
            <div key={index} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-slate-300 group-hover:bg-accent-500 transition-colors shadow-sm" />
              
              <div className="glass-panel p-6 rounded-xl border-slate-200/60 hover:border-accent-200 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-slate-900">{edu.school}</h4>
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                    {edu.period}
                  </span>
                </div>
                <h5 className="text-sm text-accent-600 mb-3">{edu.degree}</h5>
                <ul className="space-y-1">
                  {edu.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-brand-500 mt-1.5 text-[10px]">●</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;