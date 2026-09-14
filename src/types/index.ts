export type CurrencyCode = 'SAR' | 'USD' | 'AED' | 'EGP';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  rate: number;
  name: string;
  flag: string;
}

export interface PackageType {
  id: string;
  name: string;
  priceSAR: number;
  description?: string;
}

export interface AddonItem {
  id: string;
  title: string;
  priceSAR: number;
  desc?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'social' | 'web' | 'store' | 'motion' | 'marketing';
  categoryName: string;
  badge: string;
  delivery: string;
  rating: number;
  reviewsCount: number;
  image: string;
  priceSAR: number;
  oldPriceSAR: number;
  shortDesc: string;
  deliverables: string[];
  packageTypes: PackageType[];
  addons?: AddonItem[];
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  link: string;
  ctaText?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  tag: 'all' | 'web' | 'store' | 'social' | 'motion' | 'marketing';
  categoryName: string;
  client: string;
  duration: string;
  serviceUrl: string;
  desc: string;
  image: string;
  features?: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  avatarText?: string;
  badge?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  uniqueCartId: string;
  serviceId: string;
  serviceTitle: string;
  image: string;
  selectedOption: string;
  selectedAddons: string[];
  unitPriceSAR: number;
  qty: number;
  notes: string;
  uploadedFiles: string[];
  customDetails?: Record<string, any>;
}

export interface CartState {
  items: CartItem[];
  appliedCoupon: string | null;
  discountPercentage: number;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
