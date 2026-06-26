import React, { useState, memo, createContext, useContext } from 'react';
import { PRICING_MATRIX, computePrice } from '../data/pricingMatrix';
import { useRevealRef } from '../hooks/useIntersection';

// ✅ Context for billing state
const BillingContext = createContext({ isAnnual: false, currency: 'USD' });

// ✅ Price display with direct context subscription
const PriceDisplay = ({ baseMonthlyUSD, id }) => {
  const { isAnnual, currency } = useContext(BillingContext);
  
  if (baseMonthlyUSD === 0) {
    return (
      <div className="flex flex-col gap-1">
        <span
          className="text-6xl font-bold text-[#F1F6F4]"
          style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-0.02em' }}
        >
          Free
        </span>
        <span
          className="text-[10px] tracking-[0.15em] text-[#D9E8E2] opacity-50 font-bold uppercase mt-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          FOREVER — NO CARD REQUIRED
        </span>
      </div>
    );
  }

  const { symbol, value } = computePrice(baseMonthlyUSD, isAnnual, currency);
  
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline">
        <span
          className="text-6xl font-bold text-[#F1F6F4]"
          style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '-0.02em' }}
        >
          {symbol}{value}
        </span>
        <span
          className="text-sm text-[#D9E8E2] opacity-50 ml-1.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          /mo
        </span>
      </div>
      <span
        className="text-[10px] tracking-[0.12em] text-[#D9E8E2] opacity-50 font-bold uppercase mt-1"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        BILLED {isAnnual ? 'ANNUALLY' : 'MONTHLY'}  ·  CANCEL ANYTIME
      </span>
    </div>
  );
};

// Custom Chevron Bullet Icon
const BulletIcon = () => (
  <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[rgba(255,200,1,0.3)] bg-[rgba(255,200,1,0.05)] shrink-0 mt-0.5">
    <svg
      className="w-2.5 h-2.5 text-[#FFC801]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </span>
);

// ✅ Feature list Component
const FeatureList = memo(({ features, tierName }) => (
  <ul className="flex flex-col gap-4 mb-8" aria-label={`${tierName} features`}>
    {features.map((f) => (
      <li
         key={f}
         className="flex items-start gap-3.5 text-[15px] text-[#D9E8E2] font-medium"
         style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <BulletIcon />
        <span>{f}</span>
      </li>
    ))}
  </ul>
));
FeatureList.displayName = 'FeatureList';

// ✅ Tier card Component
const TierCard = memo(({ tier }) => (
  <article
    className={`pricing-card-custom ${tier.highlighted ? 'featured' : 'standard'}`}
    aria-label={`${tier.name} plan`}
  >
    {/* Highlighted badge */}
    {tier.highlighted && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <span
          className="inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] bg-[#FFC801] text-[#172B36] shadow-md"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          MOST POPULAR
        </span>
      </div>
    )}

    {/* Plan Header */}
    <header className="mb-8">
      <h3
        className="text-[13px] font-black tracking-[0.15em] text-[#FF9932] mb-1.5 uppercase"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {tier.name}
      </h3>
      <p className="text-[14px] text-[#D9E8E2] opacity-70 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
        {tier.tagline}
      </p>
    </header>

    {/* Price block */}
    <div className="mb-8" aria-live="polite" aria-atomic="true">
      <PriceDisplay baseMonthlyUSD={tier.baseMonthlyUSD} id={tier.id} />
    </div>

    {/* CTA Button */}
    <div className="mb-8">
      <button
        type="button"
        className={`pricing-btn ${tier.highlighted ? 'pricing-btn-primary' : 'pricing-btn-outline'}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {tier.cta} <span className="text-[12px] opacity-80 ml-1">&gt;</span>
      </button>
    </div>

    {/* Divider */}
    <div className="w-full h-px bg-[rgba(209,232,226,0.08)] mb-8" />

    {/* Features */}
    <FeatureList features={tier.features} tierName={tier.name} />
  </article>
));
TierCard.displayName = 'TierCard';

// Parent Pricing component
export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const sectionRef = useRevealRef();

  return (
    <BillingContext.Provider value={{ isAnnual, currency }}>
      <section
        id="pricing"
        aria-label="Pricing Plans"
        className="reveal"
        ref={sectionRef}
        style={{ background: 'transparent', backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(255,200,1,0.05), transparent 70%)', padding: '6rem 0' }}
      >
        <div className="container mx-auto relative z-10">
          {/* Header */}
          <header className="text-center mb-16">
            <h2
              className="section-heading"
            >
              Pricing That Scales With You.
            </h2>
            <p className="section-subheading mx-auto">
              Start free. Scale as you grow. No hidden fees, no surprises.
            </p>

            {/* Premium Custom Controls */}
            <div className="pricing-controls-wrapper">
              {/* Custom Billing Cycle Toggle Pill */}
              <div
                className="pricing-toggle-container"
                role="group"
                aria-label="Billing cycle toggle"
              >
                <button
                  type="button"
                  onClick={() => setIsAnnual(false)}
                  className={`pricing-toggle-btn ${!isAnnual ? 'active' : 'inactive'}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  aria-pressed={!isAnnual}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setIsAnnual(true)}
                  className={`pricing-toggle-btn ${isAnnual ? 'active' : 'inactive'} flex items-center gap-2`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  aria-pressed={isAnnual}
                >
                  <span>Annual</span>
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black ${
                      isAnnual
                        ? 'bg-[#172B36] text-[#FFC801]'
                        : 'bg-[#FFC801]/15 text-[#FFC801]'
                    }`}
                  >
                    -20%
                  </span>
                </button>
              </div>

              {/* Custom Currency Selector Pill */}
              <div
                className="pricing-toggle-container"
                role="group"
                aria-label="Currency selector toggle"
              >
                {Object.keys(PRICING_MATRIX.currencies).map((curr) => {
                  const symbol = PRICING_MATRIX.currencies[curr].symbol;
                  const isSelected = currency === curr;
                  return (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={isSelected ? 'pricing-currency-btn active' : 'pricing-currency-btn inactive'}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      aria-pressed={isSelected}
                    >
                      <span className="text-[14px] font-black leading-none mb-0.5">{symbol}</span>
                      <span className="text-[9px] font-bold tracking-wider leading-none uppercase opacity-85">{curr}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </header>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto pt-2" role="list">
            {PRICING_MATRIX.tiers.map((tier) => (
              <TierCard
                key={tier.id}
                tier={tier}
              />
            ))}
          </div>
        </div>
      </section>
    </BillingContext.Provider>
  );
}
