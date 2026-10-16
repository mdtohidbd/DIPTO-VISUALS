import React, { useState, useEffect, useRef } from 'react';
import { api } from '../utils/api';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Upload, 
  Film, 
  Clock, 
  Eye, 
  Video, 
  Play, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Link as LinkIcon, 
  FileVideo, 
  Image as ImageIcon,
  Search,
  Filter,
  Layers,
  Wand2
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  'Short-form / 9:16 Reels',
  'YouTube Long-form',
  'Commercials & Brand Ads',
  'Real Estate Cinematics',
  'Drone & Aerial Tours',
  '3D Motion & VFX',
  'Master Showreel'
];

const ASPECT_RATIO_OPTIONS = [
  { label: '16:9 (Landscape Cinema / YouTube)', value: '16:9' },
  { label: '9:16 (Vertical Reels / Shorts / TikTok)', value: '9:16' },
  { label: '4:5 (Instagram Portrait Feed)', value: '4:5' },
  { label: '1:1 (Square Social)', value: '1:1' },
  { label: '21:9 (Anamorphic Cinema Ultrawide)', value: '21:9' }
];

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  
  // Video Lightbox Preview in Admin
  const [previewVideoItem, setPreviewVideoItem] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Short-form / 9:16 Reels');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('0:30');
  const [views, setViews] = useState('500K Views');
  const [tools, setTools] = useState('Premiere Pro, After Effects, DaVinci Resolve');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [live, setLive] = useState('');

  // Upload states
  const [videoUploadTab, setVideoUploadTab] = useState('file'); // 'file' | 'url'
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const videoFileInputRef = useRef(null);
  const imageFileInputRef = useRef(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setCurrentProject(null);
    setTitle('');
    setCategory('Short-form / 9:16 Reels');
    setAspectRatio('9:16');
    setVideoUrl('');
    setDuration('0:30');
    setViews('1.2M Views');
    setTools('Premiere Pro, DaVinci Resolve, After Effects');
    setImage('');
    setDesc('');
    setLive('');
    setError('');
    setVideoUploadProgress(0);
    setVideoUploadTab('file');
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setTitle(project.title || '');
    setCategory(project.category || 'YouTube Long-form');
    setAspectRatio(project.aspectRatio || '16:9');
    setVideoUrl(project.videoUrl || '');
    setDuration(project.duration || (project.aspectRatio === '9:16' ? '0:30' : '3:00'));
    setViews(project.views || '100K Views');
    setTools(Array.isArray(project.tools) ? project.tools.join(', ') : project.tools || '');
    setImage(project.image || '');
    setDesc(project.desc || '');
    setLive(project.live || '');
    setError('');
    setVideoUploadProgress(0);
    setVideoUploadTab(project.videoUrl && project.videoUrl.startsWith('/uploads') ? 'file' : 'url');
    setIsModalOpen(true);
  };

  // Video File Upload Handler with Progress
  const handleVideoFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (300MB)
    if (file.size > 300 * 1024 * 1024) {
      setError('Video file is too large. Maximum allowed size is 300MB.');
      return;
    }

    setUploadingVideo(true);
    setVideoUploadProgress(0);
    setError('');

    try {
      const data = await api.uploadVideo(file, (progress) => {
        setVideoUploadProgress(progress);
      });

      if (data && data.url) {
        setVideoUrl(data.url);
        setSuccess(`Video "${file.name}" uploaded successfully!`);
        setTimeout(() => setSuccess(''), 4000);
      }
    } catch (err) {
      setError(err.message || 'Video upload failed. Please verify file format.');
    } finally {
      setUploadingVideo(false);
    }
  };

  // Thumbnail Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setImageUploadProgress(0);
    setError('');

    try {
      const data = await api.uploadImage(file);
      if (data && data.url) {
        setImage(data.url);
        setSuccess('Thumbnail poster uploaded successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.message || 'Thumbnail upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !desc.trim()) {
      setError('Project title and description are required.');
      return;
    }

    const projectData = {
      title: title.trim(),
      category,
      aspectRatio,
      videoUrl: videoUrl.trim(),
      duration: duration.trim() || (aspectRatio === '9:16' ? '0:30' : '3:00'),
      views: views.trim() || '100K Views',
      tools: tools.trim(),
      image: image.trim(),
      desc: desc.trim(),
      live: live.trim()
    };

    try {
      if (currentProject) {
        await api.updateProject(currentProject.id || currentProject._id, projectData);
        setSuccess('Video project updated successfully!');
      } else {
        await api.createProject(projectData);
        setSuccess('New video project added successfully!');
      }
      setIsModalOpen(false);
      loadProjects();
      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to save video project.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video project?')) return;

    try {
      await api.deleteProject(id);
      setSuccess('Project deleted successfully!');
      loadProjects();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete project.');
    }
  };

  const formatMediaUrl = (url) => {
    if (!url) return '';
    const base = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:5000' : '';
    return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Filtered list
  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    const matchesSearch = 
      !searchQuery.trim() ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tools?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight flex items-center gap-3">
            <Film className="w-8 h-8 text-red-500" /> Video Projects Management
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Upload high-resolution video files (30s reels, 4K promos, commercial cuts), set poster thumbnails, and manage showcase metadata.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-red-600/25 hover:shadow-red-600/40 hover:scale-[1.02] self-start"
        >
          <Plus className="w-5 h-5" />
          <span>Add Video Project</span>
        </button>
      </div>

      {/* Message alerts */}
      {success && (
        <div className="p-4 bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm font-medium rounded-2xl flex items-center space-x-3 shadow-lg shadow-teal-500/5 animate-fadeIn">
          <Check className="w-5 h-5 text-teal-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}
      {error && !isModalOpen && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-medium rounded-2xl flex items-center space-x-3 shadow-lg shadow-red-500/5 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, tool, or description..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <button
            onClick={() => setSelectedCategoryFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategoryFilter === 'All'
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All ({projects.length})
          </button>
          {CATEGORY_OPTIONS.map((cat) => {
            const count = projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategoryFilter === cat
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[40vh] space-y-3">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm font-medium">Loading video projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-8">
          <Video className="w-14 h-14 text-slate-700 mx-auto mb-4" />
          <h3 className="text-slate-200 font-bold text-lg">No video projects found</h3>
          <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
            {searchQuery || selectedCategoryFilter !== 'All' 
              ? 'No projects match your active search or filter.' 
              : 'Start by creating your first cinematic video project or reel showcase.'}
          </p>
          <button 
            onClick={openAddModal} 
            className="mt-5 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-red-600/20"
          >
            + Upload New Video Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const isVertical = proj.aspectRatio === '9:16';
            const hasVideo = Boolean(proj.videoUrl);

            return (
              <div 
                key={proj.id || proj._id} 
                className="bg-slate-900/90 border border-slate-800 hover:border-red-500/40 rounded-3xl overflow-hidden shadow-xl group flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              >
                {/* Media Preview Area */}
                <div className="aspect-video relative overflow-hidden bg-black flex items-center justify-center">
                  {proj.image ? (
                    <img
                      src={formatMediaUrl(proj.image)}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-600 p-4">
                      <FileVideo className="w-10 h-10 mb-1 opacity-40" />
                      <span className="text-[11px] font-mono">No Thumbnail Poster</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/50" />

                  {/* Play Video Trigger Overlay */}
                  {hasVideo && (
                    <button
                      onClick={() => setPreviewVideoItem(proj)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 backdrop-blur-md opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all z-20 cursor-pointer"
                      title="Play & Test Video in Lightbox"
                    >
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </button>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md border border-white/20 text-red-400">
                      {proj.category || 'Reel'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md border ${
                      isVertical ? 'text-amber-400 border-amber-500/30' : 'text-cyan-400 border-cyan-500/30'
                    }`}>
                      {proj.aspectRatio || '16:9'}
                    </span>
                  </div>

                  {/* Bottom Duration & Views */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white/90 z-10 pointer-events-none">
                    <span className="flex items-center gap-1 font-mono text-[11px] bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                      <Clock className="w-3 h-3 text-red-400" />
                      {proj.duration || '0:30'}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                      <Eye className="w-3 h-3 text-cyan-400" />
                      {proj.views || '100K Views'}
                    </span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-100 text-base line-clamp-1 group-hover:text-red-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                      {proj.desc}
                    </p>
                    
                    {proj.tools && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {(Array.isArray(proj.tools) ? proj.tools : String(proj.tools).split(',')).slice(0, 3).map((t, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/80">
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      {hasVideo ? (
                        <span className="text-teal-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Video Ready
                        </span>
                      ) : (
                        <span className="text-slate-500">No Video File</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {hasVideo && (
                        <button
                          onClick={() => setPreviewVideoItem(proj)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 rounded-xl transition-colors"
                          title="Preview Video"
                        >
                          <Play className="w-4 h-4 fill-current" />
                        </button>
                      )}
                      <button
                        onClick={() => openEditModal(proj)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id || proj._id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Video Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <Film className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-black text-slate-100">
                  {currentProject ? 'Edit Video Project' : 'Upload New Video Project'}
                </h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
              {error && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium rounded-xl flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern Penthouse — Luxury Cinematic Walkthrough"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Video Upload or URL Selector Box */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Video className="w-4 h-4 text-red-400" />
                    Video Media (MP4 / WebM / 30s Reels)
                  </label>

                  {/* Mode Selector Tabs */}
                  <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setVideoUploadTab('file')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        videoUploadTab === 'file' 
                          ? 'bg-red-600 text-white shadow' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      📁 Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoUploadTab('url')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        videoUploadTab === 'url' 
                          ? 'bg-red-600 text-white shadow' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🔗 Video URL
                    </button>
                  </div>
                </div>

                {/* Tab 1: Direct File Upload */}
                {videoUploadTab === 'file' && (
                  <div className="space-y-3">
                    <input
                      ref={videoFileInputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,video/mov,video/*"
                      onChange={handleVideoFileUpload}
                      className="hidden"
                    />

                    <div 
                      onClick={() => videoFileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                        uploadingVideo 
                          ? 'border-red-500 bg-red-500/5' 
                          : 'border-slate-800 hover:border-red-500/50 bg-slate-900/40 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                        <Upload className={`w-5 h-5 ${uploadingVideo ? 'animate-bounce' : ''}`} />
                      </div>
                      
                      {uploadingVideo ? (
                        <div className="space-y-2 max-w-xs mx-auto">
                          <p className="text-xs font-bold text-red-400">
                            Uploading Video... {videoUploadProgress}%
                          </p>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-red-600 to-orange-500 h-full transition-all duration-200"
                              style={{ width: `${videoUploadProgress}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono">
                            Please wait while your video file is uploaded to the server
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs font-bold text-slate-200">
                            Click or drag to upload video file (MP4, WebM, MOV)
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Ideal for 30s clips, reels, commercials, and 4K property tours (Up to 300MB)
                          </p>
                        </div>
                      )}
                    </div>

                    {videoUrl && (
                      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                        <span className="truncate max-w-sm text-teal-400 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          {videoUrl}
                        </span>
                        <button
                          type="button"
                          onClick={() => setVideoUrl('')}
                          className="text-slate-500 hover:text-red-400 text-xs px-2"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 2: Paste External URL */}
                {videoUploadTab === 'url' && (
                  <div>
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://commondatastorage.googleapis.com/... or https://youtube.com/watch?v=..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none transition-colors"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">
                      Direct MP4 link, Google Cloud Storage, YouTube, Vimeo, or CDN URL.
                    </p>
                  </div>
                )}

                {/* Live Video Preview Player inside Modal */}
                {videoUrl && (
                  <div className="mt-3 pt-3 border-t border-slate-800">
                    <p className="text-[11px] font-bold uppercase text-slate-400 mb-2">Video Preview Test:</p>
                    <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 relative">
                      <video
                        src={formatMediaUrl(videoUrl)}
                        controls
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Poster Thumbnail Image Uploader */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-orange-400" />
                  Poster Thumbnail Image
                </label>

                <div className="flex gap-3 items-center">
                  <input
                    ref={imageFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <div className="flex-1">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Thumbnail URL or upload below"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none transition-colors mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => imageFileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading Thumbnail...' : 'Upload Thumbnail File (JPG, PNG, WebP)'}</span>
                    </button>
                  </div>

                  {image && (
                    <div className="w-24 h-20 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shrink-0">
                      <img 
                        src={formatMediaUrl(image)} 
                        alt="Thumbnail Preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Category & Aspect Ratio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Aspect Ratio Frame
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => {
                      const newRatio = e.target.value;
                      setAspectRatio(newRatio);
                      if (newRatio === '9:16' && duration === '10:00') {
                        setDuration('0:30');
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors cursor-pointer"
                  >
                    {ASPECT_RATIO_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duration & Views Driven */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Duration (e.g. 0:30, 0:45, or 3:00)
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="0:30"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Views / Impressions Driven
                  </label>
                  <input
                    type="text"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    placeholder="1.8M Views"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Editing Tools & Software Stack */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Editing Software / Tools Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                  placeholder="Premiere Pro, DaVinci Resolve, After Effects, Blender"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Retention Story / Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Project Description / Retention Story *
                </label>
                <textarea
                  rows="3"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Explain the editing techniques used (e.g. speed ramping, sound design, Hollywood color grading, retention hook)..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Live Project / Case Study Link */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Live Project / Case Study Link (Optional)
                </label>
                <input
                  type="url"
                  value={live}
                  onChange={(e) => setLive(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingVideo || uploadingImage}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-600/30 disabled:opacity-50 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{currentProject ? 'Save Changes' : 'Publish Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Lightbox Player Preview Modal */}
      {previewVideoItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
          <div className={`relative bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl w-full ${
            previewVideoItem.aspectRatio === '9:16' ? 'max-w-md' : 'max-w-4xl'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-100 line-clamp-1">
                  {previewVideoItem.title}
                </h3>
                <span className="text-[10px] font-mono text-slate-400">
                  {previewVideoItem.category} • {previewVideoItem.aspectRatio}
                </span>
              </div>
              <button 
                onClick={() => setPreviewVideoItem(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className={`${
              previewVideoItem.aspectRatio === '9:16' ? 'h-[540px]' : 'aspect-video'
            } bg-black flex items-center justify-center`}>
              <video
                src={formatMediaUrl(previewVideoItem.videoUrl)}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
