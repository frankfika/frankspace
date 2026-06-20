import React, { useState } from 'react';
import useSWR from 'swr';
import { socialsQueries } from '../../lib/supabaseQueries';
import { translateToEnglish } from '../../lib/translateService';
import { Plus, Edit2, Trash2, Save, X, AlertCircle, CheckCircle, Languages, Loader2, ExternalLink } from 'lucide-react';

interface Social {
  id?: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
  color: string;
  display_order: number;
}

const emptyData: Social = {
  platform: '',
  username: '',
  url: '',
  icon: 'Link',
  color: 'bg-blue-500',
  display_order: 0
};

const ICON_OPTIONS = [
  'MessageCircle', 'Rss', 'Linkedin', 'Twitter', 'Video', 'Github',
  'Mail', 'Newspaper', 'Vote', 'Instagram', 'Facebook', 'Youtube',
  'Globe', 'Link', 'Phone', 'Send'
];

const COLOR_OPTIONS = [
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Green Dark', value: 'bg-green-600' },
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Blue Dark', value: 'bg-blue-700' },
  { name: 'Black', value: 'bg-black' },
  { name: 'Pink', value: 'bg-pink-400' },
  { name: 'Slate', value: 'bg-slate-800' },
  { name: 'Indigo', value: 'bg-indigo-600' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Purple', value: 'bg-purple-600' },
  { name: 'Cyan', value: 'bg-cyan-500' }
];

const SocialsEditor: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { data: zhSocials, mutate: mutateZh } = useSWR(
    ['socials', 'zh'],
    () => socialsQueries.getAll('zh')
  );
  const { data: enSocials, mutate: mutateEn } = useSWR(
    ['socials', 'en'],
    () => socialsQueries.getAll('en')
  );

  const [zhForm, setZhForm] = useState<Social>(emptyData);
  const [enForm, setEnForm] = useState<Social>(emptyData);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    const order = zhSocials?.data?.length || 0;
    setZhForm({ ...emptyData, display_order: order });
    setEnForm({ ...emptyData, display_order: order });
  };

  const handleEdit = (zhSocial: any) => {
    setIsCreating(false);
    setEditingId(zhSocial.id);

    const enSocial = enSocials?.data?.find((s: any) => s.display_order === zhSocial.display_order) || {};

    setZhForm({
      id: zhSocial.id,
      platform: zhSocial.platform || '',
      username: zhSocial.username || '',
      url: zhSocial.url || '',
      icon: zhSocial.icon || 'Link',
      color: zhSocial.color || 'bg-blue-500',
      display_order: zhSocial.display_order
    });

    setEnForm({
      id: enSocial.id,
      platform: enSocial.platform || '',
      username: enSocial.username || '',
      url: enSocial.url || zhSocial.url || '',
      icon: enSocial.icon || zhSocial.icon || 'Link',
      color: enSocial.color || zhSocial.color || 'bg-blue-500',
      display_order: enSocial.display_order || zhSocial.display_order
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

      // Copy non-translatable fields
      newEnForm.url = zhForm.url;
      newEnForm.icon = zhForm.icon;
      newEnForm.color = zhForm.color;
      newEnForm.display_order = zhForm.display_order;

      // Translate text fields
      if (zhForm.platform) {
        const result = await translateToEnglish(zhForm.platform);
        newEnForm.platform = result.text;
      }
      if (zhForm.username) {
        const result = await translateToEnglish(zhForm.username);
        newEnForm.username = result.text;
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
    if (!zhForm.platform || !zhForm.url) {
      setError('Platform and URL are required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (isCreating) {
        await socialsQueries.create({ lang: 'zh', ...zhForm });
        await socialsQueries.create({ lang: 'en', ...enForm });
      } else if (editingId) {
        await socialsQueries.update(editingId, { lang: 'zh', ...zhForm });

        if (enForm.id) {
          await socialsQueries.update(enForm.id, { lang: 'en', ...enForm });
        } else {
          await socialsQueries.create({ lang: 'en', ...enForm });
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
    if (!confirm('Delete this social link from both languages?')) return;

    try {
      await socialsQueries.delete(id);

      const enSocial = enSocials?.data?.find((s: any) => s.display_order === displayOrder);
      if (enSocial?.id) {
        await socialsQueries.delete(enSocial.id);
      }

      await Promise.all([mutateZh(), mutateEn()]);
    } catch (err) {
      setError('Failed to delete social link');
    }
  };

  const isEditing = isCreating || editingId !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Social Links</h1>
          <p className="text-slate-600 text-sm">Fill in Chinese, auto-translate to English, then adjust</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors"
          >
            <Plus size={18} />
            Add Social Link
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
              {isCreating ? 'Add New Social Link' : 'Edit Social Link'}
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
            {/* Platform Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name (中文) *</label>
                <input
                  type="text"
                  value={zhForm.platform}
                  onChange={(e) => setZhForm({ ...zhForm, platform: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="微信, 领英"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name (English) *</label>
                <input
                  type="text"
                  value={enForm.platform}
                  onChange={(e) => setEnForm({ ...enForm, platform: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="WeChat, LinkedIn"
                />
              </div>
            </div>

            {/* Username */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username / Display Name (中文)</label>
                <input
                  type="text"
                  value={zhForm.username}
                  onChange={(e) => setZhForm({ ...zhForm, username: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="@用户名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username / Display Name (English)</label>
                <input
                  type="text"
                  value={enForm.username}
                  onChange={(e) => setEnForm({ ...enForm, username: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="@username"
                />
              </div>
            </div>

            {/* URL - same for both */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">URL (same for both) *</label>
              <input
                type="text"
                value={zhForm.url}
                onChange={(e) => {
                  setZhForm({ ...zhForm, url: e.target.value });
                  setEnForm({ ...enForm, url: e.target.value });
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                placeholder="https://linkedin.com/in/username or tel:123456789"
              />
            </div>

            {/* Icon & Color - same for both */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                <select
                  value={zhForm.icon}
                  onChange={(e) => {
                    setZhForm({ ...zhForm, icon: e.target.value });
                    setEnForm({ ...enForm, icon: e.target.value });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
                <select
                  value={zhForm.color}
                  onChange={(e) => {
                    setZhForm({ ...zhForm, color: e.target.value });
                    setEnForm({ ...enForm, color: e.target.value });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                >
                  {COLOR_OPTIONS.map((color) => (
                    <option key={color.value} value={color.value}>{color.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Color Preview */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Preview:</span>
              <div className={`w-10 h-10 ${zhForm.color} rounded-lg`}></div>
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

      {/* Socials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zhSocials?.data && zhSocials.data.length === 0 && !isEditing && (
          <p className="text-slate-500 text-center py-8 col-span-full">No social links yet. Add your first one!</p>
        )}
        {zhSocials?.data?.map((social: any) => {
          const enSocial = enSocials?.data?.find((s: any) => s.display_order === social.display_order);
          return (
            <div
              key={social.id}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${social.color || 'bg-blue-500'} rounded-lg flex items-center justify-center text-white shrink-0`}>
                  <span className="text-xs font-bold">{social.icon?.substring(0, 2) || 'LK'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-red-600 font-medium">中</span>
                    <span className="font-semibold text-slate-900 truncate">{social.platform}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-blue-600 font-medium">En</span>
                    <span className="text-sm text-slate-600 truncate">{enSocial?.platform || '-'}</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => handleEdit(social)}
                    className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(social.id, social.display_order)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialsEditor;
