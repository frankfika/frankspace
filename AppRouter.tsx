import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './admin/pages/LoginPage';
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ActivitiesEditor from './admin/pages/ActivitiesEditor';
import ProtectedRoute from './admin/components/ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Main Portfolio Site */}
        <Route path="/" element={<App />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="activities" element={<ActivitiesEditor />} />
          {/* Placeholder routes for other editors - to be implemented */}
          <Route path="personal-info" element={<div className="p-6 bg-white rounded-xl border border-slate-200"><h2 className="text-2xl font-bold">Personal Info Editor</h2><p className="text-slate-600 mt-2">Coming soon...</p></div>} />
          <Route path="experience" element={<div className="p-6 bg-white rounded-xl border border-slate-200"><h2 className="text-2xl font-bold">Experience Editor</h2><p className="text-slate-600 mt-2">Coming soon...</p></div>} />
          <Route path="education" element={<div className="p-6 bg-white rounded-xl border border-slate-200"><h2 className="text-2xl font-bold">Education Editor</h2><p className="text-slate-600 mt-2">Coming soon...</p></div>} />
          <Route path="skills" element={<div className="p-6 bg-white rounded-xl border border-slate-200"><h2 className="text-2xl font-bold">Skills Editor</h2><p className="text-slate-600 mt-2">Coming soon...</p></div>} />
          <Route path="projects" element={<div className="p-6 bg-white rounded-xl border border-slate-200"><h2 className="text-2xl font-bold">Projects Editor</h2><p className="text-slate-600 mt-2">Coming soon...</p></div>} />
          <Route path="thoughts" element={<div className="p-6 bg-white rounded-xl border border-slate-200"><h2 className="text-2xl font-bold">Thoughts Editor</h2><p className="text-slate-600 mt-2">Coming soon...</p></div>} />
          <Route path="socials" element={<div className="p-6 bg-white rounded-xl border border-slate-200"><h2 className="text-2xl font-bold">Social Links Editor</h2><p className="text-slate-600 mt-2">Coming soon...</p></div>} />
          <Route path="consultation" element={<div className="p-6 bg-white rounded-xl border border-slate-200"><h2 className="text-2xl font-bold">Consultation Editor</h2><p className="text-slate-600 mt-2">Coming soon...</p></div>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
