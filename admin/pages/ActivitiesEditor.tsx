import React, { useState } from 'react';
import useSWR from 'swr';
import { activitiesQueries, uploadImage } from '../../lib/supabaseQueries';
import { Language } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Upload, AlertCircle } from 'lucide-react';

interface Activity {
  id?: string;
  lang: Language;
  title: string;
  role: string;
  date: string;
  location: string;
  description: string;
  images: string[];
  video_url?: string;
  tag: 'Conference' | 'Community' | 'Governance' | 'Media';
  link?: string;
  display_order: number;
}

const ActivitiesEditor: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<Language>('en');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const { data: activities, error: fetchError, mutate } = useSWR(
    ['activities', selectedLang],
    () => activitiesQueries.getAll(selectedLang)
  );

  const [formData, setFormData] = useState<Activity>({
    lang: selectedLang,
    title: '',
    role: '',
    date: '',
    location: '',
    description: '',
    images: [],
    video_url: '',
    tag: 'Conference',
    link: '',
    display_order: 0
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      lang: selectedLang,
      title: '',
      role: '',
      date: '',
      location: '',
      description: '',
      images: [],
      video_url: '',
      tag: 'Conference',
      link: '',
      display_order: activities?.data?.length || 0
    });
  };

  const handleEdit = (activity: any) => {
    setIsCreating(false);
    setEditingId(activity.id);
    setFormData({
      id: activity.id,
      lang: activity.lang,
      title: activity.title,
      role: activity.role,
      date: activity.date,
      location: activity.location,
      description: activity.description,
      images: activity.images || [],
      video_url: activity.video_url || '',
      tag: activity.tag,
      link: activity.link || '',
      display_order: activity.display_order
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setError('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file, 'activities'));
      const urls = await Promise.all(uploadPromises);
      const validUrls = urls.filter((url): url is string => url !== null);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validUrls]
      }));
    } catch (err) {
      setError('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.role) {
      setError('Title and role are required');
      return;
    }

    setError('');

    try {
      if (isCreating) {
        await activitiesQueries.create(formData);
      } else if (editingId) {
        await activitiesQueries.update(editingId, formData);
      }

      await mutate();
      handleCancel();
    } catch (err) {
      setError('Failed to save activity');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;

    try {
      await activitiesQueries.delete(id);
      await mutate();
    } catch (err) {
      setError('Failed to delete activity');
    }
  };

  const isEditing = isCreating || editingId !== null;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Activities</h1>
          <p className="text-slate-600">Manage conference talks, community events, and media appearances</p>
        </div>
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value as Language)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {!isEditing && (
        <button
          onClick={handleCreate}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors"
        >
          <Plus size={20} />
          Add New Activity
        </button>
      )}

      {isEditing && (
        <div className="mb-6 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {isCreating ? 'Create New Activity' : 'Edit Activity'}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                placeholder="Activity title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role *</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="Speaker, Panelist, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tag</label>
                <select
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  <option value="Conference">Conference</option>
                  <option value="Community">Community</option>
                  <option value="Governance">Governance</option>
                  <option value="Media">Media</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="Jan 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                placeholder="Activity description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Video URL</label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Link</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Images</label>
              <div className="space-y-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <img src={img} alt="" className="w-16 h-16 object-cover rounded" />
                    <span className="flex-1 text-sm text-slate-600 truncate">{img}</span>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg hover:border-brand-500 hover:bg-brand-50 transition-colors cursor-pointer">
                  <Upload size={20} className="text-slate-400" />
                  <span className="text-sm text-slate-600">{uploading ? 'Uploading...' : 'Upload Images'}</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium shadow hover:bg-brand-700 transition-colors"
            >
              <Save size={20} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
            >
              <X size={20} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Activities List */}
      <div className="space-y-4">
        {fetchError && <p className="text-red-600">Failed to load activities</p>}
        {activities?.data && activities.data.length === 0 && (
          <p className="text-slate-500 text-center py-8">No activities yet. Create your first one!</p>
        )}
        {activities?.data?.map((activity: any) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{activity.title}</h3>
                <p className="text-sm text-slate-600">{activity.role} • {activity.date}</p>
                <p className="text-sm text-slate-500">{activity.location}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(activity)}
                  className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-3">{activity.description}</p>
            {activity.images && activity.images.length > 0 && (
              <div className="flex gap-2">
                {activity.images.slice(0, 3).map((img: string, idx: number) => (
                  <img key={idx} src={img} alt="" className="w-20 h-20 object-cover rounded" />
                ))}
                {activity.images.length > 3 && (
                  <div className="w-20 h-20 bg-slate-100 rounded flex items-center justify-center text-slate-500 text-sm">
                    +{activity.images.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesEditor;
