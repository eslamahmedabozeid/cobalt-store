'use client';

import React from 'react';
import Link from 'next/link';
import { PortfolioItem } from '@/types';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  if (!item) return null;

  return (
    <div className="portfolio-modal-overlay show active" onClick={onClose}>
      <div
        className="portfolio-modal-box"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="portfolio-modal-close"
          type="button"
          aria-label="إغلاق النافذة"
        >
          ✕
        </button>

        <div className="portfolio-modal-grid">
          <div className="portfolio-modal-media">
            <img
              src={item.image}
              alt={item.title}
              className="portfolio-modal-img"
            />
          </div>

          <div className="portfolio-modal-content">
            <div className="portfolio-modal-tag-badge">
              <span>✨ {item.categoryName}</span>
            </div>

            <h3 className="portfolio-modal-title">{item.title}</h3>

            <div className="portfolio-modal-meta-box">
              <div className="meta-row-item">
                <span className="meta-icon">🏢</span>
                <span className="meta-label">جهة المشروع / العميل:</span>
                <strong className="meta-val">{item.client}</strong>
              </div>
              <div className="meta-row-item">
                <span className="meta-icon">⏱️</span>
                <span className="meta-label">مدة التنفيذ:</span>
                <strong className="meta-val highlight">{item.duration}</strong>
              </div>
            </div>

            <p className="portfolio-modal-desc">{item.desc}</p>

            {item.features && item.features.length > 0 && (
              <ul className="portfolio-modal-features">
                {item.features.map((feature) => (
                  <li key={feature} className="portfolio-modal-feature-item">
                    <span className="del-check-icon">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="portfolio-modal-actions">
              <Link
                href={item.serviceUrl}
                onClick={onClose}
                className="btn-order-primary"
              >
                <span className="btn-icon">🛒</span>
                <span className="btn-text">اطلب نفس الباقة لهذا المشروع</span>
                <span className="btn-arrow">←</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
