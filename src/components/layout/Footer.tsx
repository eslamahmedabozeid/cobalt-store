import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" id="footerSection">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col footer-brand-col">
            <Link href="/" className="footer-logo">
              <img
                src="/assets/logo-cobalt-Be-YWUxa.png"
                alt="كوبالت للخدمات الرقمية"
                className="brand-logo-img"
                style={{ height: '44px', width: 'auto', marginBottom: '14px' }}
              />
            </Link>
            <p className="footer-desc">
              كوبالت هو متجرك الرقمي المتكامل لتصميم وتطوير المواقع والمتاجر الإلكترونية، إدارة حملات السوشيال ميديا والتسويق الرقمي، وصناعة فيديوهات الموشن جرافيك بأعلى معايير الجودة والاحترافية.
            </p>
            <div className="footer-social-links" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="واتساب">
                💬
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="انستقرام">
                📸
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="منصة إكس">
                ✖️
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="تيك توك">
                🎵
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">روابط سريعة</h4>
            <ul className="footer-links">
              <li><Link href="/">الرئيسية</Link></li>
              <li><Link href="/#catalogSection">جميع الخدمات</Link></li>
              <li><Link href="/#calculatorSection">حاسبة التكلفة المباشرة</Link></li>
              <li><Link href="/#bundlesSection">الباقات الترويجية</Link></li>
              <li><Link href="/#portfolioSection">معرض الأعمال</Link></li>
              <li><Link href="/#faqSection">الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="footer-col">
            <h4 className="footer-heading">خدماتنا المتميزة</h4>
            <ul className="footer-links">
              <li><Link href="/services/website-design">تصميم وتطوير المواقع</Link></li>
              <li><Link href="/services/ecommerce-store">تجهيز المتاجر الإلكترونية</Link></li>
              <li><Link href="/services/social-media-posts">إدارة تصاميم السوشيال ميديا</Link></li>
              <li><Link href="/services/motion-graphics">إنتاج الموشن جرافيك والمونتاج</Link></li>
              <li><Link href="/services/digital-marketing">التسويق والإعلانات الممولة</Link></li>
            </ul>
          </div>

          {/* Support & Payments */}
          <div className="footer-col">
            <h4 className="footer-heading">خدمة العملاء والدفع</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '14px' }}>
              فريق خدمة العملاء متواجد على مدار الساعة للرد على استفساراتكم ومتابعة طلباتكم بكل شغف.
            </p>
            <div className="payment-badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span className="payment-badge-tag">مدى Mada</span>
              <span className="payment-badge-tag">Apple Pay</span>
              <span className="payment-badge-tag">Visa / Master</span>
              <span className="payment-badge-tag">تابي Tabby</span>
              <span className="payment-badge-tag">تمارا Tamara</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} كوبالت للخدمات الرقمية (Cobalt). جميع الحقوق محفوظة.</p>
          <div className="footer-bottom-links">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>صُنعت بأعلى معايير الجودة والسرعة ⚡</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
