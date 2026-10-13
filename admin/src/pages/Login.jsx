import React, { useState } from 'react'
import { api } from '../utils/api'
import { Lock, User, AlertCircle, Eye, EyeOff, Key } from 'lucide-react'

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const trimmedUser = username.trim()
    const trimmedPass = password.trim()

    if (!trimmedUser || !trimmedPass) {
      setError('Please enter both your Username and Password.')
      return
    }

    setLoading(true)

    try {
      const data = await api.login(trimmedUser, trimmedPass)
      onLoginSuccess(data.admin.username)
    } catch (err) {
      setError(err.message || 'Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  const handleAutoFill = () => {
    setUsername('admin')
    setPassword('admin123')
    setError('')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b0f19] px-4">
      {/* Dynamic Background Blob Effect */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10 backdrop-blur-md">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 to-teal-400 bg-clip-text text-transparent tracking-wide">
            Portfolio Admin
          </h2>
          <p className="text-slate-400 text-sm mt-2">Log in to manage your website</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl flex items-center space-x-2 animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 placeholder-slate-600 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase text-slate-400">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-slate-400 hover:text-teal-400 flex items-center gap-1 transition-colors"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 placeholder-slate-600 rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-teal-500 hover:from-red-500 hover:to-teal-400 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/20 cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        {/* Quick Helper / Credentials Hint */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between bg-slate-950/60 p-3 rounded-2xl border">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
              <Key className="w-3 h-3 text-teal-400" /> Default Credentials
            </span>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              <span className="text-teal-300">admin</span> / <span className="text-teal-300">admin123</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          >
            Auto Fill
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
