import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { api } from './utils/api';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageProjects from './pages/ManageProjects';
import ManageClientWorks from './pages/ManageClientWorks';
import ManageTestimonials from './pages/ManageTestimonials';
import ManageMessages from './pages/ManageMessages';
import ManageTheme from './pages/ManageTheme';
import ManageSections from './pages/ManageSections';
import Settings from './pages/Settings';

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AdminLayout = ({ children, onLogout, username }) => {
  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-slate-100 font-jakarta">
      {/* Sidebar Navigation */}
      <Sidebar onLogout={onLogout} username={username} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 ml-64 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
};

const AdminApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const data = await api.verifyToken();
      setIsAuthenticated(true);
      setUsername(data.username || 'Admin');
    } catch (err) {
      console.warn('Session expired or invalid token.');
      api.logout();
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Ensure body background and text colors are locked to luxury dark studio theme inside admin
  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;
    document.body.style.backgroundColor = '#0b0f19';
    document.body.style.color = '#f8fafc';

    return () => {
      // Restore public theme on leaving admin routes
      try {
        const cached = localStorage.getItem('portfolio_active_theme');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.bgPrimary) {
            document.body.style.backgroundColor = parsed.bgPrimary;
          }
        }
      } catch (e) {
        document.body.style.backgroundColor = prevBg || '#060B19';
        document.body.style.color = prevColor || '#F1F5F9';
      }
    };
  }, []);

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setUsername(user || 'Admin');
    navigate('/admin', { replace: true });
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    setUsername('');
    navigate('/admin/login', { replace: true });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="admin-root bg-[#0b0f19] text-slate-100 min-h-screen font-jakarta selection:bg-teal-500 selection:text-white" data-theme-mode="dark">
      <Routes>
        {/* Public auth route */}
        <Route 
          path="login" 
          element={
            isAuthenticated ? <Navigate to="/admin" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
          } 
        />

        {/* Protected Dashboard Layout Routes */}
        <Route
          path=""
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout} username={username}>
                <Dashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        <Route
          path="projects"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout} username={username}>
                <ManageProjects />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        <Route
          path="client-works"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout} username={username}>
                <ManageClientWorks />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        <Route
          path="testimonials"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout} username={username}>
                <ManageTestimonials />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        <Route
          path="messages"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout} username={username}>
                <ManageMessages />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        <Route
          path="theme"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout} username={username}>
                <ManageTheme />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        <Route
          path="sections"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout} username={username}>
                <ManageSections />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        <Route
          path="settings"
          element={
            isAuthenticated ? (
              <AdminLayout onLogout={handleLogout} username={username}>
                <Settings />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* Catch-all Redirect within /admin/* */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
};

export default AdminApp;
