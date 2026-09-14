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
    <div id="portfolioModal" className="portfolio-modal-overlay show active" onClick={onClose}>
      <div
        className="portfolio-modal-box"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Close Button Top Left */}
        <button
          onClick={onClose}
          className="portfolio-modal-close"
          type="button"
          aria-label="إغلاق النافذة"
        >
          ✕
        </button>

        <div className="portfolio-modal-grid">
          {/* Media image container on top on mobile, left on desktop */}
          <div className="portfolio-modal-media">
            <img
              id="portModalImg"
              src={item.image}
              alt={item.title}
              className="portfolio-modal-img"
            />
          </div>

          {/* Project Details Content */}
          <div className="portfolio-modal-content">
            <div className="portfolio-modal-tag-badge">
              <span>✨ {item.categoryName}</span>
            </div>

            <h3 id="portModalTitle" className="portfolio-modal-title">
              {item.title}
            </h3>

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

            <p id="portModalDesc" className="portfolio-modal-desc">
              {item.desc}
            </p>

            <div className="portfolio-modal-actions">
              <Link
                id="portModalActionBtn"
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
