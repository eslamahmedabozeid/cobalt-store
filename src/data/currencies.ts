import { CurrencyCode, CurrencyInfo } from '@/types';

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  SAR: { code: 'SAR', symbol: 'ر.س', rate: 1.0, name: 'ريال سعودي', flag: '🇸🇦' },
  USD: { code: 'USD', symbol: '$', rate: 0.27, name: 'دولار أمريكي', flag: '🇺🇸' },
  AED: { code: 'AED', symbol: 'د.إ', rate: 0.98, name: 'درهم إماراتي', flag: '🇦🇪' },
  EGP: { code: 'EGP', symbol: 'ج.م', rate: 13.2, name: 'جنيه مصري', flag: '🇪🇬' }
};

export const DEFAULT_CURRENCY: CurrencyCode = 'SAR';
