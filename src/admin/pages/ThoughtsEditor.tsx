import React, { useState } from 'react';
import useSWR from 'swr';
import { thoughtsQueries } from '../../lib/supabaseQueries';
import { translateToEnglish } from '../../lib/translateService';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle, Languages, Loader2, FileText, ExternalLink } from 'lucide-react';

interface Thought {
  id?: string;
  title: string;
  date: string;
  tags: string[];
  snippet: string;
  content: string;
  link: string;
  read_time: string;
  display_order: number;
}

const emptyData: Thought = {
  title: '',
  date: new Date().toISOString().split('T')[0],
  tags: [],
  snippet: '',
  content: '',
  link: '',
  read_time: '5 min read',
  display_order: 0
};

const ThoughtsEditor: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tagInput, setTagInput] = useState('');

  const { data: zhThoughts, mutate: mutateZh } = useSWR(
    ['thoughts', 'zh'],
    () => thoughtsQueries.getAll('zh')
  );
  const { data: enThoughts, mutate: mutateEn } = useSWR(
    ['thoughts', 'en'],
    () => thoughtsQueries.getAll('en')
  );

  const [zhForm, setZhForm] = useState<Thought>(emptyData);
  const [enForm, setEnForm] = useState<Thought>(emptyData);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    const order = zhThoughts?.data?.length || 0;
    setZhForm({ ...emptyData, display_order: order });
    setEnForm({ ...emptyData, display_order: order });
    setTagInput('');
  };

  const handleEdit = (zhThought: any) => {
    setIsCreating(false);
    setEditingId(zhThought.id);

    const enThought = enThoughts?.data?.find((t: any) => t.display_order === zhThought.display_order) || {};

    setZhForm({
      id: zhThought.id,
      title: zhThought.title || '',
      date: zhThought.date || '',
      tags: zhThought.tags || [],
      snippet: zhThought.snippet || '',
      content: zhThought.content || '',
      link: zhThought.link || '',
      read_time: zhThought.read_time || '',
      display_order: zhThought.display_order
    });

    setEnForm({
      id: enThought.id,
      title: enThought.title || '',
      date: enThought.date || zhThought.date || '',
      tags: enThought.tags || zhThought.tags || [],
      snippet: enThought.snippet || '',
      content: enThought.content || '',
      link: enThought.link || zhThought.link || '',
      read_time: enThought.read_time || zhThought.read_time || '',
      display_order: enThought.display_order || zhThought.display_order
    });

    setTagInput('');
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
      newEnForm.date = zhForm.date;
      newEnForm.tags = zhForm.tags;
      newEnForm.link = zhForm.link;
      newEnForm.read_time = zhForm.read_time;
      newEnForm.display_order = zhForm.display_order;

      // Translate text fields
      if (zhForm.title) {
        const result = await translateToEnglish(zhForm.title);
        newEnForm.title = result.text;
      }
      if (zhForm.snippet) {
        const result = await translateToEnglish(zhForm.snippet);
        newEnForm.snippet = result.text;
      }
      if (zhForm.content) {
        const result = await translateToEnglish(zhForm.content);
        newEnForm.content = result.text;
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

  const handleAddTag = () => {
    if (tagInput.trim()) {
      const newTags = [...zhForm.tags, tagInput.trim()];
      setZhForm(prev => ({ ...prev, tags: newTags }));
      setEnForm(prev => ({ ...prev, tags: newTags }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = zhForm.tags.filter((_, i) => i !== index);
    setZhForm(prev => ({ ...prev, tags: newTags }));
    setEnForm(prev => ({ ...prev, tags: newTags }));
  };

  const handleSave = async () => {
    if (!zhForm.title) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        await thoughtsQueries.create({ lang: 'zh', ...zhForm });
        await thoughtsQueries.create({ lang: 'en', ...enForm });
      } else if (editingId) {
        await thoughtsQueries.update(editingId, { lang: 'zh', ...zhForm });

        if (enForm.id) {
          await thoughtsQueries.update(enForm.id, { lang: 'en', ...enForm });
        } else {
          await thoughtsQueries.create({ lang: 'en', ...enForm });
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
    if (!confirm('Delete this thought from both languages?')) return;

    try {
      await thoughtsQueries.delete(id);

      const enThought = enThoughts?.data?.find((t: any) => t.display_order === displayOrder);
      if (enThought?.id) {
        await thoughtsQueries.delete(enThought.id);
      }

      await Promise.all([mutateZh(), mutateEn()]);
    } catch (err) {
      setError('Failed to delete thought');
    }
  };

  const isEditing = isCreating || editingId !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Thoughts</h1>
          <p className="text-slate-600 text-sm">Fill in Chinese, auto-translate to English, then adjust</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors"
          >
            <Plus size={18} />
            Add Thought
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
              {isCreating ? 'Add New Thought' : 'Edit Thought'}
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
            {/* Title */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title (中文) *</label>
                <input
                  type="text"
                  value={zhForm.title}
                  onChange={(e) => setZhForm({ ...zhForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="文章标题"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title (English) *</label>
                <input
                  type="text"
                  value={enForm.title}
                  onChange={(e) => setEnForm({ ...enForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="Article Title"
                />
              </div>
            </div>

            {/* Date & Read Time - same for both */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date (same for both)</label>
                <input
                  type="date"
                  value={zhForm.date}
                  onChange={(e) => {
                    setZhForm({ ...zhForm, date: e.target.value });
                    setEnForm({ ...enForm, date: e.target.value });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Read Time (same for both)</label>
                <input
                  type="text"
                  value={zhForm.read_time}
                  onChange={(e) => {
                    setZhForm({ ...zhForm, read_time: e.target.value });
                    setEnForm({ ...enForm, read_time: e.target.value });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="5 min read"
                />
              </div>
            </div>

            {/* Tags - same for both */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tags (same for both)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {zhForm.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(index)}
                      className="hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="flex-1 max-w-md px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="Add a tag..."
                />
                <button
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Snippet */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Snippet (中文)</label>
                <textarea
                  value={zhForm.snippet}
                  onChange={(e) => setZhForm({ ...zhForm, snippet: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm"
                  placeholder="简短预览..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Snippet (English)</label>
                <textarea
                  value={enForm.snippet}
                  onChange={(e) => setEnForm({ ...enForm, snippet: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm bg-blue-50"
                  placeholder="Brief preview..."
                />
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content (中文)</label>
                <textarea
                  value={zhForm.content}
                  onChange={(e) => setZhForm({ ...zhForm, content: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm font-mono"
                  placeholder="完整文章内容 (支持markdown)..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content (English)</label>
                <textarea
                  value={enForm.content}
                  onChange={(e) => setEnForm({ ...enForm, content: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm font-mono bg-blue-50"
                  placeholder="Full article content (supports markdown)..."
                />
              </div>
            </div>

            {/* Link - same for both */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">External Link (same for both)</label>
              <input
                type="url"
                value={zhForm.link}
                onChange={(e) => {
                  setZhForm({ ...zhForm, link: e.target.value });
                  setEnForm({ ...enForm, link: e.target.value });
                }}
                className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                placeholder="https://example.com/article"
              />
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

      {/* Thoughts List */}
      <div className="space-y-4">
        {zhThoughts?.data && zhThoughts.data.length === 0 && !isEditing && (
          <p className="text-slate-500 text-center py-8">No thoughts yet. Add your first one!</p>
        )}
        {zhThoughts?.data?.map((thought: any) => {
          const enThought = enThoughts?.data?.find((t: any) => t.display_order === thought.display_order);
          return (
            <div
              key={thought.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="text-indigo-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <span className="text-xs text-red-600 font-medium">中文</span>
                        <h3 className="text-lg font-semibold text-slate-900">{thought.title}</h3>
                      </div>
                      <div>
                        <span className="text-xs text-blue-600 font-medium">English</span>
                        <h3 className="text-lg font-semibold text-slate-900">{enThought?.title || '-'}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span>{thought.date}</span>
                      {thought.read_time && <span>• {thought.read_time}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {thought.link && (
                    <a
                      href={thought.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(thought)}
                    className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(thought.id, thought.display_order)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {thought.tags && thought.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {thought.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {thought.content && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">Has inline content</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThoughtsEditor;
