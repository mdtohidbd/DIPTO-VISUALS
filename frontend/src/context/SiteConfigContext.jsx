import React, { createContext, useContext, useState, useEffect } from 'react';

const DEFAULT_CONFIG = {
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
};

const SiteConfigContext = createContext({
  config: DEFAULT_CONFIG,
  refreshConfig: () => {}
});

export const SiteConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    try {
      const cached = localStorage.getItem('portfolio_site_config');
      if (cached) return JSON.parse(cached);
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
          setConfig(data);
          localStorage.setItem('portfolio_site_config', JSON.stringify(data));
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
    <SiteConfigContext.Provider value={{ config, refreshConfig: fetchConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);
export default SiteConfigContext;
