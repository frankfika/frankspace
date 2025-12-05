import React, { useState } from 'react';
import { ContentData, ExperienceItem, EducationItem } from '../types';
import { Briefcase, GraduationCap, Edit2, Trash2, Plus, Save, X } from 'lucide-react';

interface ExperienceTimelineProps {
  data: ContentData;
  isAdmin?: boolean;
  onUpdateExperience?: (experience: ExperienceItem[]) => void;
  onUpdateEducation?: (education: EducationItem[]) => void;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  data,
  isAdmin = false,
  onUpdateExperience,
  onUpdateEducation
}) => {
  const [editingExp, setEditingExp] = useState<string | null>(null);
  const [editingEdu, setEditingEdu] = useState<number | null>(null);
  const [expForm, setExpForm] = useState<Partial<ExperienceItem>>({});
  const [eduForm, setEduForm] = useState<Partial<EducationItem>>({});
  const [achievementInput, setAchievementInput] = useState('');
  const [detailInput, setDetailInput] = useState('');

  // Experience handlers
  const handleEditExp = (job: ExperienceItem) => {
    setExpForm(job);
    setEditingExp(job.id);
  };

  const handleNewExp = () => {
    setExpForm({
      role: '',
      company: '',
      period: '',
      description: '',
      achievements: []
    });
    setEditingExp('new');
  };

  const handleSaveExp = () => {
    if (!expForm.role || !expForm.company || !expForm.period || !expForm.description) {
      return alert('Role, Company, Period, and Description are required');
    }

    if (editingExp === 'new') {
      const newExp: ExperienceItem = {
        id: Date.now().toString(),
        role: expForm.role!,
        company: expForm.company!,
        period: expForm.period!,
        description: expForm.description!,
        achievements: expForm.achievements || []
      };
      onUpdateExperience?.([...data.experience, newExp]);
    } else {
      const updated = data.experience.map(e =>
        e.id === editingExp ? { ...e, ...expForm } as ExperienceItem : e
      );
      onUpdateExperience?.(updated);
    }
    setEditingExp(null);
    setExpForm({});
  };

  const handleDeleteExp = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      onUpdateExperience?.(data.experience.filter(e => e.id !== id));
    }
  };

  const handleAddAchievement = () => {
    const trimmed = achievementInput.trim();
    if (trimmed) {
      setExpForm({
        ...expForm,
        achievements: [...(expForm.achievements || []), trimmed]
      });
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setExpForm({
      ...expForm,
      achievements: expForm.achievements?.filter((_, i) => i !== index)
    });
  };

  // Education handlers
  const handleEditEdu = (edu: EducationItem, index: number) => {
    setEduForm(edu);
    setEditingEdu(index);
  };

  const handleNewEdu = () => {
    setEduForm({
      school: '',
      degree: '',
      period: '',
      details: []
    });
    setEditingEdu(-1); // -1 indicates new
  };

  const handleSaveEdu = () => {
    if (!eduForm.school || !eduForm.degree || !eduForm.period) {
      return alert('School, Degree, and Period are required');
    }

    if (editingEdu === -1) {
      const newEdu: EducationItem = {
        school: eduForm.school!,
        degree: eduForm.degree!,
        period: eduForm.period!,
        details: eduForm.details || []
      };
      onUpdateEducation?.([...data.education, newEdu]);
    } else {
      const updated = data.education.map((e, i) =>
        i === editingEdu ? eduForm as EducationItem : e
      );
      onUpdateEducation?.(updated);
    }
    setEditingEdu(null);
    setEduForm({});
  };

  const handleDeleteEdu = (index: number) => {
    if (window.confirm('Are you sure you want to delete this education?')) {
      onUpdateEducation?.(data.education.filter((_, i) => i !== index));
    }
  };

  const handleAddDetail = () => {
    const trimmed = detailInput.trim();
    if (trimmed) {
      setEduForm({
        ...eduForm,
        details: [...(eduForm.details || []), trimmed]
      });
      setDetailInput('');
    }
  };

  const handleRemoveDetail = (index: number) => {
    setEduForm({
      ...eduForm,
      details: eduForm.details?.filter((_, i) => i !== index)
    });
  };

  // Render Experience Edit Form
  if (editingExp) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {editingExp === 'new' ? 'Add New Experience' : 'Edit Experience'}
          </h2>
          <button
            onClick={() => { setEditingExp(null); setExpForm({}); setAchievementInput(''); }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Role *</label>
            <input
              type="text"
              value={expForm.role || ''}
              onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Senior Product Manager"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Company *</label>
            <input
              type="text"
              value={expForm.company || ''}
              onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Tech Corp Inc."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Period *</label>
            <input
              type="text"
              value={expForm.period || ''}
              onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="2020 - 2023"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
            <textarea
              value={expForm.description || ''}
              onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent min-h-[80px]"
              placeholder="Brief description of the role"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Achievements</label>

            {/* Display existing achievements */}
            <div className="space-y-2 mb-3">
              {expForm.achievements?.map((ach, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-accent-500 mt-1">►</span>
                  <span className="flex-1 text-sm text-slate-700">{ach}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-1 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Input for new achievement */}
            <div className="flex gap-2">
              <input
                type="text"
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAchievement();
                  }
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="Type achievement and press Enter"
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-2"
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleSaveExp}
              className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
            >
              <Save size={18} /> Save
            </button>
            <button
              onClick={() => { setEditingExp(null); setExpForm({}); setAchievementInput(''); }}
              className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Education Edit Form
  if (editingEdu !== null) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {editingEdu === -1 ? 'Add New Education' : 'Edit Education'}
          </h2>
          <button
            onClick={() => { setEditingEdu(null); setEduForm({}); setDetailInput(''); }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="glass-panel p-6 rounded-xl space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">School *</label>
            <input
              type="text"
              value={eduForm.school || ''}
              onChange={(e) => setEduForm({ ...eduForm, school: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="University Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Degree *</label>
            <input
              type="text"
              value={eduForm.degree || ''}
              onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Period *</label>
            <input
              type="text"
              value={eduForm.period || ''}
              onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder="2015 - 2019"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Details</label>

            {/* Display existing details */}
            <div className="space-y-2 mb-3">
              {eduForm.details?.map((detail, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-brand-500 mt-1">●</span>
                  <span className="flex-1 text-sm text-slate-700">{detail}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDetail(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-1 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Input for new detail */}
            <div className="flex gap-2">
              <input
                type="text"
                value={detailInput}
                onChange={(e) => setDetailInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddDetail();
                  }
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="Type detail and press Enter"
              />
              <button
                type="button"
                onClick={handleAddDetail}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-2"
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={handleSaveEdu}
              className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
            >
              <Save size={18} /> Save
            </button>
            <button
              onClick={() => { setEditingEdu(null); setEduForm({}); setDetailInput(''); }}
              className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Work Experience */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-brand-100 rounded-lg">
               <Briefcase className="text-brand-600" size={24} />
            </div>
            {data.headers.experience}
          </h3>
          {isAdmin && (
            <button
              onClick={handleNewExp}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-full transition-all shadow-lg hover:shadow-brand-500/50 hover:-translate-y-0.5 text-sm font-medium"
            >
              <Plus size={16} /> Add
            </button>
          )}
        </div>
        <div className="space-y-8 border-l-2 border-slate-200 ml-3 pl-8 relative">
          {data.experience.map((job) => (
            <div key={job.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-slate-300 group-hover:bg-brand-500 transition-colors shadow-sm" />

              <div className="glass-panel p-6 rounded-xl border-slate-200/60 hover:border-brand-200 transition-all relative">
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleEditExp(job)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteExp(job.id)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

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
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-brand-100 rounded-lg">
              <GraduationCap className="text-brand-600" size={24} />
            </div>
            {data.headers.education}
          </h3>
          {isAdmin && (
            <button
              onClick={handleNewEdu}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-full transition-all shadow-lg hover:shadow-brand-500/50 hover:-translate-y-0.5 text-sm font-medium"
            >
              <Plus size={16} /> Add
            </button>
          )}
        </div>
        <div className="space-y-8 border-l-2 border-slate-200 ml-3 pl-8 relative">
          {data.education.map((edu, index) => (
            <div key={index} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white bg-slate-300 group-hover:bg-accent-500 transition-colors shadow-sm" />

              <div className="glass-panel p-6 rounded-xl border-slate-200/60 hover:border-accent-200 transition-all relative">
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleEditEdu(edu, index)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteEdu(index)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

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