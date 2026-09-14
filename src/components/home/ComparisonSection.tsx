'use client';

import React from 'react';

export default function ComparisonSection() {
  return (
    <>
      <div className="section-divider"></div>
      <section id="comparisonSection" className="section-padding reveal-fade-up">
        <div className="container">
          <div className="section-header-center">
            <span className="section-subtitle-tag">📊 المقارنة المباشرة</span>
            <h2 className="section-main-title">لماذا الشراء المباشر من كوبالت هو الخيار الأفضل؟</h2>
            <p className="section-main-desc">اكتشف كيف توفر كوبالت وقتك ومالك بأسلوب شراء مباشر وموثوق مقارنة بالحلول التقليدية.</p>
          </div>

          <div className="comparison-cards-container">
            {/* Side Card 1: Traditional Agencies */}
            <div className="comparison-card side-card reveal-on-scroll">
              <div className="comp-card-header">
                <div className="comp-card-icon">🏢</div>
                <h3 className="comp-card-title">الوكالات الإعلانية التقليدية</h3>
                <span className="comp-card-sub">الأسلوب القديم والبطيء</span>
              </div>
              <ul className="comp-features-list">
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>زمن التسليم:</strong> أسابيع طويلة من الاجتماعات والمقابلات المعقدة</span>
                </li>
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>التكلفة:</strong> ميزانيات مفتوحة ومصاريف إدارية خفية وعالية</span>
                </li>
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>الملكية الفكرية:</strong> رسوم إضافية وشروط معقدة لاستلام الملفات</span>
                </li>
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>الضمان والجودة:</strong> عقود معقدة وشروط تعديل محدودة للغاية</span>
                </li>
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>التواصل:</strong> متابعة بطيئة عبر البريد والرد خلال أيام</span>
                </li>
              </ul>
            </div>

            {/* CENTER FEATURED CARD: COBALT DIGITAL STORE */}
            <div className="comparison-card featured-card reveal-on-scroll">
              <div className="featured-glow-badge">✨ الخيار الأكثر نمواً وموثوقية</div>
              <div className="comp-card-header">
                <div className="comp-card-icon featured-icon">⚡</div>
                <h3 className="comp-card-title featured-title">متجر كوبالت للخدمات الرقمية</h3>
                <span className="comp-card-sub featured-sub">شراء مباشر • تسليم فوري • ملكية كاملة</span>
              </div>
              <ul className="comp-features-list">
                <li className="comp-item positive">
                  <span className="item-icon">✔</span>
                  <span><strong>تسليم فوري قياسي:</strong> تنفيذ وتسليم خلال 24 - 48 ساعة فقط</span>
                </li>
                <li className="comp-item positive">
                  <span className="item-icon">✔</span>
                  <span><strong>أسعار مقطوعة وشفافة:</strong> محددة بالسلة بدون أي مصاريف خفية</span>
                </li>
                <li className="comp-item positive">
                  <span className="item-icon">✔</span>
                  <span><strong>ملكية كاملة للملفات:</strong> تسليم الملفات المفتوحة 100% (AI, PSD, Figma)</span>
                </li>
                <li className="comp-item positive">
                  <span className="item-icon">✔</span>
                  <span><strong>ضمان مؤسسي شامل:</strong> تعديلات مجانية متواصلة حتى الرضا التام</span>
                </li>
                <li className="comp-item positive">
                  <span className="item-icon">✔</span>
                  <span><strong>دعم ومتابعة مباشرة:</strong> مدير حساب واستشاري مخصص عبر الواتساب 24/7</span>
                </li>
              </ul>
              <div style={{ marginTop: '28px', textAlign: 'center' }}>
                <a href="#catalogSection" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  🛍️ ابدأ طلبك المباشر مع كوبالت الآن
                </a>
              </div>
            </div>

            {/* Side Card 2: Traditional Hiring */}
            <div className="comparison-card side-card reveal-on-scroll">
              <div className="comp-card-header">
                <div className="comp-card-icon">👤</div>
                <h3 className="comp-card-title">التوظيف والمنصات الفردية</h3>
                <span className="comp-card-sub">مخاطرة الفرد الواحد</span>
              </div>
              <ul className="comp-features-list">
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>زمن التسليم:</strong> مخاطرة تأخير ومواعيد غير مضمونة للتسليم</span>
                </li>
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>التكلفة:</strong> تكاليف متغيرة وحساب بالساعات أو المشروع</span>
                </li>
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>الملكية الفكرية:</strong> تفاوت كبير في الالتزام بتسليم الملفات المفتوحة</span>
                </li>
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>الضمان والجودة:</strong> تباين المستوى وانعدام الضمان بعد التسليم</span>
                </li>
                <li className="comp-item negative">
                  <span className="item-icon">✕</span>
                  <span><strong>التواصل:</strong> ضعف المتابعة أو احتمال الانقطاع المفاجئ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
