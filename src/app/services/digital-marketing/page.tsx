import type { Metadata } from 'next';
import DigitalMarketingOrder from '@/components/services/orders/DigitalMarketingOrder';

export const metadata: Metadata = {
  title: 'التسويق والإعلانات الممولة | كوبالت',
  description: 'إدارة حملات إعلانية ممولة باحترافية مع استهداف ذكي وتقارير أداء مستمرة.',
};

export default function Page() {
  return <DigitalMarketingOrder />;
}
