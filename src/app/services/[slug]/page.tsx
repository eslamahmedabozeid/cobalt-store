import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_DATA } from '@/data/services';
import GenericServiceOrder from '@/components/services/orders/GenericServiceOrder';

interface DynamicServicePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: DynamicServicePageProps): Metadata {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug);
  if (!service) {
    return { title: 'خدمة غير موجودة | كوبالت' };
  }
  return {
    title: `${service.title} | كوبالت`,
    description: service.shortDesc,
  };
}

export default function DynamicServicePage({ params }: DynamicServicePageProps) {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug);
  if (!service) {
    notFound();
  }

  return <GenericServiceOrder service={service} />;
}
