'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/data/services';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';

type CategoryFilter = 'all' | 'social' | 'web' | 'store' | 'motion' | 'marketing';
type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

export default function ServicesCatalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  let filtered = activeCategory === 'all'
    ? [...SERVICES_DATA]
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  if (sortOption === 'price-low') filtered.sort((a, b) => a.priceSAR - b.priceSAR);
  else if (sortOption === 'price-high') filtered.sort((a, b) => b.priceSAR - a.priceSAR);
  else if (sortOption === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  const categories = [
    { id: 'all', label: 'الكل (5)' },
    { id: 'social', label: 'السوشيال ميديا' },
    { id: 'web', label: 'تصميم موقع إلكتروني' },
    { id: 'store', label: 'المتجر الإلكتروني' },
    { id: 'motion', label: 'موشن جرافيك / فيديو' },
    { id: 'marketing', label: 'التسويق والإعلانات' }
  ];

  const handleQuickAdd = (service: typeof SERVICES_DATA[0]) => {
    const defaultPackage = service.packageTypes[0]?.name || 'الباقة الأساسية';
    const defaultPrice = service.packageTypes[0]?.priceSAR || service.priceSAR;

    addToCart({
      serviceId: service.id,
      serviceTitle: service.title,
      image: service.image,
      selectedOption: defaultPackage,
      unitPriceSAR: defaultPrice,
      qty: 1
    });
  };

  return (
    <section id="catalogSection" className="section-padding">
      <div className="container">
        {/* Catalog Header with Sort */}
        <div className="catalog-header">
          <h2 className="section-title">كتالوج الخدمات الرقمية والتسويقية ({filtered.length})</h2>

          <div className="catalog-sort">
            <span className="catalog-sort-label">⚡ ترتيب حسب:</span>
            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
            >
              <option value="popular">🔥 الأكثر طلباً وشعبية</option>
              <option value="price-low">💰 السعر: من الأقل للأعلى</option>
              <option value="price-high">💎 السعر: من الأعلى للأقل</option>
              <option value="rating">⭐ الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {/* Centered Luxury Segmented Control Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 35px 0' }}>
          <div className="catalog-category-bar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                type="button"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid matching original style exactly */}
        <div className="services-grid" id="servicesGrid">
          {filtered.map((service) => {
            const formattedPrice = formatPrice(service.priceSAR);
            const formattedOldPrice = service.oldPriceSAR ? formatPrice(service.oldPriceSAR) : null;

            return (
              <div key={service.id} className="service-card">
                <div className="service-thumb">
                  <Link href={`/services/${service.slug}`}>
                    <img src={service.image} alt={service.title} loading="lazy" />
                  </Link>
                  <span className="service-card-badge">{service.badge}</span>
                  <span className="delivery-badge">{service.delivery}</span>
                </div>

                <div className="service-content">
                  <div className="service-category">{service.categoryName}</div>
                  <h3 className="service-title">
                    <Link href={`/services/${service.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {service.title}
                    </Link>
                  </h3>

                  <div className="service-rating">
                    ★ {service.rating} <span className="rating-count">({service.reviewsCount} تقييم)</span>
                  </div>

                  <div className="visual-chip-group">
                    <span className="visual-chip">⚡ تسليم سريع</span>
                    <span className="visual-chip">🛡️ ضمان رضا 100%</span>
                  </div>

                  <ul className="service-deliverables">
                    {service.deliverables.map((del, idx) => (
                      <li key={idx}>{del}</li>
                    ))}
                  </ul>

                  <div className="service-footer">
                    <div className="price-box">
                      <span className="price-label">تبدأ من</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span className="price-amount">{formattedPrice}</span>
                        {formattedOldPrice && <span className="old-price">{formattedOldPrice}</span>}
                      </div>
                    </div>

                    <div className="service-actions">
                      <button
                        className="btn-icon-quick"
                        onClick={() => handleQuickAdd(service)}
                        title="إضافة سريعة للسلة"
                        type="button"
                      >
                        🛒
                      </button>
                      <Link className="btn-add-cart" href={`/services/${service.slug}`}>
                        👁️ تفاصيل وحجز
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
