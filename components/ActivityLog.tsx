
import React, { useState, useRef } from 'react';
import { ContentData, ActivityItem } from '../types';
import { Radio, MapPin, Plus, Trash2, Edit2, Link as LinkIcon, Save, X, Upload, Calendar, Hash, AlertTriangle } from 'lucide-react';

interface ActivityLogProps {
    data: ContentData;
    activities: ActivityItem[];
    isAdmin: boolean;
    onUpdateActivities: (activities: ActivityItem[]) => void;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ data, activities, isAdmin, onUpdateActivities }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null); // 'new' or ID
  const [editForm, setEditForm] = useState<Partial<ActivityItem>>({});
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
        const updated = activities.filter(a => a.id !== id);
        onUpdateActivities(updated);
    }
  };

  const handleEditClick = (activity: ActivityItem) => {
      setEditForm(activity);
      setUploadError(null);
      setIsEditing(activity.id);
  };

  const handleNewClick = () => {
      setEditForm({
          title: '',
          role: '',
          date: new Date().toISOString().split('T')[0], // Default to today YYYY-MM-DD
          location: '',
          description: '',
          tag: 'Community',
          images: [],
          link: '',
          videoUrl: ''
      });
      setUploadError(null);
      setIsEditing('new');
  };

  const handleSave = () => {
      if (!editForm.title || !editForm.description) return alert('Title and Description are required');
      
      let updatedActivities = [...activities];
      if (isEditing === 'new') {
          const newActivity: ActivityItem = {
              ...editForm as ActivityItem,
              id: Date.now().toString(),
              images: editForm.images || []
          };
          updatedActivities = [newActivity, ...activities];
      } else {
          updatedActivities = activities.map(a => a.id === isEditing ? { ...a, ...editForm } as ActivityItem : a);
      }
      
      // Sort by date desc
      updatedActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      onUpdateActivities(updatedActivities);
      setIsEditing(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
          const newImages: string[] = [];
          let processed = 0;
          let hasError = false;
          
          Array.from(files).forEach((file: File) => {
             // Check size (Max 500KB) to save LocalStorage space
             if (file.size > 500 * 1024) {
                 setUploadError(`File ${file.name} is too large (>500KB). Please compress it.`);
                 hasError = true;
                 return;
             }

             const reader = new FileReader();
             reader.onloadend = () => {
                 if (reader.result) {
                     newImages.push(reader.result as string);
                 }
                 processed++;
                 if (processed === files.length && !hasError) {
                     setEditForm(prev => ({ 
                         ...prev, 
                         images: [...(prev.images || []), ...newImages] 
                     }));
                     setUploadError(null);
                 }
             };
             reader.readAsDataURL(file);
          });
      }
  };

  const removeImage = (index: number) => {
      setEditForm(prev => ({
          ...prev,
          images: prev.images?.filter((_, i) => i !== index)
      }));
  };

  const formatDate = (dateStr: string) => {
      try {
          if (dateStr.length === 4) return dateStr;
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return dateStr;
          return new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
          }).format(date);
      } catch (e) {
          return dateStr;
      }
  };

  const getEmbedUrl = (url?: string) => {
      if (!url) return null;
      if (url.includes('youtube.com/watch') || url.includes('youtu.be')) {
          const videoId = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
          return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes('bilibili.com/video/')) {
          const bvid = url.split('/video/')[1].split('/')[0].split('?')[0];
          return `//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1`;
      }
      return url;
  };

  const getTagColor = (tag: string) => {
      switch(tag) {
          case 'Conference': return 'bg-purple-100 text-purple-700 border-purple-200';
          case 'Governance': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
          case 'Media': return 'bg-pink-100 text-pink-700 border-pink-200';
          default: return 'bg-emerald-100 text-emerald-700 border-emerald-200'; // Community
      }
  };

  // Filter Logic
  const uniqueTags = ['All', ...Array.from(new Set(activities.map(a => a.tag)))];
  const filteredActivities = selectedTag === 'All' 
    ? activities 
    : activities.filter(a => a.tag === selectedTag);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3 flex items-center gap-4">
                <div className="p-3 bg-accent-100 text-accent-700 rounded-xl">
                    <Radio size={28} />
                </div>
                {data.navigation.activities}
            </h2>
            <p className="text-slate-500 text-lg">
                Events, conferences, and community milestones.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-4">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-2">
                {uniqueTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                            selectedTag === tag
                            ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-md transform scale-105'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-300 hover:bg-brand-50'
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {isAdmin && !isEditing && (
                <button
                    onClick={handleNewClick}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-lg transition-all shadow-lg hover:shadow-brand-500/50 hover:-translate-y-0.5 self-start md:self-end font-medium"
                >
                    <Plus size={18} /> Add Activity
                </button>
            )}
          </div>
        </div>

        {/* Editor Form */}
        {isEditing && (
            <div className="bg-white border border-brand-200 rounded-xl p-6 shadow-xl mb-12 animate-in slide-in-from-top-4 relative z-20">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">{isEditing === 'new' ? 'Add New Activity' : 'Edit Activity'}</h3>
                    <button onClick={() => setIsEditing(null)} className="text-slate-400 hover:text-slate-600">
                        <X />
                    </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Title</label>
                            <input 
                                placeholder="Event Title" 
                                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                                value={editForm.title || ''}
                                onChange={e => setEditForm({...editForm, title: e.target.value})}
                            />
                        </div>
                         <div className="flex gap-4">
                            <div className="w-full space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase">Role</label>
                                <input 
                                    placeholder="e.g. Organizer" 
                                    className="w-full p-3 border border-slate-200 rounded-lg outline-none"
                                    value={editForm.role || ''}
                                    onChange={e => setEditForm({...editForm, role: e.target.value})}
                                />
                            </div>
                             <div className="w-1/2 space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase">Date</label>
                                <input 
                                    type="date"
                                    className="w-full p-3 border border-slate-200 rounded-lg outline-none"
                                    value={editForm.date || ''}
                                    onChange={e => setEditForm({...editForm, date: e.target.value})}
                                />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Location</label>
                            <input 
                                placeholder="City, Country" 
                                className="w-full p-3 border border-slate-200 rounded-lg outline-none"
                                value={editForm.location || ''}
                                onChange={e => setEditForm({...editForm, location: e.target.value})}
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Tag</label>
                            <select 
                                className="w-full p-3 border border-slate-200 rounded-lg outline-none bg-white"
                                value={editForm.tag || 'Community'}
                                onChange={e => setEditForm({...editForm, tag: e.target.value as any})}
                            >
                                <option value="Conference">Conference</option>
                                <option value="Community">Community</option>
                                <option value="Governance">Governance</option>
                                <option value="Media">Media</option>
                            </select>
                         </div>
                         <div className="space-y-1">
                             <label className="text-xs font-bold text-slate-400 uppercase">Links</label>
                             <input 
                                placeholder="External Link (Optional)" 
                                className="w-full p-3 border border-slate-200 rounded-lg outline-none mb-2"
                                value={editForm.link || ''}
                                onChange={e => setEditForm({...editForm, link: e.target.value})}
                            />
                            <input 
                                placeholder="Video URL (YouTube/Bilibili Link)" 
                                className="w-full p-3 border border-slate-200 rounded-lg outline-none"
                                value={editForm.videoUrl || ''}
                                onChange={e => setEditForm({...editForm, videoUrl: e.target.value})}
                            />
                         </div>
                    </div>
                    <div className="space-y-4">
                        <textarea 
                            placeholder="Description (Markdown supported)" 
                            className="w-full p-3 border border-slate-200 rounded-lg h-32 outline-none resize-none font-sans"
                            value={editForm.description || ''}
                            onChange={e => setEditForm({...editForm, description: e.target.value})}
                        />
                         <div className="space-y-3">
                             <div className="flex flex-wrap gap-2">
                                {editForm.images?.map((img, idx) => (
                                    <div key={idx} className="relative w-16 h-16 rounded overflow-hidden group">
                                        <img src={img} alt="thumb" className="w-full h-full object-cover" />
                                        <button 
                                            onClick={() => removeImage(idx)}
                                            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                             </div>
                            
                            {uploadError && (
                                <div className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertTriangle size={12} /> {uploadError}
                                </div>
                            )}

                            <div 
                                className="border-2 border-dashed border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="mb-2" />
                                <span className="text-sm">Upload Photos (Max 500KB)</span>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleSave}
                            className="w-full py-3 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> Save Activity
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Timeline Container */}
        <div className="relative pl-8 md:pl-0">
             {/* The Vertical Line */}
            <div className="absolute left-0 md:left-[180px] top-4 bottom-0 w-0.5 bg-slate-200" />

            {filteredActivities.length === 0 ? (
                <div className="text-center py-20 text-slate-400 pl-8 md:pl-[180px]">
                    No activities found for this filter.
                </div>
            ) : (
                <div className="space-y-16">
                    {filteredActivities.map((activity, idx) => (
                        <div key={activity.id} className="relative flex flex-col md:flex-row gap-8 animate-in fade-in duration-700" style={{ animationDelay: `${idx * 100}ms` }}>
                            
                            {/* Timeline Node */}
                            <div className="absolute left-[-4px] md:left-[176px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-500 ring-4 ring-slate-50 z-10" />

                            {/* Date Column (Desktop) */}
                            <div className="hidden md:block w-[160px] text-right pt-0.5 shrink-0">
                                <span className="font-mono text-sm font-bold text-slate-500 block">
                                    {formatDate(activity.date)}
                                </span>
                            </div>

                            {/* Content Card */}
                            <div className="flex-1 relative group">
                                {/* Date Mobile */}
                                <div className="md:hidden font-mono text-sm font-bold text-slate-500 mb-2 pl-6">
                                    {formatDate(activity.date)}
                                </div>

                                {/* Admin Controls */}
                                {isAdmin && (
                                    <div className="absolute right-0 top-0 flex gap-2 z-20">
                                        <button onClick={() => handleEditClick(activity)} className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(activity.id)} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"><Trash2 size={16} /></button>
                                    </div>
                                )}
                                
                                <div className="pl-6 md:pl-0">
                                    {/* Header */}
                                    <div className="flex flex-col gap-3 mb-4">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getTagColor(activity.tag)}`}>
                                                <Hash size={12} />
                                                {activity.tag}
                                            </span>
                                            {activity.link && (
                                                <a href={activity.link} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-400 hover:text-brand-600 flex items-center gap-1 transition-colors">
                                                    <LinkIcon size={12} /> Source
                                                </a>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                                            {activity.title}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1 font-medium text-slate-700">
                                                <Radio size={14} className="text-brand-500" /> {activity.role}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin size={14} /> {activity.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Body */}
                                    <div className="space-y-4">
                                        <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line border-l-2 border-slate-100 pl-4">
                                            {activity.description}
                                        </p>

                                        {/* Video Embed */}
                                        {activity.videoUrl && (
                                            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-black aspect-video max-w-2xl">
                                                <iframe 
                                                    src={getEmbedUrl(activity.videoUrl)} 
                                                    className="w-full h-full"
                                                    title={`Video for ${activity.title}`}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowFullScreen
                                                    scrolling="no" 
                                                    frameBorder="0"
                                                />
                                            </div>
                                        )}

                                        {/* Gallery */}
                                        {activity.images && activity.images.length > 0 && (
                                            <div className={`grid gap-3 pt-2 ${activity.images.length === 1 ? 'grid-cols-1 max-w-md' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                                                {activity.images.map((img, i) => (
                                                    <div 
                                                        key={i} 
                                                        className={`rounded-lg overflow-hidden shadow-sm border border-slate-100 relative group cursor-pointer transition-all hover:shadow-md ${activity.images.length === 1 ? 'h-56' : 'h-32'}`}
                                                    >
                                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default ActivityLog;
