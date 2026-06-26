import React, { useState, useEffect, useCallback } from 'react';
import { CubeIcon, SearchIcon, XMarkIcon } from '../assets/svgs';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Blog', href: '#blog' },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileOpen(false), []);

  return (
    <header
      role="banner"
      className={`nav-animate fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'border-b border-[rgba(209,232,226,0.1)] shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        backgroundColor: isScrolled ? 'rgba(23, 43, 54, 0.85)' : 'transparent',
      }}
    >
      <nav aria-label="Main navigation" className="container flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group" aria-label="NeuralFlow home">
          <span className="text-[#FFC801] transition-transform duration-200 group-hover:scale-105">
            <CubeIcon className="w-5 h-5" />
          </span>
          <span className="font-[var(--font-display)] text-base font-semibold text-[#F1F6F4] tracking-tight"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            NeuralFlow
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link-custom text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            className="nav-search-btn p-2 rounded-lg"
            aria-label="Search"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
          <a
            href="#pricing"
            className="nav-get-started inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-[#D9E8E2] hover:text-[#FFC801] transition-colors duration-150"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay fixed inset-0 z-50 ${isMobileOpen ? 'mobile-menu-overlay--open' : ''}`}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#172B36]/80 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Menu Content */}
        <div className="mobile-menu-content absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#1a3240] border-l border-[rgba(209,232,226,0.1)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-[rgba(209,232,226,0.1)]">
            <span className="font-bold text-[#F1F6F4]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Menu
            </span>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="p-2 rounded-lg text-[#D9E8E2] hover:text-[#FFC801] transition-colors duration-150"
              aria-label="Close menu"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col px-6 py-8 gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="py-3 px-4 rounded-lg text-lg font-medium text-[#D9E8E2] hover:text-[#FFC801] hover:bg-[rgba(255,200,1,0.08)] transition-all duration-150"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="mt-auto px-6 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <button
                type="button"
                className="p-3 rounded-lg text-[#D9E8E2] hover:text-[#FFC801] border border-[rgba(209,232,226,0.15)] hover:border-[#FFC801] transition-all duration-150"
                aria-label="Search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
            </div>
            <a
              href="#pricing"
              onClick={closeMobileMenu}
              className="nav-get-started flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg text-base font-semibold"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
