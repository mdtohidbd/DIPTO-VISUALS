import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api'
import { 
  Layers, 
  Briefcase, 
  MessageSquare, 
  Mail, 
  TrendingUp, 
  ArrowRight,
  Inbox
} from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    projectsCount: 0,
    clientWorksCount: 0,
    testimonialsCount: 0,
    messagesCount: 0
  })
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      setLoading(true)
      const [projects, clientWorks, testimonials, messages] = await Promise.all([
        api.getProjects(),
        api.getClientWorks(),
        api.getTestimonials(),
        api.getMessages().catch(() => []) // Handle unauth or failed gracefully
      ])

      setStats({
        projectsCount: projects.length,
        clientWorksCount: clientWorks.length,
        testimonialsCount: testimonials.length,
        messagesCount: messages.length
      })

      setRecentMessages(messages.slice(0, 5))
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const StatCard = ({ title, count, icon: Icon, colorClass, linkTo }) => (
    <Link to={linkTo} className="block group">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:border-slate-700 hover:translate-y-[-4px] shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
            <h3 className="text-4xl font-extrabold text-slate-100 mt-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
              {count}
            </h3>
          </div>
          <div className={`p-4 rounded-2xl ${colorClass}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between text-xs text-slate-400 font-semibold">
          <span>Manage entries</span>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-red-500 group-hover:translate-x-2 transition-all duration-300" />
        </div>
      </div>
    </Link>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Welcome Heading */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400 mt-2 text-sm">Here is a quick snapshot of your portfolio database status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Projects" 
          count={stats.projectsCount} 
          icon={Layers} 
          colorClass="bg-red-500/10 text-red-500" 
          linkTo="/projects"
        />
        <StatCard 
          title="Client Works" 
          count={stats.clientWorksCount} 
          icon={Briefcase} 
          colorClass="bg-teal-500/10 text-teal-400" 
          linkTo="/client-works"
        />
        <StatCard 
          title="Testimonials" 
          count={stats.testimonialsCount} 
          icon={MessageSquare} 
          colorClass="bg-indigo-500/10 text-indigo-400" 
          linkTo="/testimonials"
        />
        <StatCard 
          title="Messages" 
          count={stats.messagesCount} 
          icon={Mail} 
          colorClass="bg-amber-500/10 text-amber-500" 
          linkTo="/messages"
        />
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
              <Inbox className="w-5 h-5 text-teal-400" />
              <span>Recent Contact Submissions</span>
            </h2>
            <Link to="/messages" className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentMessages.length === 0 ? (
              <div className="text-center py-10">
                <Mail className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No recent messages found.</p>
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0 transition-colors hover:bg-slate-950">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-200 text-sm">{msg.name}</h4>
                    <p className="text-xs text-slate-400">{msg.email}</p>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-1">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold self-end md:self-auto bg-slate-800/50 px-2.5 py-1 rounded-full">
                    {new Date(msg.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-4">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <span>Admin Tips</span>
            </h2>
            <div className="space-y-4 text-xs text-slate-400 font-medium">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-200 font-semibold mb-1">💡 Keep images optimized</p>
                <p>When adding projects, use smaller file sizes (under 1-2MB) to ensure the portfolio page loads rapidly for visitors.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-200 font-semibold mb-1">🔒 Password Security</p>
                <p>Don't forget to update your default admin password under the <b>Settings</b> tab to protect your portfolio endpoints.</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-slate-200 font-semibold mb-1">🔗 Direct Links</p>
                <p>Always input full URLs (including http:// or https://) for Live Links and GitHub Links to ensure proper redirection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
