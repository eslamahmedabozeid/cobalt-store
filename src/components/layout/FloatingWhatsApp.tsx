'use client';

import React from 'react';

export default function FloatingWhatsApp() {
  const whatsappUrl = 'https://wa.me/966500000000?text=' + encodeURIComponent('مرحباً كوبالت، أود الاستفسار عن باقات وخدمات المتجر الرقمي.');

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      title="تواصل معنا عبر واتساب"
      aria-label="تواصل فوري عبر الواتساب"
    >
      <span className="whatsapp-icon">💬</span>
      <span className="whatsapp-tooltip">تحدث معنا مباشرة</span>
    </a>
  );
}
