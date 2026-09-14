'use client';

import React from 'react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';

export default function BundlesSection() {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const handleOrderBundle = (title: string, priceSAR: number, serviceLink: string) => {
    addToCart({
      serviceId: `bundle_${title}`,
      serviceTitle: title,
      image: '/assets/cobalt_cards_cover_1787772953354.jpg',
      selectedOption: 'باقة مجمعة شاملة',
      unitPriceSAR: priceSAR,
      qty: 1,
      notes: `طلب باقة ترويجية: ${title}`
    });
  };

  return (
    <>
      <div className="section-divider"></div>
      <section id="bundlesSection" className="section-padding">
        <div className="container">
          <div className="section-header-center reveal-fade-up">
            <span className="section-subtitle-tag">🔥 باقات التوفير المدمجة</span>
            <h2 className="section-main-title">باقات النمو الرقمي الشاملة</h2>
            <p className="section-main-desc">تجمعات خدمات متكاملة توفر لك حضوراً تسويقياً ورقماً متكاملاً وتوفر حتى 35% من التكلفة.</p>
          </div>

          <div className="bundles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {/* Bundle 1 */}
            <div className="bundle-card reveal-on-scroll" style={{ background: 'var(--bg-card)', border: '1px dashed var(--cyan-accent)', borderRadius: 'var(--radius-md)', padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <span style={{ background: 'var(--emerald-accent)', color: '#fff', fontSize: '0.78rem', fontWeight: 800, padding: '4px 12px', borderRadius: 'var(--radius-full)', width: 'fit-content', marginBottom: '12px' }}>
                🔥 باقة التواجد الرقمي 360
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '10px', color: '#FFF' }}>
                موقع إلكتروني + 12 بوست سوشيال ميديا
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '24px', lineHeight: '1.6' }}>
                تضمن لك حضوراً قوياً وموثوقاً عبر الإنترنت من خلال موقع متكامل سريع وخطة نشر وتصاميم ممتازة على شبكات التواصل.
              </p>
              <div className="bundle-card-footer" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '18px' }}>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--cyan-accent)' }}>{formatPrice(1699)}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginRight: '8px' }}>{formatPrice(2500)}</span>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleOrderBundle('موقع إلكتروني + 12 بوست سوشيال ميديا', 1699, '/services/website-design')}
                >
                  🛒 اطلب الباقة
                </button>
              </div>
            </div>

            {/* Bundle 2 */}
            <div className="bundle-card reveal-on-scroll" style={{ background: 'var(--bg-card)', border: '1px dashed var(--gold-accent)', borderRadius: 'var(--radius-md)', padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <span style={{ background: 'var(--gold-accent)', color: '#FFF', fontSize: '0.78rem', fontWeight: 800, padding: '4px 12px', borderRadius: 'var(--radius-full)', width: 'fit-content', marginBottom: '12px' }}>
                ⭐ باقة المبيعات والميديا المتكاملة
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '10px', color: '#FFF' }}>
                متجر إلكتروني + موشن جرافيك + إدارة إعلانات
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '24px', lineHeight: '1.6' }}>
                باقة إطلاق المبيعات الكاملة: متجر إلكتروني متكامل + فيديو إعلاني موشن جرافيك احترافي + إدارة حملة إعلانية ممولة للوصول لآلاف المشترين.
              </p>
              <div className="bundle-card-footer" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '18px' }}>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--cyan-accent)' }}>{formatPrice(3200)}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginRight: '8px' }}>{formatPrice(4800)}</span>
                </div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleOrderBundle('متجر إلكتروني + موشن جرافيك + إدارة إعلانات', 3200, '/services/ecommerce-store')}
                >
                  🛒 اطلب الباقة
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
