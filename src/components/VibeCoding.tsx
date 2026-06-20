
import React, { useState } from 'react';
import { ContentData, Project } from '../types';
import { Code, Activity, Terminal, ArrowUpRight, Plus, Trash2, Edit2, Save, X, Github } from 'lucide-react';

// Generate thumbnail URL from project link
const getThumbnailUrl = (link?: string): string => {
  if (!link) return '';

  try {
    const url = new URL(link);
    // Use screenshot.rocks API for automatic thumbnail generation (free, no API key needed)
    return `https://api.screenshotmachine.com?key=demo&url=${encodeURIComponent(link)}&dimension=1024x768&format=jpg&cacheLimit=0`;
  } catch (e) {
    return '';
  }
};

interface VibeCodingProps {
    data: ContentData;
    projects: Project[];
    isAdmin: boolean;
    onUpdateProjects: (projects: Project[]) => void;
}

const VibeCoding: React.FC<VibeCodingProps> = ({ data, projects, isAdmin, onUpdateProjects }) => {
  const [filter, setFilter] = useState<string>('All');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [tagInput, setTagInput] = useState('');

  // Extract unique tags dynamically
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags || [])))];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.tags?.includes(filter));

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
        const updated = projects.filter(p => p.id !== id);
        onUpdateProjects(updated);
    }
  };

  const handleEditClick = (project: Project) => {
      setEditForm(project);
      setIsEditing(project.id);
  };

  const handleNewClick = () => {
      setEditForm({
          title: '',
          tags: [],
          description: '',
          link: '',
          githubLink: '',
          image: '',
          stats: ''
      });
      setIsEditing('new');
  };

  const handleSave = () => {
      if (!editForm.title || !editForm.description) {
          return alert('Title and Description are required');
      }

      // Auto-generate thumbnail from link
      const autoImage = editForm.link ? getThumbnailUrl(editForm.link) : editForm.image;

      if (isEditing === 'new') {
          const newProject: Project = {
              id: Date.now().toString(),
              title: editForm.title!,
              tags: editForm.tags || [],
              description: editForm.description!,
              link: editForm.link,
              githubLink: editForm.githubLink,
              image: autoImage,
              stats: editForm.stats
          };
          onUpdateProjects([...projects, newProject]);
      } else {
          const updated = projects.map(p =>
              p.id === isEditing ? { ...p, ...editForm, image: autoImage } as Project : p
          );
          onUpdateProjects(updated);
      }
      setIsEditing(null);
      setEditForm({});
  };

  const handleCancel = () => {
      setIsEditing(null);
      setEditForm({});
      setTagInput('');
  };

  const handleAddTag = () => {
      const trimmedTag = tagInput.trim();
      if (trimmedTag && !editForm.tags?.includes(trimmedTag)) {
          setEditForm({
              ...editForm,
              tags: [...(editForm.tags || []), trimmedTag]
          });
          setTagInput('');
      }
  };

  const handleRemoveTag = (index: number) => {
      setEditForm({
          ...editForm,
          tags: editForm.tags?.filter((_, i) => i !== index)
      });
  };

  // Render Edit Form
  if (isEditing) {
      return (
          <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                      {isEditing === 'new' ? 'Add New Project' : 'Edit Project'}
                  </h2>
                  <button
                      onClick={handleCancel}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                      <X size={20} />
                  </button>
              </div>

              <div className="glass-panel p-6 rounded-xl space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
                      <input
                          type="text"
                          value={editForm.title || ''}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          placeholder="Project title"
                      />
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tags</label>

                      {/* Display existing tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                          {editForm.tags?.map((tag, index) => (
                              <span
                                  key={index}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 text-brand-700 rounded-lg border border-brand-200 text-sm font-medium"
                              >
                                  {tag}
                                  <button
                                      type="button"
                                      onClick={() => handleRemoveTag(index)}
                                      className="text-brand-500 hover:text-brand-700 hover:bg-brand-100 rounded p-0.5 transition-colors"
                                  >
                                      <X size={14} />
                                  </button>
                              </span>
                          ))}
                      </div>

                      {/* Input field for new tags */}
                      <div className="flex gap-2">
                          <input
                              type="text"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                      e.preventDefault();
                                      handleAddTag();
                                  }
                              }}
                              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                              placeholder="Type tag and press Enter (e.g. AI, FinTech)"
                          />
                          <button
                              type="button"
                              onClick={handleAddTag}
                              className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-2"
                          >
                              <Plus size={16} /> Add
                          </button>
                      </div>
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
                      <textarea
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent min-h-[100px]"
                          placeholder="Project description"
                      />
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Project Link (URL)</label>
                      <input
                          type="url"
                          value={editForm.link || ''}
                          onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          placeholder="https://example.com"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                          Thumbnail will be automatically generated from this URL
                      </p>
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub Link (optional)</label>
                      <input
                          type="url"
                          value={editForm.githubLink || ''}
                          onChange={(e) => setEditForm({ ...editForm, githubLink: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          placeholder="https://github.com/username/repo"
                      />
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Stats (optional)</label>
                      <input
                          type="text"
                          value={editForm.stats || ''}
                          onChange={(e) => setEditForm({ ...editForm, stats: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          placeholder="10K+ Users, $1M+ Revenue"
                      />
                  </div>

                  <div className="flex gap-3 pt-4">
                      <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
                      >
                          <Save size={18} /> Save Project
                      </button>
                      <button
                          onClick={handleCancel}
                          className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
                      >
                          Cancel
                      </button>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 border-b border-slate-200 pb-4 sm:pb-6 md:pb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="p-2 sm:p-2.5 md:p-3 bg-slate-900 text-white rounded-lg sm:rounded-xl shadow-lg shadow-slate-900/20">
                <Terminal size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            {data.navigation.vibe}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-xl">
            A curated collection of projects, scripts, and strategic initiatives bridging technology and business.
          </p>
        </div>

        {/* Filter Tabs + Admin Add Button */}
        <div className="flex gap-1.5 sm:gap-2 flex-wrap items-center">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                filter === tag
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 transform scale-105'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {tag}
            </button>
          ))}

          {isAdmin && (
              <button
                  onClick={handleNewClick}
                  className="ml-1 sm:ml-2 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-full transition-all shadow-lg hover:shadow-brand-500/50 hover:-translate-y-0.5 font-medium text-xs sm:text-sm"
              >
                  <Plus size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" /> Add
              </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden"
          >
            {/* Admin Controls */}
            {isAdmin && (
                <div className="absolute top-10 sm:top-12 right-2 sm:right-4 z-30 flex gap-1.5 sm:gap-2">
                    <button
                        onClick={() => handleEditClick(project)}
                        className="p-1.5 sm:p-2 bg-blue-500 text-white rounded-md sm:rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
                    >
                        <Edit2 size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 sm:p-2 bg-red-500 text-white rounded-md sm:rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                    </button>
                </div>
            )}

            {/* Top Bar Decoration (Mac Window Style) */}
            <div className="absolute top-0 left-0 right-0 h-7 sm:h-9 bg-slate-900/5 backdrop-blur-sm z-20 flex items-center px-3 sm:px-4 border-b border-white/10">
                <div className="flex gap-1 sm:gap-1.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400/80 shadow-sm"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/80 shadow-sm"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400/80 shadow-sm"></div>
                </div>
                <div className="ml-auto text-[8px] sm:text-[10px] font-mono font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                    SRC/PROJECTS/{project.id.toUpperCase()}
                </div>
            </div>

            {/* Clickable Card */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col flex-1"
            >
                {/* Project Image Container */}
                <div className="h-40 sm:h-48 md:h-56 w-full relative overflow-hidden bg-slate-100 mt-7 sm:mt-9">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter saturate-[0.8] group-hover:saturate-100"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                            <Code size={48} />
                        </div>
                    )}

                    {/* Overlay with Visual Indicator */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 px-6 py-2.5 bg-white text-slate-900 rounded-full font-bold shadow-xl">
                            View Project <ArrowUpRight size={18} />
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col relative">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className="flex flex-col">
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-1">
                            {project.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-[10px] sm:text-xs font-bold font-mono text-brand-600 flex items-center gap-1">
                                <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {project.title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-400 hover:text-slate-700 transition-colors"
                        >
                          <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </a>
                      )}
                      {project.stats && (
                        <div className="flex items-center gap-1 sm:gap-1.5 text-slate-600 text-[10px] sm:text-xs font-bold bg-slate-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border border-slate-200">
                            <Activity size={10} className="text-brand-500 sm:w-3 sm:h-3" />
                            {project.stats}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed flex-1 border-l-2 border-slate-100 pl-3 sm:pl-4">
                    {project.description}
                  </p>

                  {/* Tags Footer */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-slate-100 mt-auto">
                    {project.tags?.map((tag, i) => (
                      <span key={i} className="text-[10px] sm:text-xs text-slate-600 bg-slate-50 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded border border-slate-200 font-mono flex items-center gap-1 sm:gap-1.5 group-hover:border-brand-300 transition-colors">
                        <span className="text-brand-400 font-bold">#</span>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VibeCoding;
