import type { Metadata } from 'next';
import WebsiteDesignOrder from '@/components/services/orders/WebsiteDesignOrder';

export const metadata: Metadata = {
  title: 'تصميم وتطوير المواقع الإلكترونية | كوبالت',
  description: 'تصميم مواقع تعريفية وصفحات هبوط عصرية سريعة، متجاوبة 100% مع كافة الجوالات ومجهزة بالكامل.',
};

export default function Page() {
  return <WebsiteDesignOrder />;
}
