'use client';

import React from 'react';

export default function HowItWorksSection() {
  return (
    <>
      <div className="section-divider"></div>
      <section className="section-padding">
        <div className="container">
          <div className="section-header-center reveal-fade-up">
            <span className="section-subtitle-tag">🚀 خطوات بسيطة ومباشرة</span>
            <h2 className="section-main-title">كيف تطلب خدمتك الرقمية عبر المتجر؟</h2>
            <p className="section-main-desc">عملية طلب وإنجاز الخدمة في متجرنا مصممة لتكون أسهل وأسرع تجربة شراء رقمية.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card reveal-on-scroll">
              <div className="step-number">1</div>
              <div className="step-icon">🛒</div>
              <h3 className="step-title">اختر الخدمة والباقة</h3>
              <p className="step-desc">تصفح الكتالوج واختر نوع الخدمة والباقة أو الإضافات المناسبة لمشروعك.</p>
            </div>

            <div className="step-card reveal-on-scroll">
              <div className="step-number">2</div>
              <div className="step-icon">📁</div>
              <h3 className="step-title">أرفق متطلباتك</h3>
              <p className="step-desc">ارفع الشعار، معلومات المحتوى، واكتب ملاحظاتك ورؤيتك عبر شاشة التخصيص.</p>
            </div>

            <div className="step-card reveal-on-scroll">
              <div className="step-number">3</div>
              <div className="step-icon">💳</div>
              <h3 className="step-title">أكمل الدفع الآمن</h3>
              <p className="step-desc">استخدم طريقة الدفع المفضلة لديك (مدى، Apple Pay، فيزا) بأمان تام.</p>
            </div>

            <div className="step-card reveal-on-scroll">
              <div className="step-number">4</div>
              <div className="step-icon">✨</div>
              <h3 className="step-title">استلم عملك الاحترافي</h3>
              <p className="step-desc">يباشر الفريق العمل فوراً ونسلمك النتيجة في الموعد المحدد مع المتابعة.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
