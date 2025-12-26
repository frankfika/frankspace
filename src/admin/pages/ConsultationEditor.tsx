import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { supabase } from '../../lib/supabase';
import { translateToEnglish, translateArrayToEnglish } from '../../lib/translateService';
import { Save, AlertCircle, CheckCircle, Plus, Trash2, Languages, Loader2 } from 'lucide-react';

interface Consultation {
  title: string;
  price: string;
  description: string;
  topics: string[];
  cta: string;
}

const emptyData: Consultation = {
  title: '',
  price: '',
  description: '',
  topics: [],
  cta: ''
};

const fetchConsultation = async (lang: string) => {
  const { data, error } = await supabase
    .from('consultation')
    .select('*')
    .eq('lang', lang)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const ConsultationEditor: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [zhTopicInput, setZhTopicInput] = useState('');
  const [enTopicInput, setEnTopicInput] = useState('');

  const { data: zhData, mutate: mutateZh } = useSWR(['consultation', 'zh'], () => fetchConsultation('zh'));
  const { data: enData, mutate: mutateEn } = useSWR(['consultation', 'en'], () => fetchConsultation('en'));

  const [zhForm, setZhForm] = useState<Consultation>(emptyData);
  const [enForm, setEnForm] = useState<Consultation>(emptyData);

  useEffect(() => {
    if (zhData) {
      setZhForm({
        title: zhData.title || '',
        price: zhData.price || '',
        description: zhData.description || '',
        topics: zhData.topics || [],
        cta: zhData.cta || ''
      });
    }
  }, [zhData]);

  useEffect(() => {
    if (enData) {
      setEnForm({
        title: enData.title || '',
        price: enData.price || '',
        description: enData.description || '',
        topics: enData.topics || [],
        cta: enData.cta || ''
      });
    }
  }, [enData]);

  const handleTranslate = async () => {
    setTranslating(true);
    setError('');

    try {
      const newEnForm = { ...enForm };

      // Translate all text fields
      if (zhForm.title) {
        const result = await translateToEnglish(zhForm.title);
        newEnForm.title = result.text;
      }
      if (zhForm.price) {
        const result = await translateToEnglish(zhForm.price);
        newEnForm.price = result.text;
      }
      if (zhForm.description) {
        const result = await translateToEnglish(zhForm.description);
        newEnForm.description = result.text;
      }
      if (zhForm.cta) {
        const result = await translateToEnglish(zhForm.cta);
        newEnForm.cta = result.text;
      }

      // Translate topics array
      if (zhForm.topics.length > 0) {
        newEnForm.topics = await translateArrayToEnglish(zhForm.topics);
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

  const handleAddZhTopic = () => {
    if (zhTopicInput.trim()) {
      setZhForm(prev => ({
        ...prev,
        topics: [...prev.topics, zhTopicInput.trim()]
      }));
      setZhTopicInput('');
    }
  };

  const handleAddEnTopic = () => {
    if (enTopicInput.trim()) {
      setEnForm(prev => ({
        ...prev,
        topics: [...prev.topics, enTopicInput.trim()]
      }));
      setEnTopicInput('');
    }
  };

  const handleRemoveZhTopic = (index: number) => {
    setZhForm(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveEnTopic = (index: number) => {
    setEnForm(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
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
      // Save Chinese version
      const { error: zhError } = await supabase
        .from('consultation')
        .upsert({ lang: 'zh', ...zhForm }, { onConflict: 'lang' });
      if (zhError) throw zhError;

      // Save English version
      const { error: enError } = await supabase
        .from('consultation')
        .upsert({ lang: 'en', ...enForm }, { onConflict: 'lang' });
      if (enError) throw enError;

      await Promise.all([mutateZh(), mutateEn()]);
      setSuccess('Saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Consultation</h1>
          <p className="text-slate-600 text-sm">Fill in Chinese, auto-translate to English, then adjust</p>
        </div>
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
        </div>
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

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        {/* Header showing columns */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200">
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

        {/* Title */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title (中文) *</label>
            <input
              type="text"
              value={zhForm.title}
              onChange={(e) => setZhForm({ ...zhForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
              placeholder="战略咨询"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title (English) *</label>
            <input
              type="text"
              value={enForm.title}
              onChange={(e) => setEnForm({ ...enForm, title: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
              placeholder="Strategic Consultation"
            />
          </div>
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price (中文)</label>
            <input
              type="text"
              value={zhForm.price}
              onChange={(e) => setZhForm({ ...zhForm, price: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
              placeholder="3,000 元/小时"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price (English)</label>
            <input
              type="text"
              value={enForm.price}
              onChange={(e) => setEnForm({ ...enForm, price: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
              placeholder="3,000 RMB / hr"
            />
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description (中文)</label>
            <textarea
              value={zhForm.description}
              onChange={(e) => setZhForm({ ...zhForm, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm"
              placeholder="描述您的咨询服务..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description (English)</label>
            <textarea
              value={enForm.description}
              onChange={(e) => setEnForm({ ...enForm, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm bg-blue-50"
              placeholder="Describe your consultation services..."
            />
          </div>
        </div>

        {/* Topics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Topics Covered (中文)</label>
            <div className="space-y-2">
              {zhForm.topics.map((topic, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <span className="flex-1 text-sm text-slate-700">{topic}</span>
                  <button
                    onClick={() => handleRemoveZhTopic(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={zhTopicInput}
                  onChange={(e) => setZhTopicInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddZhTopic()}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="添加咨询主题..."
                />
                <button
                  onClick={handleAddZhTopic}
                  className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Topics Covered (English)</label>
            <div className="space-y-2">
              {enForm.topics.map((topic, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                  <span className="flex-1 text-sm text-slate-700">{topic}</span>
                  <button
                    onClick={() => handleRemoveEnTopic(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={enTopicInput}
                  onChange={(e) => setEnTopicInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddEnTopic()}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="Add consultation topic..."
                />
                <button
                  onClick={handleAddEnTopic}
                  className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Call to Action Button (中文)</label>
            <input
              type="text"
              value={zhForm.cta}
              onChange={(e) => setZhForm({ ...zhForm, cta: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
              placeholder="预约咨询"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Call to Action Button (English)</label>
            <input
              type="text"
              value={enForm.cta}
              onChange={(e) => setEnForm({ ...enForm, cta: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
              placeholder="Book a Session"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Preview</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
            <span className="text-xs text-red-600 font-medium">中文预览</span>
            <h4 className="text-2xl font-bold text-slate-900 mb-2">{zhForm.title || '咨询标题'}</h4>
            <p className="text-3xl font-bold text-brand-600 mb-4">{zhForm.price || '价格'}</p>
            <p className="text-slate-600 mb-4">{zhForm.description || '描述将显示在这里...'}</p>
            {zhForm.topics.length > 0 && (
              <ul className="space-y-2 mb-6">
                {zhForm.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            )}
            <button className="px-6 py-3 bg-brand-600 text-white rounded-lg font-medium shadow">
              {zhForm.cta || '立即预约'}
            </button>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <span className="text-xs text-blue-600 font-medium">English Preview</span>
            <h4 className="text-2xl font-bold text-slate-900 mb-2">{enForm.title || 'Consultation Title'}</h4>
            <p className="text-3xl font-bold text-brand-600 mb-4">{enForm.price || 'Price'}</p>
            <p className="text-slate-600 mb-4">{enForm.description || 'Description will appear here...'}</p>
            {enForm.topics.length > 0 && (
              <ul className="space-y-2 mb-6">
                {enForm.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            )}
            <button className="px-6 py-3 bg-brand-600 text-white rounded-lg font-medium shadow">
              {enForm.cta || 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationEditor;
