import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_SERVICES = [
  { id: 'srv_1', icon: 'Home', title: 'Architectural Walkthroughs', desc: 'Stabilized 4K virtual tours engineered with dynamic speed ramping to accentuate room scale and architectural elegance.' },
  { id: 'srv_2', icon: 'Zap', title: 'High-Converting Listing Ads', desc: 'Punchy, cinematic teaser campaigns structured to arrest social feeds and generate high-intent buyer inquiries.' },
  { id: 'srv_3', icon: 'Wind', title: 'Drone & Aerial Cinematography', desc: 'Sweeping aerial storytelling showcasing property boundaries, panoramic vistas, and prime neighborhood amenities.' },
  { id: 'srv_4', icon: 'Camera', title: 'Lifestyle & Texture B-Roll', desc: 'Sensory macro cuts highlighting bespoke finishes, ambient lighting, and high-ticket luxury craftsmanship.' },
  { id: 'srv_5', icon: 'Video', title: 'Viral 9:16 Vertical Reels', desc: 'High-retention mobile formats with 3-second psychological hooks, kinetic motion, and sound-matched pacing for IG & TikTok.' },
  { id: 'srv_6', icon: 'Scissors', title: 'Narrative Rhythm & Pacing', desc: 'Hollywood-style editorial flow that builds emotional resonance, holding prospective buyers captivated till the final frame.' },
  { id: 'srv_7', icon: 'PaintBucket', title: 'Commercial Color Science', desc: 'Master-level DaVinci color grading—delivering sky replacements, vibrant foliage, and warm, inviting golden-hour interiors.' },
  { id: 'srv_8', icon: 'Type', title: 'Kinetic Motion Typography', desc: 'Sleek animated spec cards, square footage highlights, agent branding, and premium lower-thirds tailored to your identity.' },
  { id: 'srv_9', icon: 'Headphones', title: 'Immersive Foley & Sound Design', desc: 'Multi-layered atmospheric audio with environmental foley, subtle whooshes, and commercially licensed musical scores.' },
];

export const DEFAULT_CASE_STUDY = {
  badge: 'Proven Market Impact',
  title: 'Case Study: $4.8M Architectural Villa',
  subtitle: 'How transformative cinematic pacing and DaVinci color science turned a dormant listing into a bidding frenzy within 14 days.',
  image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  videoUrl: '/videos/sample-video-1.mp4',
  challengeTitle: 'The Challenge',
  challengeDesc: 'The agency sat on flat, uninspiring gimbal footage for over 90 days. Prospects bounced within 6 seconds because the video lacked emotional pull, interior warmth, and architectural rhythm.',
  solutionTitle: 'The Strategic Edit',
  solutionDesc: 'Restructured the edit around a golden-hour sunlight narrative. Deployed seamless speed-ramps to accentuate open-concept scale, Hollywood tone mapping, and a binaural acoustic soundscape.',
  resultsTitle: 'The Results',
  results: [
    { metric: '140,000+ Views', label: 'across YouTube & Instagram Reels.' },
    { metric: '14 Private Showings', label: 'booked directly from the video campaign.' },
    { metric: '$220,000 Over Asking', label: 'under contract in 14 days above initial listing price.' }
  ]
};

export const DEFAULT_BEFORE_AFTER = {
  badge: 'DaVinci Color Science',
  title: 'From Flat LOG Footage to Luminous Luxury Cinema',
  subtitle: 'Raw camera profiles look dull and washed-out. We sculpt natural dynamic range, balance sky luminance, and infuse inviting warmth into every interior space.',
  rawImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  gradedImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  rawLabel: 'FLAT RAW PROFILE',
  gradedLabel: 'HOLLYWOOD MASTER GRADE'
};

export const DEFAULT_PROCESS_STEPS = [
  { id: 'step_1', icon: 'UploadCloud', title: 'Raw Cloud Ingestion', desc: 'Drop your 4K camera and drone media into our high-speed private drive along with your listing brief.' },
  { id: 'step_2', icon: 'Scissors', title: 'Cinematic Crafting', desc: 'Precision editorial cuts, DaVinci color grading, speed-ramps, and multi-track spatial sound design.' },
  { id: 'step_3', icon: 'MessageSquare', title: 'Frame-Accurate Review', desc: 'Streamline feedback via Frame.io timecoded comments. Revisions are prioritized and turned around rapidly.' },
  { id: 'step_4', icon: 'CheckCircle', title: 'Master 4K Delivery', desc: 'Receive high-bitrate 4K horizontal masters and viral 9:16 cutdowns ready for immediate syndication.' }
];

export const DEFAULT_PRICING_PACKAGES = [
  {
    id: 'pkg_1',
    name: 'Essential Showcase',
    price: '$175',
    period: '/video',
    desc: 'Ideal for single-family homes requiring fast turnaround and polished presentation.',
    features: [
      'Up to 2 minutes 4K Master Export',
      'Architectural Color Correction',
      'Gimbal Smoothing & Clean Transitions',
      'Agency Branding & Sleek Lower-Thirds',
      'Commercially Licensed Audio Track',
      '48-Hour Delivery Guarantee'
    ],
    highlight: false,
    ctaText: 'Book Now',
    ctaLink: '#contact'
  },
  {
    id: 'pkg_2',
    name: 'Signature Luxury Cinema',
    price: '$295',
    period: '/video',
    desc: 'Our flagship suite engineered for multimillion-dollar estates and luxury residences.',
    features: [
      'Up to 4 minutes 4K Cinema Master',
      'Hollywood DaVinci Tone Mapping & Sky Grade',
      'Speed-Ramping & Invisible Whip Cuts',
      'Aerial Drone & Boundary Map Integration',
      'Multi-layer Foley & Atmospheric Soundscape',
      'Complimentary 9:16 Viral Reel Included',
      'Priority 2 Revision Rounds'
    ],
    highlight: true,
    ctaText: 'Book Now',
    ctaLink: '#contact'
  },
  {
    id: 'pkg_3',
    name: 'Viral Social Engine',
    price: '$120',
    period: '/video',
    desc: 'Engineered specifically to maximize algorithmic retention and buyer inquiries on IG & TikTok.',
    features: [
      'Up to 60s High-Retention 9:16 Vertical Cut',
      'Scroll-Stopping 3-Second Visual Hooks',
      'Kinetic Animated Subtitles & Highlight Pops',
      'Algorithm Trending Audio Beat-Sync',
      'Lead-Gen Call-To-Action Overlay',
      'Rapid 24-48 Hour Turnaround'
    ],
    highlight: false,
    ctaText: 'Book Now',
    ctaLink: '#contact'
  }
];

export const DEFAULT_WHY_CHOOSE_US = {
  badge: 'The Dipto Visuals Advantage',
  title: 'Visual Storytelling That',
  gradient: 'Commands High Valuation',
  subtitle: "Exceptional real estate video isn't merely about documenting square footage—it's about orchestrating desire. We blend Hollywood-grade color mapping, psychological cut pacing, and rich soundscapes so buyers fall in love before stepping through the door.",
  image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
  videoUrl: '/videos/sample-video-1.mp4',
  items: [
    {
      id: 'color-science',
      title: 'Hollywood DaVinci Color Science',
      subtitle: 'ACES & Kodak 2383 35mm film emulation with balanced natural skin tones.',
      tag: 'Color Science',
      icon: 'Palette',
      badgeText: 'Rec.709 vs Kodak 2383 Cinema LUT',
      stat: '32-Bit Float',
      statLabel: 'Wide Color Gamut',
      videoUrl: '/videos/sample-video-1.mp4',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'beat-pacing',
      title: 'Rhythmic, Beat-Matched Pacing',
      subtitle: 'Dynamic cuts timed to audio transients and psychological retention hooks.',
      tag: 'Dynamic Editing',
      icon: 'Activity',
      badgeText: 'Dynamic Speed Ramps & SFX',
      stat: '128 BPM',
      statLabel: 'Rhythm Cut Sync',
      videoUrl: '/videos/sample-video-2.mp4',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'rapid-delivery',
      title: '48-Hour Rapid Delivery Guarantee',
      subtitle: 'High-speed cloud pipeline ensuring your marketing campaigns launch on schedule.',
      tag: 'Turnaround',
      icon: 'Clock',
      badgeText: 'Zero Listing Delays Guaranteed',
      stat: '24-48 Hours',
      statLabel: 'Priority Delivery',
      videoUrl: '/videos/sample-video-1.mp4',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'commercial-licensing',
      title: 'Full Commercial Music Licensing',
      subtitle: 'Perpetual commercial clearance with zero copyright strikes across all platforms.',
      tag: 'Royalty-Free',
      icon: 'Shield',
      badgeText: 'Artlist & Musicbed Worldwide Sync Clearance',
      stat: '100% Cleared',
      statLabel: 'Commercial Sync',
      videoUrl: '/videos/sample-video-2.mp4',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'frame-io',
      title: 'Frictionless Frame.io Reviews',
      subtitle: 'Click, timestamp, and review edits collaboratively with frame-accurate notes.',
      tag: 'Cloud Workflow',
      icon: 'MessageSquare',
      badgeText: 'Frame-Accurate Timecode Notes & Approvals',
      stat: 'Frame-Accurate',
      statLabel: 'Collaborative Review',
      videoUrl: '/videos/sample-video-1.mp4',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'multi-platform',
      title: 'Multi-Platform 16:9 & 9:16 Exports',
      subtitle: 'Master 4K landscape walkthroughs plus high-retention 9:16 vertical social cutdowns.',
      tag: 'Dual Aspect',
      icon: 'Layers',
      badgeText: 'Optimized for YouTube, MLS, Reels & TikTok',
      stat: '16:9 & 9:16',
      statLabel: 'Master Deliverables',
      videoUrl: '/videos/sample-video-2.mp4',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    }
  ],
  reasons: [
    "Hollywood DaVinci Color Science",
    "Rhythmic, Beat-Matched Pacing",
    "48-Hour Rapid Delivery Guarantee",
    "Full Commercial Music Licensing",
    "Frictionless Frame.io Reviews",
    "Multi-Platform 16:9 & 9:16 Exports"
  ]
};

export const DEFAULT_FAQS = [
  {
    id: 'faq_1',
    question: "What is your standard turnaround time?",
    answer: "Standard property showcases are delivered within 48 hours of footage receipt. Signature luxury cinema edits take 3 to 4 business days. When listing deadlines are tight, 24-hour rush delivery is readily available."
  },
  {
    id: 'faq_2',
    question: "How do we transmit large 4K and drone files?",
    answer: "You will be provided a dedicated, high-bandwidth cloud transfer link (Google Drive / Dropbox Enterprise). Simply drop your camera dumps, D-Log drone reels, and agency vector logos directly with zero file compression."
  },
  {
    id: 'faq_3',
    question: "How does the revision process work?",
    answer: "We utilize Frame.io for frictionless collaboration. You can pause the video at any exact frame and leave timecoded feedback. Included revision rounds ensure every transition, cut, and color grade aligns with your vision."
  },
  {
    id: 'faq_4',
    question: "Is the music and sound design commercially cleared?",
    answer: "Yes, 100%. Every project includes perpetual commercial music licenses and bespoke sound design. You will never experience copyright strikes, mute warnings, or demonetization on YouTube, Instagram, or listing portals."
  },
  {
    id: 'faq_5',
    question: "Can you provide vertical cutdowns for Instagram & TikTok?",
    answer: "Absolutely. Vertical 9:16 reels are engineered specifically for mobile retention, featuring 3-second visual hooks, kinetic captions, and sound-synced cuts to drive maximum organic engagement."
  },
  {
    id: 'faq_6',
    question: "Do you offer monthly retainers for high-volume brokerages?",
    answer: "Yes. We offer dedicated monthly retainers for agencies and production teams who produce multiple listings monthly. Retainers include priority queue placement, guaranteed turnaround windows, and discounted volume rates."
  }
];

export const DEFAULT_LOGOS = [
  { id: 'logo_1', name: "Century 21", icon: 'Building2' },
  { id: 'logo_2', name: "RE/MAX", icon: 'Home' },
  { id: 'logo_3', name: "Coldwell Banker", icon: 'Key' },
  { id: 'logo_4', name: "Keller Williams", icon: 'MapPin' },
  { id: 'logo_5', name: "Sotheby's", icon: 'Building2' },
  { id: 'logo_6', name: "Compass", icon: 'Home' },
];

export const DEFAULT_STATS = [
  { id: 'stat_1', value: '500+', label: 'Videos Edited' },
  { id: 'stat_2', value: '100M+', label: 'Views Generated' },
  { id: 'stat_3', value: '5+', label: 'Years Experience' },
  { id: 'stat_4', value: '99%', label: 'Client Satisfaction' }
];

export const DEFAULT_SECTION_VISIBILITY = {
  hero: true,
  stats: true,
  logoStrip: true,
  caseStudy: true,
  projects: true,
  beforeAfter: true,
  services: true,
  process: true,
  pricing: true,
  whyUs: true,
  testimonials: true,
  faq: true,
  contact: true
};

export const DEFAULT_CONFIG = {
  brandName: 'DIPTO VISUALS',
  ownerName: 'Md Tohidul Islam',
  tagline: 'Luxury Real Estate & Cinematic Video Editor',
  profileImage: '',
  heroBadge: 'Elite Real Estate Post-Production',
  heroHeadlineStart: 'Transforming Raw Footage Into',
  heroHeadlineGradient: 'Multimillion-Dollar Cinema',
  heroDescription: 'High-converting architectural walkthroughs, cinematic drone storytelling, and viral vertical reels engineered to captivate luxury buyers and sell listings faster.',
  heroCta1Text: 'EXPLORE SHOWREEL',
  heroCta1Link: '#projects',
  heroCta2Text: 'GET A FREE QUOTE',
  heroCta2Link: '#contact',
  statusBadgeText: 'Available for New Projects',
  experienceBadgeText: 'Top 1% Real Estate Editor',
  toolsCaption: 'Engineered With Industry-Standard Software',
  
  experienceYears: '5+',
  videosEdited: '500+',
  viewsGenerated: '100M+',
  clientSatisfaction: '99%',
  stats: DEFAULT_STATS,

  logosTitle: 'Trusted by top real estate agencies',
  logos: DEFAULT_LOGOS,

  caseStudy: DEFAULT_CASE_STUDY,
  beforeAfter: DEFAULT_BEFORE_AFTER,

  servicesBadge: 'Full-Spectrum Post-Production',
  servicesTitle: 'Crafted for',
  servicesGradient: 'Market-Leading Listings',
  servicesSubtitle: 'Meticulously engineered video assets designed to maximize listing impressions, elevate broker authority, and command premium buyer interest.',
  services: DEFAULT_SERVICES,

  processBadge: 'Streamlined Collaboration',
  processTitle: 'Frictionless 4-Step',
  processGradient: 'Pipeline',
  processSubtitle: 'Engineered for high-volume agents and luxury brokerages. No complicated onboarding, just flawless execution.',
  processSteps: DEFAULT_PROCESS_STEPS,

  pricingBadge: 'Transparent Creative Partnership',
  pricingTitle: 'Value-Driven',
  pricingGradient: 'Investment Tiers',
  pricingSubtitle: 'Predictable, transparent rates with zero hidden fees. Volume retainers available for active agencies.',
  pricingPackages: DEFAULT_PRICING_PACKAGES,

  whyChooseUsBadge: 'The Dipto Visuals Advantage',
  whyChooseUsTitle: 'Visual Storytelling That',
  whyChooseUsGradient: 'Commands High Valuation',
  whyChooseUsSubtitle: DEFAULT_WHY_CHOOSE_US.subtitle,
  whyChooseUsImage: DEFAULT_WHY_CHOOSE_US.image,
  whyChooseUsVideoUrl: DEFAULT_WHY_CHOOSE_US.videoUrl,
  whyChooseUsReasons: DEFAULT_WHY_CHOOSE_US.reasons,
  whyChooseUsItems: DEFAULT_WHY_CHOOSE_US.items,

  faqBadge: 'Client Inquiries',
  faqTitle: 'Frequently Asked',
  faqGradient: 'Questions',
  faqSubtitle: 'Clear answers to common questions about our delivery pipeline, licensing, and workflow.',
  faqs: DEFAULT_FAQS,

  contactBadge: 'Start Your Project',
  contactTitle: 'ELEVATE YOUR LISTINGS TO',
  contactGradient: 'CINEMATIC HEIGHTS',
  contactSubtitle: 'Whether you\'re marketing an ultra-luxury estate, launching an architectural development, or scaling weekly reels for your brokerage, let\'s create visuals that captivate buyers and sell listings faster.',
  contactFeature1: 'Guaranteed 24 to 48-hour delivery available for priority listings.',
  contactFeature2: 'Seamless remote collaboration with agencies & brokers worldwide.',

  sectionVisibility: DEFAULT_SECTION_VISIBILITY,

  email: 'diptoalmamun34@gmail.com',
  whatsapp: '01791315443',
  bookingUrl: 'https://cal.com',
  instagram: 'https://instagram.com/diptoalmamun',
  youtube: 'https://youtube.com/@diptovideoediting',
  facebook: 'https://www.facebook.com/profile.php?id=61591489202271',
  fiverr: 'https://www.fiverr.com',
  upwork: 'https://www.upwork.com',
  linkedin: 'https://linkedin.com'
};

const SiteConfigContext = createContext({
  config: DEFAULT_CONFIG,
  refreshConfig: () => {}
});

export const SiteConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    try {
      const cached = localStorage.getItem('portfolio_site_config');
      if (cached) {
        const parsed = JSON.parse(cached);
        // Migrate old placeholder values
        if (parsed.email === 'contact@diptovisuals.com' || parsed.email === 'hello@diptovisuals.com') {
          parsed.email = 'diptoalmamun34@gmail.com';
        }
        if (parsed.instagram === 'https://instagram.com') {
          parsed.instagram = 'https://instagram.com/diptoalmamun';
        }
        if (parsed.youtube === 'https://youtube.com') {
          parsed.youtube = 'https://youtube.com/@diptovideoediting';
        }
        if (!parsed.facebook || parsed.facebook === 'https://facebook.com') {
          parsed.facebook = 'https://www.facebook.com/profile.php?id=61591489202271';
        }
        if (!parsed.fiverr) {
          parsed.fiverr = 'https://www.fiverr.com';
        }
        if (!parsed.upwork) {
          parsed.upwork = 'https://www.upwork.com';
        }
        if (!parsed.whatsapp || parsed.whatsapp.includes('1700000000') || parsed.whatsapp === '+8801700000000') {
          parsed.whatsapp = '01791315443';
        }
        if (parsed.whyChooseUsVideoUrl && parsed.whyChooseUsVideoUrl.includes('commondatastorage.googleapis.com')) {
          parsed.whyChooseUsVideoUrl = '/videos/sample-video-1.mp4';
        }
        if (parsed.caseStudy?.videoUrl && parsed.caseStudy.videoUrl.includes('commondatastorage.googleapis.com')) {
          parsed.caseStudy.videoUrl = '/videos/sample-video-1.mp4';
        }
        if (Array.isArray(parsed.whyChooseUsItems)) {
          parsed.whyChooseUsItems = parsed.whyChooseUsItems.map(item => ({
            ...item,
            videoUrl: (!item.videoUrl || item.videoUrl.includes('commondatastorage.googleapis.com')) ? '/videos/sample-video-1.mp4' : item.videoUrl
          }));
        }
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch {
      // ignore
    }
    return DEFAULT_CONFIG;
  });

  const fetchConfig = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/settings/config');
      if (res.ok) {
        const data = await res.json();
        if (data && data.brandName) {
          const merged = { ...DEFAULT_CONFIG, ...data };
          // Prefer active personal socials if backend returned initial generic placeholders
          if (merged.email === 'contact@diptovisuals.com' || merged.email === 'hello@diptovisuals.com') {
            merged.email = DEFAULT_CONFIG.email;
          }
          if (merged.instagram === 'https://instagram.com') {
            merged.instagram = DEFAULT_CONFIG.instagram;
          }
          if (merged.youtube === 'https://youtube.com') {
            merged.youtube = DEFAULT_CONFIG.youtube;
          }
          if (!merged.facebook || merged.facebook === 'https://facebook.com') {
            merged.facebook = DEFAULT_CONFIG.facebook;
          }
          if (!merged.fiverr) merged.fiverr = DEFAULT_CONFIG.fiverr;
          if (!merged.upwork) merged.upwork = DEFAULT_CONFIG.upwork;
          if (!merged.whatsapp || merged.whatsapp.includes('1700000000') || merged.whatsapp === '+8801700000000') {
            merged.whatsapp = '01791315443';
          }
          // Guarantee nested arrays fallback properly if empty
          if (!Array.isArray(merged.services) || merged.services.length === 0) merged.services = DEFAULT_SERVICES;
          if (!Array.isArray(merged.processSteps) || merged.processSteps.length === 0) merged.processSteps = DEFAULT_PROCESS_STEPS;
          if (!Array.isArray(merged.pricingPackages) || merged.pricingPackages.length === 0) merged.pricingPackages = DEFAULT_PRICING_PACKAGES;
          if (!Array.isArray(merged.faqs) || merged.faqs.length === 0) merged.faqs = DEFAULT_FAQS;
          if (!Array.isArray(merged.logos) || merged.logos.length === 0) merged.logos = DEFAULT_LOGOS;
          if (!Array.isArray(merged.stats) || merged.stats.length === 0) merged.stats = DEFAULT_STATS;
          if (!merged.caseStudy) merged.caseStudy = DEFAULT_CASE_STUDY;
          if (!merged.beforeAfter) merged.beforeAfter = DEFAULT_BEFORE_AFTER;
          if (!merged.sectionVisibility) merged.sectionVisibility = DEFAULT_SECTION_VISIBILITY;
          if (!Array.isArray(merged.whyChooseUsItems) || merged.whyChooseUsItems.length === 0) {
            merged.whyChooseUsItems = DEFAULT_WHY_CHOOSE_US.items;
          }
          if (!merged.whyChooseUsVideoUrl || merged.whyChooseUsVideoUrl.includes('commondatastorage.googleapis.com')) {
            merged.whyChooseUsVideoUrl = '/videos/sample-video-1.mp4';
          }
          if (merged.caseStudy?.videoUrl && merged.caseStudy.videoUrl.includes('commondatastorage.googleapis.com')) {
            merged.caseStudy.videoUrl = '/videos/sample-video-1.mp4';
          }
          if (Array.isArray(merged.whyChooseUsItems)) {
            merged.whyChooseUsItems = merged.whyChooseUsItems.map(item => ({
              ...item,
              videoUrl: (!item.videoUrl || item.videoUrl.includes('commondatastorage.googleapis.com')) ? '/videos/sample-video-1.mp4' : item.videoUrl
            }));
          }

          setConfig(merged);
          localStorage.setItem('portfolio_site_config', JSON.stringify(merged));
        }
      }
    } catch (err) {
      console.warn('Backend offline or failed to fetch site config, using default/cached config.');
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, refreshConfig: fetchConfig, setConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);
export default SiteConfigContext;
