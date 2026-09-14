'use client';

import React, { useState } from 'react';
import { SERVICES_DATA } from '@/data/services';
import { useCurrency } from '@/context/CurrencyContext';
import { useCart } from '@/context/CartContext';

type SpeedOption = 'normal' | 'express' | 'vip';

export default function PriceCalculator() {
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_DATA[0].id);
  const [speedOption, setSpeedOption] = useState<SpeedOption>('normal');
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
      notes: `حاسبة الأسعار: ${speedName} ${hasMultilingual ? '+ متعدد اللغات' : ''}`,
    });
  };

  return (
    <>
      <div className="section-divider" />
      <section id="calculatorSection" className="section-padding">
        <div className="container">
          <div className="calculator-widget reveal-scale">
            <div className="section-header-center">
              <span className="section-subtitle-tag">🧮 حاسبة ميزانية المشروعات</span>
              <h2 className="section-main-title">احسب تكلفة مشروعك الرقمي فوراً</h2>
              <p className="section-main-desc">
                اختر نوع الخدمة وسرعة التسليم لحساب التكلفة التقديرية بدقة وإضافتها للسلة بنقرة واحدة.
              </p>
            </div>

            <div className="calc-form-grid">
              <div>
                <label className="detail-section-label calc-field-label" htmlFor="calcServiceSelect">
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
                <label className="detail-section-label calc-field-label" htmlFor="calcSpeedSelect">
                  حدد سرعة التنفيذ والتسليم:
                </label>
                <select
                  id="calcSpeedSelect"
                  className="form-control"
                  value={speedOption}
                  onChange={(e) => setSpeedOption(e.target.value as SpeedOption)}
                >
                  <option value="normal">تسليم قياسي مريح (خلال 3 - 5 أيام)</option>
                  <option value="express">تسليم عاجل (+ {formatPrice(150)})</option>
                  <option value="vip">تسليم فوري VIP خلال 24 ساعة (+ {formatPrice(250)})</option>
                </select>
              </div>

              <div>
                <span className="detail-section-label calc-field-label">خيار اللغة الإضافي:</span>
                <label
                  className={`calc-addon-card ${hasMultilingual ? 'active' : ''}`}
                  htmlFor="calcLangCheck"
                >
                  <div className="calc-addon-card-inner">
                    <input
                      type="checkbox"
                      id="calcLangCheck"
                      className="calc-addon-checkbox"
                      checked={hasMultilingual}
                      onChange={(e) => setHasMultilingual(e.target.checked)}
                    />
                    <span className="calc-addon-text">إضافة اللغة الإنجليزية للمشروع</span>
                  </div>
                  <span className="calc-addon-price">+ {formatPrice(200)}</span>
                </label>
              </div>
            </div>

            <div className="calc-result-box">
              <div>
                <div className="calc-result-label">التكلفة التقديرية النهائية:</div>
                <div id="calcResultPrice" className="calc-result-price">
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
      <div className="section-divider" />
    </>
  );
}
