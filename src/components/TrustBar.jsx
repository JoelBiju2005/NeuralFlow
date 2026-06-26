import React from 'react';

const COMPANIES = ['Stripe', 'Notion', 'Vercel', 'Linear', 'Raycast', 'Resend'];

export default function TrustBar() {
  return (
    <section
      id="trust"
      aria-label="Trusted by leading companies"
      className="py-6 border-t border-b border-[rgba(209,232,226,0.08)] relative z-10"
      style={{ background: '#172B36' }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center gap-4">
        <p
          className="text-xs font-normal text-[#D9E8E2] opacity-50 uppercase tracking-widest text-center"
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}
        >
          Trusted by engineering teams at
        </p>
        <ul
          aria-label="Company list"
          className="flex flex-wrap items-center justify-center gap-12 mt-1"
        >
          {COMPANIES.map((company) => (
            <li
              key={company}
              className="text-[15px] font-semibold text-[#F1F6F4] opacity-35 hover:opacity-75 transition-opacity duration-200 cursor-default"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {company}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
