

import React, { useState } from 'react';
import { ContentData, Note } from '../types';
import { BookOpen, Calendar, ArrowRight, ArrowUp, ExternalLink, Plus, Trash2, Edit2, Save, X, FileText, Link } from 'lucide-react';

interface ThoughtsProps {
    data: ContentData;
    thoughts: Note[];
    isAdmin: boolean;
    onUpdateThoughts: (thoughts: Note[]) => void;
}

const Thoughts: React.FC<ThoughtsProps> = ({ data, thoughts, isAdmin, onUpdateThoughts }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Note>>({});

  const toggleExpand = (id: string) => {
      setExpandedId(prev => prev === id ? null : id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
        const updated = thoughts.filter(n => n.id !== id);
        onUpdateThoughts(updated);
    }
  };

  const handleEditClick = (note: Note) => {
      setEditForm(note);
      setIsEditing(note.id);
  };

  const handleNewClick = () => {
      setEditForm({
          title: '',
          date: new Date().toISOString().split('T')[0],
          tags: [],
          snippet: '',
          content: '',
          link: '',
          readTime: '5 min'
      });
      setIsEditing('new');
  };

  const handleSave = () => {
      if (!editForm.title || !editForm.snippet) {
          return alert('Title and Snippet are required');
      }

      if (isEditing === 'new') {
          const newNote: Note = {
              id: Date.now().toString(),
              title: editForm.title!,
              date: editForm.date || new Date().toISOString().split('T')[0],
              tags: editForm.tags || [],
              snippet: editForm.snippet!,
              content: editForm.content,
              link: editForm.link,
              readTime: editForm.readTime || '5 min'
          };
          onUpdateThoughts([...thoughts, newNote]);
      } else {
          const updated = thoughts.map(n =>
              n.id === isEditing ? { ...n, ...editForm } as Note : n
          );
          onUpdateThoughts(updated);
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
                      {isEditing === 'new' ? 'Add New Note' : 'Edit Note'}
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
                          placeholder="Note title"
                      />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
                          <input
                              type="date"
                              value={editForm.date || ''}
                              onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Read Time</label>
                          <input
                              type="text"
                              value={editForm.readTime || ''}
                              onChange={(e) => setEditForm({ ...editForm, readTime: e.target.value })}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                              placeholder="5 min"
                          />
                      </div>
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tags (comma separated)</label>
                      <input
                          type="text"
                          value={editForm.tags?.join(', ') || ''}
                          onChange={(e) => setEditForm({ ...editForm, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          placeholder="AI, Strategy, Web3"
                      />
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Snippet (Preview Text) *</label>
                      <textarea
                          value={editForm.snippet || ''}
                          onChange={(e) => setEditForm({ ...editForm, snippet: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent min-h-[80px]"
                          placeholder="Brief preview of the note"
                      />
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Content (Optional)</label>
                      <textarea
                          value={editForm.content || ''}
                          onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent min-h-[200px]"
                          placeholder="Full article content (expandable)"
                      />
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">External Link (Optional)</label>
                      <input
                          type="url"
                          value={editForm.link || ''}
                          onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          placeholder="https://example.com/article"
                      />
                  </div>

                  <div className="flex gap-3 pt-4">
                      <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
                      >
                          <Save size={18} /> Save Note
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
          <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                 <div className="p-2 bg-brand-100 rounded-lg">
                    <BookOpen className="text-brand-600" size={24} />
                 </div>
                {data.navigation.thoughts}
              </h2>
              <p className="text-slate-500">
                Insights on AI strategy, reading list, and random musings.
              </p>
          </div>

          {isAdmin && (
              <button
                  onClick={handleNewClick}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-lg transition-all shadow-lg hover:shadow-brand-500/50 hover:-translate-y-0.5 font-medium"
              >
                  <Plus size={18} /> Add Note
              </button>
          )}
        </div>

      {/* Featured Articles from WeChat */}
      {data.articles && data.articles.length > 0 && (
        <div className="glass-panel p-6 rounded-xl mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-green-600" />
            {data.lang === 'zh' ? '微信公众号文章' : 'WeChat Articles'}
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {data.articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
                  <Link size={16} />
                </div>
                <span className="text-sm text-slate-700 group-hover:text-green-700 line-clamp-1 flex-1">
                  {article.title}
                </span>
                <ExternalLink size={14} className="text-slate-400 group-hover:text-green-600 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {thoughts.map((note) => (
          <div
            key={note.id}
            className={`glass-panel p-6 rounded-xl hover:bg-white border transition-all shadow-sm relative ${expandedId === note.id ? 'bg-white border-brand-200 ring-1 ring-brand-100' : 'hover:border-brand-200 hover:shadow-md'}`}
          >
            {/* Admin Controls */}
            {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button
                        onClick={() => handleEditClick(note)}
                        className="p-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
                    >
                        <Edit2 size={14} />
                    </button>
                    <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            )}

            <div
                className="cursor-pointer"
                onClick={() => {
                    if (note.content) toggleExpand(note.id);
                }}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors pr-20">
                        {note.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 font-mono bg-slate-50 px-3 py-1 rounded-full shrink-0">
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {note.date}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{note.readTime}</span>
                    </div>
                </div>

                <p className="text-slate-600 mb-5 leading-relaxed">
                   {expandedId === note.id ? (note.content || note.snippet) : note.snippet}
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div className="flex gap-2">
                {note.tags.map(tag => (
                  <span key={tag} className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-100 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                  {/* External Link Button */}
                  {note.link && (
                    <a
                        href={note.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-brand-600 transition-colors bg-slate-100 hover:bg-brand-50 px-3 py-1.5 rounded-full"
                    >
                        Read Article <ExternalLink size={14} />
                    </a>
                  )}

                  {/* Expand Content Button */}
                  {note.content && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(note.id);
                        }}
                        className="text-brand-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all px-2"
                    >
                        {expandedId === note.id ? (
                            <>Show Preview <ArrowUp size={14} /></>
                        ) : (
                            <>Show Full <ArrowRight size={14} /></>
                        )}
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thoughts;
