import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { experienceQueries } from '../../lib/supabaseQueries';
import { translateToEnglish, translateArrayToEnglish } from '../../lib/translateService';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle, Languages, Loader2 } from 'lucide-react';

interface Experience {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  display_order: number;
}

const emptyData: Experience = {
  role: '',
  company: '',
  period: '',
  description: '',
  achievements: [],
  display_order: 0
};

const ExperienceEditor: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [zhAchievementInput, setZhAchievementInput] = useState('');
  const [enAchievementInput, setEnAchievementInput] = useState('');

  const { data: zhExperiences, mutate: mutateZh } = useSWR(
    ['experience', 'zh'],
    () => experienceQueries.getAll('zh')
  );
  const { data: enExperiences, mutate: mutateEn } = useSWR(
    ['experience', 'en'],
    () => experienceQueries.getAll('en')
  );

  const [zhForm, setZhForm] = useState<Experience>(emptyData);
  const [enForm, setEnForm] = useState<Experience>(emptyData);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    const order = zhExperiences?.data?.length || 0;
    setZhForm({ ...emptyData, display_order: order });
    setEnForm({ ...emptyData, display_order: order });
    setZhAchievementInput('');
    setEnAchievementInput('');
  };

  const handleEdit = (zhExp: any) => {
    setIsCreating(false);
    setEditingId(zhExp.id);

    // Find matching English version
    const enExp = enExperiences?.data?.find((e: any) => e.display_order === zhExp.display_order) || {};

    setZhForm({
      id: zhExp.id,
      role: zhExp.role || '',
      company: zhExp.company || '',
      period: zhExp.period || '',
      description: zhExp.description || '',
      achievements: zhExp.achievements || [],
      display_order: zhExp.display_order
    });

    setEnForm({
      id: enExp.id,
      role: enExp.role || '',
      company: enExp.company || '',
      period: enExp.period || zhExp.period || '',
      description: enExp.description || '',
      achievements: enExp.achievements || [],
      display_order: enExp.display_order || zhExp.display_order
    });

    setZhAchievementInput('');
    setEnAchievementInput('');
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  const handleTranslate = async () => {
    setTranslating(true);
    setError('');

    try {
      const newEnForm = { ...enForm };

      // Copy non-translatable fields
      newEnForm.period = zhForm.period;
      newEnForm.display_order = zhForm.display_order;

      // Translate text fields
      if (zhForm.role) {
        const result = await translateToEnglish(zhForm.role);
        newEnForm.role = result.text;
      }
      if (zhForm.company) {
        const result = await translateToEnglish(zhForm.company);
        newEnForm.company = result.text;
      }
      if (zhForm.description) {
        const result = await translateToEnglish(zhForm.description);
        newEnForm.description = result.text;
      }

      // Translate achievements array
      if (zhForm.achievements.length > 0) {
        newEnForm.achievements = await translateArrayToEnglish(zhForm.achievements);
      }

      setEnForm(newEnForm);
      setSuccess('Translation completed! Review and adjust if needed.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Translation failed: ' + (err.message || 'Unknown error'));
    } finally {
      setTranslating(false);
    }
  };

  const handleAddZhAchievement = () => {
    if (zhAchievementInput.trim()) {
      setZhForm(prev => ({
        ...prev,
        achievements: [...prev.achievements, zhAchievementInput.trim()]
      }));
      setZhAchievementInput('');
    }
  };

  const handleAddEnAchievement = () => {
    if (enAchievementInput.trim()) {
      setEnForm(prev => ({
        ...prev,
        achievements: [...prev.achievements, enAchievementInput.trim()]
      }));
      setEnAchievementInput('');
    }
  };

  const handleRemoveZhAchievement = (index: number) => {
    setZhForm(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveEnAchievement = (index: number) => {
    setEnForm(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!zhForm.role || !zhForm.company) {
      setError('Role and company are required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        // Create both versions
        await experienceQueries.create({ lang: 'zh', ...zhForm });
        await experienceQueries.create({ lang: 'en', ...enForm });
      } else if (editingId) {
        // Update Chinese version
        await experienceQueries.update(editingId, { lang: 'zh', ...zhForm });

        // Update or create English version
        if (enForm.id) {
          await experienceQueries.update(enForm.id, { lang: 'en', ...enForm });
        } else {
          await experienceQueries.create({ lang: 'en', ...enForm });
        }
      }

      await Promise.all([mutateZh(), mutateEn()]);
      setSuccess('Saved successfully!');
      setTimeout(() => {
        setSuccess('');
        handleCancel();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, displayOrder: number) => {
    if (!confirm('Delete this experience from both languages?')) return;

    try {
      // Delete Chinese version
      await experienceQueries.delete(id);

      // Find and delete English version
      const enExp = enExperiences?.data?.find((e: any) => e.display_order === displayOrder);
      if (enExp?.id) {
        await experienceQueries.delete(enExp.id);
      }

      await Promise.all([mutateZh(), mutateEn()]);
    } catch (err) {
      setError('Failed to delete experience');
    }
  };

  const isEditing = isCreating || editingId !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Experience</h1>
          <p className="text-slate-600 text-sm">Fill in Chinese, auto-translate to English, then adjust</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors"
          >
            <Plus size={18} />
            Add Experience
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
          <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}

      {isEditing && (
        <div className="mb-6 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              {isCreating ? 'Add New Experience' : 'Edit Experience'}
            </h3>
            <div className="flex gap-3">
              <button
                onClick={handleTranslate}
                disabled={translating}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {translating ? <Loader2 size={18} className="animate-spin" /> : <Languages size={18} />}
                {translating ? 'Translating...' : 'Auto Translate'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Both'}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>

          {/* Header showing columns */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200 mb-6">
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                Chinese (主要填写)
              </span>
            </div>
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                English (自动翻译/可调整)
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Role */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role / Position (中文) *</label>
                <input
                  type="text"
                  value={zhForm.role}
                  onChange={(e) => setZhForm({ ...zhForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="投资总监"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role / Position (English) *</label>
                <input
                  type="text"
                  value={enForm.role}
                  onChange={(e) => setEnForm({ ...enForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="Investment Director"
                />
              </div>
            </div>

            {/* Company */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company (中文) *</label>
                <input
                  type="text"
                  value={zhForm.company}
                  onChange={(e) => setZhForm({ ...zhForm, company: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="某某公司"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company (English) *</label>
                <input
                  type="text"
                  value={enForm.company}
                  onChange={(e) => setEnForm({ ...enForm, company: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="Company Name"
                />
              </div>
            </div>

            {/* Period - same for both */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Period (same for both)</label>
              <input
                type="text"
                value={zhForm.period}
                onChange={(e) => {
                  setZhForm({ ...zhForm, period: e.target.value });
                  setEnForm({ ...enForm, period: e.target.value });
                }}
                className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                placeholder="2020.04 - 2022.08"
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (中文)</label>
                <textarea
                  value={zhForm.description}
                  onChange={(e) => setZhForm({ ...zhForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm"
                  placeholder="职位描述..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (English)</label>
                <textarea
                  value={enForm.description}
                  onChange={(e) => setEnForm({ ...enForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm bg-blue-50"
                  placeholder="Job description..."
                />
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Achievements (中文)</label>
                <div className="space-y-2">
                  {zhForm.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                      <span className="flex-1 text-sm text-slate-700">{achievement}</span>
                      <button
                        onClick={() => handleRemoveZhAchievement(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={zhAchievementInput}
                      onChange={(e) => setZhAchievementInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddZhAchievement()}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                      placeholder="添加成就..."
                    />
                    <button
                      onClick={handleAddZhAchievement}
                      className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Achievements (English)</label>
                <div className="space-y-2">
                  {enForm.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <span className="flex-1 text-sm text-slate-700">{achievement}</span>
                      <button
                        onClick={() => handleRemoveEnAchievement(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={enAchievementInput}
                      onChange={(e) => setEnAchievementInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddEnAchievement()}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                      placeholder="Add achievement..."
                    />
                    <button
                      onClick={handleAddEnAchievement}
                      className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
              <input
                type="number"
                value={zhForm.display_order}
                onChange={(e) => {
                  const order = parseInt(e.target.value);
                  setZhForm({ ...zhForm, display_order: order });
                  setEnForm({ ...enForm, display_order: order });
                }}
                className="w-32 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Experience List - Show Chinese entries as master list */}
      <div className="space-y-4">
        {zhExperiences?.data && zhExperiences.data.length === 0 && !isEditing && (
          <p className="text-slate-500 text-center py-8">No experiences yet. Add your first one!</p>
        )}
        {zhExperiences?.data?.map((exp: any) => {
          const enExp = enExperiences?.data?.find((e: any) => e.display_order === exp.display_order);
          return (
            <div
              key={exp.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex gap-4 mb-2">
                    <div className="flex-1">
                      <span className="text-xs text-red-600 font-medium">中文</span>
                      <h3 className="text-lg font-semibold text-slate-900">{exp.role}</h3>
                      <p className="text-sm text-brand-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-blue-600 font-medium">English</span>
                      <h3 className="text-lg font-semibold text-slate-900">{enExp?.role || '-'}</h3>
                      <p className="text-sm text-brand-600 font-medium">{enExp?.company || '-'}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{exp.period}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id, exp.display_order)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              {(exp.achievements?.length > 0 || enExp?.achievements?.length > 0) && (
                <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100">
                  <div>
                    {exp.achievements?.slice(0, 2).map((a: string, idx: number) => (
                      <p key={idx} className="text-sm text-slate-600">• {a}</p>
                    ))}
                    {exp.achievements?.length > 2 && (
                      <p className="text-sm text-slate-400">+{exp.achievements.length - 2} more</p>
                    )}
                  </div>
                  <div>
                    {enExp?.achievements?.slice(0, 2).map((a: string, idx: number) => (
                      <p key={idx} className="text-sm text-slate-600">• {a}</p>
                    ))}
                    {enExp?.achievements?.length > 2 && (
                      <p className="text-sm text-slate-400">+{enExp.achievements.length - 2} more</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceEditor;
