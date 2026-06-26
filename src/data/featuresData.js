import {
  CogIcon,
  ChartPieIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  CubeIcon,
  LinkSolidIcon,
} from '../assets/svgs';

export const FEATURES = [
  {
    id: 0,
    title: 'Workflow Orchestration',
    description:
      'Design multi-step automation logic visually. Branch on conditions, retry on failure, and scale to millions of concurrent executions without managing infrastructure.',
    icon: CogIcon,
    span: 'col-span-7',
    accent: '#FFC801',
  },
  {
    id: 1,
    title: 'Real-Time Observability',
    description:
      'Every event. Every pipeline. Every anomaly — visible the moment it happens. Query your entire data topology with natural language.',
    icon: ChartPieIcon,
    span: 'col-span-5',
    accent: '#FF9932',
  },
  {
    id: 2,
    title: 'Universal Data Sync',
    description:
      'Bidirectional sync across 200+ connectors with automatic schema evolution. Zero polling overhead — purely event-driven.',
    icon: ArrowPathIcon,
    span: 'col-span-4',
    accent: '#FFC801',
  },
  {
    id: 3,
    title: 'Predictive Intelligence',
    description:
      'Surface churn signals, upgrade triggers, and revenue opportunities before your team even looks for them.',
    icon: ArrowTrendingUpIcon,
    span: 'col-span-4',
    accent: '#FF9932',
  },
  {
    id: 4,
    title: 'Graph Data Explorer',
    description:
      'Navigate your entire data topology as a live 3D graph. Spot dependencies, trace lineage, and debug pipelines spatially.',
    icon: CubeIcon,
    span: 'col-span-4',
    accent: '#FFC801',
  },
  {
    id: 5,
    title: 'Native Integrations',
    description:
      'Drop-in connectors for every layer of your stack — warehouse, CRM, CDP, and beyond. Encrypted TLS with automatic OAuth token rotation.',
    icon: LinkSolidIcon,
    span: 'col-span-12',
    accent: '#FF9932',
  },
];
