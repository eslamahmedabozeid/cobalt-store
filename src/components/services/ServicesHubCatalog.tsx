'use client';

import React, { useMemo, useState } from 'react';
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
  { id: 'marketing', name: 'التسويق والإعلانات', icon: '📈' },
];

export default function ServicesHubCatalog() {
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
      notes: 'إضافة سريعة من دليل الخدمات',
    });
  };

  return (
    <>
      <section className="services-hub-filters-section">
        <div className="container">
          <div className="hub-controls-wrapper">
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
                >
                  <div className="card-top-image">
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hub-card-img-link"
                    >
                      <img src={service.image} alt={service.title} className="hub-card-img" />
                    </Link>
                    <span className="hub-card-badge">{service.badge}</span>
                    <span className="hub-card-delivery">
                      <span className="speed-icon">⚡</span> {service.delivery}
                    </span>
                  </div>

                  <div className="card-body-content">
                    <div className="card-rating-row">
                      <div className="card-stars">★★★★★</div>
                      <span className="card-rating-val">
                        {service.rating} ({service.reviewsCount})
                      </span>
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
    </>
  );
}
