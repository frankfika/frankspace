
import React, { useState } from 'react';
import { ContentData } from '../types';
import { Code, ExternalLink, Activity, Terminal, ArrowUpRight, Github, Layers } from 'lucide-react';

interface VibeCodingProps {
    data: ContentData;
}

const VibeCoding: React.FC<VibeCodingProps> = ({ data }) => {
  const [filter, setFilter] = useState<string>('All');
  
  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(data.projects.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? data.projects 
    : data.projects.filter(p => p.category === filter);

  return (
    <div className="space-y-12 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3 flex items-center gap-4">
            <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/20">
                <Terminal size={28} />
            </div>
            {data.navigation.vibe}
          </h2>
          <p className="text-slate-500 text-lg max-w-xl">
            A curated collection of projects, scripts, and strategic initiatives bridging technology and business.
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 transform scale-105' 
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
          >
            {/* Top Bar Decoration (Mac Window Style) */}
            <div className="absolute top-0 left-0 right-0 h-9 bg-slate-900/5 backdrop-blur-sm z-20 flex items-center px-4 border-b border-white/10">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-sm"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-sm"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-sm"></div>
                </div>
                <div className="ml-auto text-[10px] font-mono font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    SRC/PROJECTS/{project.id.toUpperCase()}
                </div>
            </div>

            {/* Project Image Container */}
            <div className="h-56 w-full relative overflow-hidden bg-slate-100 mt-9">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter saturate-[0.8] group-hover:saturate-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                        <Code size={48} />
                    </div>
                )}

                {/* Overlay with Visual Indicator */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 rounded-full font-bold shadow-xl">
                        View Project <ArrowUpRight size={18} />
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <span className="text-xs font-bold font-mono text-brand-600 mb-1 flex items-center gap-1">
                        <Layers size={12} />
                        {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {project.title}
                    </h3>
                </div>
                {project.stats && (
                    <div className="flex items-center gap-1.5 text-slate-600 text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                        <Activity size={12} className="text-brand-500" />
                        {project.stats}
                    </div>
                 )}
              </div>

              <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-1 border-l-2 border-slate-100 pl-4">
                {project.description}
              </p>

              {/* Tech Stack Footer */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mt-auto">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-mono flex items-center gap-1.5 group-hover:border-brand-300 transition-colors">
                    <span className="text-brand-400 font-bold">#</span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default VibeCoding;
