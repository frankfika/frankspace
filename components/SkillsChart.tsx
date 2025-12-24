import React, { useState } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ContentData, SkillMetric } from '../types';
import { Edit2, Save, X, Plus, Trash2 } from 'lucide-react';

interface SkillsChartProps {
    data: ContentData;
    skills: SkillMetric[];
    isAdmin: boolean;
    onUpdateSkills: (skills: SkillMetric[]) => void;
}

const SkillsChart: React.FC<SkillsChartProps> = ({ data, skills, isAdmin, onUpdateSkills }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSkills, setEditSkills] = useState<SkillMetric[]>(skills);

  const handleEdit = () => {
    setEditSkills(skills);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editSkills.some(s => !s.subject || s.A < 0 || s.A > 100)) {
      return alert('All skills must have a valid name and score between 0-100');
    }
    onUpdateSkills(editSkills);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditSkills(skills);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    setEditSkills([...editSkills, { subject: '', A: 50, fullMark: 100 }]);
  };

  const handleRemoveSkill = (index: number) => {
    setEditSkills(editSkills.filter((_, i) => i !== index));
  };

  const handleSkillChange = (index: number, field: 'subject' | 'A', value: string | number) => {
    const updated = editSkills.map((skill, i) => {
      if (i === index) {
        return { ...skill, [field]: value };
      }
      return skill;
    });
    setEditSkills(updated);
  };

  // Render Edit Mode
  if (isEditing) {
    return (
      <div className="w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col shadow-xl border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 sm:pb-4 mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {data.lang === 'zh' ? '编辑能力数据' : 'Edit Skills'}
          </h3>
          <button
            onClick={handleCancel}
            className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="flex-1 space-y-2 sm:space-y-3 overflow-y-auto">
          {editSkills.map((skill, index) => (
            <div key={index} className="flex gap-2 sm:gap-3 items-center bg-white p-2 sm:p-3 rounded-lg border border-slate-200">
              <div className="flex-1">
                <input
                  type="text"
                  value={skill.subject}
                  onChange={(e) => handleSkillChange(index, 'subject', e.target.value)}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder={data.lang === 'zh' ? '能力名称' : 'Skill name'}
                />
              </div>
              <div className="w-16 sm:w-24">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={skill.A}
                  onChange={(e) => handleSkillChange(index, 'A', parseInt(e.target.value) || 0)}
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="0-100"
                />
              </div>
              <button
                onClick={() => handleRemoveSkill(index)}
                className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-slate-200 mt-3 sm:mt-4">
          <button
            onClick={handleAddSkill}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-lg transition-all shadow-lg hover:shadow-brand-500/50 hover:-translate-y-0.5 font-medium text-sm sm:text-base"
          >
            <Plus size={16} className="sm:w-[18px] sm:h-[18px]" /> {data.lang === 'zh' ? '添加能力' : 'Add Skill'}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-lg text-sm sm:text-base"
          >
            <Save size={16} className="sm:w-[18px] sm:h-[18px]" /> {data.lang === 'zh' ? '保存' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium text-sm sm:text-base"
          >
            {data.lang === 'zh' ? '取消' : 'Cancel'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-xl border-slate-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-white to-brand-50 opacity-30 pointer-events-none" />

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 sm:gap-3">
          <h3 className="text-sm sm:text-base md:text-lg font-mono font-bold text-brand-700 flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-500 animate-pulse"></span>
              {data.headers.skills}
          </h3>
          {isAdmin && (
            <button
              onClick={handleEdit}
              className="p-1.5 sm:p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
              title={data.lang === 'zh' ? '编辑能力' : 'Edit Skills'}
            >
              <Edit2 size={14} className="sm:w-4 sm:h-4" />
            </button>
          )}
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="55%" outerRadius="70%" data={skills}>
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
