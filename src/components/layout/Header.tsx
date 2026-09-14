'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import CurrencySelector from '@/components/ui/CurrencySelector';

interface HeaderProps {
  onOpenSearch: () => void;
}

const NAV_LINKS = [
  { href: '/', label: 'الرئيسية', mobileLabel: '🏠 الرئيسية' },
  { href: '/services', label: 'الخدمات', mobileLabel: '🛍️ الخدمات الرقمية' },
  { href: '/#calculatorSection', label: 'حاسبة الأسعار', mobileLabel: '🧮 حاسبة التكلفة المباشرة' },
  { href: '/#bundlesSection', label: 'الباقات', mobileLabel: '💎 الباقات المتكاملة' },
  { href: '/#portfolioSection', label: 'معرض الأعمال', mobileLabel: '🎨 معرض أعمالنا' },
  { href: '/#reviewsSection', label: 'الآراء والتقييمات', mobileLabel: '⭐ آراء العملاء والتقييمات' },
];

export default function Header({ onOpenSearch }: HeaderProps) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <Link href="/" className="brand-logo" onClick={closeMobileMenu}>
              <img
                src="/assets/logo-cobalt-Be-YWUxa.png"
                alt="كوبالت للخدمات الرقمية"
                className="brand-logo-img"
              />
            </Link>

            <ul className="header-nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`header-nav-link${isActive(link.href) ? ' active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="header-actions">
              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                title="القائمة"
                type="button"
                aria-label="فتح القائمة"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>

              <button
                className="header-search-btn"
                onClick={onOpenSearch}
                title="بحث في الخدمات"
                type="button"
                aria-label="بحث"
              >
                🔍
              </button>

              <CurrencySelector />

              <button
                className="cart-trigger-btn"
                onClick={() => setIsCartOpen(true)}
                type="button"
                aria-label="سلة المشتريات"
              >
                <span className="cart-icon">🛒</span>
                <span className="cart-text">السلة</span>
                {totalItemsCount > 0 && (
                  <span className="cart-badge" id="cartBadgeCount">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer show">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="mobile-nav-link"
            >
              {link.mobileLabel}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
