import React, { useState, useEffect, useRef } from 'react';
import { api } from '../utils/api';
import { DEFAULT_CONFIG } from '../../context/SiteConfigContext';
import { DynamicIcon, AVAILABLE_ICON_NAMES } from '../../utils/iconMap';
import { 
  Sliders, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Edit2, 
  Upload, 
  Save, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Film, 
  Layers, 
  Briefcase, 
  DollarSign, 
  HelpCircle, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Image as ImageIcon,
  ArrowUpRight,
  Building2,
  Shield,
  Zap
} from 'lucide-react';

const TABS = [
  { id: 'visibility', label: 'Section Visibility', icon: Sliders },
  { id: 'hero', label: 'Hero & Intro', icon: Sparkles },
  { id: 'stats', label: 'Stats Counter', icon: Zap },
  { id: 'logos', label: 'Agency Logos', icon: Building2 },
  { id: 'casestudy', label: 'Featured Case Study', icon: Film },
  { id: 'beforeafter', label: 'Before & After Grade', icon: Layers },
  { id: 'services', label: 'Services Module', icon: Briefcase },
  { id: 'process', label: '4-Step Pipeline', icon: ArrowUpRight },
  { id: 'pricing', label: 'Pricing Packages', icon: DollarSign },
  { id: 'whyus', label: 'Why Choose Us', icon: Shield },
  { id: 'faqs', label: 'FAQ Accordion', icon: HelpCircle },
];

export const ManageSections = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('visibility');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadingField, setUploadingField] = useState(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const data = await api.getSiteConfig();
      if (data && typeof data === 'object') {
        setConfig(prev => ({
          ...DEFAULT_CONFIG,
          ...data,
          caseStudy: { ...DEFAULT_CONFIG.caseStudy, ...(data.caseStudy || {}) },
          beforeAfter: { ...DEFAULT_CONFIG.beforeAfter, ...(data.beforeAfter || {}) },
          sectionVisibility: { ...DEFAULT_CONFIG.sectionVisibility, ...(data.sectionVisibility || {}) },
          services: Array.isArray(data.services) && data.services.length > 0 ? data.services : DEFAULT_CONFIG.services,
          processSteps: Array.isArray(data.processSteps) && data.processSteps.length > 0 ? data.processSteps : DEFAULT_CONFIG.processSteps,
          pricingPackages: Array.isArray(data.pricingPackages) && data.pricingPackages.length > 0 ? data.pricingPackages : DEFAULT_CONFIG.pricingPackages,
          faqs: Array.isArray(data.faqs) && data.faqs.length > 0 ? data.faqs : DEFAULT_CONFIG.faqs,
          logos: Array.isArray(data.logos) && data.logos.length > 0 ? data.logos : DEFAULT_CONFIG.logos,
          stats: Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : DEFAULT_CONFIG.stats,
          whyChooseUsReasons: Array.isArray(data.whyChooseUsReasons) && data.whyChooseUsReasons.length > 0 ? data.whyChooseUsReasons : DEFAULT_CONFIG.whyChooseUsReasons
        }));
      }
    } catch (err) {
      console.warn('Could not load site config, using defaults:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await api.updateSiteConfig(config);
      setSuccessMsg('All landing page modules & sections updated successfully! Changes are live.');
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save changes to server.');
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to restore default copywriting & sections? You can save after reviewing.')) {
      setConfig(DEFAULT_CONFIG);
      setSuccessMsg('Restored default configuration. Click "Save All Changes" to persist.');
    }
  };

  // Image uploader handler
  const handleFileUpload = async (file, onComplete) => {
    if (!file) return;
    try {
      const res = await api.uploadImage(file);
      const url = res.imageUrl || res.url;
      if (url) {
        onComplete(url);
      }
    } catch (err) {
      alert('Upload failed: ' + (err.message || 'Network error'));
    }
  };

  // Helper for Top-Level String/Number fields
  const updateField = (field, val) => {
    setConfig(prev => ({ ...prev, [field]: val }));
  };

  // Section Visibility toggle
  const toggleSection = (sectionKey) => {
    setConfig(prev => ({
      ...prev,
      sectionVisibility: {
        ...(prev.sectionVisibility || {}),
        [sectionKey]: prev.sectionVisibility?.[sectionKey] === false ? true : false
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <RefreshCw className="w-10 h-10 animate-spin text-teal-400 mb-4" />
        <p className="text-lg font-medium">Loading landing page configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl backdrop-blur-md sticky top-4 z-20 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
              Live Page Builder
            </span>
            <span className="text-xs text-slate-500">Full Dynamic Control</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">
            Landing Page Modules & Sections
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Edit text, upload imagery, toggle visibility, and add/remove points across all modules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all"
            title="Reset to defaults"
          >
            Reset Defaults
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-teal-500/30 hover:border-teal-500/50 bg-teal-500/10 text-teal-300 hover:text-teal-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Preview Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-teal-500 hover:from-red-500 hover:to-teal-400 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-teal-500/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Layout: Tabs on Left, Editor Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 space-y-1.5 bg-slate-900/60 border border-slate-800 p-3 rounded-2xl h-fit">
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Modules List
          </p>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-red-500/20 to-teal-500/10 text-white border-l-4 border-teal-400 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-teal-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-3 bg-slate-900/70 border border-slate-800 p-6 md:p-8 rounded-2xl min-h-[500px]">
          
          {/* TAB 1: SECTION VISIBILITY */}
          {activeTab === 'visibility' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Section Visibility Toggles</h2>
                <p className="text-xs text-slate-400">
                  Switch entire modules on or off on your live landing page in one click.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  { key: 'hero', name: 'Hero / Headline Section' },
                  { key: 'stats', name: 'Stats & Metrics Bar' },
                  { key: 'logoStrip', name: 'Agency Logos Marquee' },
                  { key: 'caseStudy', name: 'Featured Case Study ($4.8M Villa)' },
                  { key: 'projects', name: 'Client Showreel & Video Grid' },
                  { key: 'beforeAfter', name: 'Before & After Color Grading' },
                  { key: 'services', name: 'Services & Capabilities (9 Modules)' },
                  { key: 'process', name: '4-Step Production Pipeline' },
                  { key: 'pricing', name: 'Pricing & Investment Tiers' },
                  { key: 'whyUs', name: 'Why Choose Us / Advantage' },
                  { key: 'testimonials', name: 'Client Reviews & Social Proof' },
                  { key: 'faq', name: 'Frequently Asked Questions (FAQ)' },
                  { key: 'contact', name: 'Contact & Booking Section' },
                ].map(({ key, name }) => {
                  const isVisible = config.sectionVisibility?.[key] !== false;
                  return (
                    <div
                      key={key}
                      onClick={() => toggleSection(key)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isVisible
                          ? 'bg-slate-800/80 border-teal-500/30 text-white'
                          : 'bg-slate-950/40 border-slate-800/70 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isVisible ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-600'}`}>
                          {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${isVisible ? 'text-slate-100' : 'text-slate-400'}`}>{name}</p>
                          <p className="text-[11px] text-slate-500">{isVisible ? 'Visible on live page' : 'Hidden from live page'}</p>
                        </div>
                      </div>

                      <div className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${isVisible ? 'bg-teal-500' : 'bg-slate-800'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isVisible ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: HERO & INTRO */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Hero Section & Branding</h2>
                <p className="text-xs text-slate-400">
                  Control the main headline, luxury gradient text, intro copy, badges, and profile image.
                </p>
              </div>

              {/* Profile Image & Badges */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Profile Image & Avatar</h3>
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 relative flex-shrink-0 flex items-center justify-center">
                    {config.profileImage ? (
                      <img src={config.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-600" />
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <label className="text-xs text-slate-400">Image URL or Local Upload</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.profileImage || ''}
                        onChange={(e) => updateField('profileImage', e.target.value)}
                        placeholder="Paste image URL (or upload below)"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                      />
                      <label className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0], (url) => updateField('profileImage', url));
                            }
                          }}
                        />
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-500">Square portrait image recommended (JPG, PNG, WebP).</p>
                  </div>
                </div>
              </div>

              {/* Headlines & Copy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Hero Badge Pill</label>
                  <input
                    type="text"
                    value={config.heroBadge || ''}
                    onChange={(e) => updateField('heroBadge', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Status Badge (Top Pill)</label>
                  <input
                    type="text"
                    value={config.statusBadgeText || ''}
                    onChange={(e) => updateField('statusBadgeText', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Headline Start (White text)</label>
                  <input
                    type="text"
                    value={config.heroHeadlineStart || ''}
                    onChange={(e) => updateField('heroHeadlineStart', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Headline Highlight (Gradient text)</label>
                  <input
                    type="text"
                    value={config.heroHeadlineGradient || ''}
                    onChange={(e) => updateField('heroHeadlineGradient', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Hero Subtitle / Description</label>
                  <textarea
                    rows={3}
                    value={config.heroDescription || ''}
                    onChange={(e) => updateField('heroDescription', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Call-to-Actions */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Hero Buttons (Call to Actions)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Primary Button Text</label>
                    <input
                      type="text"
                      value={config.heroCta1Text || ''}
                      onChange={(e) => updateField('heroCta1Text', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                    />
                    <label className="text-xs font-semibold text-slate-300 mt-2 block">Primary Button Link</label>
                    <input
                      type="text"
                      value={config.heroCta1Link || ''}
                      onChange={(e) => updateField('heroCta1Link', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Secondary Button Text</label>
                    <input
                      type="text"
                      value={config.heroCta2Text || ''}
                      onChange={(e) => updateField('heroCta2Text', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                    />
                    <label className="text-xs font-semibold text-slate-300 mt-2 block">Secondary Button Link</label>
                    <input
                      type="text"
                      value={config.heroCta2Link || ''}
                      onChange={(e) => updateField('heroCta2Link', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STATS COUNTER */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Stats & Metric Counters</h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, or remove credibility metrics displayed right under the hero.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newStats = [...(config.stats || []), { id: `stat_${Date.now()}`, value: '100+', label: 'New Metric' }];
                    updateField('stats', newStats);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Stat</span>
                </button>
              </div>

              <div className="space-y-3">
                {(config.stats || []).map((item, idx) => (
                  <div key={item.id || idx} className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      #{idx + 1}
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 mb-1 block">Value (e.g. 500+, 100M+)</label>
                        <input
                          type="text"
                          value={item.value || ''}
                          onChange={(e) => {
                            const updated = [...config.stats];
                            updated[idx].value = e.target.value;
                            updateField('stats', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 mb-1 block">Label (e.g. Videos Edited)</label>
                        <input
                          type="text"
                          value={item.label || ''}
                          onChange={(e) => {
                            const updated = [...config.stats];
                            updated[idx].label = e.target.value;
                            updateField('stats', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = config.stats.filter((_, i) => i !== idx);
                        updateField('stats', updated);
                      }}
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                      title="Delete stat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AGENCY LOGOS */}
          {activeTab === 'logos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Agency Logos Marquee</h2>
                  <p className="text-xs text-slate-400">
                    Trusted real estate brokerages and agency names displayed in the infinite ticker.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newLogos = [...(config.logos || []), { id: `logo_${Date.now()}`, name: 'Agency Name', icon: 'Building2' }];
                    updateField('logos', newLogos);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Agency</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Ticker Caption / Header</label>
                <input
                  type="text"
                  value={config.logosTitle || ''}
                  onChange={(e) => updateField('logosTitle', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(config.logos || []).map((logo, idx) => (
                  <div key={logo.id || idx} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                        <DynamicIcon name={logo.icon} className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={logo.name || ''}
                        onChange={(e) => {
                          const updated = [...config.logos];
                          updated[idx].name = e.target.value;
                          updateField('logos', updated);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-teal-500"
                        placeholder="Agency Name"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = config.logos.filter((_, i) => i !== idx);
                        updateField('logos', updated);
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CASE STUDY */}
          {activeTab === 'casestudy' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Featured Case Study ($4.8M Villa)</h2>
                <p className="text-xs text-slate-400">
                  Highlight a high-converting multimillion-dollar project with problem, strategic solution, and verified metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Badge</label>
                  <input
                    type="text"
                    value={config.caseStudy?.badge || ''}
                    onChange={(e) => updateField('caseStudy', { ...config.caseStudy, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Title</label>
                  <input
                    type="text"
                    value={config.caseStudy?.title || ''}
                    onChange={(e) => updateField('caseStudy', { ...config.caseStudy, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Subtitle / Hook</label>
                  <textarea
                    rows={2}
                    value={config.caseStudy?.subtitle || ''}
                    onChange={(e) => updateField('caseStudy', { ...config.caseStudy, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Case Study Image & Video */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Featured Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Villa Photo / Poster</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={config.caseStudy?.image || ''}
                        onChange={(e) => updateField('caseStudy', { ...config.caseStudy, image: e.target.value })}
                        placeholder="Image URL"
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                      />
                      <label className="px-3 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold cursor-pointer flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0], (url) => {
                                updateField('caseStudy', { ...config.caseStudy, image: url });
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300">Video Embed URL (MP4 / WebM / YouTube / Vimeo)</label>
                    <input
                      type="text"
                      value={config.caseStudy?.videoUrl || ''}
                      onChange={(e) => updateField('caseStudy', { ...config.caseStudy, videoUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-red-400 uppercase tracking-wider block">The Challenge</label>
                  <input
                    type="text"
                    value={config.caseStudy?.challengeTitle || ''}
                    onChange={(e) => updateField('caseStudy', { ...config.caseStudy, challengeTitle: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                    placeholder="Title"
                  />
                  <textarea
                    rows={3}
                    value={config.caseStudy?.challengeDesc || ''}
                    onChange={(e) => updateField('caseStudy', { ...config.caseStudy, challengeDesc: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none resize-none"
                    placeholder="Description of problem..."
                  />
                </div>
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-teal-400 uppercase tracking-wider block">The Strategic Solution</label>
                  <input
                    type="text"
                    value={config.caseStudy?.solutionTitle || ''}
                    onChange={(e) => updateField('caseStudy', { ...config.caseStudy, solutionTitle: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                    placeholder="Title"
                  />
                  <textarea
                    rows={3}
                    value={config.caseStudy?.solutionDesc || ''}
                    onChange={(e) => updateField('caseStudy', { ...config.caseStudy, solutionDesc: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none resize-none"
                    placeholder="Description of how you solved it..."
                  />
                </div>
              </div>

              {/* Result Metrics */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Result Metric Highlights</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const resList = [...(config.caseStudy?.results || []), { metric: '100K+ Views', label: 'campaign result' }];
                      updateField('caseStudy', { ...config.caseStudy, results: resList });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Metric</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {(config.caseStudy?.results || []).map((resItem, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={resItem.metric || ''}
                        onChange={(e) => {
                          const updated = [...config.caseStudy.results];
                          updated[idx].metric = e.target.value;
                          updateField('caseStudy', { ...config.caseStudy, results: updated });
                        }}
                        placeholder="Metric (e.g. 140,000+ Views)"
                        className="w-1/3 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                      />
                      <input
                        type="text"
                        value={resItem.label || ''}
                        onChange={(e) => {
                          const updated = [...config.caseStudy.results];
                          updated[idx].label = e.target.value;
                          updateField('caseStudy', { ...config.caseStudy, results: updated });
                        }}
                        placeholder="Label description"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = config.caseStudy.results.filter((_, i) => i !== idx);
                          updateField('caseStudy', { ...config.caseStudy, results: updated });
                        }}
                        className="p-1.5 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BEFORE & AFTER GRADE */}
          {activeTab === 'beforeafter' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Before & After Color Grading</h2>
                <p className="text-xs text-slate-400">
                  Interactive split-screen slider demonstrating raw LOG camera flat footage vs master DaVinci grade.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Badge</label>
                  <input
                    type="text"
                    value={config.beforeAfter?.badge || ''}
                    onChange={(e) => updateField('beforeAfter', { ...config.beforeAfter, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Title</label>
                  <input
                    type="text"
                    value={config.beforeAfter?.title || ''}
                    onChange={(e) => updateField('beforeAfter', { ...config.beforeAfter, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Subtitle</label>
                  <textarea
                    rows={2}
                    value={config.beforeAfter?.subtitle || ''}
                    onChange={(e) => updateField('beforeAfter', { ...config.beforeAfter, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Slider Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-800/40 border border-slate-800">
                {/* Raw Image */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase">Left Side: Raw Profile</span>
                    <input
                      type="text"
                      value={config.beforeAfter?.rawLabel || 'FLAT RAW PROFILE'}
                      onChange={(e) => updateField('beforeAfter', { ...config.beforeAfter, rawLabel: e.target.value })}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-[10px] text-slate-300"
                    />
                  </div>
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 relative">
                    {config.beforeAfter?.rawImage ? (
                      <img src={config.beforeAfter.rawImage} alt="Raw" className="w-full h-full object-cover saturate-50 contrast-75 brightness-90" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-600 text-xs">No Raw Image</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={config.beforeAfter?.rawImage || ''}
                      onChange={(e) => updateField('beforeAfter', { ...config.beforeAfter, rawImage: e.target.value })}
                      placeholder="Image URL"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                    />
                    <label className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], (url) => {
                              updateField('beforeAfter', { ...config.beforeAfter, rawImage: url });
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Graded Image */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300 uppercase">Right Side: Graded Master</span>
                    <input
                      type="text"
                      value={config.beforeAfter?.gradedLabel || 'HOLLYWOOD MASTER GRADE'}
                      onChange={(e) => updateField('beforeAfter', { ...config.beforeAfter, gradedLabel: e.target.value })}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-[10px] text-teal-400 font-bold"
                    />
                  </div>
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 relative">
                    {config.beforeAfter?.gradedImage ? (
                      <img src={config.beforeAfter.gradedImage} alt="Graded" className="w-full h-full object-cover saturate-125" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-600 text-xs">No Graded Image</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={config.beforeAfter?.gradedImage || ''}
                      onChange={(e) => updateField('beforeAfter', { ...config.beforeAfter, gradedImage: e.target.value })}
                      placeholder="Image URL"
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                    />
                    <label className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], (url) => {
                              updateField('beforeAfter', { ...config.beforeAfter, gradedImage: url });
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SERVICES MODULE */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Services & Capabilities (9 Modules)</h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, change icons, or remove post-production service offerings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newServices = [
                      ...(config.services || []),
                      {
                        id: `srv_${Date.now()}`,
                        icon: 'Sparkles',
                        title: 'New Editorial Service',
                        desc: 'Bespoke video craftsmanship engineered to captivate real estate prospects and elevate your listing portfolio.'
                      }
                    ];
                    updateField('services', newServices);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all self-start"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Section Header Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Badge</label>
                  <input
                    type="text"
                    value={config.servicesBadge || ''}
                    onChange={(e) => updateField('servicesBadge', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Title First Part</label>
                  <input
                    type="text"
                    value={config.servicesTitle || ''}
                    onChange={(e) => updateField('servicesTitle', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Title Gradient Part</label>
                  <input
                    type="text"
                    value={config.servicesGradient || ''}
                    onChange={(e) => updateField('servicesGradient', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-4 pt-2">
                {(config.services || []).map((srv, idx) => (
                  <div key={srv.id || idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                          <DynamicIcon name={srv.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-300">Service #{idx + 1}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Icon Selector Dropdown */}
                        <div className="flex items-center gap-1.5">
                          <label className="text-[11px] text-slate-400">Icon:</label>
                          <select
                            value={srv.icon || 'Sparkles'}
                            onChange={(e) => {
                              const updated = [...config.services];
                              updated[idx].icon = e.target.value;
                              updateField('services', updated);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none"
                          >
                            {AVAILABLE_ICON_NAMES.map(name => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = config.services.filter((_, i) => i !== idx);
                            updateField('services', updated);
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-400"
                          title="Delete service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Service Title</label>
                        <input
                          type="text"
                          value={srv.title || ''}
                          onChange={(e) => {
                            const updated = [...config.services];
                            updated[idx].title = e.target.value;
                            updateField('services', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={srv.desc || ''}
                          onChange={(e) => {
                            const updated = [...config.services];
                            updated[idx].desc = e.target.value;
                            updateField('services', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: 4-STEP PIPELINE */}
          {activeTab === 'process' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">4-Step Production Pipeline</h2>
                  <p className="text-xs text-slate-400">
                    The frictionless workflow steps that reassure agents and brokerages.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newSteps = [
                      ...(config.processSteps || []),
                      {
                        id: `step_${Date.now()}`,
                        icon: 'CheckCircle',
                        title: 'Workflow Step',
                        desc: 'Description of this production phase.'
                      }
                    ];
                    updateField('processSteps', newSteps);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all self-start"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Step</span>
                </button>
              </div>

              {/* Steps List */}
              <div className="space-y-4">
                {(config.processSteps || []).map((step, idx) => (
                  <div key={step.id || idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 font-extrabold text-xs flex items-center justify-center">
                          0{idx + 1}
                        </div>
                        <span className="text-xs font-bold text-slate-200">Step {idx + 1}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={step.icon || 'Scissors'}
                          onChange={(e) => {
                            const updated = [...config.processSteps];
                            updated[idx].icon = e.target.value;
                            updateField('processSteps', updated);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 outline-none"
                        >
                          {AVAILABLE_ICON_NAMES.map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = config.processSteps.filter((_, i) => i !== idx);
                            updateField('processSteps', updated);
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Step Title</label>
                        <input
                          type="text"
                          value={step.title || ''}
                          onChange={(e) => {
                            const updated = [...config.processSteps];
                            updated[idx].title = e.target.value;
                            updateField('processSteps', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-slate-400 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={step.desc || ''}
                          onChange={(e) => {
                            const updated = [...config.processSteps];
                            updated[idx].desc = e.target.value;
                            updateField('processSteps', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: PRICING PACKAGES */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Pricing & Investment Packages</h2>
                  <p className="text-xs text-slate-400">
                    Manage tier names, pricing, periods, highlight status, and bullet point feature lists.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newPackages = [
                      ...(config.pricingPackages || []),
                      {
                        id: `pkg_${Date.now()}`,
                        name: 'New Package Tier',
                        price: '$199',
                        period: '/video',
                        desc: 'Perfect for standard listing campaigns.',
                        features: ['4K Master Delivery', 'DaVinci Color Correction', 'Licensed Music'],
                        highlight: false,
                        ctaText: 'Book Now',
                        ctaLink: '#contact'
                      }
                    ];
                    updateField('pricingPackages', newPackages);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all self-start"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Package</span>
                </button>
              </div>

              {/* Package Cards */}
              <div className="space-y-6">
                {(config.pricingPackages || []).map((pkg, idx) => (
                  <div key={pkg.id || idx} className={`p-5 rounded-2xl border space-y-4 ${pkg.highlight ? 'bg-slate-800/70 border-teal-500/50' : 'bg-slate-800/40 border-slate-800'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-white">{pkg.name || `Package #${idx + 1}`}</span>
                        {pkg.highlight && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
                            Featured Tier
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                          <input
                            type="checkbox"
                            checked={!!pkg.highlight}
                            onChange={(e) => {
                              const updated = [...config.pricingPackages];
                              updated[idx].highlight = e.target.checked;
                              updateField('pricingPackages', updated);
                            }}
                            className="rounded bg-slate-950 border-slate-700 text-teal-500"
                          />
                          <span>Highlight as Popular</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = config.pricingPackages.filter((_, i) => i !== idx);
                            updateField('pricingPackages', updated);
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-400"
                          title="Delete package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Package Name</label>
                        <input
                          type="text"
                          value={pkg.name || ''}
                          onChange={(e) => {
                            const updated = [...config.pricingPackages];
                            updated[idx].name = e.target.value;
                            updateField('pricingPackages', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Price (e.g. $175, $295)</label>
                        <input
                          type="text"
                          value={pkg.price || ''}
                          onChange={(e) => {
                            const updated = [...config.pricingPackages];
                            updated[idx].price = e.target.value;
                            updateField('pricingPackages', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Period (e.g. /video, /month)</label>
                        <input
                          type="text"
                          value={pkg.period || ''}
                          onChange={(e) => {
                            const updated = [...config.pricingPackages];
                            updated[idx].period = e.target.value;
                            updateField('pricingPackages', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[11px] text-slate-400 block mb-1">Short Description</label>
                        <input
                          type="text"
                          value={pkg.desc || ''}
                          onChange={(e) => {
                            const updated = [...config.pricingPackages];
                            updated[idx].desc = e.target.value;
                            updateField('pricingPackages', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                        />
                      </div>
                    </div>

                    {/* Features List for this package */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Features Included (Bullet Points)</label>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...config.pricingPackages];
                            updated[idx].features = [...(updated[idx].features || []), 'New feature'];
                            updateField('pricingPackages', updated);
                          }}
                          className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Bullet Point</span>
                        </button>
                      </div>

                      {(pkg.features || []).map((feat, featIdx) => (
                        <div key={featIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => {
                              const updated = [...config.pricingPackages];
                              updated[idx].features[featIdx] = e.target.value;
                              updateField('pricingPackages', updated);
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...config.pricingPackages];
                              updated[idx].features = updated[idx].features.filter((_, i) => i !== featIdx);
                              updateField('pricingPackages', updated);
                            }}
                            className="p-1 text-slate-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* CTA Text & Link */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Button Text</label>
                        <input
                          type="text"
                          value={pkg.ctaText || 'Book Now'}
                          onChange={(e) => {
                            const updated = [...config.pricingPackages];
                            updated[idx].ctaText = e.target.value;
                            updateField('pricingPackages', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Button Link</label>
                        <input
                          type="text"
                          value={pkg.ctaLink || '#contact'}
                          onChange={(e) => {
                            const updated = [...config.pricingPackages];
                            updated[idx].ctaLink = e.target.value;
                            updateField('pricingPackages', updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: WHY CHOOSE US */}
          {activeTab === 'whyus' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Why Choose Us (Advantage Section)</h2>
                <p className="text-xs text-slate-400">
                  Competitive differentiators, showcase workspace imagery, and key agency reasons.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Badge</label>
                  <input
                    type="text"
                    value={config.whyChooseUsBadge || ''}
                    onChange={(e) => updateField('whyChooseUsBadge', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Title</label>
                  <input
                    type="text"
                    value={config.whyChooseUsTitle || ''}
                    onChange={(e) => updateField('whyChooseUsTitle', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Gradient Highlight Part</label>
                  <input
                    type="text"
                    value={config.whyChooseUsGradient || ''}
                    onChange={(e) => updateField('whyChooseUsGradient', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Showcase Image URL / Upload</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={config.whyChooseUsImage || ''}
                      onChange={(e) => updateField('whyChooseUsImage', e.target.value)}
                      placeholder="Image URL"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none"
                    />
                    <label className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold cursor-pointer flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], (url) => updateField('whyChooseUsImage', url));
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Subtitle / Narrative</label>
                  <textarea
                    rows={3}
                    value={config.whyChooseUsSubtitle || ''}
                    onChange={(e) => updateField('whyChooseUsSubtitle', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-teal-500 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Reasons List */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Competitive Advantage Reasons (List)</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newReasons = [...(config.whyChooseUsReasons || []), 'New Advantage Reason'];
                      updateField('whyChooseUsReasons', newReasons);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Reason</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(config.whyChooseUsReasons || []).map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={reason}
                        onChange={(e) => {
                          const updated = [...config.whyChooseUsReasons];
                          updated[idx] = e.target.value;
                          updateField('whyChooseUsReasons', updated);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = config.whyChooseUsReasons.filter((_, i) => i !== idx);
                          updateField('whyChooseUsReasons', updated);
                        }}
                        className="p-1 text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Frequently Asked Questions (FAQ)</h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, or remove answers to common questions about turnarounds, raw file transfer, revisions, and licensing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newFaqs = [
                      ...(config.faqs || []),
                      {
                        id: `faq_${Date.now()}`,
                        question: 'What is your revision turnaround time?',
                        answer: 'We provide revisions within 24 hours of receiving Frame.io feedback.'
                      }
                    ];
                    updateField('faqs', newFaqs);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all self-start"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                {(config.faqs || []).map((faq, idx) => (
                  <div key={faq.id || idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-400">Question #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = config.faqs.filter((_, i) => i !== idx);
                          updateField('faqs', updated);
                        }}
                        className="p-1 text-slate-500 hover:text-red-400"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={faq.question || ''}
                        onChange={(e) => {
                          const updated = [...config.faqs];
                          updated[idx].question = e.target.value;
                          updateField('faqs', updated);
                        }}
                        placeholder="Question title..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none font-medium"
                      />
                      <textarea
                        rows={3}
                        value={faq.answer || ''}
                        onChange={(e) => {
                          const updated = [...config.faqs];
                          updated[idx].answer = e.target.value;
                          updateField('faqs', updated);
                        }}
                        placeholder="Detailed answer..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ManageSections;
