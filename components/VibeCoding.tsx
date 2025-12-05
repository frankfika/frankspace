
import React, { useState } from 'react';
import { ContentData, Project } from '../types';
import { Code, Activity, Terminal, ArrowUpRight, Plus, Trash2, Edit2, Save, X, Upload } from 'lucide-react';

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

  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

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
          category: 'Engineering',
          description: '',
          techStack: [],
          link: '',
          image: '',
          stats: ''
      });
      setIsEditing('new');
  };

  const handleSave = () => {
      if (!editForm.title || !editForm.description || !editForm.category) {
          return alert('Title, Category, and Description are required');
      }

      if (isEditing === 'new') {
          const newProject: Project = {
              id: Date.now().toString(),
              title: editForm.title!,
              category: editForm.category!,
              description: editForm.description!,
              techStack: editForm.techStack || [],
              link: editForm.link,
              image: editForm.image,
              stats: editForm.stats
          };
          onUpdateProjects([...projects, newProject]);
      } else {
          const updated = projects.map(p =>
              p.id === isEditing ? { ...p, ...editForm } as Project : p
          );
          onUpdateProjects(updated);
      }
      setIsEditing(null);
      setEditForm({});
  };

  const handleCancel = () => {
      setIsEditing(null);
      setEditForm({});
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

              <div className="glass-panel p-6 rounded-xl space-y-4">
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
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
                      <select
                          value={editForm.category || ''}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      >
                          <option value="">Select category</option>
                          <option value="Media">Media</option>
                          <option value="FinTech">FinTech</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Blockchain">Blockchain</option>
                          <option value="AI">AI</option>
                          <option value="Strategy">Strategy</option>
                      </select>
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
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tech Stack (comma separated)</label>
                      <input
                          type="text"
                          value={editForm.techStack?.join(', ') || ''}
                          onChange={(e) => setEditForm({ ...editForm, techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          placeholder="React, Node.js, MongoDB"
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
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Image URL</label>
                      <input
                          type="url"
                          value={editForm.image || ''}
                          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          placeholder="https://images.unsplash.com/..."
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
    <div className="space-y-12 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3 flex items-center gap-4">
            <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/20">
                <Terminal size={28} />
            </div>
            {data.navigation.vibe}
          </h2>
          <p className="text-slate-500 text-lg max-w-xl">
            A curated collection of projects, scripts, and strategic initiatives bridging technology and business.
          </p>
        </div>

        {/* Filter Tabs + Admin Add Button */}
        <div className="flex gap-2 flex-wrap items-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 transform scale-105'
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}

          {isAdmin && (
              <button
                  onClick={handleNewClick}
                  className="ml-2 flex items-center gap-2 px-4 py-2.5 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                  <Plus size={18} /> Add
              </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Admin Controls */}
            {isAdmin && (
                <div className="absolute top-12 right-4 z-30 flex gap-2">
                    <button
                        onClick={() => handleEditClick(project)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )}

            {/* Top Bar Decoration (Mac Window Style) */}
            <div className="absolute top-0 left-0 right-0 h-9 bg-slate-900/5 backdrop-blur-sm z-20 flex items-center px-4 border-b border-white/10">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-sm"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-sm"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-sm"></div>
                </div>
                <div className="ml-auto text-[10px] font-mono font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
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
                <div className="h-56 w-full relative overflow-hidden bg-slate-100 mt-9">
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
                <div className="p-6 flex-1 flex flex-col relative">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold font-mono text-brand-600 mb-1 flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span>
                            {project.category}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {project.title}
                        </h3>
                    </div>
                    {project.stats && (
                        <div className="flex items-center gap-1.5 text-slate-600 text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                            <Activity size={12} className="text-brand-500" />
                            {project.stats}
                        </div>
                     )}
                  </div>

                  <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-1 border-l-2 border-slate-100 pl-4">
                    {project.description}
                  </p>

                  {/* Tech Stack Footer */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mt-auto">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 font-mono flex items-center gap-1.5 group-hover:border-brand-300 transition-colors">
                        <span className="text-brand-400 font-bold">#</span>
                        {tech}
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
