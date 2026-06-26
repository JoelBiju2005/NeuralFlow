import React, { useState, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChartPieIcon } from '../assets/svgs';
import { useRevealRef } from '../hooks/useIntersection';

const TESTIMONIALS = [
  {
    id: 0,
    quote: 'NeuralFlow cut our pipeline build time by 80%. We shipped in days what used to take quarters.',
    author: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'Accelion',
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

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

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
        <div className="max-w-3xl mx-auto pt-4">
          <div className="relative bg-[#1a3240] border border-[rgba(209,232,226,0.1)] rounded-2xl p-8 md:p-12">
            {/* Icon accent */}
            <div className="absolute -top-6 left-8 md:left-12 p-3.5 rounded-xl bg-[#172B36] border border-[rgba(255,200,1,0.25)] shadow-lg">
              <ChartPieIcon className="w-6 h-6 text-[#FFC801]" />
            </div>

            {/* Quote */}
            <div className="testimonial-slide pt-4" key={currentTestimonial.id}>
              <blockquote className="mb-8">
                <p
                  className="text-lg md:text-xl text-[#F1F6F4] leading-relaxed italic"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  "{currentTestimonial.quote}"
                </p>
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <cite className="not-italic">
                    <span
                      className="block text-base font-semibold text-[#FFC801]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {currentTestimonial.author}
                    </span>
                    <span
                      className="block text-sm text-[#D9E8E2] mt-1 opacity-70"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </span>
                  </cite>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="p-3 rounded-xl border border-[rgba(209,232,226,0.15)] text-[#D9E8E2] hover:text-[#FFC801] hover:border-[#FFC801] hover:bg-[rgba(255,200,1,0.05)] transition-all duration-150 cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="p-3 rounded-xl border border-[rgba(209,232,226,0.15)] text-[#D9E8E2] hover:text-[#FFC801] hover:border-[#FFC801] hover:bg-[rgba(255,200,1,0.05)] transition-all duration-150 cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex items-center justify-center gap-2 mt-10" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                    i === activeIndex
                      ? 'bg-[#FFC801] w-7'
                      : 'bg-[rgba(209,232,226,0.2)] hover:bg-[rgba(209,232,226,0.4)]'
                  }`}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
