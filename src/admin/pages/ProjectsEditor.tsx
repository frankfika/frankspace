import React, { useState } from 'react';
import useSWR from 'swr';
import { projectsQueries, uploadImage } from '../../lib/supabaseQueries';
import { translateToEnglish } from '../../lib/translateService';
import { Plus, Edit2, Trash2, Save, X, Upload, AlertCircle, CheckCircle, Languages, Loader2, FolderOpen, ExternalLink, Github } from 'lucide-react';

interface Project {
  id?: string;
  title: string;
  tags: string[];
  description: string;
  link: string;
  github_link: string;
  image: string;
  display_order: number;
}

const emptyData: Project = {
  title: '',
  tags: [],
  description: '',
  link: '',
  github_link: '',
  image: '',
  display_order: 0
};

const ProjectsEditor: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tagInput, setTagInput] = useState('');

  const { data: zhProjects, mutate: mutateZh } = useSWR(
    ['projects', 'zh'],
    () => projectsQueries.getAll('zh')
  );
  const { data: enProjects, mutate: mutateEn } = useSWR(
    ['projects', 'en'],
    () => projectsQueries.getAll('en')
  );

  const [zhForm, setZhForm] = useState<Project>(emptyData);
  const [enForm, setEnForm] = useState<Project>(emptyData);

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    const order = zhProjects?.data?.length || 0;
    setZhForm({ ...emptyData, display_order: order });
    setEnForm({ ...emptyData, display_order: order });
    setTagInput('');
  };

  const handleEdit = (zhProject: any) => {
    setIsCreating(false);
    setEditingId(zhProject.id);

    const enProject = enProjects?.data?.find((p: any) => p.display_order === zhProject.display_order) || {};

    setZhForm({
      id: zhProject.id,
      title: zhProject.title || '',
      tags: zhProject.tags || [],
      description: zhProject.description || '',
      link: zhProject.link || '',
      github_link: zhProject.github_link || '',
      image: zhProject.image || '',
      display_order: zhProject.display_order
    });

    setEnForm({
      id: enProject.id,
      title: enProject.title || '',
      tags: enProject.tags || zhProject.tags || [],
      description: enProject.description || '',
      link: enProject.link || zhProject.link || '',
      github_link: enProject.github_link || zhProject.github_link || '',
      image: enProject.image || zhProject.image || '',
      display_order: enProject.display_order || zhProject.display_order
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
      newEnForm.link = zhForm.link;
      newEnForm.github_link = zhForm.github_link;
      newEnForm.image = zhForm.image;
      newEnForm.display_order = zhForm.display_order;

      // Translate text fields
      if (zhForm.title) {
        const result = await translateToEnglish(zhForm.title);
        newEnForm.title = result.text;
      }
      if (zhForm.description) {
        const result = await translateToEnglish(zhForm.description);
        newEnForm.description = result.text;
      }
      // Translate tags
      if (zhForm.tags && zhForm.tags.length > 0) {
        const translatedTags = await Promise.all(
          zhForm.tags.map(async (tag) => {
            const result = await translateToEnglish(tag);
            return result.text;
          })
        );
        newEnForm.tags = translatedTags;
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

  const handleAddTag = (lang: 'zh' | 'en') => {
    if (tagInput.trim()) {
      if (lang === 'zh') {
        const newTags = [...zhForm.tags, tagInput.trim()];
        setZhForm(prev => ({ ...prev, tags: newTags }));
      } else {
        const newTags = [...enForm.tags, tagInput.trim()];
        setEnForm(prev => ({ ...prev, tags: newTags }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number, lang: 'zh' | 'en') => {
    if (lang === 'zh') {
      const newTags = zhForm.tags.filter((_, i) => i !== index);
      setZhForm(prev => ({ ...prev, tags: newTags }));
    } else {
      const newTags = enForm.tags.filter((_, i) => i !== index);
      setEnForm(prev => ({ ...prev, tags: newTags }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const url = await uploadImage(file, 'projects');
      if (url) {
        setZhForm(prev => ({ ...prev, image: url }));
        setEnForm(prev => ({ ...prev, image: url }));
      }
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
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
        await projectsQueries.create({ lang: 'zh', ...zhForm });
        await projectsQueries.create({ lang: 'en', ...enForm });
      } else if (editingId) {
        await projectsQueries.update(editingId, { lang: 'zh', ...zhForm });

        if (enForm.id) {
          await projectsQueries.update(enForm.id, { lang: 'en', ...enForm });
        } else {
          await projectsQueries.create({ lang: 'en', ...enForm });
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
    if (!confirm('Delete this project from both languages?')) return;

    try {
      await projectsQueries.delete(id);

      const enProject = enProjects?.data?.find((p: any) => p.display_order === displayOrder);
      if (enProject?.id) {
        await projectsQueries.delete(enProject.id);
      }

      await Promise.all([mutateZh(), mutateEn()]);
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  const isEditing = isCreating || editingId !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Projects</h1>
          <p className="text-slate-600 text-sm">Fill in Chinese, auto-translate to English, then adjust</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors"
          >
            <Plus size={18} />
            Add Project
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
              {isCreating ? 'Add New Project' : 'Edit Project'}
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
                  placeholder="项目名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title (English) *</label>
                <input
                  type="text"
                  value={enForm.title}
                  onChange={(e) => setEnForm({ ...enForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                  placeholder="Project Name"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tags (中文)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {zhForm.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(index, 'zh')}
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
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag('zh')}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                    placeholder="输入标签后回车"
                  />
                  <button
                    onClick={() => handleAddTag('zh')}
                    className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tags (English)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {enForm.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(index, 'en')}
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
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag('en')}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm bg-blue-50"
                    placeholder="Type tag and press Enter"
                  />
                  <button
                    onClick={() => handleAddTag('en')}
                    className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
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
                  placeholder="项目描述..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (English)</label>
                <textarea
                  value={enForm.description}
                  onChange={(e) => setEnForm({ ...enForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm bg-blue-50"
                  placeholder="Project description..."
                />
              </div>
            </div>

            {/* Link - same for both */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Link (same for both)</label>
              <input
                type="url"
                value={zhForm.link}
                onChange={(e) => {
                  setZhForm({ ...zhForm, link: e.target.value });
                  setEnForm({ ...enForm, link: e.target.value });
                }}
                className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                placeholder="https://example.com"
              />
            </div>

            {/* GitHub Link - same for both */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Link (optional, same for both)</label>
              <input
                type="url"
                value={zhForm.github_link}
                onChange={(e) => {
                  setZhForm({ ...zhForm, github_link: e.target.value });
                  setEnForm({ ...enForm, github_link: e.target.value });
                }}
                className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                placeholder="https://github.com/username/repo"
              />
            </div>

            {/* Image - same for both */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image (same for both)</label>
              {zhForm.image && (
                <div className="mb-3">
                  <img src={zhForm.image} alt="" className="w-full max-w-md h-48 object-cover rounded-lg" />
                </div>
              )}
              <div className="flex gap-3">
                <input
                  type="url"
                  value={zhForm.image}
                  onChange={(e) => {
                    setZhForm({ ...zhForm, image: e.target.value });
                    setEnForm({ ...enForm, image: e.target.value });
                  }}
                  className="flex-1 max-w-md px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  placeholder="Image URL..."
                />
                <label className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors cursor-pointer">
                  <Upload size={18} />
                  {uploading ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zhProjects?.data && zhProjects.data.length === 0 && !isEditing && (
          <p className="text-slate-500 text-center py-8 col-span-full">No projects yet. Add your first one!</p>
        )}
        {zhProjects?.data?.map((project: any) => {
          const enProject = enProjects?.data?.find((p: any) => p.display_order === project.display_order);
          return (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {project.image && (
                <img src={project.image} alt="" className="w-full h-40 object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">
                      <FolderOpen className="text-yellow-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-xs text-red-600 font-medium">中文</span>
                          <h3 className="font-semibold text-slate-900">{project.title}</h3>
                        </div>
                        <div>
                          <span className="text-xs text-blue-600 font-medium">English</span>
                          <h3 className="font-semibold text-slate-900">{enProject?.title || '-'}</h3>
                        </div>
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.tags.slice(0, 3).map((tag: string, idx: number) => (
                            <span key={idx} className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-xs text-slate-400">+{project.tags.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id, project.display_order)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <div className="flex gap-2">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-800"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsEditor;
