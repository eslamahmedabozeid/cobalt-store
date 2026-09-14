import type { Metadata } from 'next';
import Link from 'next/link';
import ServicesHubCatalog from '@/components/services/ServicesHubCatalog';

export const metadata: Metadata = {
  title: 'دليل الخدمات الرقمية | كوبالت',
  description:
    'اختر الخدمة المناسبة لعلامتك التجارية: السوشيال ميديا، المواقع، المتاجر، الموشن جرافيك، والتسويق والإعلانات.',
};

export default function ServicesIndexPage() {
  return (
    <div className="services-hub-page">
      <div className="ambient-glow glow-top-left" />
      <div className="ambient-glow glow-bottom-right" />

      <section className="services-hub-hero">
        <div className="container">
          <nav className="detail-breadcrumb-bar" aria-label="مسار التنقل">
            <div className="breadcrumb-items">
              <Link href="/" className="breadcrumb-link home-link">
                <span className="breadcrumb-icon">🏠</span>
                <span>الرئيسية</span>
              </Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">دليل الخدمات الرقمية</span>
            </div>
          </nav>

          <div className="hub-hero-center">
            <span className="section-subtitle-tag">🚀 خدمات رقمية متكاملة 360°</span>
            <h1 className="hub-hero-title">
              حلول برمجية وتسويقية <span className="text-gradient">تصنع الفارق</span> لمشروعك
            </h1>
            <p className="hub-hero-desc">
              اختر الخدمة المناسبة لعلامتك التجارية وانقر على أي بطاقة لتخصيص تفاصيل طلبك بدقة عبر استبيانات ذكية مدعومة بأعلى ضمانات الجودة والتنفيذ السريع.
            </p>

            <div className="hub-metrics-bar">
              <div className="hub-metric-box">
                <span className="hub-metric-number">+1,500</span>
                <span className="hub-metric-label">مشروع منجز بنجاح</span>
              </div>
              <div className="hub-metric-box">
                <span className="hub-metric-number">99.4%</span>
                <span className="hub-metric-label">نسبة رضا وتقييم العملاء</span>
              </div>
              <div className="hub-metric-box">
                <span className="hub-metric-number">100%</span>
                <span className="hub-metric-label">ضمان استرجاع وجودة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesHubCatalog />

      <section className="services-hub-trust-section">
        <div className="container">
          <div className="hub-trust-banner">
            <div className="trust-banner-col">
              <span className="trust-big-icon">🛡️</span>
              <div>
                <h4>ضمان الجودة والاعتماد 100%</h4>
                <p>تعديلات مجانية متواصلة حتى الوصول للشكل والنسق المطلوب تماماً.</p>
              </div>
            </div>
            <div className="trust-banner-col">
              <span className="trust-big-icon">⚡</span>
              <div>
                <h4>تسليم في الموعد بدقة متناهية</h4>
                <p>التزام صارم بجدول التسليم مع متابعة مرحلية وتقارير إنجاز مستمرة.</p>
              </div>
            </div>
            <div className="trust-banner-col">
              <span className="trust-big-icon">📁</span>
              <div>
                <h4>ملكية كاملة لكافة الملفات المصدرية</h4>
                <p>تسليم الأكواد، التصاميم وقوالب العمل المفتوحة بدون أي حقوق ملكية محجوبة.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
