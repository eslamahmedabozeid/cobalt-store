'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SERVICES_DATA } from '@/data/services';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';
import { ServiceItem } from '@/types';

const CATEGORIES = [
  { id: 'all', name: 'كافة الخدمات', icon: '✨' },
  { id: 'web', name: 'المواقع الإلكترونية', icon: '💻' },
  { id: 'store', name: 'المتاجر الإلكترونية', icon: '🛍️' },
  { id: 'social', name: 'السوشيال ميديا', icon: '📱' },
  { id: 'motion', name: 'موشن جرافيك', icon: '🎬' },
  { id: 'marketing', name: 'التسويق والإعلانات', icon: '📈' }
];

export default function ServicesIndexPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCardClick = (slug: string) => {
    router.push(`/services/${slug}`);
  };

  const handleQuickAdd = (e: React.MouseEvent, service: ServiceItem) => {
    e.stopPropagation();
    addToCart({
      serviceId: service.id,
      serviceTitle: service.title,
      image: service.image,
      selectedOption: service.packageTypes[0]?.name || 'الباقة الأساسية',
      selectedAddons: [],
      unitPriceSAR: service.packageTypes[0]?.priceSAR || service.priceSAR,
      qty: 1,
      notes: 'إضافة سريعة من دليل الخدمات'
    });
  };

  return (
    <div className="services-hub-page">
      {/* Ambient background glows */}
      <div className="ambient-glow glow-top-left" />
      <div className="ambient-glow glow-bottom-right" />

      {/* Hero Header Section */}
      <section className="services-hub-hero">
        <div className="container">
          <nav className="detail-breadcrumb-bar" aria-label="مسار التنقل" style={{ marginBottom: '24px' }}>
            <div className="breadcrumb-items">
              <Link href="/" className="breadcrumb-link home-link">
                <span className="breadcrumb-icon">🏠</span>
                <span>الرئيسية</span>
              </Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">دليل الخدمات الرقمية</span>
            </div>
          </nav>

          <div className="hub-hero-center">
            <span className="section-subtitle-tag">🚀 خدمات رقمية متكاملة 360°</span>
            <h1 className="hub-hero-title">
              حلول برمجية وتسويقية <span className="text-gradient">تصنع الفارق</span> لمشروعك
            </h1>
            <p className="hub-hero-desc">
              اختر الخدمة المناسبة لعلامتك التجارية وانقر على أي بطاقة لتخصيص تفاصيل طلبك بدقة عبر استبيانات ذكية مدعومة بأعلى ضمانات الجودة والتنفيذ السريع.
            </p>

            {/* Quick Metrics Bar */}
            <div className="hub-metrics-bar">
              <div className="hub-metric-box">
                <span className="hub-metric-number">+1,500</span>
                <span className="hub-metric-label">مشروع منجز بنجاح</span>
              </div>
              <div className="hub-metric-box">
                <span className="hub-metric-number">99.4%</span>
                <span className="hub-metric-label">نسبة رضا وتقييم العملاء</span>
              </div>
              <div className="hub-metric-box">
                <span className="hub-metric-number">100%</span>
                <span className="hub-metric-label">ضمان استرجاع وجودة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="services-hub-filters-section">
        <div className="container">
          <div className="hub-controls-wrapper">
            {/* Category Filter Chips */}
            <div className="category-filter-pills">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`cat-pill-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className="cat-pill-icon">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="hub-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="hub-search-input"
                placeholder="ابحث عن خدمة، موقع، إعلانات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-hub-grid-section">
        <div className="container">
          {filteredServices.length === 0 ? (
            <div className="empty-search-box">
              <div className="empty-icon">🔍</div>
              <h3>لا توجد خدمات مطابقة لبحثك</h3>
              <p>جرب البحث بكلمات أخرى أو اختر قسماً مختلفاً من القائمة أعلاه.</p>
              <button
                type="button"
                className="btn-cobalt-primary"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                إعادة ضبط الفلاتر
              </button>
            </div>
          ) : (
            <div className="services-modern-grid">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="service-hub-card"
                  onClick={() => handleCardClick(service.slug)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(service.slug);
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Top Image Box */}
                  <div className="card-top-image">
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: 'block', width: '100%', height: '100%' }}
                    >
                      <img src={service.image} alt={service.title} className="hub-card-img" />
                    </Link>
                    <span className="hub-card-badge">{service.badge}</span>
                    <span className="hub-card-delivery">
                      <span className="speed-icon">⚡</span> {service.delivery}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="card-body-content">
                    <div className="card-rating-row">
                      <div className="card-stars">★★★★★</div>
                      <span className="card-rating-val">{service.rating} ({service.reviewsCount})</span>
                      <span className="card-cat-tag">{service.categoryName}</span>
                    </div>

                    <h2 className="card-service-title">
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="card-service-desc">{service.shortDesc}</p>

                    <div className="card-deliverables-box">
                      <div className="del-box-title">أبرز ما تشمله الخدمة:</div>
                      <ul className="del-box-list">
                        {service.deliverables.slice(0, 3).map((item, idx) => (
                          <li key={idx}>
                            <span className="del-chk">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="card-footer-price-row">
                      <div className="price-stack">
                        <span className="price-start-label">يبدأ من</span>
                        <div className="price-val-highlight">
                          {formatPrice(service.priceSAR)}
                        </div>
                        {service.oldPriceSAR && (
                          <span className="old-price-line">
                            {formatPrice(service.oldPriceSAR)}
                          </span>
                        )}
                      </div>

                      <div className="card-actions-wrapper" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="btn-icon-quick"
                          onClick={(e) => handleQuickAdd(e, service)}
                          title="إضافة سريعة للسلة"
                          aria-label="إضافة سريعة للسلة"
                        >
                          🛒
                        </button>
                        <Link
                          href={`/services/${service.slug}`}
                          className="btn-customize-service"
                        >
                          <span>تفاصيل وطلب</span>
                          <span className="btn-arrow">←</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Guarantees Strip */}
      <section className="services-hub-trust-section">
        <div className="container">
          <div className="hub-trust-banner">
            <div className="trust-banner-col">
              <span className="trust-big-icon">🛡️</span>
              <div>
                <h4>ضمان الجودة والاعتماد 100%</h4>
                <p>تعديلات مجانية متواصلة حتى الوصول للشكل والنسق المطلوب تماماً.</p>
              </div>
            </div>
            <div className="trust-banner-col">
              <span className="trust-big-icon">⚡</span>
              <div>
                <h4>تسليم في الموعد بدقة متناهية</h4>
                <p>التزام صارم بجدول التسليم مع متابعة مرحلية وتقارير إنجاز مستمرة.</p>
              </div>
            </div>
            <div className="trust-banner-col">
              <span className="trust-big-icon">📁</span>
              <div>
                <h4>ملكية كاملة لكافة الملفات المصدرية</h4>
                <p>تسليم الأكواد، التصاميم وقوالب العمل المفتوحة بدون أي حقوق ملكية محجوبة.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
