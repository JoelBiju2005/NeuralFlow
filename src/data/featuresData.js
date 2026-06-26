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
    title: 'Automation Engine',
    description:
      'Orchestrate complex multi-step workflows with zero-latency AI decision nodes. Handle millions of events with sub-50ms response times.',
    icon: CogIcon,
    span: 'col-span-2',
    accent: '#FFC801',
  },
  {
    id: 1,
    title: 'Analytics Dashboard',
    description:
      'Real-time insights across your entire pipeline. Drill down into any metric with AI-powered anomaly detection.',
    icon: ChartPieIcon,
    span: 'col-span-1',
    accent: '#FF9932',
  },
  {
    id: 2,
    title: 'Sync & Refresh',
    description:
      'Bidirectional sync across 200+ data sources. Intelligent conflict resolution with full audit trail.',
    icon: ArrowPathIcon,
    span: 'col-span-1',
    accent: '#FFC801',
  },
  {
    id: 3,
    title: 'Growth Intelligence',
    description:
      'ML-powered predictive models surface opportunities before they happen. Turn raw events into revenue signals.',
    icon: ArrowTrendingUpIcon,
    span: 'col-span-1',
    accent: '#FF9932',
  },
  {
    id: 4,
    title: '3D Data Modeling',
    description:
      'Visualize complex data relationships in immersive 3D graph space. Navigate your entire data topology at a glance.',
    icon: CubeIcon,
    span: 'col-span-1',
    accent: '#FFC801',
  },
  {
    id: 5,
    title: 'Deep Integrations',
    description:
      'Native connectors for every major cloud platform, database, and SaaS tool in your stack.',
    icon: LinkSolidIcon,
    span: 'col-span-2',
    accent: '#FF9932',
  },
];
