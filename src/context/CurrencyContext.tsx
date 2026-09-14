'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyInfo } from '@/types';
import { CURRENCIES, DEFAULT_CURRENCY } from '@/data/currencies';

interface CurrencyContextType {
  currentCurrency: CurrencyCode;
  currencyInfo: CurrencyInfo;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceSAR: number) => string;
  convertPrice: (priceSAR: number) => number;
  allCurrencies: typeof CURRENCIES;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currentCurrency, setCurrentCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cobalt_currency') as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        setCurrentCurrencyState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrentCurrencyState(code);
      try {
        localStorage.setItem('cobalt_currency', code);
      } catch {
        // ignore
      }
    }
  };

  const currencyInfo = CURRENCIES[currentCurrency] || CURRENCIES[DEFAULT_CURRENCY];

  const convertPrice = (priceSAR: number): number => {
    return Math.round(priceSAR * currencyInfo.rate);
  };

  const formatPrice = (priceSAR: number): string => {
    const converted = convertPrice(priceSAR);
    return `${converted.toLocaleString()} ${currencyInfo.symbol}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        currencyInfo,
        setCurrency,
        formatPrice,
        convertPrice,
        allCurrencies: CURRENCIES
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
