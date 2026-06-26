import React from 'react';

const COMPANIES = ['VERTEX.AI', 'SYNAPSE', 'KRAKEN DATA', 'AETHER', 'HELIOS CORE', 'QUANTUM'];

export default function TrustBar() {
  return (
    <section
      id="trust-bar"
      aria-label="Trusted by companies"
      className="py-4 relative z-10"
      style={{ background: 'transparent' }}
    >
      <div className="container flex flex-col items-center justify-center gap-6">
        <span
          className="text-xs font-semibold text-[#D9E8E2] opacity-40 uppercase tracking-widest text-center"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Trusted by fast-scaling technical engineering teams
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mt-2">
          {COMPANIES.map((company) => (
            <span
              key={company}
              className="text-sm sm:text-base font-bold text-[#D9E8E2] opacity-35 hover:opacity-85 transition-opacity duration-200 cursor-default tracking-wider"
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
