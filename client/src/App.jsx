import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import LearnerDashboard from './pages/learner/LearnerDashboard';
import CompanyDashboard from './pages/company/CompanyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login onLogin={setUser} />;

  // Application routing and user role control.
  // The app checks if the user is authenticated. If not, it redirects to the Login screen.
  // Once logged in, it determines the home route based on the user's role:
  // - student -> '/learner'
  // - company -> '/company'
  // - admin   -> '/admin'
  const home = user.role === 'student' ? '/learner' : user.role === 'company' ? '/company' : '/admin';

  return (
    <Routes>
      <Route path="/learner/*" element={user.role === 'student' ? <LearnerDashboard user={user} onLogout={() => setUser(null)} onUpdateUser={setUser} /> : <Navigate to={home} replace />} />
      <Route path="/company/*" element={user.role === 'company' ? <CompanyDashboard user={user} onLogout={() => setUser(null)} onUpdateUser={setUser} /> : <Navigate to={home} replace />} />
      <Route path="/admin/*" element={user.role === 'admin' ? <AdminDashboard user={user} onLogout={() => setUser(null)} onUpdateUser={setUser} /> : <Navigate to={home} replace />} />
      <Route path="*" element={<Navigate to={home} replace />} />
    </Routes>
  );
}
