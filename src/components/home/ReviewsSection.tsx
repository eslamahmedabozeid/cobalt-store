import React from 'react';

const REVIEWS = [
  {
    id: 1,
    author: 'سارة الشمري',
    company: 'شركة أفق للتطوير - الرياض',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stars: '★★★★★',
    text: 'تجربة اقتياد الخدمة وتحديد المرفقات والملاحظات ممتازة جداً وواضحة! استلمت بروفايل الشركة قبل موعده بدقة عالية وبملفات طباعة جاهزة.',
    purchased: 'بروفايل الشركة الفاخر'
  },
  {
    id: 2,
    author: 'م. خالد الغامدي',
    company: 'متجر سدير ستايل - جدة',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stars: '★★★★★',
    text: 'الموقع فائق السلاسة والتصميم والأسعار في المتجر واضحة جداً. طلبت تصميم الهوية والموقع والنتيجة كانت خيالية وتجاوزت توقعاتي.',
    purchased: 'الهوية البصرية والموقع'
  },
  {
    id: 3,
    author: 'د. ريم منصور',
    company: 'عيادات ريم - دبي',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    stars: '★★★★★',
    text: 'تصاميم السوشيال ميديا وفيديوهات الموشن جرافيك التي نفذوها لحساباتنا زادت التفاعل والمبيعات لدينا بصورة ملحوظة جداً!',
    purchased: 'الموشن جرافيك والسوشيال'
  }
];

export default function ReviewsSection() {
  return (
    <section id="reviewsSection" className="section-padding">
      <div className="container">
        <div className="section-header-center reveal-fade-up">
          <span className="section-subtitle-tag">💬 آراء وتقييمات العملاء</span>
          <h2 className="section-main-title">ماذا يقول عملاؤنا عن تجربة الشراء؟</h2>
          <p className="section-main-desc">تقييمات حقيقية من أصحاب شركات ومتاجر أتموا طلباتهم عبر متجر كوبالت.</p>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="review-card reveal-on-scroll">
              <div className="quote-mark">“</div>
              <div className="review-header">
                <img src={rev.avatar} className="review-avatar" alt={rev.author} />
                <div className="review-user-info">
                  <h4 className="review-author">{rev.author}</h4>
                  <span className="review-company">{rev.company}</span>
                  <span className="verified-badge">✔ مشتري موثق</span>
                </div>
              </div>

              <div className="review-stars">{rev.stars}</div>

              <p className="review-text">&ldquo;{rev.text}&rdquo;</p>

              <div className="review-purchased-tag">
                📦 الخدمة المشترات: <strong>{rev.purchased}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
