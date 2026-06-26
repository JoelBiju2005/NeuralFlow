import React from 'react';

const COMPANIES = ['Accelion', 'DataSync', 'CloudNine', 'Nextera', 'Synthetix', 'Meridian'];

export default function TrustBar() {
  return (
    <section
      id="trust-bar"
      aria-label="Trusted by companies"
      className="border-t border-b border-[rgba(209,232,226,0.12)] py-6 relative z-10"
      style={{ background: 'transparent' }}
    >
      <div className="container flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-16">
        <span
          className="text-xs font-medium text-[#D9E8E2] opacity-40 uppercase tracking-widest"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Trusted by teams at —
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {COMPANIES.map((company) => (
            <span
              key={company}
              className="text-base md:text-lg font-semibold text-[#D9E8E2] opacity-35 hover:opacity-75 transition-opacity duration-200 cursor-default"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
