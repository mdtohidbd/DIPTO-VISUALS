import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { Trash2, Mail, AlertCircle, Check, Inbox, Calendar, User, AtSign } from 'lucide-react'

const ManageMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadMessages = async () => {
    try {
      setLoading(true)
      const data = await api.getMessages()
      setMessages(data)
    } catch (err) {
      setError('Failed to load contact messages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return

    try {
      await api.deleteMessage(id)
      setSuccess('Message deleted successfully!')
      loadMessages()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to delete message.')
    }
  }

  // Format Date beautifully
  const formatDate = (isoString) => {
    if (!isoString) return 'Unknown Date'
    const date = new Date(isoString)
    return date.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-8">
      {/* Top bar */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Contact Messages</h1>
        <p className="text-slate-400 mt-2 text-sm">Review questions or project inquiries submitted by visitors</p>
      </div>

      {/* Message alerts */}
      {success && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm rounded-xl flex items-center space-x-2">
          <Check className="w-5 h-5" />
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl flex items-center space-x-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Messages List */}
      {loading ? (
        <div className="flex items-center justify-center h-[40vh]">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
          <Inbox className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 font-semibold">No contact messages received yet</p>
          <p className="text-xs text-slate-500 mt-1">Messages submitted through the portfolio page will appear here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md hover:border-slate-700 transition-colors flex flex-col justify-between space-y-4">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
                  <span className="flex items-center space-x-1.5 text-slate-200">
                    <User className="w-4 h-4 text-amber-500" />
                    <span>{msg.name}</span>
                  </span>
                  <a href={`mailto:${msg.email}`} className="flex items-center space-x-1.5 hover:text-amber-400 transition-colors">
                    <AtSign className="w-4 h-4 text-amber-500" />
                    <span>{msg.email}</span>
                  </a>
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>{formatDate(msg.createdAt)}</span>
                  </span>
                </div>
                
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="self-end md:self-auto flex items-center space-x-1 px-3 py-1.5 text-xs bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Message</span>
                </button>
              </div>

              {/* Message Content */}
              <div>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageMessages
