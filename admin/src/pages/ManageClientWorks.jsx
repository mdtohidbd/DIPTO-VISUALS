import React, { useState, useEffect } from 'react'
import { api } from '../utils/api'
import { Plus, Edit2, Trash2, X, Upload, ExternalLink, AlertCircle, Check, Tag } from 'lucide-react'

const ManageClientWorks = () => {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentWork, setCurrentWork] = useState(null)
  
  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [link, setLink] = useState('')
  const [buttonText, setButtonText] = useState('View Live Project')
  const [techStack, setTechStack] = useState([])
  const [newTag, setNewTag] = useState('')
  const [uploading, setUploading] = useState(false)

  const loadWorks = async () => {
    try {
      setLoading(true)
      const data = await api.getClientWorks()
      setWorks(data)
    } catch (err) {
      setError('Failed to load client works.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWorks()
  }, [])

  const openAddModal = () => {
    setCurrentWork(null)
    setTitle('')
    setDescription('')
    setImage('')
    setLink('')
    setButtonText('View Live Project')
    setTechStack([])
    setNewTag('')
    setError('')
    setIsModalOpen(true)
  }

  const openEditModal = (work) => {
    setCurrentWork(work)
    setTitle(work.title || '')
    setDescription(work.description || '')
    setImage(work.image || '')
    setLink(work.link || '')
    setButtonText(work.buttonText || 'View Live Project')
    setTechStack(Array.isArray(work.techStack) ? work.techStack : [])
    setNewTag('')
    setError('')
    setIsModalOpen(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setUploading(true)
    setError('')
    try {
      const data = await api.uploadImage(file)
      setImage(data.url)
      setSuccess('Image uploaded successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || 'Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const addTag = (e) => {
    e.preventDefault()
    if (!newTag.trim()) return
    if (techStack.includes(newTag.trim())) {
      setNewTag('')
      return
    }
    setTechStack([...techStack, newTag.trim()])
    setNewTag('')
  }

  const removeTag = (tagToRemove) => {
    setTechStack(techStack.filter(t => t !== tagToRemove))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title || !description) {
      setError('Title and description are required.')
      return
    }

    const workData = { title, description, image, link, buttonText, techStack }

    try {
      if (currentWork) {
        await api.updateClientWork(currentWork.id, workData)
        setSuccess('Client work updated successfully!')
      } else {
        await api.createClientWork(workData)
        setSuccess('Client work added successfully!')
      }
      setIsModalOpen(false)
      loadWorks()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message || 'Failed to save client work.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client work?')) return

    try {
      await api.deleteClientWork(id)
      setSuccess('Client work deleted successfully!')
      loadWorks()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to delete client work.')
    }
  }

  const getImageUrl = (imgStr) => {
    if (!imgStr) return 'https://placehold.co/600x400/1e293b/cbd5e1?text=No+Image'
    const base = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : ''
    return `${base}${imgStr.startsWith('/') ? '' : '/'}${imgStr}`
  }

  return (
    <div className="space-y-8">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Client Works Management</h1>
          <p className="text-slate-400 mt-2 text-sm">Add, modify, or delete your client portfolio works</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 px-5 py-3 bg-teal-500 hover:bg-teal-650 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-teal-500/20 self-start"
        >
          <Plus className="w-5 h-5" />
          <span>Add Client Work</span>
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

      {/* Client Works Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-[40vh]">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : works.length === 0 ? (
        <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
          <Upload className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-slate-400 font-semibold">No client works available</p>
          <button onClick={openAddModal} className="mt-4 text-xs font-bold text-teal-400 hover:text-teal-350">
            Create your first client work
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {works.map((work) => (
            <div key={work.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg p-6 flex flex-col md:flex-row gap-6">
              {/* Image Thumbnail */}
              <div className="w-full md:w-48 h-40 rounded-2xl overflow-hidden bg-slate-950 flex-shrink-0 relative group">
                <img
                  src={getImageUrl(work.image)}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Work Details */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-slate-100 text-lg line-clamp-1">{work.title}</h3>
                    {work.link && (
                      <a href={work.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-teal-400">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-medium">{work.description}</p>
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {work.techStack?.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => openEditModal(work)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors duration-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
              <h2 className="text-xl font-extrabold text-slate-100">
                {currentWork ? 'Edit Client Work' : 'Add Client Work'}
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

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Work Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CoinGrow365 (FinTech)"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the client deliverables and business values..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Image Input & Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Work Image</label>
                <div className="flex space-x-3 mb-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="URL (or upload below)"
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                  />
                  {image && (
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex-shrink-0">
                      <img src={getImageUrl(image)} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                {/* Upload Section */}
                <div className="relative border border-dashed border-slate-800 hover:border-slate-600 rounded-xl p-4 bg-slate-950/40 text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    disabled={uploading}
                  />
                  <div className="flex flex-col items-center space-y-1">
                    <Upload className="w-5 h-5 text-slate-500" />
                    <span className="text-xs text-slate-400">
                      {uploading ? 'Uploading image...' : 'Upload Work File (JPG, PNG, WebP)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Live Link</label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://client-project.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Button Text</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="e.g. View Live Project"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Technology Stack tag inputs */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">
                  Tech Stack Tag Additions
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="e.g. Next.js"
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-sm transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {techStack.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 cursor-pointer transition-colors"
                      onClick={() => removeTag(tag)}
                      title="Click to remove"
                    >
                      <span>{tag}</span>
                      <X className="w-3 h-3 text-slate-500 hover:text-red-400" />
                    </span>
                  ))}
                  {techStack.length === 0 && (
                    <span className="text-xs text-slate-600 italic">No technologies added yet</span>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-650 text-white font-bold rounded-xl text-sm transition-all duration-300"
                >
                  {currentWork ? 'Save Changes' : 'Create Work'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageClientWorks
