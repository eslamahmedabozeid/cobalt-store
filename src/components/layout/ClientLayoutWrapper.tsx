'use client';

import React, { useState } from 'react';
import AmbientGlowOrbs from '@/components/layout/AmbientGlowOrbs';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import SiteEffects from '@/components/layout/SiteEffects';
import CartDrawer from '@/components/ui/CartDrawer';
import CheckoutModal from '@/components/ui/CheckoutModal';
import SearchModal from '@/components/ui/SearchModal';

export default function ClientLayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <AmbientGlowOrbs />
      <TopBar />
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      <div className="site-main-content" style={{ minHeight: '80vh' }}>
        {children}
      </div>

      <Footer />
      <FloatingWhatsApp />
      <SiteEffects />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
