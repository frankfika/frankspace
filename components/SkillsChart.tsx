import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ContentData } from '../types';

interface SkillsChartProps {
    data: ContentData;
}

const SkillsChart: React.FC<SkillsChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full min-h-[500px] glass-panel rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-xl border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-white to-brand-50 opacity-30 pointer-events-none" />
        <h3 className="text-lg font-mono font-bold text-brand-700 absolute top-6 left-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            {data.headers.skills}
        </h3>
        
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="55%" outerRadius="70%" data={data.skills}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Proficiency"
              dataKey="A"
              stroke="#7c3aed"
              strokeWidth={3}
              fill="#8b5cf6"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;