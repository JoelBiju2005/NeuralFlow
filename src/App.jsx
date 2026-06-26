import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Features from './components/Features';
import Pricing from './components/Pricing';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import { ChevronUpSolidIcon } from './assets/svgs';
import { useRevealOnScroll } from './hooks/useIntersection';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Global reveal-on-scroll observer
  useRevealOnScroll();

  // Scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <BackgroundParticles />
      <Nav />

      <main id="main-content">
        <Hero />
        <TrustBar />
        <Features />
        <Pricing />
        <SocialProof />
      </main>

      <Footer />

      {/* Scroll to top */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`scroll-to-top fixed bottom-8 right-8 z-40 p-3 rounded-xl bg-[#FFC801] text-[#172B36] shadow-lg shadow-[rgba(255,200,1,0.3)] hover:bg-[#FF9932] transition-colors duration-150 ${
          showScrollTop ? 'scroll-to-top--visible' : ''
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUpSolidIcon className="w-5 h-5" />
      </button>
    </>
  );
}
