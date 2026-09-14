'use client';

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import { PortfolioItem } from '@/types';
import PortfolioModal from '@/components/ui/PortfolioModal';

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'store' | 'social' | 'motion' | 'marketing'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeFilter === 'all'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((p) => p.tag === activeFilter);

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'web', label: 'تصميم موقع إلكتروني' },
    { id: 'store', label: 'المتجر الإلكتروني' },
    { id: 'social', label: 'السوشيال ميديا' },
    { id: 'motion', label: 'موشن جرافيك' },
    { id: 'marketing', label: 'التسويق والإعلانات' }
  ];

  return (
    <>
      <div className="section-divider"></div>
      <section id="portfolioSection" className="section-padding">
        <div className="container">
          <div className="section-header-center reveal-fade-up">
            <span className="section-subtitle-tag">🖼️ معرض النماذج والأعمال</span>
            <h2 className="section-main-title">نماذج رقمية نفخر بإنجازها</h2>
            <p className="section-main-desc">انقر على أي نموذج لمشاهدة تفاصيل المشروع الكاملة ونوع الباقة المنفذة.</p>
          </div>

          <div className="portfolio-filters reveal-fade-up">
            {filters.map((f) => (
              <button
                key={f.id}
                className={`portfolio-filter-btn ${activeFilter === f.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.id as any)}
                type="button"
              >
                {f.label}
              </button>
            ))}
          </div>

          <div id="portfolioGridContainer" className="portfolio-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-item"
                onClick={() => setSelectedItem(item)}
                style={{ cursor: 'pointer' }}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="portfolio-overlay">
                  <div className="portfolio-title">{item.title}</div>
                  <div className="portfolio-tag">
                    🔍 انقر لاستعراض التفاصيل الكاملة للمشروع
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedItem && (
            <PortfolioModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </div>
      </section>
    </>
  );
}
