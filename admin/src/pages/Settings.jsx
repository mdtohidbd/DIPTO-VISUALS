import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { 
  Key, 
  AlertCircle, 
  Check, 
  ShieldAlert, 
  Globe, 
  User, 
  Sparkles, 
  Phone, 
  Mail, 
  Share2, 
  Save, 
  RefreshCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'security'

  // Profile & Content State
  const [siteConfig, setSiteConfig] = useState({
    brandName: 'DIPTO VISUALS',
    ownerName: 'Md Tohidul Islam',
    tagline: 'Real Estate Video Editor',
    heroBadge: 'Real Estate Video Editor',
    heroHeadlineStart: 'Turn Raw Property Footage Into',
    heroHeadlineGradient: 'Premium Visual Stories',
    heroDescription: 'High-converting property walkthroughs, drone edits, and viral reels that captivate high-ticket buyers.',
    experienceYears: '5+',
    videosEdited: '500+',
    viewsGenerated: '100M+',
    clientSatisfaction: '99%',
    email: 'contact@diptovisuals.com',
    whatsapp: '+8801700000000',
    bookingUrl: 'https://cal.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com'
  });

  const [loadingConfig, setLoadingConfig] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSuccess, setConfigSuccess] = useState('');
  const [configError, setConfigError] = useState('');

  // Password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await api.getSiteConfig();
        if (data && data.brandName) {
          setSiteConfig(data);
        }
      } catch (err) {
        console.warn('Could not fetch site config from server:', err);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, []);

  const handleConfigChange = (field, value) => {
    setSiteConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setSavingConfig(true);
    setConfigSuccess('');
    setConfigError('');
    try {
      await api.updateSiteConfig(siteConfig);
      setConfigSuccess('Site configuration & profile details updated successfully!');
      setTimeout(() => setConfigSuccess(''), 4000);
    } catch (err) {
      setConfigError(err.message || 'Failed to update site configuration.');
    } finally {
      setSavingConfig(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    setLoadingPassword(true);
    try {
      await api.updatePassword(oldPassword, newPassword);
      setPasswordSuccess('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err.message || 'Failed to update password.');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl pb-16">
      {/* Top Title & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-3">
            <Sliders className="w-8 h-8 text-teal-400" />
            Website & Profile Settings
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Control portfolio text, hero headlines, stats, contacts, and admin credentials dynamically.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'content'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            Site & Hero Content
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-red-500 text-white shadow-md shadow-red-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4" />
            Security & Login
          </button>
        </div>
      </div>

      {/* TAB 1: Site Content Customizer */}
      {activeTab === 'content' && (
        <form onSubmit={handleSaveConfig} className="space-y-6">
          {configSuccess && (
            <div className="p-4 bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm rounded-2xl flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
              <span>{configSuccess}</span>
            </div>
          )}
          {configError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-2xl flex items-center gap-3">
              <span>{configError}</span>
            </div>
          )}

          {/* Section 1: Hero & Identity */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-4">
              <Sparkles className="w-5 h-5 text-teal-400" />
              Hero Section & Brand Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Brand / Logo Title</label>
                <input
                  type="text"
                  value={siteConfig.brandName}
                  onChange={(e) => handleConfigChange('brandName', e.target.value)}
                  placeholder="e.g. DIPTO VISUALS"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Owner / Editor Name</label>
                <input
                  type="text"
                  value={siteConfig.ownerName}
                  onChange={(e) => handleConfigChange('ownerName', e.target.value)}
                  placeholder="e.g. Md Tohidul Islam"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tagline / Subtitle</label>
                <input
                  type="text"
                  value={siteConfig.tagline}
                  onChange={(e) => handleConfigChange('tagline', e.target.value)}
                  placeholder="e.g. Real Estate & Commercial Video Editor"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Hero Floating Badge</label>
                <input
                  type="text"
                  value={siteConfig.heroBadge}
                  onChange={(e) => handleConfigChange('heroBadge', e.target.value)}
                  placeholder="e.g. Real Estate Video Editor"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Hero Headline (Part 1)</label>
                <input
                  type="text"
                  value={siteConfig.heroHeadlineStart}
                  onChange={(e) => handleConfigChange('heroHeadlineStart', e.target.value)}
                  placeholder="e.g. Turn Raw Property Footage Into"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Hero Headline (Gradient Accent)</label>
                <input
                  type="text"
                  value={siteConfig.heroHeadlineGradient}
                  onChange={(e) => handleConfigChange('heroHeadlineGradient', e.target.value)}
                  placeholder="e.g. Premium Visual Stories"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Hero Description Paragraph</label>
              <textarea
                rows={3}
                value={siteConfig.heroDescription}
                onChange={(e) => handleConfigChange('heroDescription', e.target.value)}
                placeholder="Description of your editing superpowers..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Section 2: Key Experience Numbers / Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-4">
              <User className="w-5 h-5 text-teal-400" />
              Dynamic Statistics & Metrics Counters
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Years Experience</label>
                <input
                  type="text"
                  value={siteConfig.experienceYears}
                  onChange={(e) => handleConfigChange('experienceYears', e.target.value)}
                  placeholder="5+"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Videos Edited</label>
                <input
                  type="text"
                  value={siteConfig.videosEdited}
                  onChange={(e) => handleConfigChange('videosEdited', e.target.value)}
                  placeholder="500+"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Views Generated</label>
                <input
                  type="text"
                  value={siteConfig.viewsGenerated}
                  onChange={(e) => handleConfigChange('viewsGenerated', e.target.value)}
                  placeholder="100M+"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Client Satisfaction</label>
                <input
                  type="text"
                  value={siteConfig.clientSatisfaction}
                  onChange={(e) => handleConfigChange('clientSatisfaction', e.target.value)}
                  placeholder="99%"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Social Handles */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-4">
              <Phone className="w-5 h-5 text-teal-400" />
              Contact & Social Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={siteConfig.email}
                  onChange={(e) => handleConfigChange('email', e.target.value)}
                  placeholder="contact@diptovisuals.com"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">WhatsApp (with Country Code)</label>
                <input
                  type="text"
                  value={siteConfig.whatsapp}
                  onChange={(e) => handleConfigChange('whatsapp', e.target.value)}
                  placeholder="+8801700000000"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Meeting / Booking Link (Cal.com)</label>
                <input
                  type="url"
                  value={siteConfig.bookingUrl}
                  onChange={(e) => handleConfigChange('bookingUrl', e.target.value)}
                  placeholder="https://cal.com/..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Instagram Profile</label>
                <input
                  type="url"
                  value={siteConfig.instagram}
                  onChange={(e) => handleConfigChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">YouTube Channel</label>
                <input
                  type="url"
                  value={siteConfig.youtube}
                  onChange={(e) => handleConfigChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">LinkedIn Profile</label>
                <input
                  type="url"
                  value={siteConfig.linkedin}
                  onChange={(e) => handleConfigChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={savingConfig}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
            >
              {savingConfig ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving Configuration...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save & Publish Site Settings
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Security & Password Change */}
      {activeTab === 'security' && (
        <div className="space-y-6 max-w-xl">
          {/* Warning Alert */}
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-2xl flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Important Security Notice</p>
              <p className="leading-relaxed">Updating your password will immediately secure all dashboard routes. Make sure to note your new password for your next login.</p>
            </div>
          </div>

          {/* Success/Error Feedbacks */}
          {passwordSuccess && (
            <div className="p-4 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm rounded-xl flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>{passwordSuccess}</span>
            </div>
          )}
          {passwordError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{passwordError}</span>
            </div>
          )}

          {/* Password Form Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-slate-200 mb-6 flex items-center space-x-2">
              <Key className="w-5 h-5 text-red-500" />
              <span>Change Admin Password</span>
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 text-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex justify-end">
                <button
                  type="submit"
                  disabled={loadingPassword}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-md shadow-red-500/10 flex items-center gap-2"
                >
                  {loadingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
