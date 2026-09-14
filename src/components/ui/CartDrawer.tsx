'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    subtotalSAR,
    discountSAR,
    grandTotalSAR,
    cartState,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useCart();

  const { formatPrice } = useCurrency();
  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCoupon(couponInput);
    setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="cart-overlay active" onClick={() => setIsCartOpen(false)} />

      <div id="cartDrawer" className="cart-drawer active" dir="rtl">
        <div className="cart-header">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFF' }}>
            🛒 سلة الخدمات الرقمية ({items.length})
          </h3>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1.4rem',
              cursor: 'pointer'
            }}
            type="button"
          >
            ✕
          </button>
        </div>

        <div id="cartItemsContainer" className="cart-items-container">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛍️</div>
              <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '8px' }}>السلة فارغة حالياً</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                اختر الخدمة المناسبة لنمو أعمالك وأضفها للسلة لبدء التنفيذ الفوري.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.uniqueCartId} className="cart-item">
                <img
                  src={item.image || '/assets/cobalt_web_cover_1787772997952.jpg'}
                  alt={item.serviceTitle}
                  className="cart-item-img"
                  style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#FFF', fontWeight: 800, fontSize: '0.92rem' }}>
                    {item.serviceTitle}
                  </div>
                  <div style={{ color: 'var(--cyan-accent)', fontSize: '0.78rem', marginTop: '2px' }}>
                    {item.selectedOption}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div style={{ color: '#FFF', fontWeight: 800, fontSize: '0.95rem' }}>
                      {formatPrice(item.unitPriceSAR * item.qty)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.uniqueCartId, item.qty - 1)}
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          color: '#FFF',
                          border: 'none',
                          borderRadius: '4px',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <span style={{ color: '#FFF', fontSize: '0.85rem', fontWeight: 700 }}>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.uniqueCartId, item.qty + 1)}
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          color: '#FFF',
                          border: 'none',
                          borderRadius: '4px',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.uniqueCartId)}
                        style={{
                          background: 'transparent',
                          color: 'var(--danger)',
                          border: 'none',
                          cursor: 'pointer',
                          marginLeft: '6px',
                          fontSize: '0.9rem'
                        }}
                        title="حذف"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div id="cartFooter" className="cart-footer" style={{ display: 'block' }}>
            <div className="promo-code-box">
              {cartState.appliedCoupon ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', color: 'var(--emerald-accent)', fontSize: '0.85rem' }}>
                  <span>🏷️ تم تفعيل كود الخصم: <strong>{cartState.appliedCoupon}</strong> ({cartState.discountPercentage}%)</span>
                  <button onClick={removeCoupon} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', textDecoration: 'underline' }}>
                    إلغاء
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    id="promoInput"
                    className="promo-input"
                    placeholder="كود الخصم؟ (جرّب COBALT20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button className="btn-apply-promo" onClick={handleApplyPromo} type="button">
                    تطبيق
                  </button>
                </>
              )}
            </div>

            <div className="cart-summary-line">
              <span>المجموع الفرعي:</span>
              <span id="cartSubtotalValue">{formatPrice(subtotalSAR)}</span>
            </div>

            {discountSAR > 0 && (
              <div className="cart-summary-line" style={{ color: 'var(--emerald-accent)' }}>
                <span>خصم الكود ({cartState.discountPercentage}%):</span>
                <span id="cartDiscountValue">- {formatPrice(discountSAR)}</span>
              </div>
            )}

            <div className="cart-total-line">
              <span>الإجمالي النهائي:</span>
              <span id="cartTotalValue" style={{ color: 'var(--cyan-accent)' }}>
                {formatPrice(grandTotalSAR)}
              </span>
            </div>

            <button onClick={handleProceedToCheckout} className="btn-checkout" type="button">
              🔒 متابعة الشراء وإتمام الطلب ({formatPrice(grandTotalSAR)})
            </button>
          </div>
        )}
      </div>
    </>
  );
}
