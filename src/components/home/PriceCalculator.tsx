'use client';

import React, { useState } from 'react';
import { SERVICES_DATA } from '@/data/services';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';

export default function PriceCalculator() {
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_DATA[0].id);
  const [speedOption, setSpeedOption] = useState<'normal' | 'express' | 'vip'>('normal');
  const [hasMultilingual, setHasMultilingual] = useState(false);

  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  let totalSAR = currentService.priceSAR;
  if (speedOption === 'express') totalSAR += 150;
  else if (speedOption === 'vip') totalSAR += 250;
  if (hasMultilingual) totalSAR += 200;

  const handleOrderCalculated = () => {
    const speedName =
      speedOption === 'express'
        ? 'تسليم عاجل (+150 ر.س)'
        : speedOption === 'vip'
        ? 'تسليم فوري VIP (+250 ر.س)'
        : 'تسليم قياسي';

    const addons: string[] = [];
    if (speedOption !== 'normal') addons.push(speedName);
    if (hasMultilingual) addons.push('دعم متعدد اللغات (+200 ر.س)');

    addToCart({
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      image: currentService.image,
      selectedOption: 'طلب مخصص من حاسبة الأسعار',
      selectedAddons: addons,
      unitPriceSAR: totalSAR,
      qty: 1,
      notes: `حاسبة الأسعار: ${speedName} ${hasMultilingual ? '+ متعدد اللغات' : ''}`
    });
  };

  return (
    <>
      <div className="section-divider"></div>
      <section id="calculatorSection" className="section-padding">
        <div className="container">
          <div className="calculator-widget reveal-scale">
            <div className="section-header-center" style={{ marginBottom: '25px' }}>
              <span className="section-subtitle-tag">🧮 حاسبة ميزانية المشروعات</span>
              <h2 className="section-main-title">احسب تكلفة مشروعك الرقمي فوراً</h2>
              <p className="section-main-desc">
                اختر نوع الخدمة وسرعة التسليم لحساب التكلفة التقديرية بدقة وإضافتها للسلة بنقرة واحدة.
              </p>
            </div>

            <div className="calc-form-grid">
              <div>
                <label
                  className="detail-section-label"
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    fontWeight: 700,
                    marginBottom: '8px',
                    display: 'block'
                  }}
                >
                  اختر نوع الخدمة المطلوب:
                </label>
                <select
                  id="calcServiceSelect"
                  className="form-control"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.categoryName} ({formatPrice(s.priceSAR)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="detail-section-label"
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    fontWeight: 700,
                    marginBottom: '8px',
                    display: 'block'
                  }}
                >
                  حدد سرعة التنفيذ والتسليم:
                </label>
                <select
                  id="calcSpeedSelect"
                  className="form-control"
                  value={speedOption}
                  onChange={(e) => setSpeedOption(e.target.value as any)}
                >
                  <option value="normal">تسليم قياسي مريح (خلال 3 - 5 أيام)</option>
                  <option value="express">تسليم عاجل (+ {formatPrice(150)})</option>
                  <option value="vip">تسليم فوري VIP خلال 24 ساعة (+ {formatPrice(250)})</option>
                </select>
              </div>

              <div>
                <label
                  className="detail-section-label"
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    fontWeight: 700,
                    marginBottom: '8px',
                    display: 'block'
                  }}
                >
                  خيار اللغة الإضافي:
                </label>
                <label className="addon-checkbox" style={{ height: '48px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="calcLangCheck"
                      checked={hasMultilingual}
                      onChange={(e) => setHasMultilingual(e.target.checked)}
                    />
                    <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                      إضافة اللغة الإنجليزية للملف/الموقع
                    </span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--cyan-accent)', fontWeight: 800 }}>
                    + {formatPrice(200)}
                  </span>
                </label>
              </div>
            </div>

            <div className="calc-result-box">
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>التكلفة التقديرية النهائية:</div>
                <div id="calcResultPrice" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan-accent)' }}>
                  {formatPrice(totalSAR)}
                </div>
              </div>
              <button className="btn-primary" onClick={handleOrderCalculated} type="button">
                🛍️ اطلب وتخصص هذه الخدمة الآن
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="section-divider"></div>
    </>
  );
}
