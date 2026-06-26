import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../assets/svgs';
import { useRevealRef } from '../hooks/useIntersection';
import TrustBar from './TrustBar';

const TESTIMONIALS = [
  {
    id: 0,
    quote: 'NeuralFlow cut our data pipeline setup from days to milliseconds. The AI automation nodes operate flawlessly at a fraction of our previous costs.',
    author: 'Dr. Elena Rostova',
    role: 'Chief AI Architect',
    company: 'SYNAPSE',
    initials: 'ER',
  },
  {
    id: 1,
    quote: 'Handling 50M+ daily events became effortless. The sub-50ms latency metrics was a standard we were skeptical about, but they delivered flawlessly.',
    author: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'DATASYNC',
    initials: 'MR',
  },
  {
    id: 2,
    quote: 'Pipeline overhead and maintenance dropped by 73%. With deep integrations, we migrated our legacy connectors in less than a week.',
    author: 'Priya Sharma',
    role: 'Head of Data Science',
    company: 'NEXTERA',
    initials: 'PS',
  },
];

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRevealRef();
  const autoplayRef = useRef(null);

  // Check mobile viewport width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Autoplay functionality
  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      goNext();
    }, 5000);
  }, [goNext]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const prevIndex = (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
  const nextIndex = (activeIndex + 1) % TESTIMONIALS.length;

  const renderCard = (index, position) => {
    const item = TESTIMONIALS[index];
    const isActive = position === 'active';

    return (
      <div
        key={item.id}
        className={`testimonial-deck-card ${
          isActive ? 'testimonial-deck-card--active' : 'testimonial-deck-card--inactive hidden lg:flex'
        }`}
        onClick={!isActive ? () => setActiveIndex(index) : undefined}
      >
        <div className="flex flex-col items-center text-center">
          <span className="testimonial-quote-mark">“</span>
          <p
            className={`text-sm md:text-base text-[#F1F6F4] leading-relaxed font-normal ${
              isActive ? 'opacity-100' : 'opacity-60 line-clamp-4'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {item.quote}
          </p>
        </div>

        <div className="testimonial-avatar-container">
          <div className="testimonial-avatar-img">
            {item.initials}
          </div>
          <span
            className="text-sm font-bold text-[#FFC801]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {item.author}
          </span>
          <span
            className="text-xs text-[#D9E8E2] opacity-60 uppercase tracking-widest mt-1 text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {item.role} — {item.company}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="social-proof"
      aria-label="Customer Testimonials"
      className="reveal"
      ref={sectionRef}
      style={{ background: 'transparent', padding: '6rem 0' }}
    >
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-16">
          <h2 className="section-heading">
            Trusted by Builders.
          </h2>
          <p className="section-subheading mx-auto">
            Read how engineering teams scale operations.
          </p>
        </header>

        {/* 3-Card Testimonials Deck Container */}
        <div
          className="relative mx-auto px-4"
          style={{ maxWidth: '960px' }}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className="testimonial-deck-container">
            {!isMobile && renderCard(prevIndex, 'prev')}
            {renderCard(activeIndex, 'active')}
            {!isMobile && renderCard(nextIndex, 'next')}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              type="button"
              onClick={goPrev}
              className="p-3 rounded-full border border-[rgba(209,232,226,0.12)] text-[#D9E8E2] hover:text-[#FFC801] hover:border-[#FFC801] hover:bg-[rgba(255,200,1,0.06)] transition-all duration-150 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === activeIndex ? 'bg-[#FFC801] w-6' : 'bg-[rgba(209,232,226,0.2)]'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="p-3 rounded-full border border-[rgba(209,232,226,0.12)] text-[#D9E8E2] hover:text-[#FFC801] hover:border-[#FFC801] hover:bg-[rgba(255,200,1,0.06)] transition-all duration-150 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Logo Trust Bar placed near testimonies */}
        <div className="mt-20 border-t border-[rgba(209,232,226,0.08)] pt-12 text-center">
          <TrustBar />
        </div>
      </div>
    </section>
  );
}
