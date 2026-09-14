'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import CurrencySelector from '@/components/ui/CurrencySelector';

interface HeaderProps {
  onOpenSearch: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-inner">
            {/* Official Brand Logo */}
            <Link href="/" className="brand-logo" onClick={closeMobileMenu}>
              <img
                src="/assets/logo-cobalt-Be-YWUxa.png"
                alt="كوبالت للخدمات الرقمية"
                className="brand-logo-img"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="header-nav-links">
              <li>
                <Link href="/" className="header-nav-link active">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/#catalogSection" className="header-nav-link">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link href="/#calculatorSection" className="header-nav-link">
                  حاسبة الأسعار
                </Link>
              </li>
              <li>
                <Link href="/#bundlesSection" className="header-nav-link">
                  الباقات
                </Link>
              </li>
              <li>
                <Link href="/#portfolioSection" className="header-nav-link">
                  معرض الأعمال
                </Link>
              </li>
              <li>
                <Link href="/#reviewsSection" className="header-nav-link">
                  الآراء والتقييمات
                </Link>
              </li>
            </ul>

            {/* Minimal Header Actions */}
            <div className="header-actions">
              {/* Mobile Hamburger Toggle Button */}
              <button
                className="mobile-menu-btn"
                onClick={toggleMobileMenu}
                title="القائمة"
                type="button"
                aria-label="فتح القائمة"
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </button>

              {/* Search Overlay Button */}
              <button
                className="header-search-btn"
                onClick={onOpenSearch}
                title="بحث في الخدمات"
                type="button"
                aria-label="بحث"
              >
                🔍
              </button>

              {/* Currency Selector */}
              <CurrencySelector />

              {/* Cart Trigger */}
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

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="mobile-nav-drawer show"
          style={{
            position: 'fixed',
            top: '70px',
            right: 0,
            left: 0,
            background: 'rgba(5, 11, 24, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-color)',
            zIndex: 998,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <Link
            href="/"
            onClick={closeMobileMenu}
            style={{
              color: '#FFF',
              fontSize: '1.05rem',
              fontWeight: 700,
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            🏠 الرئيسية
          </Link>
          <Link
            href="/#catalogSection"
            onClick={closeMobileMenu}
            style={{
              color: '#FFF',
              fontSize: '1.05rem',
              fontWeight: 700,
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            🛍️ الخدمات الرقمية
          </Link>
          <Link
            href="/#calculatorSection"
            onClick={closeMobileMenu}
            style={{
              color: '#FFF',
              fontSize: '1.05rem',
              fontWeight: 700,
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            🧮 حاسبة التكلفة المباشرة
          </Link>
          <Link
            href="/#bundlesSection"
            onClick={closeMobileMenu}
            style={{
              color: '#FFF',
              fontSize: '1.05rem',
              fontWeight: 700,
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            💎 الباقات المتكاملة
          </Link>
          <Link
            href="/#portfolioSection"
            onClick={closeMobileMenu}
            style={{
              color: '#FFF',
              fontSize: '1.05rem',
              fontWeight: 700,
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            🎨 معرض أعمالنا
          </Link>
          <Link
            href="/#reviewsSection"
            onClick={closeMobileMenu}
            style={{
              color: '#FFF',
              fontSize: '1.05rem',
              fontWeight: 700,
              padding: '10px 0'
            }}
          >
            ⭐ آراء العملاء والتقييمات
          </Link>
        </div>
      )}
    </>
  );
}
