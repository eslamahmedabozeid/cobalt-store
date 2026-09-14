'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

interface ServiceDetailLayoutProps {
  service: ServiceItem;
  children: React.ReactNode;
  onValidateCustomFields?: () => { valid: boolean; message?: string; customData?: Record<string, any> };
  pageGuarantees?: { icon: string; title: string; desc: string }[];
  guaranteesTitle?: string;
}

export default function ServiceDetailLayout({
  service,
  children,
  onValidateCustomFields,
  pageGuarantees,
  guaranteesTitle
}: ServiceDetailLayoutProps) {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    service.packageTypes[0]?.id || ''
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  // Selected Package Info
  const selectedPackage =
    service.packageTypes.find((p) => p.id === selectedPackageId) ||
    service.packageTypes[0];

  // Calculate Addons Price
  let addonsTotalSAR = 0;
  const selectedAddonTitles: string[] = [];
  if (service.addons && selectedAddonIds.length > 0) {
    selectedAddonIds.forEach((addonId) => {
      const addon = service.addons?.find((a) => a.id === addonId);
      if (addon) {
        addonsTotalSAR += addon.priceSAR;
        selectedAddonTitles.push(addon.title);
      }
    });
  }

  const basePriceSAR = selectedPackage?.priceSAR || service.priceSAR;
  const unitPriceSAR = basePriceSAR + addonsTotalSAR;
  const totalPriceSAR = unitPriceSAR * quantity;

  const toggleAddon = (addonId: string) => {
    if (selectedAddonIds.includes(addonId)) {
      setSelectedAddonIds(selectedAddonIds.filter((id) => id !== addonId));
    } else {
      setSelectedAddonIds([...selectedAddonIds, addonId]);
    }
  };

  const handleAddToCart = () => {
    let customData: Record<string, any> | undefined = undefined;
    if (onValidateCustomFields) {
      const validation = onValidateCustomFields();
      if (!validation.valid) {
        showToast(validation.message || 'يرجى إكمال الحقول المطلوبة', 'warning');
        return;
      }
      customData = validation.customData;
    }

    addToCart({
      serviceId: service.id,
      serviceTitle: service.title,
      image: service.image,
      selectedOption: selectedPackage?.name || 'الباقة الأساسية',
      selectedAddons: selectedAddonTitles,
      unitPriceSAR: unitPriceSAR,
      qty: quantity,
      notes: `باقة: ${selectedPackage?.name}`,
      customDetails: customData
    });
  };

  const handleWhatsAppDirect = () => {
    let customData: Record<string, any> | undefined = undefined;
    if (onValidateCustomFields) {
      const validation = onValidateCustomFields();
      if (!validation.valid) {
        showToast(validation.message || 'يرجى إكمال الحقول المطلوبة', 'warning');
        return;
      }
      customData = validation.customData;
    }

    let msg = `*طلب خدمة من كوبالت:* ${service.title} 🚀\n`;
    msg += `📦 *الباقة:* ${selectedPackage?.name}\n`;
    if (selectedAddonTitles.length > 0) {
      msg += `✨ *الإضافات:* ${selectedAddonTitles.join(' + ')}\n`;
    }
    msg += `💵 *السعر التقديري:* ${formatPrice(totalPriceSAR)}\n`;
    msg += `⚡ *المدة:* ${service.delivery}\n`;

    if (customData) {
      msg += `\n📋 *بيانات المشروع المعبأة:*\n`;
      Object.entries(customData).forEach(([key, val]) => {
        if (val && (typeof val === 'string' || Array.isArray(val))) {
          msg += `- ${key}: ${Array.isArray(val) ? val.join(', ') : val}\n`;
        }
      });
    }

    const url = `https://wa.me/966500000000?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <section className="service-detail-section" style={{ padding: '40px 0 80px' }}>
        <div className="container">
          {/* Breadcrumb */}
          <div className="detail-breadcrumb" style={{ marginBottom: '24px' }}>
            <Link href="/">الرئيسية</Link> &gt;{' '}
            <Link href="/#catalogSection">الخدمات الرقمية</Link> &gt;{' '}
            <span style={{ color: 'var(--cyan-accent)' }}>{service.title}</span>
          </div>

          {/* Main Grid: Questionnaire (Left) + Sticky Sidebar (Right) */}
          <div className="service-page-grid">
            {/* Left Column: Interactive Questionnaire */}
            <div className="questionnaire-card">
              <div className="questionnaire-header">
                <span className="section-subtitle-tag">{service.badge}</span>
                <h1 style={{ fontSize: '2.1rem', fontWeight: 900, margin: '10px 0', color: '#FFF' }}>
                  {service.title}
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ color: 'var(--gold-accent)', fontSize: '1.1rem' }}>★★★★★</div>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    {service.rating} ({service.reviewsCount} تقييم مشتري موثق)
                  </span>
                </div>

                <p style={{ fontSize: '0.94rem', color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>
                  {service.shortDesc}
                </p>
              </div>

              {/* Custom Questionnaire Form Fields */}
              {children}
            </div>

            {/* Right Column: Sticky Summary & Package Configurator */}
            <div className="service-sidebar-sticky">
              <div className="sticky-order-box">
                <h3 style={{ fontSize: '1.1rem', color: '#FFF', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚡</span> اختيار باقة الخدمة
                </h3>

                {/* Package Tiers Radio Cards */}
                <div className="sidebar-packages-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {service.packageTypes.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        className={`package-radio-card ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid var(--cyan-accent)' : '1px solid var(--border-color)',
                          background: isSelected ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.03)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, color: isSelected ? 'var(--cyan-accent)' : '#FFF', fontSize: '0.92rem' }}>
                            {pkg.name}
                          </div>
                          {pkg.description && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                              {pkg.description}
                            </div>
                          )}
                        </div>
                        <div style={{ fontWeight: 900, color: '#FFF', fontSize: '0.95rem' }}>
                          {formatPrice(pkg.priceSAR)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Optional Addons */}
                {service.addons && service.addons.length > 0 && (
                  <div style={{ marginTop: '18px' }}>
                    <h4 style={{ fontSize: '0.95rem', color: '#FFF', fontWeight: 800, marginBottom: '10px' }}>
                      ترقيات وإضافات اختيارية:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {service.addons.map((addon) => {
                        const isChecked = selectedAddonIds.includes(addon.id);
                        return (
                          <label
                            key={addon.id}
                            className={`sidebar-addon-label ${isChecked ? 'active' : ''}`}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '10px',
                              borderRadius: '10px',
                              background: isChecked ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255,255,255,0.02)',
                              border: isChecked ? '1px solid var(--cyan-accent)' : '1px solid rgba(255,255,255,0.06)',
                              cursor: 'pointer',
                              fontSize: '0.85rem'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleAddon(addon.id)}
                              />
                              <span style={{ color: isChecked ? '#FFF' : 'var(--text-light)', fontWeight: isChecked ? 700 : 500 }}>
                                {addon.title}
                              </span>
                            </div>
                            <strong style={{ color: 'var(--cyan-accent)', fontSize: '0.85rem' }}>
                              +{formatPrice(addon.priceSAR)}
                            </strong>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Deliverables Checklist */}
                <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>
                    ما ستحصل عليه في هذا الطلب:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {service.deliverables.map((del, idx) => (
                      <li key={idx} style={{ fontSize: '0.82rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--emerald-accent)' }}>✓</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total Price Box */}
                <div
                  style={{
                    marginTop: '20px',
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'rgba(56, 189, 248, 0.06)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>الإجمالي المحسوب</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--cyan-accent)' }}>
                      {formatPrice(totalPriceSAR)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'left', fontSize: '0.8rem', color: 'var(--emerald-accent)', fontWeight: 700 }}>
                    {service.delivery}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                  <button
                    type="button"
                    className="btn-cobalt-primary"
                    onClick={handleAddToCart}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    🛒 إضافة للسلة ومتابعة الطلب
                  </button>
                  <button
                    type="button"
                    className="btn-whatsapp-direct"
                    onClick={handleWhatsAppDirect}
                    style={{
                      width: '100%',
                      background: '#25D366',
                      color: '#FFF',
                      padding: '12px',
                      borderRadius: '12px',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>💬</span>
                    <span>طلب مباشر عبر الواتساب</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span>🛡️ ضمان الجودة 100%</span>
                  <span>⚡ تسليم موثوق</span>
                  <span>🔄 تعديلات مفتوحة</span>
                </div>
              </div>

              {/* Service Poster — same right column as HTML */}
              <div className="service-page-poster-box" style={{ marginTop: '24px' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-page-poster-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      {pageGuarantees && pageGuarantees.length > 0 && (
        <section className="section-padding reveal-fade-up">
          <div className="container">
            <div className="section-header-center">
              <span className="section-subtitle-tag">🛡️ ضمانات الموثوقية</span>
              <h2 className="section-main-title">
                {guaranteesTitle || 'ضمانات كوبالت'}
              </h2>
            </div>
            <div className="guarantees-cards-grid">
              {pageGuarantees.map((g, idx) => (
                <div key={idx} className="guarantee-card">
                  <div className="guarantee-icon">{g.icon}</div>
                  <h3 className="guarantee-title">{g.title}</h3>
                  <p className="guarantee-desc">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
