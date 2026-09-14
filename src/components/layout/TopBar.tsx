'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function TopBar() {
  const { applyCoupon } = useCart();

  const handleCopyCoupon = () => {
    applyCoupon('COBALT20');
  };

  return (
    <div className="top-bar">
      <span className="top-bar-badge">عرض حصري</span>
      <span>
        🎁 كود الخصم:{' '}
        <strong
          style={{
            color: 'var(--gold-accent)',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
          onClick={handleCopyCoupon}
          title="انقر لتطبيق كود الخصم تلقائياً"
        >
          COBALT20
        </strong>{' '}
        يمنحك 20% خصم فوري عند الشراء!
      </span>
    </div>
  );
}
