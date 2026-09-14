'use client';

import React from 'react';

export default function FeatureBadges() {
  return (
    <>
      {/* Quick Features Banner Under Hero */}
      <section className="features-quick-banner-section reveal-scale">
        <div className="container">
          <div className="quick-features-banner">
            <div className="quick-feature-item">
              <div className="quick-feature-icon-wrap">
                <span>🎯</span>
              </div>
              <div className="quick-feature-content">
                <h4 className="quick-feature-title">طلب مرن</h4>
                <p className="quick-feature-desc">اختر الخدمة التي تحتاجها تحديداً وخصصها بضغطة زر</p>
              </div>
            </div>

            <div className="quick-feature-divider"></div>

            <div className="quick-feature-item">
              <div className="quick-feature-icon-wrap">
                <span>⚡</span>
              </div>
              <div className="quick-feature-content">
                <h4 className="quick-feature-title">تسليم سريع</h4>
                <p className="quick-feature-desc">مواعيد تنفيذ دقيقة مع خيار التسليم العاجل</p>
              </div>
            </div>

            <div className="quick-feature-divider"></div>

            <div className="quick-feature-item">
              <div className="quick-feature-icon-wrap">
                <span>🛡️</span>
              </div>
              <div className="quick-feature-content">
                <h4 className="quick-feature-title">ملكية كاملة</h4>
                <p className="quick-feature-desc">استلام كافة الملفات المفتوحة والمصدرية فور الاعتماد</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <div className="container reveal-scale" style={{ marginBottom: '40px' }}>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '24px 35px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            textAlign: 'center'
          }}
        >
          <div>
            <div className="hero-stat-value" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan-accent)' }}>
              +500
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              شركة ومؤسسة تم تجهيزها
            </div>
          </div>
          <div>
            <div className="hero-stat-value" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold-accent)' }}>
              4.9
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              تقييم حقيقي من المشترين (★)
            </div>
          </div>
          <div>
            <div className="hero-stat-value" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--emerald-accent)' }}>
              100%
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              التزام بمواعيد التسليم
            </div>
          </div>
          <div>
            <div className="hero-stat-value" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cyan-accent)' }}>
              24/7
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              دعم استشاري عبر الواتساب
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header-center reveal-fade-up">
            <span className="section-subtitle-tag">💎 الجودة والموثوقية العالية</span>
            <h2 className="section-main-title">لماذا يختار أصحاب الشركات متجر كوبالت؟</h2>
            <p className="section-main-desc">
              نحن ندمج بين سرعة الشراء المباشر أونلاين وجودة العمل المصمم خصيصاً لهوية مشروعك بدون تعقيدات.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card reveal-on-scroll">
              <div className="feature-icon-wrapper">🛡️</div>
              <h3 className="feature-title">ضمان رضا 100%</h3>
              <p className="feature-desc">تعديلات مفتوحة ومتابعة دقيقة حتى نصل للنتيجة التي تبهرك وتناسب طموحاتك.</p>
            </div>

            <div className="feature-card reveal-on-scroll">
              <div className="feature-icon-wrapper">⚡</div>
              <h3 className="feature-title">تسليم عاجل ودقيق</h3>
              <p className="feature-desc">جدول زمني واضح للتسليم مع خيار التسليم الفوري السريع خلال 24 إلى 48 ساعة.</p>
            </div>

            <div className="feature-card reveal-on-scroll">
              <div className="feature-icon-wrapper">📁</div>
              <h3 className="feature-title">ملفات المصدر بالكامل</h3>
              <p className="feature-desc">تسليم جميع الملفات الجاهزة للطباعة والتعديل المستقبلي بجميع الصيغ (AI, PSD, PDF, SVG).</p>
            </div>

            <div className="feature-card reveal-on-scroll">
              <div className="feature-icon-wrapper">💬</div>
              <h3 className="feature-title">مدير حساب مخصص</h3>
              <p className="feature-desc">تواصل مباشر وسهل عبر الواتساب فور إتمام الطلب لمراجعة كافة المرفقات والملاحظات.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-divider"></div>
    </>
  );
}
