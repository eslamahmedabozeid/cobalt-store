import React from 'react';

export default function ProcessStepsSection() {
  return (
    <>
      <div className="section-divider"></div>
      <section id="processSection" className="section-padding reveal-fade-up">
        <div className="container">
          <div className="section-header-center">
            <span className="section-subtitle-tag">⚙️ آلية الشراء والتسليم</span>
            <h2 className="section-main-title">كيف تعمل منصة كوبالت في 3 خطوات؟</h2>
            <p className="section-main-desc">تجربة شراء مباشرة وفائقة السلاسة لتنفيذ خدماتك الرقمية واستلام ملفاتك بدون تعقيدات.</p>
          </div>

          <div className="process-steps-grid">
            <div className="process-step-card reveal-on-scroll">
              <div className="step-num-badge">01</div>
              <div className="step-icon-wrap">🛍️</div>
              <h3 className="step-card-title">تحديد الخدمة والتخصيص</h3>
              <p className="step-card-desc">اختر الخدمة المطلوبة، حدد الخيارات الإضافية، وارفع ملفات ومعلومات مشروعك مباشرة.</p>
            </div>

            <div className="process-step-card reveal-on-scroll">
              <div className="step-num-badge">02</div>
              <div className="step-icon-wrap">💳</div>
              <h3 className="step-card-title">الدفع الفوري وحجز الفريق</h3>
              <p className="step-card-desc">أتمم الطلب وسدد فوراً عبر السلة الآمنة ليتم حجز فريق العمل المخصص لمشروعك خلال دقائق.</p>
            </div>

            <div className="process-step-card reveal-on-scroll">
              <div className="step-num-badge">03</div>
              <div className="step-icon-wrap">📁</div>
              <h3 className="step-card-title">الاستلام والملكية الكاملة</h3>
              <p className="step-card-desc">استلم ملفات مشروعك المفتوحة (AI, PSD, Figma) بالكامل مع دعم التعديلات المجانية حتى الاعتماد النهائي.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
