import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { SiteConfigProvider } from './context/SiteConfigContext';
import CinematicBackground from './components/CinematicBackground';
import CinematicLoader from './components/CinematicLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import LogoStrip from './components/LogoStrip';
import CaseStudy from './components/CaseStudy';
import Projects from './components/Projects';
import BeforeAfter from './components/BeforeAfter';
import Services from './components/Services';
import Process from './components/Process';
import Pricing from './components/Pricing';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AllProjects from './pages/AllProjects';
import LenisScroll from './components/LenisScroll';
import WhatsAppButton from './components/WhatsAppButton';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import AdminApp from './admin/AdminApp';

const HomePage = () => (
  <div className="portfolio-app overflow-x-hidden w-full max-w-[100vw] relative">
    <CinematicBackground />
    <LenisScroll />
    <WhatsAppButton />
    <ScrollProgress />
    <div className="relative z-10">
      <Navbar />
      <Hero />
      <Stats />
      <LogoStrip />
      <CaseStudy />
      <Projects />
      <BeforeAfter />
      <Services />
      <Process />
      <Pricing />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <SiteConfigProvider>
        <div className="relative bg-brand-navy min-h-screen text-brand-text selection:bg-brand-electric selection:text-white transition-colors duration-500">
          <CustomCursor />
          <AnimatePresence>
            {isLoading && <CinematicLoader onFinish={() => setIsLoading(false)} />}
          </AnimatePresence>

          <Suspense fallback={null}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/all-projects" element={<AllProjects />} />
                <Route path="/admin/*" element={<AdminApp />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </div>
      </SiteConfigProvider>
    </ThemeProvider>
  );
};

export default App;
