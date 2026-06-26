import React from 'react';
import TrustBar from './TrustBar';

const METRICS = [
  '10M+ Events/sec',
  '99.99% Uptime',
  '<50ms Latency',
  '200+ Integrations',
  '340% Pipeline ROI',
  'Zero Downtime Deploys',
  '256 Threads/sec',
  'SOC 2 Compliant',
  'GDPR Ready'
];

export default function MarqueeSection() {
  // Repeat the metrics list twice for a seamless infinite loop
  const duplicatedMetrics = [...METRICS, ...METRICS];

  return (
    <>
      {/* 1. Semantic Trust Bar */}
      <TrustBar />

      {/* 2. Decorative Metric Marquee */}
      <div className="marquee-wrapper" aria-hidden="true">
        <div className="marquee-track">
          {duplicatedMetrics.map((metric, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-bullet">⬡</span>
              <span>{metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Section Bridge Gradient */}
      <div className="section-bridge" />
    </>
  );
}
