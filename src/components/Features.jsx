import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FEATURES } from '../data/featuresData';
import { ChevronDownIcon, ChevronUpIcon, CogIcon, ChartPieIcon, ArrowPathIcon, ArrowTrendingUpIcon, CubeIcon, LinkSolidIcon } from '../assets/svgs';
import { useRevealRef } from '../hooks/useIntersection';

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const prevMobileRef = useRef(false);
  const sectionRef = useRevealRef();

  // Handle active status for stagger entrance when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [sectionRef]);

  // CONTEXT LOCK: track resize, transfer active index on breakpoint cross
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');

    const handleChange = (e) => {
      const nowMobile = e.matches;
      const wasMobile = prevMobileRef.current;

      setIsMobile(nowMobile);

      if (nowMobile && !wasMobile && activeIndex !== null) {
        setTimeout(() => {
          document
            .getElementById(`feature-panel-${activeIndex}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 350);
      }

      prevMobileRef.current = nowMobile;
    };

    setIsMobile(mq.matches);
    prevMobileRef.current = mq.matches;

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [activeIndex]);

  const handleBentoHover = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const toggleAccordion = useCallback((index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      id="features"
      aria-label="Platform Features"
      ref={sectionRef}
      style={{
        background: 'transparent',
        padding: '7rem 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="container relative z-10" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <header className="text-center mb-16">
          <h2
            className="section-heading mb-4"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#F1F6F4',
              textAlign: 'center',
              lineHeight: '1.2'
            }}
          >
            Six Modules.<br />One Unified Layer.
          </h2>
          <p
            className="section-subheading text-center max-w-xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              color: '#D9E8E2',
              fontSize: '1.125rem',
              opacity: 0.8,
              lineHeight: 1.6
            }}
          >
            Every capability your data stack needs — engineered to work as a single coherent system, not a patchwork of tools.
          </p>
        </header>

        {/* DESKTOP: Bento Grid (≥768px) */}
        {!isMobile && (
          <div
            className="grid grid-cols-12 gap-6"
            role="list"
            aria-label="Feature grid"
          >
            {/* 1. Workflow Orchestration (col-span-7) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-7 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '0ms', minHeight: '380px' }}
              onMouseEnter={() => handleBentoHover(0)}
              aria-label="Workflow Orchestration"
            >
              <span className="card-number">01</span>
              <div>
                <div className="flex justify-between items-start">
                  <div className="icon-pill">
                    <CogIcon />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '20px', color: '#F1F6F4', marginBottom: '8px' }}>Workflow Orchestration</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px', color: '#D9E8E2', lineHeight: 1.6 }} className="mb-4">
                    Design multi-step automation logic visually. Branch on conditions, retry on failure, and scale to millions of concurrent executions without managing infrastructure.
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#D9E8E2', opacity: 0.85, listStyle: 'none', paddingLeft: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#FFC801' }}>✦</span> Visual DAG pipeline builder
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#FFC801' }}>✦</span> Auto-scaling execution engine
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex gap-2">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FFC801', border: '1px solid rgba(255,200,1,0.2)', padding: '2px 6px', borderRadius: '4px' }}>EXECUTION: ACTIVE</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#D9E8E2', border: '1px solid rgba(209,232,226,0.15)', padding: '2px 6px', borderRadius: '4px' }}>256 threads/sec</span>
                </div>
              </div>
            </article>

            {/* 2. Real-Time Observability (col-span-5) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-5 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '80ms', minHeight: '380px' }}
              onMouseEnter={() => handleBentoHover(1)}
              aria-label="Real-Time Observability"
            >
              <span className="card-number">02</span>
              <div>
                <div className="flex justify-between items-start">
                  <div className="icon-pill">
                    <ChartPieIcon />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '20px', color: '#F1F6F4', marginBottom: '8px' }}>Real-Time Observability</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px', color: '#D9E8E2', lineHeight: 1.6 }} className="mb-4">
                    Every event. Every pipeline. Every anomaly — visible the moment it happens. Query your entire data topology with natural language.
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#D9E8E2', opacity: 0.85, listStyle: 'none', paddingLeft: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#FF9932' }}>✦</span> AI-powered anomaly detection
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#FF9932' }}>✦</span> Natural language query interface
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#FFC801', background: 'rgba(255,200,1,0.15)', padding: '4px 8px', borderRadius: '4px' }}>↑ 94.2% accuracy</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#FFC801', background: 'rgba(255,200,1,0.15)', padding: '4px 8px', borderRadius: '4px' }}>2.3x faster queries</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#FFC801', background: 'rgba(255,200,1,0.15)', padding: '4px 8px', borderRadius: '4px' }}>↓ 18ms p99</span>
              </div>
            </article>

            {/* 3. Universal Data Sync (col-span-4) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-4 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '160ms', minHeight: '320px' }}
              onMouseEnter={() => handleBentoHover(2)}
              aria-label="Universal Data Sync"
            >
              <span className="card-number">03</span>
              <div>
                <div className="icon-pill">
                  <ArrowPathIcon className="animate-spin-hover" />
                </div>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '18px', color: '#F1F6F4', marginTop: '20px', marginBottom: '8px' }}>Universal Data Sync</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px', color: '#D9E8E2', lineHeight: 1.5 }} className="mb-3">
                  Bidirectional sync across 200+ connectors with automatic schema evolution. Zero polling overhead — purely event-driven.
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span style={{ display: 'inline-block', border: '1px solid rgba(209,232,226,0.25)', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#D9E8E2' }}>200+ connectors</span>
                <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#FFC801' }}>99.9% uptime</span>
              </div>
            </article>

            {/* 4. Predictive Intelligence (col-span-4) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-4 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '240ms', minHeight: '320px' }}
              onMouseEnter={() => handleBentoHover(3)}
              aria-label="Predictive Intelligence"
            >
              <span className="card-number">04</span>
              <div>
                <div className="icon-pill">
                  <ArrowTrendingUpIcon className="animate-float" />
                </div>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '18px', color: '#F1F6F4', marginTop: '20px', marginBottom: '8px' }}>Predictive Intelligence</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px', color: '#D9E8E2', lineHeight: 1.5 }} className="mb-3">
                  Surface churn signals, upgrade triggers, and revenue opportunities before your team even looks for them.
                </p>
              </div>
              <div className="mt-4 flex flex-col">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#FFC801', fontSize: '2rem', fontWeight: 700, lineHeight: '1' }}>↑ 340%</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#D9E8E2', opacity: 0.8, marginTop: '2px' }}>avg. pipeline ROI</span>
              </div>
            </article>

            {/* 5. Graph Data Explorer (col-span-4) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-4 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '320ms', minHeight: '320px' }}
              onMouseEnter={() => handleBentoHover(4)}
              aria-label="Graph Data Explorer"
            >
              <span className="card-number">05</span>
              <div>
                <div className="icon-pill">
                  <CubeIcon className="animate-pulse-opacity" />
                </div>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '18px', color: '#F1F6F4', marginTop: '20px', marginBottom: '8px' }}>Graph Data Explorer</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px', color: '#D9E8E2', lineHeight: 1.5 }} className="mb-3">
                  Navigate your entire data topology as a live 3D graph. Spot dependencies, trace lineage, and debug pipelines spatially.
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#D9E8E2', opacity: 0.6 }}>WebGL 2.0</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FFC801' }}>● REALTIME</span>
              </div>
            </article>

            {/* 6. Native Integrations (col-span-12) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-12 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '400ms', minHeight: '260px' }}
              onMouseEnter={() => handleBentoHover(5)}
              aria-label="Native Integrations"
            >
              <span className="card-number">06</span>
              <div>
                <div className="icon-pill">
                  <LinkSolidIcon />
                </div>
                <div className="mt-4">
                  <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '20px', color: '#F1F6F4', marginBottom: '8px' }}>Native Integrations</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px', color: '#D9E8E2', lineHeight: 1.6 }} className="mb-2">
                    Drop-in connectors for every layer of your stack — warehouse, CRM, CDP, and beyond. Encrypted TLS with automatic OAuth token rotation.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Snowflake', 'Kafka', 'Stripe', 'AWS', 'MongoDB', 'Salesforce'].map((badge) => (
                  <span
                    key={badge}
                    style={{
                      border: '1px solid rgba(209,232,226,0.15)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      color: '#D9E8E2',
                      borderRadius: '20px',
                      padding: '4px 10px',
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </article>
          </div>
        )}

        {/* MOBILE: Accordion (<768px) */}
        {isMobile && (
          <div className="flex flex-col gap-3" role="list" aria-label="Feature list">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const isOpen = activeIndex === feature.id;
              return (
                <div
                  key={feature.id}
                  className="bento-glass-card overflow-hidden"
                  role="listitem"
                >
                  <button
                    type="button"
                    className={`accordion-trigger w-full flex items-center gap-3 px-5 py-4 text-left ${
                      isOpen ? 'accordion-trigger--open' : ''
                    }`}
                    onClick={() => toggleAccordion(feature.id)}
                    aria-expanded={isOpen}
                    aria-controls={`feature-panel-${feature.id}`}
                    id={`feature-btn-${feature.id}`}
                    style={{ outline: 'none' }}
                  >
                    <span style={{ color: feature.accent }}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <span
                      className="flex-1 text-base font-semibold text-[#F1F6F4]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {feature.title}
                    </span>
                    <span className="accordion-chevron text-[#D9E8E2]">
                      {isOpen ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  <div
                    id={`feature-panel-${feature.id}`}
                    role="region"
                    aria-labelledby={`feature-btn-${feature.id}`}
                    className={`accordion-panel ${isOpen ? 'accordion-panel--open' : ''}`}
                    style={{
                      maxHeight: isOpen ? '200px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 300ms ease-in-out',
                      padding: isOpen ? '0 1.25rem 1.25rem 1.25rem' : '0 1.25rem'
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed text-[#D9E8E2]"
                      style={{ fontFamily: "'Inter', sans-serif", opacity: 0.85 }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

