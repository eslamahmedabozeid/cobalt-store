'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useToast } from '@/context/ToastContext';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    subtotalSAR,
    discountSAR,
    grandTotalSAR,
    cartState,
    clearCart
  } = useCart();

  const { formatPrice, currentCurrency } = useCurrency();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    notes: '',
    paymentMethod: 'mada'
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      showToast('يرجى تزويدنا بالاسم ورقم الجوال', 'warning');
      return;
    }

    let orderText = `*طلب جديد من متجر كوبالت الرقمي* 🚀\n\n`;
    orderText += `👤 *العميل:* ${formData.fullName}\n`;
    orderText += `📱 *الجوال:* ${formData.phone}\n`;
    orderText += `💳 *طريقة الدفع:* ${formData.paymentMethod.toUpperCase()}\n`;
    orderText += `🌐 *العملة:* ${currentCurrency}\n\n`;

    orderText += `📋 *الخدمات:*\n`;
    items.forEach((item, index) => {
      orderText += `${index + 1}. *${item.serviceTitle}* (${item.selectedOption}) x${item.qty} - ${formatPrice(item.unitPriceSAR * item.qty)}\n`;
    });

    orderText += `\n💵 *الإجمالي:* ${formatPrice(grandTotalSAR)}\n`;
    if (formData.notes) orderText += `📝 *ملاحظات:* ${formData.notes}\n`;

    const whatsappUrl = `https://wa.me/966500000000?text=${encodeURIComponent(orderText)}`;
    window.open(whatsappUrl, '_blank');

    setIsSuccess(true);
    clearCart();
    showToast('تم تسجيل الطلب وتوجيهك إلى الواتساب للمتابعة الفورية!', 'success');
  };

  return (
    <div id="checkoutModal" className="modal-overlay active" onClick={() => setIsCheckoutOpen(false)}>
      <div
        className="modal-container"
        style={{ maxWidth: '660px' }}
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button onClick={() => setIsCheckoutOpen(false)} className="modal-close-btn" type="button">
          ✕
        </button>

        <div className="modal-body" style={{ padding: '38px 40px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '14px' }}>🎉</div>
              <h3 style={{ color: '#FFF', fontSize: '1.4rem', fontWeight: 900, marginBottom: '10px' }}>
                تم إرسال طلبك بنجاح!
              </h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '24px' }}>
                شكراً لثقتك في كوبالت. تم فتح محادثة الواتساب المباشرة مع مدير المشاريع لبدء تنفيذ طلبك فوراً.
              </p>
              <button className="btn-primary" onClick={() => setIsCheckoutOpen(false)} type="button">
                العودة للمتجر
              </button>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <span className="section-subtitle-tag">🔒 دفع إلكتروني آمن 100%</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF', marginTop: '6px' }}>
                  إتمام الطلب وتأكيد الدفع
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  أدخل بيانات التواصل واختر وسيلة الدفع المفضلة لإتمام طلبك.
                </p>
              </div>

              {/* Order Summary Card */}
              <div
                style={{
                  background: 'rgba(14, 31, 71, 0.7)',
                  border: '1px solid var(--cyan-accent)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>المبلغ الإجمالي المطلـوب:</div>
                  <div id="checkoutTotalDisplay" style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--cyan-accent)' }}>
                    {formatPrice(grandTotalSAR)}
                  </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <span
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid var(--emerald-accent)',
                      color: 'var(--emerald-accent)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.76rem',
                      fontWeight: 800
                    }}
                  >
                    ✓ شامل ضريبة 15%
                  </span>
                </div>
              </div>

              {/* Payment Method Selection Grid */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '10px', display: 'block' }}>
                  حدد طريقة الدفع المفضلة:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))', gap: '10px' }}>
                  {[
                    { id: 'mada', flag: '🇸🇦', title: 'مدى (Mada)' },
                    { id: 'apple_pay', flag: '🍏', title: 'Apple Pay' },
                    { id: 'credit_card', flag: '💳', title: 'بطاقة ائتمان' },
                    { id: 'bank', flag: '🏦', title: 'تحويل بنكي' }
                  ].map((p) => (
                    <div
                      key={p.id}
                      className={`payment-method-card ${formData.paymentMethod === p.id ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                    >
                      <span style={{ fontSize: '1.3rem' }}>{p.flag}</span>
                      <span>{p.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmitOrder}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 700, marginBottom: '6px', display: 'block' }}>
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="مثال: عبد الله أحمد"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 700, marginBottom: '6px', display: 'block' }}>
                      رقم الجوال (واتساب) *
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 700, marginBottom: '6px', display: 'block' }}>
                      البريد الإلكتروني (اختياري)
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 700, marginBottom: '6px', display: 'block' }}>
                    ملاحظات أو روابط إضافية (اختياري)
                  </label>
                  <textarea
                    className="form-control"
                    rows={2}
                    placeholder="أي ملاحظات تود إضافتها مع الطلب..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.05rem' }}
                >
                  🔒 تأكيد الدفع وإتمام الطلب ({formatPrice(grandTotalSAR)})
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
