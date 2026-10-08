import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  MessageSquare, 
  Settings, 
  LogOut,
  UserCheck,
  Palette
} from 'lucide-react'

const Sidebar = ({ onLogout, username }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: Layers },
    { name: 'Client Works', path: '/client-works', icon: Briefcase },
    { name: 'Testimonials', path: '/testimonials', icon: MessageSquare },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Theme & Visuals', path: '/theme', icon: Palette },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-30">
      {/* Sidebar Header */}
      <div>
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-red-500 to-teal-400 bg-clip-text text-transparent">
            TOHIDUL PANEL
          </span>
        </div>

        {/* User Card */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/50 flex items-center space-x-3">
          <div className="p-2 bg-teal-500/10 text-teal-400 rounded-full">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-semibold text-slate-200 capitalize">{username}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-red-500/20 to-teal-500/10 text-red-400 border-l-4 border-red-500 font-semibold' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Sidebar Footer / Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
