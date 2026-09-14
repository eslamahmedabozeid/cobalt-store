import React from 'react';

export default function GuaranteesSection() {
  return (
    <>
      <div className="section-divider"></div>
      <section id="guaranteesSection" className="section-padding reveal-fade-up">
        <div className="container">
          <div className="section-header-center">
            <span className="section-subtitle-tag">🛡️ ضمانات الموثوقية</span>
            <h2 className="section-main-title">ضمانات كوبالت لخدمات الشركات والأعمال</h2>
            <p className="section-main-desc">نحن لا نقدم مجرد خدمات بصرية، بل نضمن لك أقصى درجات الحماية والالتزام والاحترافية.</p>
          </div>

          <div className="guarantees-cards-grid">
            <div className="guarantee-card reveal-on-scroll">
              <div className="guarantee-icon">📁</div>
              <h3 className="guarantee-title">ملكية كاملة 100% للملفات</h3>
              <p className="guarantee-desc">تنتقل كافة حقوق الملكية الفكرية والملفات المصدرية المفتوحة (AI, PSD, Figma) إليك مباشرة فور الاعتماد.</p>
            </div>

            <div className="guarantee-card reveal-on-scroll">
              <div className="guarantee-icon">⏱️</div>
              <h3 className="guarantee-title">الالتزام التام بجدول التسليم</h3>
              <p className="guarantee-desc">نلتزم بالموعد الزمني المحدد للتسليم بدقة متناهية، وفي حال التأخير نتحمل كامل المسئولية الاستردادية.</p>
            </div>

            <div className="guarantee-card reveal-on-scroll">
              <div className="guarantee-icon">🔄</div>
              <h3 className="guarantee-title">تعديلات شاملة حتى الرضا التام</h3>
              <p className="guarantee-desc">نضمن لك تطبيق كافة التعديلات والتوجيهات على تصاميمك حتى نصل للنتيجة المطابقة لتطلعاتك تماماً.</p>
            </div>

            <div className="guarantee-card reveal-on-scroll">
              <div className="guarantee-icon">💬</div>
              <h3 className="guarantee-title">مدير حساب ومستشار مخصص</h3>
              <p className="guarantee-desc">يتم تعيين مدير حساب واستشاري متابع لمشروعك عبر الواتساب والمكالمات لضمان التواصل المستمر.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
