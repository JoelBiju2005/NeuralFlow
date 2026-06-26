export const PRICING_MATRIX = {
  tiers: [
    {
      id: 'starter',
      name: 'STARTER',
      tagline: 'For solo builders',
      baseMonthlyUSD: 0,
      features: [
        '1 workspace - 3 pipelines',
        '10k task executions / mo',
        'Community Slack',
        'Edge runtime, 1 region',
      ],
      cta: 'Start free',
      highlighted: false,
    },
    {
      id: 'pro',
      name: 'PRO',
      tagline: 'Most teams ship here',
      baseMonthlyUSD: 49,
      features: [
        'Unlimited workspaces',
        '2M task executions / mo',
        'Typed schema diffing + rollback',
        'Edge runtime, 6 regions',
        'SAML SSO - audit log',
      ],
      cta: 'Choose Pro',
      highlighted: true,
    },
    {
      id: 'scale',
      name: 'SCALE',
      tagline: 'For data platforms',
      baseMonthlyUSD: 149,
      features: [
        'Everything in Pro',
        '25M task executions / mo',
        'Dedicated edge workers',
        'Custom connectors SDK',
        'Named solutions engineer',
      ],
      cta: 'Choose Scale',
      highlighted: false,
    },
  ],
  annualDiscount: 0.80,
  currencies: {
    USD: { symbol: '$', rate: 1.00, decimals: 0 },
    INR: { symbol: '₹', rate: 84.50, decimals: 0 },
    EUR: { symbol: '€', rate: 0.92, decimals: 0 },
  },
};

export function computePrice(baseMonthlyUSD, isAnnual, currency) {
  const { rate, decimals, symbol } = PRICING_MATRIX.currencies[currency];
  const multiplier = isAnnual ? PRICING_MATRIX.annualDiscount : 1;
  const value = baseMonthlyUSD * multiplier * rate;
  return {
    formatted: `${symbol}${value.toFixed(decimals)}`,
    symbol,
    value: value.toFixed(decimals),
  };
}
