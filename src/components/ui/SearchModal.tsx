'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/data/services';
import { useCurrency } from '@/context/CurrencyContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  const filteredServices = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return SERVICES_DATA.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.categoryName.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.deliverables.some((d) => d.toLowerCase().includes(q))
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay show" onClick={onClose}>
      <div
        className="search-modal-box"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ color: '#FFF', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔍</span> ابحث في متجر خدمات كوبالت
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1.4rem',
              cursor: 'pointer'
            }}
            type="button"
          >
            ✕
          </button>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-modal-input"
          placeholder="اكتب اسم الخدمة (سوشيال ميديا، موقع، متجر، موشن، تسويق)..."
        />

        {/* Quick search suggestion tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>مقترحات سريعة:</span>
          {['تصميم موقع', 'متجر إلكتروني', 'سوشيال ميديا', 'موشن جرافيك', 'تسويق وإعلانات'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchTerm(tag)}
              style={{
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '20px',
                color: 'var(--cyan-accent)',
                fontSize: '0.78rem',
                padding: '4px 10px',
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="search-results-popup" style={{ position: 'relative', top: '14px', maxHeight: '320px', overflowY: 'auto' }}>
          {searchTerm.trim() && filteredServices.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              لا توجد خدمات مطابقة لبحثك &quot;{searchTerm}&quot;
            </div>
          ) : (
            filteredServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                onClick={onClose}
                className="search-result-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  marginBottom: '8px',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none'
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#FFF', fontWeight: 700, fontSize: '0.95rem' }}>
                    {service.title}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2px' }}>
                    {service.badge}
                  </div>
                </div>
                <div style={{ color: 'var(--cyan-accent)', fontWeight: 800, fontSize: '0.95rem' }}>
                  {formatPrice(service.priceSAR)}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
