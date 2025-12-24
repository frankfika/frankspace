import React, { useState } from 'react';
import useSWR from 'swr';
import { educationQueries } from '../../lib/supabaseQueries';
import { translateToEnglish, translateArrayToEnglish } from '../../lib/translateService';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle, Languages, Loader2, GraduationCap } from 'lucide-react';

interface Education {
  id?: string;
  school: string;
  degree: string;
  period: string;
  details: string[];
  display_order: number;
}

const emptyData: Education = {
  school: '',
  degree: '',
  period: '',
  details: [],
  display_order: 0
};

const EducationEditor: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [zhDetailInput, setZhDetailInput] = useState('');
  const [enDetailInput, setEnDetailInput] = useState('');

  const { data: zhEducations, mutate: mutateZh } = useSWR(
    ['education', 'zh'],
    () => educationQueries.getAll('zh')
  );
  const { data: enEducations, mutate: mutateEn } = useSWR(
    ['education', 'en'],
    () => educationQueries.getAll('en')
  );

  const [zhForm, setZhForm] = useState<Education>(emptyData);
  const [enForm, setEnForm] = useState<Education>(emptyData);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    const order = zhEducations?.data?.length || 0;
    setZhForm({ ...emptyData, display_order: order });
    setEnForm({ ...emptyData, display_order: order });
    setZhDetailInput('');
    setEnDetailInput('');
  };

  const handleEdit = (zhEdu: any) => {
    setIsCreating(false);
    setEditingId(zhEdu.id);

    const enEdu = enEducations?.data?.find((e: any) => e.display_order === zhEdu.display_order) || {};

    setZhForm({
      id: zhEdu.id,
      school: zhEdu.school || '',
      degree: zhEdu.degree || '',
      period: zhEdu.period || '',
      details: zhEdu.details || [],
      display_order: zhEdu.display_order
    });

    setEnForm({
      id: enEdu.id,
      school: enEdu.school || '',
      degree: enEdu.degree || '',
      period: enEdu.period || zhEdu.period || '',
      details: enEdu.details || [],
      display_order: enEdu.display_order || zhEdu.display_order
    });

    setZhDetailInput('');
    setEnDetailInput('');
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

      newEnForm.period = zhForm.period;
      newEnForm.display_order = zhForm.display_order;

      if (zhForm.school) {
        const result = await translateToEnglish(zhForm.school);
        newEnForm.school = result.text;
      }
      if (zhForm.degree) {
        const result = await translateToEnglish(zhForm.degree);
        newEnForm.degree = result.text;
      }

      if (zhForm.details.length > 0) {
        newEnForm.details = await translateArrayToEnglish(zhForm.details);
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

  const handleAddZhDetail = () => {
    if (zhDetailInput.trim()) {
      setZhForm(prev => ({
        ...prev,
        details: [...prev.details, zhDetailInput.trim()]
      }));
      setZhDetailInput('');
    }
  };

  const handleAddEnDetail = () => {
    if (enDetailInput.trim()) {
      setEnForm(prev => ({
        ...prev,
        details: [...prev.details, enDetailInput.trim()]
      }));
      setEnDetailInput('');
    }
  };

  const handleRemoveZhDetail = (index: number) => {
    setZhForm(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveEnDetail = (index: number) => {
    setEnForm(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!zhForm.school || !zhForm.degree) {
      setError('School and degree are required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        await educationQueries.create({ lang: 'zh', ...zhForm });
        await educationQueries.create({ lang: 'en', ...enForm });
      } else if (editingId) {
        await educationQueries.update(editingId, { lang: 'zh', ...zhForm });

        if (enForm.id) {
          await educationQueries.update(enForm.id, { lang: 'en', ...enForm });
        } else {
          await educationQueries.create({ lang: 'en', ...enForm });
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
    if (!confirm('Delete this education entry from both languages?')) return;

    try {
      await educationQueries.delete(id);

      const enEdu = enEducations?.data?.find((e: any) => e.display_order === displayOrder);
      if (enEdu?.id) {
        await educationQueries.delete(enEdu.id);
      }

      await Promise.all([mutateZh(), mutateEn()]);
    } catch (err) {
      setError('Failed to delete education');
    }
  };

  const isEditing = isCreating || editingId !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Education</h1>
          <p className="text-slate-600 text-sm">Fill in Chinese, auto-translate to English, then adjust</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors"
          >
            <Plus size={18} />
            Add Education
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
              {isCreating ? 'Add New Education' : 'Edit Education'}
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
            {/* School */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">School / University (中文) *</label>
                <input
                  type="text"
                  value={zhForm.school}
                  onChange={(e) => setZhForm({ ...zhForm, school: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="斯德哥尔摩商学院"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">School / University (English) *</label>
                <input
                  type="text"
                  value={enForm.school}
                  onChange={(e) => setEnForm({ ...enForm, school: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="Stockholm School of Economics"
                />
              </div>
            </div>

            {/* Degree */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Degree (中文) *</label>
                <input
                  type="text"
                  value={zhForm.degree}
                  onChange={(e) => setZhForm({ ...zhForm, degree: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="工商管理硕士"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Degree (English) *</label>
                <input
                  type="text"
                  value={enForm.degree}
                  onChange={(e) => setEnForm({ ...enForm, degree: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="M.Sc. in Business and Management"
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
                placeholder="2018 - 2020"
              />
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Details / Highlights (中文)</label>
                <div className="space-y-2">
                  {zhForm.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                      <span className="flex-1 text-sm text-slate-700">{detail}</span>
                      <button
                        onClick={() => handleRemoveZhDetail(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={zhDetailInput}
                      onChange={(e) => setZhDetailInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddZhDetail()}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                      placeholder="添加详情..."
                    />
                    <button
                      onClick={handleAddZhDetail}
                      className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Details / Highlights (English)</label>
                <div className="space-y-2">
                  {enForm.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                      <span className="flex-1 text-sm text-slate-700">{detail}</span>
                      <button
                        onClick={() => handleRemoveEnDetail(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={enDetailInput}
                      onChange={(e) => setEnDetailInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddEnDetail()}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                      placeholder="Add detail..."
                    />
                    <button
                      onClick={handleAddEnDetail}
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

      {/* Education List */}
      <div className="space-y-4">
        {zhEducations?.data && zhEducations.data.length === 0 && !isEditing && (
          <p className="text-slate-500 text-center py-8">No education entries yet. Add your first one!</p>
        )}
        {zhEducations?.data?.map((edu: any) => {
          const enEdu = enEducations?.data?.find((e: any) => e.display_order === edu.display_order);
          return (
            <div
              key={edu.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="text-green-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-red-600 font-medium">中文</span>
                        <h3 className="text-lg font-semibold text-slate-900">{edu.school}</h3>
                        <p className="text-sm text-brand-600 font-medium">{edu.degree}</p>
                      </div>
                      <div>
                        <span className="text-xs text-blue-600 font-medium">English</span>
                        <h3 className="text-lg font-semibold text-slate-900">{enEdu?.school || '-'}</h3>
                        <p className="text-sm text-brand-600 font-medium">{enEdu?.degree || '-'}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{edu.period}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id, edu.display_order)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              {(edu.details?.length > 0 || enEdu?.details?.length > 0) && (
                <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100 ml-16">
                  <div>
                    {edu.details?.map((d: string, idx: number) => (
                      <p key={idx} className="text-sm text-slate-600">• {d}</p>
                    ))}
                  </div>
                  <div>
                    {enEdu?.details?.map((d: string, idx: number) => (
                      <p key={idx} className="text-sm text-slate-600">• {d}</p>
                    ))}
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

export default EducationEditor;
