import React, { useState } from 'react';
import useSWR from 'swr';
import { skillsQueries } from '../../lib/supabaseQueries';
import { translateToEnglish } from '../../lib/translateService';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle, Languages, Loader2, Target } from 'lucide-react';

interface Skill {
  id?: string;
  subject: string;
  score: number;
  full_mark: number;
  display_order: number;
}

const emptyData: Skill = {
  subject: '',
  score: 80,
  full_mark: 100,
  display_order: 0
};

const SkillsEditor: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { data: zhSkills, mutate: mutateZh } = useSWR(
    ['skills', 'zh'],
    () => skillsQueries.getAll('zh')
  );
  const { data: enSkills, mutate: mutateEn } = useSWR(
    ['skills', 'en'],
    () => skillsQueries.getAll('en')
  );

  const [zhForm, setZhForm] = useState<Skill>(emptyData);
  const [enForm, setEnForm] = useState<Skill>(emptyData);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    const order = zhSkills?.data?.length || 0;
    setZhForm({ ...emptyData, display_order: order });
    setEnForm({ ...emptyData, display_order: order });
  };

  const handleEdit = (zhSkill: any) => {
    setIsCreating(false);
    setEditingId(zhSkill.id);

    const enSkill = enSkills?.data?.find((s: any) => s.display_order === zhSkill.display_order) || {};

    setZhForm({
      id: zhSkill.id,
      subject: zhSkill.subject || '',
      score: zhSkill.score,
      full_mark: zhSkill.full_mark,
      display_order: zhSkill.display_order
    });

    setEnForm({
      id: enSkill.id,
      subject: enSkill.subject || '',
      score: enSkill.score || zhSkill.score,
      full_mark: enSkill.full_mark || zhSkill.full_mark,
      display_order: enSkill.display_order || zhSkill.display_order
    });
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

      // Copy numeric fields
      newEnForm.score = zhForm.score;
      newEnForm.full_mark = zhForm.full_mark;
      newEnForm.display_order = zhForm.display_order;

      // Translate subject
      if (zhForm.subject) {
        const result = await translateToEnglish(zhForm.subject);
        newEnForm.subject = result.text;
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

  const handleSave = async () => {
    if (!zhForm.subject) {
      setError('Subject is required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        await skillsQueries.create({ lang: 'zh', ...zhForm });
        await skillsQueries.create({ lang: 'en', ...enForm });
      } else if (editingId) {
        await skillsQueries.update(editingId, { lang: 'zh', ...zhForm });

        if (enForm.id) {
          await skillsQueries.update(enForm.id, { lang: 'en', ...enForm });
        } else {
          await skillsQueries.create({ lang: 'en', ...enForm });
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
    if (!confirm('Delete this skill from both languages?')) return;

    try {
      await skillsQueries.delete(id);

      const enSkill = enSkills?.data?.find((s: any) => s.display_order === displayOrder);
      if (enSkill?.id) {
        await skillsQueries.delete(enSkill.id);
      }

      await Promise.all([mutateZh(), mutateEn()]);
    } catch (err) {
      setError('Failed to delete skill');
    }
  };

  const isEditing = isCreating || editingId !== null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Skills</h1>
          <p className="text-slate-600 text-sm">Fill in Chinese, auto-translate to English, then adjust</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors"
          >
            <Plus size={18} />
            Add Skill
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
              {isCreating ? 'Add New Skill' : 'Edit Skill'}
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
            {/* Subject Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Skill Name (中文) *</label>
                <input
                  type="text"
                  value={zhForm.subject}
                  onChange={(e) => setZhForm({ ...zhForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="人工智能/科技"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Skill Name (English) *</label>
                <input
                  type="text"
                  value={enForm.subject}
                  onChange={(e) => setEnForm({ ...enForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="AI/Tech"
                />
              </div>
            </div>

            {/* Score - same for both */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Score: {zhForm.score} (same for both)
              </label>
              <input
                type="range"
                min="0"
                max={zhForm.full_mark}
                value={zhForm.score}
                onChange={(e) => {
                  const score = parseInt(e.target.value);
                  setZhForm({ ...zhForm, score });
                  setEnForm({ ...enForm, score });
                }}
                className="w-full max-w-md h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1 max-w-md">
                <span>0</span>
                <span>{zhForm.full_mark / 2}</span>
                <span>{zhForm.full_mark}</span>
              </div>
            </div>

            {/* Full Mark & Display Order */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Mark</label>
                <input
                  type="number"
                  value={zhForm.full_mark}
                  onChange={(e) => {
                    const full_mark = parseInt(e.target.value);
                    setZhForm({ ...zhForm, full_mark });
                    setEnForm({ ...enForm, full_mark });
                  }}
                  className="w-32 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                />
              </div>
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
        </div>
      )}

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zhSkills?.data && zhSkills.data.length === 0 && !isEditing && (
          <p className="text-slate-500 text-center py-8 col-span-full">No skills yet. Add your first one!</p>
        )}
        {zhSkills?.data?.map((skill: any) => {
          const enSkill = enSkills?.data?.find((s: any) => s.display_order === skill.display_order);
          return (
            <div
              key={skill.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Target className="text-red-600" size={20} />
                  </div>
                  <div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-red-600 font-medium">中</span>
                      <span className="font-semibold text-slate-900">{skill.subject}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-blue-600 font-medium">En</span>
                      <span className="text-sm text-slate-600">{enSkill?.subject || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id, skill.display_order)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Score</span>
                  <span className="font-medium text-slate-900">{skill.score}/{skill.full_mark}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getScoreColor(skill.score)}`}
                    style={{ width: `${(skill.score / skill.full_mark) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsEditor;
