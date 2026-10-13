import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  MessageSquare, 
  Settings, 
  LogOut,
  UserCheck,
  Palette,
  ExternalLink,
  Sliders
} from 'lucide-react';

const Sidebar = ({ onLogout, username }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Landing Modules', path: '/admin/sections', icon: Sliders },
    { name: 'Projects', path: '/admin/projects', icon: Layers },
    { name: 'Client Works', path: '/admin/client-works', icon: Briefcase },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Theme & Visuals', path: '/admin/theme', icon: Palette },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-30">
      {/* Sidebar Header */}
      <div>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-red-500 to-teal-400 bg-clip-text text-transparent">
            TOHIDUL PANEL
          </span>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            title="View Live Portfolio"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
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
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
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
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer / Logout */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          to="/"
          className="flex items-center space-x-3 w-full px-4 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-all duration-300 text-xs font-semibold"
        >
          <ExternalLink className="w-4 h-4 text-slate-500" />
          <span>Back to Portfolio</span>
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 w-full px-4 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
