'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';

export default function InquiriesSection() {
  const { showToast } = useToast();

  return (
    <>
      <div className="section-divider"></div>

      {/* Ultra-Sleek Luxury CTA Banner */}
      <section className="section-padding reveal-fade-up">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-badge">✨ عرض حصري لعملاء اليوم</div>
            <h2 className="cta-banner-title">جاهز لنقل حضورك الرقمي وتسويق مشروعك للقمة؟</h2>
            <p className="cta-banner-desc">
              اختر خدمتك الرقمية أو التسويقية المنفردة الآن، واستفد من خصم 20% فوري باستخدام كود:{' '}
              <strong style={{ color: 'var(--gold-accent)' }}>COBALT20</strong>
            </p>
            <div className="cta-buttons-group">
              <Link href="/#catalogSection" className="btn-cta-primary">
                🛍️ اطلب خدمتك الآن
              </Link>
              <a
                href="https://wa.me/966500000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%83%D9%88%D8%A8%D8%A7%D9%84%D8%AA%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%81%D9%88%D8%B1%D9%8A%D8%A9."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-whatsapp"
              >
                💬 استشارة فورية عبر الواتساب
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
