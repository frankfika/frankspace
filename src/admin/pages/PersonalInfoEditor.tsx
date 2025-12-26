import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { supabase } from '../../lib/supabase';
import { translateToEnglish } from '../../lib/translateService';
import { Save, AlertCircle, CheckCircle, Languages, Loader2 } from 'lucide-react';

interface PersonalInfo {
  name: string;
  tagline: string;
  email: string;
  github: string;
  mobile: string;
  location: string;
  summary: string;
  availability: string;
  contact_btn: string;
  resume_btn: string;
  years_exp: string;
  money_managed: string;
  years_label: string;
  money_label: string;
}

const emptyData: PersonalInfo = {
  name: '',
  tagline: '',
  email: '',
  github: '',
  mobile: '',
  location: '',
  summary: '',
  availability: '',
  contact_btn: '',
  resume_btn: '',
  years_exp: '',
  money_managed: '',
  years_label: '',
  money_label: ''
};

const fetchPersonalInfo = async (lang: string) => {
  const { data, error } = await supabase
    .from('personal_info')
    .select('*')
    .eq('lang', lang)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

const PersonalInfoEditor: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { data: zhData, mutate: mutateZh } = useSWR(['personal_info', 'zh'], () => fetchPersonalInfo('zh'));
  const { data: enData, mutate: mutateEn } = useSWR(['personal_info', 'en'], () => fetchPersonalInfo('en'));

  const [zhForm, setZhForm] = useState<PersonalInfo>(emptyData);
  const [enForm, setEnForm] = useState<PersonalInfo>(emptyData);

  useEffect(() => {
    if (zhData) {
      setZhForm({
        name: zhData.name || '',
        tagline: zhData.tagline || '',
        email: zhData.email || '',
        github: zhData.github || '',
        mobile: zhData.mobile || '',
        location: zhData.location || '',
        summary: zhData.summary || '',
        availability: zhData.availability || '',
        contact_btn: zhData.contact_btn || '',
        resume_btn: zhData.resume_btn || '',
        years_exp: zhData.years_exp || '',
        money_managed: zhData.money_managed || '',
        years_label: zhData.years_label || '',
        money_label: zhData.money_label || ''
      });
    }
  }, [zhData]);

  useEffect(() => {
    if (enData) {
      setEnForm({
        name: enData.name || '',
        tagline: enData.tagline || '',
        email: enData.email || '',
        github: enData.github || '',
        mobile: enData.mobile || '',
        location: enData.location || '',
        summary: enData.summary || '',
        availability: enData.availability || '',
        contact_btn: enData.contact_btn || '',
        resume_btn: enData.resume_btn || '',
        years_exp: enData.years_exp || '',
        money_managed: enData.money_managed || '',
        years_label: enData.years_label || '',
        money_label: enData.money_label || ''
      });
    }
  }, [enData]);

  const handleTranslate = async () => {
    setTranslating(true);
    setError('');

    try {
      // Fields that need translation (exclude email, github, mobile which are same)
      const fieldsToTranslate: (keyof PersonalInfo)[] = [
        'tagline', 'location', 'summary', 'availability',
        'contact_btn', 'resume_btn', 'years_label', 'money_label'
      ];

      const newEnForm = { ...enForm };

      // Keep fields that don't need translation
      newEnForm.name = zhForm.name;
      newEnForm.email = zhForm.email;
      newEnForm.github = zhForm.github;
      newEnForm.mobile = zhForm.mobile;
      newEnForm.years_exp = zhForm.years_exp;
      newEnForm.money_managed = zhForm.money_managed;

      // Translate other fields
      for (const field of fieldsToTranslate) {
        if (zhForm[field]) {
          const result = await translateToEnglish(zhForm[field]);
          newEnForm[field] = result.text;
        }
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
    if (!zhForm.name || !zhForm.tagline) {
      setError('Name and tagline are required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Save Chinese version
      const { error: zhError } = await supabase
        .from('personal_info')
        .upsert({ lang: 'zh', ...zhForm }, { onConflict: 'lang' });
      if (zhError) throw zhError;

      // Save English version
      const { error: enError } = await supabase
        .from('personal_info')
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

  const handleZhChange = (field: keyof PersonalInfo, value: string) => {
    setZhForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEnChange = (field: keyof PersonalInfo, value: string) => {
    setEnForm(prev => ({ ...prev, [field]: value }));
  };

  const renderField = (
    label: string,
    field: keyof PersonalInfo,
    type: 'input' | 'textarea' = 'input',
    placeholder?: { zh: string; en: string }
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4" key={field}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label} (中文)</label>
        {type === 'textarea' ? (
          <textarea
            value={zhForm[field]}
            onChange={(e) => handleZhChange(field, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm"
            placeholder={placeholder?.zh}
          />
        ) : (
          <input
            type="text"
            value={zhForm[field]}
            onChange={(e) => handleZhChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
            placeholder={placeholder?.zh}
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{label} (English)</label>
        {type === 'textarea' ? (
          <textarea
            value={enForm[field]}
            onChange={(e) => handleEnChange(field, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm bg-blue-50"
            placeholder={placeholder?.en}
          />
        ) : (
          <input
            type="text"
            value={enForm[field]}
            onChange={(e) => handleEnChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
            placeholder={placeholder?.en}
          />
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Personal Info</h1>
          <p className="text-slate-600 text-xs sm:text-sm">Fill in Chinese, auto-translate to English, then adjust</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={handleTranslate}
            disabled={translating}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
          >
            {translating ? <Loader2 size={16} className="animate-spin sm:w-[18px] sm:h-[18px]" /> : <Languages size={16} className="sm:w-[18px] sm:h-[18px]" />}
            <span className="hidden sm:inline">{translating ? 'Translating...' : 'Auto Translate'}</span>
            <span className="sm:hidden">{translating ? '...' : 'Translate'}</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
          >
            <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save Both'}</span>
            <span className="sm:hidden">{saving ? '...' : 'Save'}</span>
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

      <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header showing columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-200">
          <div className="text-center">
            <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm font-medium">
              Chinese (主要填写)
            </span>
          </div>
          <div className="text-center">
            <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
              English (自动翻译/可调整)
            </span>
          </div>
        </div>

        {/* Basic Info */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Basic Information</h3>
          <div className="space-y-3 sm:space-y-4">
            {renderField('Name', 'name', 'input', { zh: 'Frank Chen', en: 'Frank Chen' })}
            {renderField('Tagline', 'tagline', 'input', { zh: '战略运营专家', en: 'Strategic Operations Expert' })}
            {renderField('Location', 'location', 'input', { zh: '中国', en: 'China' })}
            {renderField('Summary', 'summary', 'textarea', { zh: '个人简介...', en: 'About me...' })}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Contact</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email (same for both)</label>
                <input
                  type="email"
                  value={zhForm.email}
                  onChange={(e) => {
                    handleZhChange('email', e.target.value);
                    handleEnChange('email', e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mobile (same for both)</label>
                <input
                  type="text"
                  value={zhForm.mobile}
                  onChange={(e) => {
                    handleZhChange('mobile', e.target.value);
                    handleEnChange('mobile', e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="13912345678"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">GitHub (same for both)</label>
                <input
                  type="url"
                  value={zhForm.github}
                  onChange={(e) => {
                    handleZhChange('github', e.target.value);
                    handleEnChange('github', e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                {renderField('Availability', 'availability', 'input', { zh: '寻求新机会', en: 'Open to opportunities' })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Stats & Highlights</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Years Exp (same)</label>
                <input
                  type="text"
                  value={zhForm.years_exp}
                  onChange={(e) => {
                    handleZhChange('years_exp', e.target.value);
                    handleEnChange('years_exp', e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="6+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Money Managed (same)</label>
                <input
                  type="text"
                  value={zhForm.money_managed}
                  onChange={(e) => {
                    handleZhChange('money_managed', e.target.value);
                    handleEnChange('money_managed', e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="100M+"
                />
              </div>
            </div>
            {renderField('Years Label', 'years_label', 'input', { zh: '工作经验', en: 'Years Experience' })}
            {renderField('Money Label', 'money_label', 'input', { zh: '管理资金规模', en: 'RMB Managed' })}
          </div>
        </div>

        {/* Buttons */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Button Labels</h3>
          <div className="space-y-3 sm:space-y-4">
            {renderField('Contact Button', 'contact_btn', 'input', { zh: '联系我', en: 'Contact Me' })}
            {renderField('Resume Button', 'resume_btn', 'input', { zh: '简历', en: 'Resume' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoEditor;
