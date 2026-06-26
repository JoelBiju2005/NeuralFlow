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
            Built for the Scale<br />You Haven't Hit Yet.
          </h2>
          <p
            className="section-subheading text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              color: '#D9E8E2',
              fontSize: '1.125rem',
              opacity: 0.8
            }}
          >
            Six modules. One unified intelligence layer.
          </p>
        </header>

        {/* DESKTOP: Bento Grid (≥768px) */}
        {!isMobile && (
          <div
            className="grid grid-cols-12 gap-6"
            role="list"
            aria-label="Feature grid"
          >
            {/* 1. Automation Engine (col-span-7) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-7 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '0ms', minHeight: '380px' }}
              onMouseEnter={() => handleBentoHover(0)}
              aria-label="Automation Engine"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="bento-icon-pill bento-icon-pill-gold">
                    <CogIcon className="w-9 h-9" />
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '3rem', fontWeight: 700, color: '#FFC801', opacity: 0.06, userSelect: 'none', lineHeight: '1' }}>01</span>
                </div>
                <div className="mt-6">
                  <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '20px', color: '#F1F6F4', marginBottom: '8px' }}>Automation Engine</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px', color: '#D9E8E2', lineHeight: 1.6 }} className="mb-4">
                    Orchestrate complex multi-step workflows with zero-latency AI decision nodes. Route, transform, and trigger event payloads instantly based on behavioral heuristics.
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#D9E8E2', opacity: 0.85, listStyle: 'none', paddingLeft: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#FFC801' }}>✦</span> Dynamic DAG Execution Paths
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#FFC801' }}>✦</span> Fail-safe backpressure throttling
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex gap-2">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FFC801', border: '1px solid rgba(255,200,1,0.2)', padding: '2px 6px', borderRadius: '4px' }}>EXECUTION: ACTIVE</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#D9E8E2', border: '1px solid rgba(209,232,226,0.15)', padding: '2px 6px', borderRadius: '4px' }}>THREADS: 256/sec</span>
                </div>
                <div className="flex items-center mt-2" style={{ height: '45px' }}>
                  <svg className="w-full h-full" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 30 C 30 25, 60 35, 90 15 C 120 5, 150 25, 200 5" stroke="#FFC801" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </div>
              </div>
            </article>

            {/* 2. Analytics Dashboard (col-span-5) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-5 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '80ms', minHeight: '380px' }}
              onMouseEnter={() => handleBentoHover(1)}
              aria-label="Analytics Dashboard"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="bento-icon-pill bento-icon-pill-saffron">
                    <ChartPieIcon className="w-9 h-9" />
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '3rem', fontWeight: 700, color: '#FF9932', opacity: 0.06, userSelect: 'none', lineHeight: '1' }}>02</span>
                </div>
                <div className="mt-6">
                  <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '20px', color: '#F1F6F4', marginBottom: '8px' }}>Analytics Dashboard</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px', color: '#D9E8E2', lineHeight: 1.6 }} className="mb-4">
                    Real-time insights across your entire pipeline. Track system bottlenecks, trace payloads, and run ad-hoc metrics in seconds.
                  </p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#D9E8E2', opacity: 0.85, listStyle: 'none', paddingLeft: 0 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#FF9932' }}>✦</span> AI-powered anomaly alerts
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#FF9932' }}>✦</span> Structured event query builder
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#FFC801', background: 'rgba(255,200,1,0.15)', padding: '4px 8px', borderRadius: '4px' }}>↑ 94.2%</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#FFC801', background: 'rgba(255,200,1,0.15)', padding: '4px 8px', borderRadius: '4px' }}>↑ 2.3x</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#FFC801', background: 'rgba(255,200,1,0.15)', padding: '4px 8px', borderRadius: '4px' }}>↑ 18ms</span>
              </div>
            </article>

            {/* 3. Sync & Refresh (col-span-4) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-4 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '160ms', minHeight: '320px' }}
              onMouseEnter={() => handleBentoHover(2)}
              aria-label="Sync & Refresh"
            >
              <div>
                <div className="bento-icon-pill bento-icon-pill-gold">
                  <ArrowPathIcon className="w-9 h-9 animate-spin-linear" />
                </div>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '18px', color: '#F1F6F4', marginTop: '20px', marginBottom: '8px' }}>Sync & Refresh</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px', color: '#D9E8E2', lineHeight: 1.5 }} className="mb-3">
                  Bidirectional sync across 200+ data sources. Automatic schema drift adaptation.
                </p>
                <div style={{ fontSize: '11px', color: '#D9E8E2', opacity: 0.7 }}>
                  Updates trigger instantly upon upstream changes with zero polling overhead.
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span style={{ display: 'inline-block', border: '1px solid rgba(209,232,226,0.25)', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#D9E8E2' }}>200+ sources</span>
                <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#FFC801' }}>Uptime 99.9%</span>
              </div>
            </article>

            {/* Center Logo - Floating and Unboxed (col-span-4) */}
            <div
              className={`col-span-4 flex items-center justify-center reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '200ms', minHeight: '320px' }}
              aria-hidden="true"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-[#FFC801] to-[#FF9932] opacity-[0.08] blur-xl animate-pulse" />
                <CubeIcon className="w-[100px] h-[100px] text-[#FFC801] relative z-10 animate-float" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 200, 1, 0.45))' }} />
              </div>
            </div>

            {/* 4. Growth Intelligence (col-span-4) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-4 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '240ms', minHeight: '320px' }}
              onMouseEnter={() => handleBentoHover(3)}
              aria-label="Growth Intelligence"
            >
              <div>
                <div className="bento-icon-pill bento-icon-pill-saffron">
                  <ArrowTrendingUpIcon className="w-9 h-9 animate-float" />
                </div>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '18px', color: '#F1F6F4', marginTop: '20px', marginBottom: '8px' }}>Growth Intelligence</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px', color: '#D9E8E2', lineHeight: 1.5 }} className="mb-3">
                  ML-powered predictive models surface opportunities before they happen.
                </p>
                <div style={{ fontSize: '11px', color: '#D9E8E2', opacity: 0.7 }}>
                  Predicts customer churn and signals upgrade paths using real-time usage data.
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#FFC801', fontSize: '2rem', fontWeight: 700, lineHeight: '1' }}>↑ 340%</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#D9E8E2', opacity: 0.8, marginTop: '2px' }}>avg. pipeline ROI</span>
              </div>
            </article>

            {/* 5. 3D Data Modeling (col-span-5) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-5 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '320ms', minHeight: '320px' }}
              onMouseEnter={() => handleBentoHover(4)}
              aria-label="3D Data Modeling"
            >
              <div>
                <div className="bento-icon-pill bento-icon-pill-gold">
                  <CubeIcon className="w-9 h-9 animate-pulse-opacity" />
                </div>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '18px', color: '#F1F6F4', marginTop: '20px', marginBottom: '8px' }}>3D Data Modeling</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px', color: '#D9E8E2', lineHeight: 1.5 }} className="mb-3">
                  Visualize complex data relationships in 3D graph space. Navigate entire topologies.
                </p>
                <div style={{ fontSize: '11px', color: '#D9E8E2', opacity: 0.7 }}>
                  Render massive dependency maps in browser GPU using hardware-accelerated nodes.
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#D9E8E2', opacity: 0.6 }}>WEBGL 2.0</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FFC801' }}>● REALTIME</span>
              </div>
            </article>

            {/* 6. Deep Integrations (col-span-7) */}
            <article
              role="listitem"
              className={`bento-glass-card col-span-7 p-8 flex flex-col justify-between reveal-card ${revealed ? 'revealed' : ''}`}
              style={{ transitionDelay: '400ms', minHeight: '320px' }}
              onMouseEnter={() => handleBentoHover(5)}
              aria-label="Deep Integrations"
            >
              <div>
                <div className="bento-icon-pill bento-icon-pill-saffron">
                  <LinkSolidIcon className="w-9 h-9" />
                </div>
                <div className="mt-4">
                  <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: '20px', color: '#F1F6F4', marginBottom: '8px' }}>Deep Integrations</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px', color: '#D9E8E2', lineHeight: 1.6 }} className="mb-2">
                    Native connectors for every major cloud platform, database, and SaaS tool in your stack.
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#D9E8E2', opacity: 0.75 }}>
                    Connect pipelines directly using encrypted TLS connections with automatic OAuth rotation.
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

