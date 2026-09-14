import type { Metadata } from 'next';
import MotionGraphicsOrder from '@/components/services/orders/MotionGraphicsOrder';

export const metadata: Metadata = {
  title: 'موشن جرافيك وإنتاج فيديو إعلاني | كوبالت',
  description: 'فيديوهات موشن جرافيك احترافية مع تعليق صوتي استوديو لمضاعفة تأثير حملاتك الإعلانية.',
};

export default function Page() {
  return <MotionGraphicsOrder />;
}
