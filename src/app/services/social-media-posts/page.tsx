import type { Metadata } from 'next';
import SocialMediaPostsOrder from '@/components/services/orders/SocialMediaPostsOrder';

export const metadata: Metadata = {
  title: 'تصميم وإدارة منشورات السوشيال ميديا | كوبالت',
  description: 'تصاميم جرافيك وإدارة احترافية لكافة منصات التواصل لزيادة المبيعات والوصول للجمهور المستهدف.',
};

export default function Page() {
  return <SocialMediaPostsOrder />;
}
