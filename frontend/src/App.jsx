import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
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
import BookingModal from './components/BookingModal';
import AdminApp from './admin/AdminApp';

const HomePage = () => {
  const { config } = useSiteConfig();
  const vis = config?.sectionVisibility || {};

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingPkg, setSelectedBookingPkg] = useState(null);

  useEffect(() => {
    const handleOpenBooking = (e) => {
      setSelectedBookingPkg(e.detail?.package || null);
      setBookingModalOpen(true);
    };
    window.addEventListener('open-booking-modal', handleOpenBooking);
    return () => window.removeEventListener('open-booking-modal', handleOpenBooking);
  }, []);

  return (
    <div className="portfolio-app overflow-x-hidden w-full max-w-[100vw] relative">
      <CinematicBackground />
      <LenisScroll />
      <WhatsAppButton />
      <ScrollProgress />
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackage={selectedBookingPkg}
      />
      <div className="relative z-10">
        <Navbar />
        {vis.hero !== false && <Hero />}
        {vis.stats !== false && <Stats />}
        {vis.logoStrip !== false && <LogoStrip />}
        {vis.caseStudy !== false && <CaseStudy />}
        {vis.projects !== false && <Projects />}
        {vis.beforeAfter !== false && <BeforeAfter />}
        {vis.services !== false && <Services />}
        {vis.process !== false && <Process />}
        {vis.pricing !== false && <Pricing />}
        {vis.whyUs !== false && <WhyChooseUs />}
        {vis.testimonials !== false && <Testimonials />}
        {vis.faq !== false && <FAQ />}
        {vis.contact !== false && <Contact />}
        <Footer />
      </div>
    </div>
  );
};

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
