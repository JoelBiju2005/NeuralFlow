import React, { useEffect, useState } from 'react';
import { ArrowTrendingUpIcon, LinkSolidIcon, ChevronDownIcon } from '../assets/svgs';

const STATS = [
  { label: 'Events/sec', value: '10M+' },
  { label: 'Uptime', value: '99.99%' },
  { label: 'Latency', value: '< 50ms' },
];

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: 'transparent', padding: '15vh 0 6rem 0' }}
    >
      {/* Subtle background gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(255,200,1,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,153,50,0.04) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 flex flex-col items-center justify-center gap-6">
        {/* Headline */}
        <h1
          className="hero-headline text-center font-bold"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: "1.15",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block text-[#F1F6F4] opacity-90 mb-1">
            The Intelligence Layer
          </span>
          <span className="block text-[#FFC801]">
            Your Stack Was Missing.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="hero-sub text-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: "400",
            fontSize: "1.125rem",
            lineHeight: "1.7",
            color: "#F1F6F4",
            opacity: 0.75,
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          Unify every data source, automate every workflow, and surface decisions 
          at machine speed — without writing a single pipeline from scratch.
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row items-center gap-6 justify-center mt-2">
          <a
            href="#pricing"
            className="hero-btn-primary inline-flex items-center gap-2.5"
          >
            Start Building
            <ArrowTrendingUpIcon className="w-4 h-4" />
          </a>
          <a
            href="#features"
            className="hero-btn-ghost inline-flex items-center gap-2"
          >
            <LinkSolidIcon className="w-4 h-4 shrink-0 text-[#D9E8E2]" style={{ width: '16px', height: '16px' }} />
            <span>Watch Demo</span>
          </a>
        </div>

        {/* Stats Row (visual break comes purely from margin-top: 3rem whitespace, no separator lines/hrs) */}
        <div className="hero-stats-container flex flex-col md:flex-row gap-6 items-center justify-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="hero-stat-card">
              <div className="hero-stat-num-container">
                <ArrowTrendingUpIcon className="w-4 h-4 text-[#FFC801] shrink-0" style={{ width: '16px', height: '16px' }} />
                <span className="hero-stat-num">
                  {stat.value}
                </span>
              </div>
              <p className="hero-stat-label">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator - positioned relatively inside container below stats with mt: 2rem */}
        <div
          className={`scroll-indicator-pulse transition-opacity duration-300 ${
            scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{ marginTop: '2rem' }}
        >
          <a
            href="#features"
            className="text-[#D9E8E2] opacity-75 hover:text-[#FFC801] transition-colors duration-200"
            aria-label="Scroll down"
          >
            <ChevronDownIcon className="w-5 h-5" style={{ width: '20px', height: '20px' }} />
          </a>
        </div>
      </div>
    </section>
  );
}
