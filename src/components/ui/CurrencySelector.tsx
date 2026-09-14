'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { useToast } from '@/context/ToastContext';
import { CurrencyCode } from '@/types';

export default function CurrencySelector() {
  const { currentCurrency, setCurrency, allCurrencies } = useCurrency();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code);
    setIsOpen(false);
    showToast(`تم تغيير العملة إلى ${allCurrencies[code].name}`, 'info');
  };

  const curr = allCurrencies[currentCurrency];

  return (
    <div className="currency-selector" ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        id="currencyBtn"
        className="currency-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="تغيير العملة"
        type="button"
      >
        🌐 <span>{curr.code} ({curr.symbol})</span> ▾
      </button>

      {isOpen && (
        <div className="currency-dropdown show" style={{ display: 'block' }}>
          {(Object.keys(allCurrencies) as CurrencyCode[]).map((code) => {
            const item = allCurrencies[code];
            const isSelected = code === currentCurrency;
            return (
              <div
                key={code}
                className={`currency-option ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelect(code)}
                style={{
                  fontWeight: isSelected ? 800 : 500,
                  color: isSelected ? 'var(--cyan-accent)' : '#FFF'
                }}
              >
                {item.flag} {item.name} ({item.code})
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
