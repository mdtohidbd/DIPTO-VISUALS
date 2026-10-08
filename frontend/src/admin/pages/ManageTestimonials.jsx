import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { Plus, Edit2, Trash2, X, AlertCircle, Check, Star } from 'lucide-react'

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(null)

  // Form states
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [channelMetric, setChannelMetric] = useState('')

  const loadTestimonials = async () => {
    try {
      setLoading(true)
      const data = await api.getTestimonials()
      setTestimonials(data)
    } catch (err) {
      setError('Failed to load testimonials.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const openAddModal = () => {
    setCurrentTestimonial(null)
    setName('')
    setRole('YouTube Creator')
    setRating(5)
    setText('')
    setChannelMetric('')
    setError('')
    setIsModalOpen(true)
  }

  const openEditModal = (t) => {
    setCurrentTestimonial(t)
    setName(t.name || '')
    setRole(t.role || 'Client')
    setRating(t.rating || 5)
    setText(t.text || t.feedback || '')
    setChannelMetric(t.channelMetric || '')
    setError('')
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name || !text) {
      setError('Name and review content are required.')
      return
    }

    const tData = {
      name,
      role,
      rating: Number(rating),
      text,
      feedback: text,
      channelMetric: channelMetric.trim() || undefined,
    }

    try {
      if (currentTestimonial) {
        await api.updateTestimonial(currentTestimonial.id, tData)
        setSuccess('Testimonial updated successfully!')
      } else {
        await api.createTestimonial(tData)
        setSuccess('Testimonial added successfully!')
      }
      setIsModalOpen(false)
      loadTestimonials()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to save testimonial.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return

    try {
      await api.deleteTestimonial(id)
      setSuccess('Testimonial deleted successfully!')
      loadTestimonials()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to delete testimonial.')
    }
  }

  return (
    <div className="space-y-8">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Testimonials Management</h1>
          <p className="text-slate-400 mt-2 text-sm">Add, modify, or delete visitor and client reviews</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 self-start"
        >
          <Plus className="w-5 h-5" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Message alerts */}
      {success && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm rounded-xl flex items-center space-x-2">
          <Check className="w-5 h-5" />
          <span>{success}</span>
        </div>
      )}
      {error && !isModalOpen && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl flex items-center space-x-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Testimonials List */}
      {loading ? (
        <div className="flex items-center justify-center h-[40vh]">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
          <Star className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 font-semibold">No testimonials available</p>
          <button onClick={openAddModal} className="mt-4 text-xs font-bold text-indigo-400 hover:text-indigo-350">
            Create your first testimonial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-lg space-y-4">
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  {Array.from({ length: 5 - (t.rating || 5) }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-slate-700" />
                  ))}
                </div>
                
                {/* Text content */}
                <p className="text-sm text-slate-300 italic leading-relaxed font-medium">
                  "{t.text || t.feedback}"
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-100 text-sm flex items-center gap-1.5">
                    {t.name}
                    {t.channelMetric && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono">
                        {t.channelMetric}
                      </span>
                    )}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-semibold">{t.role}</p>
                </div>
                {/* Actions */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(t)}
                    className="p-2 text-slate-400 hover:text-indigo-400 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
              <h2 className="text-xl font-extrabold text-slate-100">
                {currentTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              {/* Reviewer Name */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Reviewer Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              {/* Reviewer Role */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Reviewer Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. YouTube Creator (650K Subs)"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              {/* Channel Metric / Highlight */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                  Metric / Highlight Badge (Optional)
                </label>
                <input
                  type="text"
                  value={channelMetric}
                  onChange={(e) => setChannelMetric(e.target.value)}
                  placeholder="e.g. +450K Views/Video, 8.2M Reach, Commercial Spot"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              {/* Rating selection (1-5) */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Rating (1 to 5 Stars)</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  <option value={2}>⭐⭐ (2 Stars)</option>
                  <option value={1}>⭐ (1 Star)</option>
                </select>
              </div>

              {/* Testimonial Text */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Review Text</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write the reviewer's testimonial..."
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-855 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-650 text-white font-bold rounded-xl text-sm transition-all duration-300"
                >
                  {currentTestimonial ? 'Save Changes' : 'Create Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageTestimonials
