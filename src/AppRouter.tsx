import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './admin/pages/LoginPage';
import AdminLayout from './admin/components/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ActivitiesEditor from './admin/pages/ActivitiesEditor';
import PersonalInfoEditor from './admin/pages/PersonalInfoEditor';
import ExperienceEditor from './admin/pages/ExperienceEditor';
import EducationEditor from './admin/pages/EducationEditor';
import SkillsEditor from './admin/pages/SkillsEditor';
import ProjectsEditor from './admin/pages/ProjectsEditor';
import ThoughtsEditor from './admin/pages/ThoughtsEditor';
import SocialsEditor from './admin/pages/SocialsEditor';
import ConsultationEditor from './admin/pages/ConsultationEditor';
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
          <Route path="personal-info" element={<PersonalInfoEditor />} />
          <Route path="experience" element={<ExperienceEditor />} />
          <Route path="education" element={<EducationEditor />} />
          <Route path="skills" element={<SkillsEditor />} />
          <Route path="projects" element={<ProjectsEditor />} />
          <Route path="thoughts" element={<ThoughtsEditor />} />
          <Route path="activities" element={<ActivitiesEditor />} />
          <Route path="socials" element={<SocialsEditor />} />
          <Route path="consultation" element={<ConsultationEditor />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
