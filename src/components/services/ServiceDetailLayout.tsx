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
  stepLabels?: string[];
}

export default function ServiceDetailLayout({
  service,
  children,
  onValidateCustomFields,
  pageGuarantees,
  guaranteesTitle,
  stepLabels
}: ServiceDetailLayoutProps) {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    service.packageTypes[0]?.id || ''
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  // Stepper vs Full View State (Default to Stepper for clean, compact UX)
  const [activeStep, setActiveStep] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'stepper' | 'all'>('stepper');

  // Convert children to sections array
  const sections = React.Children.toArray(children);
  const totalSteps = stepLabels?.length || sections.length;

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
    msg += `📦 *الباقة المحددة:* ${selectedPackage?.name}\n`;
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

  const scrollToQuestionnaireTop = () => {
    const el = document.querySelector('.questionnaire-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSidebar = () => {
    const el = document.querySelector('.sticky-order-box');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="service-detail-wrapper">
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-top-left" />
      <div className="ambient-glow glow-bottom-right" />

      <section className="service-detail-section">
        <div className="container">
          {/* Breadcrumb Bar */}
          <nav className="detail-breadcrumb-bar" aria-label="مسار التنقل">
            <div className="breadcrumb-items">
              <Link href="/" className="breadcrumb-link home-link">
                <span className="breadcrumb-icon">🏠</span>
                <span>الرئيسية</span>
              </Link>
              <span className="breadcrumb-separator">/</span>
              <Link href="/services" className="breadcrumb-link">
                <span>الخدمات الرقمية</span>
              </Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{service.title}</span>
            </div>
            <Link href="/services" className="breadcrumb-back-btn">
              <span>← العودة لكافة الخدمات</span>
            </Link>
          </nav>

          {/* Mobile Only Poster Image Banner - Appears First on Mobile */}
          <div className="mobile-service-poster-banner">
            <div className="poster-img-wrapper">
              <img
                src={service.image}
                alt={service.title}
                className="service-poster-img"
              />
              <div className="poster-overlay-badge">
                <span className="badge-glow-dot" />
                <span>جاهز للتنفيذ الفوري</span>
              </div>
            </div>
          </div>

          {/* Main Grid: Left Questionnaire & Right Sticky Sidebar */}
          <div className="service-page-grid">
            {/* Left Column: Interactive Questionnaire Card */}
            <div className="questionnaire-card">
              {/* Header Hero Banner */}
              <div className="questionnaire-header">
                <div className="service-badge-row">
                  <span className="service-hero-badge">{service.badge}</span>
                  <span className="service-category-pill">{service.categoryName}</span>
                </div>

                <h1 className="service-hero-title">
                  {service.title}
                </h1>

                {/* Rating & Trust Metrics Pill Row */}
                <div className="service-metrics-row">
                  <div className="metric-pill rating-pill">
                    <span className="metric-stars">★★★★★</span>
                    <span className="metric-text">
                      <strong>{service.rating}</strong> ({service.reviewsCount} تقييم موثق)
                    </span>
                  </div>

                  <div className="metric-pill delivery-pill">
                    <span className="metric-icon">⚡</span>
                    <span className="metric-text">{service.delivery}</span>
                  </div>

                  <div className="metric-pill guarantee-pill">
                    <span className="metric-icon">🛡️</span>
                    <span className="metric-text">ضمان الجودة 100%</span>
                  </div>
                </div>

                <p className="service-hero-desc">
                  {service.shortDesc}
                </p>

                {/* Micro Benefits Strip */}
                <div className="service-micro-benefits">
                  <div className="micro-benefit-item">
                    <span className="benefit-check">✓</span>
                    <span>تعديلات مجانية حتى الرضا</span>
                  </div>
                  <div className="micro-benefit-item">
                    <span className="benefit-check">✓</span>
                    <span>تسليم كامل الملفات المصدرية</span>
                  </div>
                  <div className="micro-benefit-item">
                    <span className="benefit-check">✓</span>
                    <span>دعم فني وتواصل مباشر</span>
                  </div>
                </div>
              </div>

              {/* Interactive Multi-Step Stepper Controller */}
              {stepLabels && stepLabels.length > 1 && (
                <div className="questionnaire-stepper-control">
                  <div className="stepper-header-row">
                    <div className="stepper-status-title">
                      <span className="stepper-step-indicator">
                        الخطوة {activeStep + 1} من {totalSteps}:
                      </span>
                      <strong className="stepper-active-name">
                        {stepLabels[activeStep] || `القسم ${activeStep + 1}`}
                      </strong>
                    </div>

                    <div className="stepper-actions-tools">
                      <button
                        type="button"
                        className={`btn-view-toggle ${viewMode === 'all' ? 'active' : ''}`}
                        onClick={() => setViewMode(viewMode === 'stepper' ? 'all' : 'stepper')}
                        title="تبديل طريقة العرض"
                      >
                        <span>{viewMode === 'stepper' ? '📜 إظهار كافة الأقسام' : '⚡ عرض الخطوات الميسرة'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="stepper-progress-track">
                    <div
                      className="stepper-progress-fill"
                      style={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
                    />
                  </div>

                  {/* Step Interactive Tabs */}
                  <div className="stepper-tabs-container">
                    {stepLabels.map((label, idx) => {
                      const isActive = activeStep === idx;
                      const isPast = activeStep > idx;

                      return (
                        <button
                          key={idx}
                          type="button"
                          className={`stepper-tab-btn ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                          onClick={() => {
                            setActiveStep(idx);
                            scrollToQuestionnaireTop();
                          }}
                        >
                          <span className="tab-number-badge">
                            {isPast ? '✓' : idx + 1}
                          </span>
                          <span className="tab-label-text">{label}</span>
                          {isActive && <span className="tab-glow-indicator" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Custom Questionnaire Form Body */}
              <div className="questionnaire-body">
                {viewMode === 'stepper' && sections.length > 1 ? (
                  <div className="single-step-content-view">
                    {sections[activeStep] || sections[0]}

                    {/* Step Navigation Bar */}
                    <div className="step-navigation-bar">
                      {activeStep > 0 && (
                        <button
                          type="button"
                          className="btn-step-prev"
                          onClick={() => {
                            setActiveStep(activeStep - 1);
                            scrollToQuestionnaireTop();
                          }}
                        >
                          <span className="btn-nav-arrow">→</span>
                          <span>السابق: {stepLabels?.[activeStep - 1] || `الخطوة ${activeStep}`}</span>
                        </button>
                      )}

                      {activeStep < sections.length - 1 ? (
                        <button
                          type="button"
                          className="btn-step-next"
                          onClick={() => {
                            setActiveStep(activeStep + 1);
                            scrollToQuestionnaireTop();
                          }}
                        >
                          <span>المتابعة إلى: {stepLabels?.[activeStep + 1] || `الخطوة ${activeStep + 2}`}</span>
                          <span className="btn-nav-arrow">←</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn-step-finish"
                          onClick={scrollToSidebar}
                        >
                          <span>✨ اكتمل الاستبيان - اختر الباقة وأضف للسلة</span>
                          <span className="btn-nav-arrow">↓</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="all-steps-content-view">
                    {children}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Poster & Pricing Configurator */}
            <aside className="service-sidebar-sticky">
              {/* Service Poster Card (Desktop Sidebar) */}
              <div className="service-poster-card desktop-poster-card">
                <div className="poster-img-wrapper">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-poster-img"
                  />
                  <div className="poster-overlay-badge">
                    <span className="badge-glow-dot" />
                    <span>جاهز للتنفيذ الفوري</span>
                  </div>
                </div>
              </div>

              <div className="sticky-order-box">
                {/* Box Header */}
                <div className="order-box-header">
                  <div className="header-title-row">
                    <span className="header-icon">⚡</span>
                    <h3 className="box-title">تخصيص الباقة والطلب</h3>
                  </div>
                  <span className="instant-calc-tag">حساب فوري</span>
                </div>

                {/* Package Tiers Radio Cards */}
                <div className="sidebar-section">
                  <div className="sidebar-section-title">اختر باقة الخدمة المناسبة:</div>
                  <div className="sidebar-packages-list">
                    {service.packageTypes.map((pkg, idx) => {
                      const isSelected = selectedPackageId === pkg.id;
                      const isPopular = idx === 1 || (service.packageTypes.length === 2 && idx === 1);

                      return (
                        <div
                          key={pkg.id}
                          className={`package-radio-card ${isSelected ? 'active' : ''}`}
                          onClick={() => setSelectedPackageId(pkg.id)}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              setSelectedPackageId(pkg.id);
                            }
                          }}
                        >
                          {isPopular && <span className="package-popular-badge">⭐ الخيار الأكثر طلباً</span>}
                          <div className="pkg-radio-indicator">
                            <span className="pkg-radio-circle" />
                          </div>
                          <div className="pkg-info-col">
                            <div className="pkg-name">{pkg.name}</div>
                            {pkg.description && (
                              <div className="pkg-desc">{pkg.description}</div>
                            )}
                          </div>
                          <div className="pkg-price-col">
                            <span className="pkg-price-val">{formatPrice(pkg.priceSAR)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Addons */}
                {service.addons && service.addons.length > 0 && (
                  <div className="sidebar-section addons-section">
                    <div className="sidebar-section-title">
                      <span>ترقيات وإضافات اختيارية:</span>
                      <span className="addons-subtitle">(يمكنك اختيار أكثر من إضافة)</span>
                    </div>
                    <div className="sidebar-addons-list">
                      {service.addons.map((addon) => {
                        const isChecked = selectedAddonIds.includes(addon.id);
                        return (
                          <label
                            key={addon.id}
                            className={`sidebar-addon-label ${isChecked ? 'active' : ''}`}
                          >
                            <div className="addon-checkbox-row">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleAddon(addon.id)}
                                className="sidebar-addon-input"
                              />
                              <div className="addon-text-group">
                                <span className="addon-title">{addon.title}</span>
                                {addon.desc && <span className="addon-desc">{addon.desc}</span>}
                              </div>
                            </div>
                            <span className="addon-price-tag">
                              +{formatPrice(addon.priceSAR)}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Deliverables Checklist */}
                <div className="sidebar-section deliverables-section">
                  <div className="sidebar-section-title">ما ستحصل عليه في هذا الطلب:</div>
                  <ul className="deliverables-list">
                    {service.deliverables.map((del, idx) => (
                      <li key={idx} className="deliverable-item">
                        <span className="del-check-icon">✓</span>
                        <span className="del-text">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Total Price Box */}
                <div className="sidebar-total-card">
                  <div className="total-label-row">
                    <span className="total-label">الإجمالي النهائي المحسوب</span>
                    <span className="delivery-badge-pill">
                      <span className="speed-icon">⚡</span> {service.delivery}
                    </span>
                  </div>
                  <div className="total-amount-row">
                    <div className="total-currency-display">
                      <span className="price-number">{formatPrice(totalPriceSAR)}</span>
                    </div>
                    {service.oldPriceSAR && (
                      <div className="old-price-strike">
                        بدلاً من {formatPrice(service.oldPriceSAR + addonsTotalSAR)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="sidebar-actions-group">
                  <button
                    type="button"
                    className="btn-order-primary"
                    onClick={handleAddToCart}
                  >
                    <span className="btn-icon">🛒</span>
                    <span className="btn-text">إضافة للسلة ومتابعة الطلب</span>
                    <span className="btn-arrow">←</span>
                  </button>

                  <button
                    type="button"
                    className="btn-order-whatsapp"
                    onClick={handleWhatsAppDirect}
                  >
                    <span className="whatsapp-icon">💬</span>
                    <span>طلب مباشر وتنسيق عبر الواتساب</span>
                  </button>
                </div>

                {/* Trust & Guarantee Badges */}
                <div className="sidebar-trust-row">
                  <div className="trust-item">
                    <span className="trust-icon">🛡️</span>
                    <span>دفع آمن 100%</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-icon">⚡</span>
                    <span>تسليم في الموعد</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-icon">🔄</span>
                    <span>تعديلات مفتوحة</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Floating Order Bar */}
      <div className="mobile-floating-order-bar">
        <div className="floating-order-info">
          <span className="floating-order-label">السعر الإجمالي:</span>
          <span className="floating-order-price">{formatPrice(totalPriceSAR)}</span>
        </div>
        <div className="floating-order-actions">
          <button
            type="button"
            className="floating-btn-cart"
            onClick={handleAddToCart}
          >
            <span className="floating-btn-icon">🛒</span>
            <span>أضف للسلة</span>
          </button>
          <button
            type="button"
            className="floating-btn-customize"
            onClick={scrollToSidebar}
            title="تخصيص الباقة"
          >
            <span>⚡ الباقات</span>
          </button>
        </div>
      </div>

      {/* Guarantees Section */}
      {pageGuarantees && pageGuarantees.length > 0 && (
        <section className="service-guarantees-section">
          <div className="container">
            <div className="guarantees-header-center">
              <span className="guarantees-tag">🛡️ الموثوقية والأمان</span>
              <h2 className="guarantees-title">
                {guaranteesTitle || 'ضمانات كوبالت المعتمدة'}
              </h2>
              <p className="guarantees-subtitle">
                نلتزم بتقديم أعلى مستويات الجودة الاحترافية مع ضمان كامل لحقوقك ورضاك التام
              </p>
            </div>

            <div className="guarantees-cards-grid">
              {pageGuarantees.map((g, idx) => (
                <div key={idx} className="modern-guarantee-card">
                  <div className="guarantee-card-glow" />
                  <div className="guarantee-icon-wrapper">
                    <span className="guarantee-icon">{g.icon}</span>
                  </div>
                  <div className="guarantee-content-col">
                    <h3 className="guarantee-card-title">{g.title}</h3>
                    <p className="guarantee-card-desc">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
