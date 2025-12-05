import React from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, GraduationCap, Target, FolderOpen, FileText, Calendar, Share2, MessageSquare, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const cards = [
    { title: 'Personal Info', icon: User, path: '/admin/personal-info', color: 'bg-blue-500' },
    { title: 'Experience', icon: Briefcase, path: '/admin/experience', color: 'bg-purple-500' },
    { title: 'Education', icon: GraduationCap, path: '/admin/education', color: 'bg-green-500' },
    { title: 'Skills', icon: Target, path: '/admin/skills', color: 'bg-red-500' },
    { title: 'Projects', icon: FolderOpen, path: '/admin/projects', color: 'bg-yellow-500' },
    { title: 'Thoughts', icon: FileText, path: '/admin/thoughts', color: 'bg-indigo-500' },
    { title: 'Activities', icon: Calendar, path: '/admin/activities', color: 'bg-pink-500' },
    { title: 'Social Links', icon: Share2, path: '/admin/socials', color: 'bg-cyan-500' },
    { title: 'Consultation', icon: MessageSquare, path: '/admin/consultation', color: 'bg-orange-500' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
        <p className="text-slate-600">Manage your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.path}
              to={card.path}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:border-brand-300 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <ArrowRight className="text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1">Manage {card.title.toLowerCase()} content</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 bg-brand-50 border border-brand-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-brand-900 mb-2">Quick Tips</h3>
        <ul className="space-y-2 text-sm text-brand-800">
          <li>• All changes are saved to the database in real-time</li>
          <li>• Content is available in both English (en) and Chinese (zh)</li>
          <li>• Images can be uploaded directly to Supabase Storage</li>
          <li>• Use display_order to control the sequence of items</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
