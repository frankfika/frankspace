


import React, { useState } from 'react';
import { ContentData } from '../types';
import { BookOpen, Calendar, ArrowRight, ArrowUp, ExternalLink } from 'lucide-react';

interface ThoughtsProps {
    data: ContentData;
}

const Thoughts: React.FC<ThoughtsProps> = ({ data }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
      setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="border-b border-slate-200 pb-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
             <div className="p-2 bg-brand-100 rounded-lg">
                <BookOpen className="text-brand-600" size={24} />
             </div>
            {data.navigation.thoughts}
          </h2>
          <p className="text-slate-500">
            Insights on AI strategy, reading list, and random musings.
          </p>
        </div>

      <div className="grid gap-6">
        {data.thoughts.map((note) => (
          <div 
            key={note.id} 
            className={`glass-panel p-6 rounded-xl hover:bg-white border transition-all shadow-sm ${expandedId === note.id ? 'bg-white border-brand-200 ring-1 ring-brand-100' : 'hover:border-brand-200 hover:shadow-md'}`}
          >
            <div 
                className="cursor-pointer"
                onClick={() => {
                    if (note.content) toggleExpand(note.id);
                }}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {note.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded-full shrink-0">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {note.date}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{note.readTime}</span>
                    </div>
                </div>
                
                <p className="text-slate-600 mb-5 leading-relaxed">
                   {expandedId === note.id ? (note.content || note.snippet) : note.snippet}
                </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div className="flex gap-2">
                {note.tags.map(tag => (
                  <span key={tag} className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-100 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                  {/* External Link Button */}
                  {note.link && (
                    <a 
                        href={note.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors bg-slate-100 hover:bg-brand-50 px-3 py-1.5 rounded-full"
                    >
                        Read Article <ExternalLink size={14} />
                    </a>
                  )}

                  {/* Expand Content Button */}
                  {note.content && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(note.id);
                        }}
                        className="text-brand-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all px-2"
                    >
                        {expandedId === note.id ? (
                            <>Show Preview <ArrowUp size={14} /></>
                        ) : (
                            <>Show Preview <ArrowRight size={14} /></>
                        )}
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thoughts;