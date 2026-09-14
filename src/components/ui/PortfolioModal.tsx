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
    <div id="portfolioModal" className="modal-overlay active" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '840px' }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button onClick={onClose} className="modal-close-btn" type="button">
          ✕
        </button>

        <div className="modal-body" style={{ padding: '35px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
            <div>
              <img
                id="portModalImg"
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '340px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--border-active)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              />
            </div>

            <div>
              <span id="portModalTag" className="section-subtitle-tag">
                ✨ {item.categoryName}
              </span>
              <h3 id="portModalTitle" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', margin: '10px 0' }}>
                {item.title}
              </h3>

              <div
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  background: 'rgba(14, 31, 71, 0.6)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  🏢 <strong>جهة المشروع / العميل:</strong> <span style={{ color: '#FFF' }}>{item.client}</span>
                </div>
                <div>
                  ⏱️ <strong>مدة التنفيذ:</strong> <span style={{ color: 'var(--cyan-accent)', fontWeight: 800 }}>{item.duration}</span>
                </div>
              </div>

              <p id="portModalDesc" style={{ fontSize: '0.92rem', color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '24px' }}>
                {item.desc}
              </p>

              <Link
                id="portModalActionBtn"
                href={item.serviceUrl}
                onClick={onClose}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}
              >
                🛒 اطلب نفس الباقة لهذا المشروع
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
