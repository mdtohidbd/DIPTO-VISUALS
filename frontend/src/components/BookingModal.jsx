import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Clock, 
  User, 
  Building2, 
  Link as LinkIcon, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCheck,
  Film,
  Sparkles
} from 'lucide-react';
import { useSiteConfig, DEFAULT_PRICING_PACKAGES } from '../context/SiteConfigContext';
import { WhatsAppIcon } from './SocialIcons';

const PROPERTY_TYPES = [
  'Luxury Estate / Villa',
  'Condo / Penthouse',
  'Drone & Aerial Tour',
  'Viral Social Reel (9:16)',
  'Commercial Architecture',
  'Custom Video Project'
];

const TURNAROUND_OPTIONS = [
  { label: '⚡ 24h Rush Delivery', value: '24h Rush' },
  { label: '⏱️ 48h Standard', value: '48h Standard' },
  { label: '📅 Flexible (3-4 Days)', value: '3-4 Days' }
];

export const BookingModal = ({ isOpen, onClose, initialPackage = null }) => {
  const { config } = useSiteConfig();

  const packagesList = Array.isArray(config.pricingPackages) && config.pricingPackages.length > 0
    ? config.pricingPackages
    : DEFAULT_PRICING_PACKAGES;

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [clientName, setClientName] = useState('');
  const [propertyType, setPropertyType] = useState('Luxury Estate / Villa');
  const [turnaround, setTurnaround] = useState('48h Standard');
  const [footageLink, setFootageLink] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent background page scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Sync initial package
  useEffect(() => {
    if (initialPackage) {
      const match = packagesList.find(p => p.id === initialPackage.id || p.name === initialPackage.name);
      setSelectedPkg(match || initialPackage);
    } else if (!selectedPkg && packagesList.length > 0) {
      setSelectedPkg(packagesList.find(p => p.highlight) || packagesList[0]);
    }
  }, [initialPackage, isOpen, packagesList]);

  // WhatsApp Destination Number: Direct to 01791315443
  const targetPhone = '8801791315443';
  const displayPhone = '01791315443';
  const rawWhatsapp = displayPhone;

  const pkgTitle = selectedPkg ? `${selectedPkg.name} (${selectedPkg.price}${selectedPkg.period || '/video'})` : 'Custom Project Inquiry';

  // Formatted Message for WhatsApp
  const generateMessage = () => {
    return [
      `🎬 *REAL ESTATE VIDEO EDITING BOOKING*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `📦 *Package:* ${pkgTitle}`,
      clientName.trim() ? `👤 *Client / Agency:* ${clientName.trim()}` : null,
      `🏡 *Property:* ${propertyType}`,
      `⏱️ *Turnaround:* ${turnaround}`,
      footageLink.trim() ? `🔗 *Footage:* ${footageLink.trim()}` : null,
      notes.trim() ? `📝 *Notes:* ${notes.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Hi Dipto! I found your portfolio and want to book this video project with you.`
    ].filter(Boolean).join('\n');
  };

  const fullMsg = generateMessage();
  const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(fullMsg)}`;
  const skipMsg = `Hi Dipto! I found your portfolio and I'm interested in booking ${pkgTitle}. Let's chat!`;
  const skipWaUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(skipMsg)}`;

  const logLeadToBackend = (msg) => {
    try {
      fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName.trim() || 'WhatsApp Client Lead',
          email: 'whatsapp-lead@diptovisuals.com',
          message: msg
        })
      }).catch(() => {});
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5">
        {/* Dark Cinematic Backdrop with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window: Pristine Luxury White Studio Aesthetic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white border border-slate-200/90 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] overflow-hidden z-10 text-slate-800"
        >
          {/* Top Cinema Gradient Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-[#25D366] to-amber-500 flex-shrink-0" />

          {/* Modal Header (Fixed, Pristine White with Slate Border) */}
          <div className="px-5 py-4 sm:px-6 sm:py-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/70 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">
                    Reserve Your Video Editing Slot
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-extrabold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Priority
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                  Direct WhatsApp booking with Dipto ({rawWhatsapp}) • Instant response
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors flex-shrink-0 cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body (Scrollable Cinema Dashboard) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: Inputs & Preferences (7 Columns) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* 1. Package Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-blue-600" />
                      1. Select Video Package
                    </label>
                    <span className="text-[10px] text-blue-600 font-bold">Click to select</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {packagesList.map((pkg) => {
                      const isSelected = selectedPkg?.name === pkg.name;
                      return (
                        <button
                          key={pkg.id || pkg.name}
                          type="button"
                          onClick={() => setSelectedPkg(pkg)}
                          className={`p-3 rounded-2xl text-left border-2 transition-all duration-200 relative cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-600 shadow-md ring-4 ring-blue-500/10 text-slate-900'
                              : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {pkg.highlight && (
                            <span className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
                              Popular
                            </span>
                          )}
                          <p className={`text-[11px] sm:text-xs font-bold truncate pr-2 ${isSelected ? 'text-blue-950' : 'text-slate-800'}`}>
                            {pkg.name}
                          </p>
                          <p className={`text-sm sm:text-base font-black mt-1 ${isSelected ? 'text-blue-600' : 'text-slate-900'}`}>
                            {pkg.price}
                            <span className="text-[9px] font-normal text-slate-500 ml-0.5">
                              {pkg.period || '/vid'}
                            </span>
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Project Details Form */}
                <div className="space-y-3.5 pt-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    2. Project Brief Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" /> 
                        Your Name / Agency
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Alex Vance (Compass NYC)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-900 placeholder:text-slate-400 font-medium focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-orange-500" /> 
                        Property / Style
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-900 font-medium focus:ring-4 focus:ring-blue-500/10 outline-none transition-all cursor-pointer"
                      >
                        {PROPERTY_TYPES.map((type) => (
                          <option key={type} value={type} className="bg-white text-slate-900">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Turnaround Chips */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" /> 
                      Required Turnaround
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TURNAROUND_OPTIONS.map((opt) => {
                        const isSelected = turnaround === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setTurnaround(opt.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footage Link */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5 text-blue-600" /> 
                      Raw Footage Link (Drive / Dropbox) <span className="text-[10px] font-normal text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={footageLink}
                      onChange={(e) => setFootageLink(e.target.value)}
                      placeholder="https://drive.google.com/... or Dropbox link"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-900 placeholder:text-slate-400 font-mono text-[11px] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                  </div>

                  {/* Instructions */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-orange-500" /> 
                      Special Instructions <span className="text-[10px] font-normal text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Golden hour interior, speed ramps, YouTube 16:9 + Reel 9:16"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white text-xs text-slate-900 placeholder:text-slate-400 font-medium focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: WhatsApp Live Preview & CTA (5 Columns) */}
              <div className="lg:col-span-5 flex flex-col gap-4 h-full justify-between">
                
                {/* Authentic WhatsApp Light Mode Bubble Container */}
                <div className="rounded-2xl border border-slate-200/90 overflow-hidden shadow-lg bg-[#EFEAE2]">
                  
                  {/* WhatsApp Chat Top Header (Classic WhatsApp Green) */}
                  <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-extrabold text-xs text-white shadow-inner">
                        D
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight text-white flex items-center gap-1">
                          Dipto Visuals
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                        </p>
                        <p className="text-[10px] text-emerald-100 leading-tight">Online • Instant Booking Response</p>
                      </div>
                    </div>
                    <WhatsAppIcon className="w-4 h-4 text-emerald-200" />
                  </div>

                  {/* Chat Wallpaper & Crisp White Speech Bubble */}
                  <div className="p-4 space-y-2 text-xs">
                    <div className="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tr-none shadow-md border border-slate-200/60 space-y-2 leading-relaxed">
                      
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 border-b border-slate-100 pb-1.5 tracking-wide">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>VIDEO EDITING BOOKING BRIEF</span>
                      </div>

                      <div className="space-y-1 text-[11px]">
                        <p className="text-slate-900 font-bold flex items-center gap-1.5">
                          <span>📦</span>
                          <span>{pkgTitle}</span>
                        </p>
                        {clientName.trim() && (
                          <p className="text-slate-700 flex items-center gap-1.5">
                            <span>👤</span>
                            <span>Client: <strong className="text-slate-900 font-bold">{clientName.trim()}</strong></span>
                          </p>
                        )}
                        <p className="text-slate-700 flex items-center gap-1.5">
                          <span>🏡</span>
                          <span>Property: <strong className="text-slate-900 font-bold">{propertyType}</strong></span>
                        </p>
                        <p className="text-slate-700 flex items-center gap-1.5">
                          <span>⏱️</span>
                          <span>Turnaround: <strong className="text-slate-900 font-bold">{turnaround}</strong></span>
                        </p>
                        {footageLink.trim() && (
                          <p className="text-slate-700 flex items-center gap-1.5 truncate">
                            <span>🔗</span>
                            <span className="truncate">Footage: <strong className="text-blue-600 underline font-mono text-[10px]">{footageLink.trim()}</strong></span>
                          </p>
                        )}
                        {notes.trim() && (
                          <p className="text-slate-600 text-[10px] italic pt-0.5">
                            📝 "{notes.trim()}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 pt-1 border-t border-slate-100">
                        <span>Just now</span>
                        <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary WhatsApp Action Button */}
                <div className="space-y-2.5">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      logLeadToBackend(fullMsg);
                      setTimeout(() => onClose(), 250);
                    }}
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.55)] transition-all cursor-pointer no-underline"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white fill-white" />
                    <span>Send & Open in WhatsApp ({displayPhone})</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </a>

                  <div className="text-center">
                    <a
                      href={skipWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        logLeadToBackend(skipMsg);
                        onClose();
                      }}
                      className="text-[11px] text-slate-500 hover:text-slate-900 transition-colors underline cursor-pointer"
                    >
                      Skip form & chat directly with Dipto on WhatsApp ({displayPhone}) →
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
