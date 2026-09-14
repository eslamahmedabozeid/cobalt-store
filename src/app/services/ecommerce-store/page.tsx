import type { Metadata } from 'next';
import EcommerceStoreOrder from '@/components/services/orders/EcommerceStoreOrder';

export const metadata: Metadata = {
  title: 'تصميم وتجهيز المتاجر الإلكترونية | كوبالت',
  description: 'متجر إلكتروني احترافي متكامل مهيأ للمبيعات، مربوط ببوابات الدفع وشركات الشحن.',
};

export default function Page() {
  return <EcommerceStoreOrder />;
}
