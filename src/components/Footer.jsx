import React from 'react';
import { CubeIcon, LinkIcon, ChevronRightIcon } from '../assets/svgs';
import { useRevealRef } from '../hooks/useIntersection';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Integrations', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'Roadmap', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Status Page', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Partners', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
  ],
};

export default function Footer() {
  const footerRef = useRevealRef();

  return (
    <footer
      role="contentinfo"
      className="reveal border-t border-[rgba(209,232,226,0.08)]"
      ref={footerRef}
      style={{ background: 'transparent' }}
    >
      {/* CTA Banner */}
      <div className="container mx-auto py-16 md:py-20">
        <div className="relative rounded-2xl border border-[rgba(255,200,1,0.15)] p-8 md:p-12 pb-12 md:pb-16 text-center"
             style={{ background: 'linear-gradient(135deg, rgba(255,200,1,0.05) 0%, rgba(255,153,50,0.05) 100%)' }}>
          {/* Glow effect */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl"
               style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,200,1,0.08), transparent 60%)' }}
               aria-hidden="true" />

          <div className="relative z-10">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#F1F6F4] mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Ready to <span className="gradient-text">automate everything</span>?
            </h2>
            <p
              className="text-base text-[#D9E8E2] max-w-lg mx-auto mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Start building intelligent data pipelines in minutes. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#pricing"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-[#FFC801] text-[#172B36]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Start Free Trial
                <ChevronRightIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="btn-ghost inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-[#D9E8E2] border border-[rgba(209,232,226,0.25)]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="container mx-auto pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4" aria-label="NeuralFlow home">
              <span className="text-[#FFC801]">
                <CubeIcon className="w-6 h-6" />
              </span>
              <span
                className="text-base font-bold text-[#F1F6F4]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                NeuralFlow
              </span>
            </a>
            <p
              className="text-sm text-[#D9E8E2] opacity-60 leading-relaxed mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              AI-native data automation platform. From ingestion to insight.
            </p>

            {/* Social-proof style links */}
            <div className="flex items-center gap-4">
              {['Twitter', 'GitHub', 'Discord'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="inline-flex items-center gap-1.5 text-xs text-[#D9E8E2] opacity-40 hover:opacity-100 hover:text-[#FFC801] transition-all duration-150"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  aria-label={`NeuralFlow on ${social}`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3
                className="text-xs font-semibold text-[#F1F6F4] uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {category}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm text-[#D9E8E2] opacity-50 hover:opacity-100 hover:text-[#FFC801] transition-all duration-150"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <LinkIcon className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(209,232,226,0.08)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#D9E8E2] opacity-30"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © {new Date().getFullYear()} NeuralFlow, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-[#D9E8E2] opacity-30">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
