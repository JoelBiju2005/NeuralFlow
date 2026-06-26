import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChartPieIcon } from '../assets/svgs';
import { useRevealRef } from '../hooks/useIntersection';
import TrustBar from './TrustBar';

const TESTIMONIALS = [
  {
    id: 0,
    quote: 'NeuralFlow cut our data pipeline setup from days to milliseconds. The AI automation nodes operate flawlessly at a fraction of our previous costs.',
    author: 'Dr. Elena Rostova',
    role: 'Chief AI Architect',
    company: 'SYNAPSE',
  },
  {
    id: 1,
    quote: 'Handling 50M+ daily events became effortless. The sub-50ms latency metrics was a standard we were skeptical about, but they delivered flawlessly.',
    author: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'DataSync',
  },
  {
    id: 2,
    quote: 'Pipeline overhead and maintenance dropped by 73%. With deep integrations, we migrated our legacy connectors in less than a week.',
    author: 'Priya Sharma',
    role: 'Head of Data Science',
    company: 'Nextera',
  },
];

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRevealRef();
  const autoplayRef = useRef(null);

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
    }, 5000); // changes testimony every 5 seconds
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

  const currentTestimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      id="social-proof"
      aria-label="Customer Testimonials"
      className="reveal"
      ref={sectionRef}
      style={{ background: 'transparent', padding: '6rem 0' }}
    >
      <div className="container relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <p className="eyebrow">// PROOF</p>
          <h2 className="section-heading">
            Trusted by Builders.
          </h2>
          <p className="section-subheading mx-auto">
            Read how engineering teams scale operations.
          </p>
        </header>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto pt-4">
          <div
            className="relative bg-[rgba(23,43,54,0.45)] border border-[rgba(255,200,1,0.12)] rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-300"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            {/* Inner Content Grid */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Left-side Accent Icon */}
              <div className="bento-icon-pill bento-icon-pill-gold shrink-0 scale-110">
                <ChartPieIcon className="w-9 h-9" />
              </div>

              {/* Quote & Author details */}
              <div className="flex-1 w-full pt-1" key={currentTestimonial.id}>
                <blockquote>
                  <p
                    className="text-lg md:text-xl text-[#F1F6F4] leading-relaxed mb-6 font-medium"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    "{currentTestimonial.quote}"
                  </p>
                </blockquote>

                <div className="flex flex-row items-end justify-between w-full mt-4">
                  {/* Author Name and Metadata on bottom-left */}
                  <div>
                    <cite className="not-italic">
                      <span
                        className="block text-base font-bold text-[#FFC801]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {currentTestimonial.author}
                      </span>
                      <span
                        className="block text-xs font-medium text-[#D9E8E2] mt-1 opacity-60 uppercase tracking-wider"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {currentTestimonial.role} — {currentTestimonial.company}
                      </span>
                    </cite>
                  </div>

                  {/* Navigation Arrows on bottom-right */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="p-3.5 rounded-full border border-[rgba(209,232,226,0.12)] text-[#D9E8E2] hover:text-[#FFC801] hover:border-[#FFC801] hover:bg-[rgba(255,200,1,0.06)] transition-all duration-150 cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="p-3.5 rounded-full border border-[rgba(209,232,226,0.12)] text-[#D9E8E2] hover:text-[#FFC801] hover:border-[#FFC801] hover:bg-[rgba(255,200,1,0.06)] transition-all duration-150 cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Trust Bar placed near testimonies */}
        <div className="mt-16 border-t border-[rgba(209,232,226,0.08)] pt-10">
          <TrustBar />
        </div>
      </div>
    </section>
  );
}
