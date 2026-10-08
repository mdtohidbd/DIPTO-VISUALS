import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { api } from './utils/api'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ManageProjects from './pages/ManageProjects'
import ManageClientWorks from './pages/ManageClientWorks'
import ManageTestimonials from './pages/ManageTestimonials'
import ManageMessages from './pages/ManageMessages'
import ManageTheme from './pages/ManageTheme'
import Settings from './pages/Settings'

// A Loading Spinner component
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

const Layout = ({ children, onLogout, username }) => {
  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-slate-100 font-jakarta">
      {/* Sidebar Navigation */}
      <Sidebar onLogout={onLogout} username={username} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsAuthenticated(false)
      setLoading(false)
      return
    }

    try {
      const data = await api.verifyToken()
      setIsAuthenticated(true)
      setUsername(data.username || 'Admin')
    } catch (err) {
      console.warn('Session expired or invalid token.')
      api.logout()
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true)
    setUsername(user || 'Admin')
  }

  const handleLogout = () => {
    api.logout()
    setIsAuthenticated(false)
    setUsername('')
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth route */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />
          } 
        />

        {/* Protected Dashboard Layout Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout} username={username}>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/projects"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout} username={username}>
                <ManageProjects />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/client-works"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout} username={username}>
                <ManageClientWorks />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/testimonials"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout} username={username}>
                <ManageTestimonials />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/messages"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout} username={username}>
                <ManageMessages />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/theme"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout} username={username}>
                <ManageTheme />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout} username={username}>
                <Settings />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
