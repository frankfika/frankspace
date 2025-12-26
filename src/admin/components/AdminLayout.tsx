import React, { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  Target,
  FolderOpen,
  FileText,
  Calendar,
  Share2,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/personal-info', icon: User, label: 'Personal Info' },
    { path: '/admin/experience', icon: Briefcase, label: 'Experience' },
    { path: '/admin/education', icon: GraduationCap, label: 'Education' },
    { path: '/admin/skills', icon: Target, label: 'Skills' },
    { path: '/admin/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/admin/thoughts', icon: FileText, label: 'Thoughts' },
    { path: '/admin/activities', icon: Calendar, label: 'Activities' },
    { path: '/admin/socials', icon: Share2, label: 'Social Links' },
    { path: '/admin/consultation', icon: MessageSquare, label: 'Consultation' }
  ];

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Admin Panel</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 truncate max-w-[180px]">{user?.email}</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        active
                          ? 'bg-brand-100 text-brand-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      title={item.label}
                    >
                      <Icon size={20} className="shrink-0" />
                      {sidebarOpen && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={() => navigate('/')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors mb-2 ${
                !sidebarOpen && 'justify-center'
              }`}
            >
              <ChevronLeft size={20} className="shrink-0" />
              {sidebarOpen && <span>Back to Site</span>}
            </button>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${
                !sidebarOpen && 'justify-center'
              }`}
            >
              <LogOut size={20} className="shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 sm:mb-6 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={22} className="sm:w-6 sm:h-6" />
          </button>

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
