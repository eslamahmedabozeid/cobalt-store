'use client';

import React, { useState } from 'react';

const FAQS = [
  {
    id: 1,
    q: 'هل يمكنني طلب خدمة واحدة فقط دون الحاجة لشراء باقة كاملة؟',
    a: 'نعم بالتأكيد! متجرنا يتسم بالمرونة التامة؛ يمكنك طلب أي خدمة منفردة (مثل: تصميم شعار واحد، بروفايل شركة، منشور سوشيال ميديا، أو فيديو موشن) حسب احتياجك المباشر.'
  },
  {
    id: 2,
    q: 'كيف يتم تحديد تكلفة الخدمة التي أريدها؟',
    a: 'يمكنك استخدام حاسبة الأسعار الفورية المتاحة في الموقع، حيث تختار نوع الخدمة وسرعة التسليم المطلوبة لتظهر لك التكلفة النهائية بدقة قبل الدفع.'
  },
  {
    id: 3,
    q: 'ما هي آلية العمل بعد إتمام الطلب والدفع؟',
    a: 'فور إتمام الطلب، يتواصل معك مدير حساب مخصص عبر الواتساب لمراجعة كافة التفاصيل والمتطلبات المرفقة، ليبدأ فريق التنفيذ العمل فوراً وفق الجدول الزمني المحدد.'
  },
  {
    id: 4,
    q: 'ماذا لو أردت تعديل التصميم أو المحتوى بعد استلامه؟',
    a: 'نوفر دعم تعديلات شامل لضمان رضاك التام بنسبة 100%، حيث نتابع معك خطوة بخطوة حتى نصل للنتيجة المعتمدة التي تلائم طموحك.'
  },
  {
    id: 5,
    q: 'هل أحصل على الملفات المفتوحة والمصدرية للخدمة؟',
    a: 'نعم، فور الاعتماد النهائي يتم تسليمك كافة حقوق الملكية الفكرية والملفات المصدرية المفتوحة والجاهزة للطباعة والتعديل المستقبلي بجميع الصيغ (AI, PSD, PDF, Figma, SVG).'
  },
  {
    id: 6,
    q: 'ما هي خيارات سرعة التسليم المتاحة لديكم؟',
    a: 'نوفر خيارات مرنة للتنفيذ تبدأ من التسليم القياسي (خلال 3 إلى 5 أيام)، والتسليم العاجل، وصولاً إلى خيار التسليم الفوري VIP خلال 24 إلى 48 ساعة للطلبات الطارئة.'
  }
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <div className="section-divider"></div>
      <section id="faqSection" className="section-padding">
        <div className="container">
          <div className="section-header-center reveal-fade-up">
            <span className="section-subtitle-tag">❓ الأسئلة الشائعة</span>
            <h2 className="section-main-title">كل ما تحتاج معرفته قبل الشراء</h2>
            <p className="section-main-desc">إجابات شفافة ومباشرة على استفسارات العملاء بخصوص التنفيذ والتسليم.</p>
          </div>

          <div className="faq-container">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggle(faq.id)}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-icon" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer" style={{ display: 'block' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
