'use client';

import React, { useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import SiteEffects from '@/components/layout/SiteEffects';
import CartDrawer from '@/components/ui/CartDrawer';
import CheckoutModal from '@/components/ui/CheckoutModal';
import SearchModal from '@/components/ui/SearchModal';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <TopBar />
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      <div className="site-main-content" style={{ minHeight: '80vh' }}>
        {children}
      </div>

      <SiteEffects />

      <CartDrawer />
      <CheckoutModal />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
