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
    grandTotalSAR,
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
    if (formData.email) orderText += `📧 *البريد:* ${formData.email}\n`;
    orderText += `💳 *طريقة الدفع:* ${formData.paymentMethod.toUpperCase()}\n`;
    orderText += `🌐 *العملة:* ${currentCurrency}\n\n`;

    orderText += `📋 *تفاصيل الطلب:*\n`;
    items.forEach((item, index) => {
      orderText += `${index + 1}. *${item.serviceTitle}* (${item.selectedOption}) x${item.qty} - ${formatPrice(item.unitPriceSAR * item.qty)}\n`;
      if (item.selectedAddons && item.selectedAddons.length > 0) {
        orderText += `   + الإضافات: ${item.selectedAddons.join(', ')}\n`;
      }
    });

    orderText += `\n💵 *الإجمالي النهائي:* ${formatPrice(grandTotalSAR)}\n`;
    if (formData.notes) orderText += `📝 *ملاحظات:* ${formData.notes}\n`;

    const whatsappUrl = `https://wa.me/966500000000?text=${encodeURIComponent(orderText)}`;
    window.open(whatsappUrl, '_blank');

    setIsSuccess(true);
    clearCart();
    showToast('تم تسجيل الطلب وتوجيهك إلى الواتساب للمتابعة الفورية!', 'success');
  };

  return (
    <div
      id="checkoutModal"
      className="checkout-modal-overlay show active"
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div
        className="checkout-modal-box"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Close Button Top Left */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="checkout-modal-close-btn"
          type="button"
          aria-label="إغلاق النافذة"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="checkout-success-view">
            <div className="success-icon-badge">🎉</div>
            <h3 className="success-title">
              تم إرسال طلبك بنجاح!
            </h3>
            <p className="success-desc">
              شكراً لثقتك في كوبالت. تم فتح محادثة الواتساب المباشرة مع مدير المشاريع لبدء تنفيذ طلبك فوراً.
            </p>
            <button
              className="btn-order-primary"
              onClick={() => {
                setIsSuccess(false);
                setIsCheckoutOpen(false);
              }}
              type="button"
              style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}
            >
              العودة للمتجر
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable Body Container */}
            <div className="checkout-modal-body-scrollable">
              {/* Header */}
              <div className="checkout-header-block">
                <span className="checkout-security-tag">🔒 دفع إلكتروني آمن 100%</span>
                <h2 className="checkout-main-title">
                  إتمام الطلب وتأكيد الدفع
                </h2>
                <p className="checkout-sub-title">
                  أدخل بيانات التواصل واختر وسيلة الدفع المفضلة لإتمام طلبك
                </p>
              </div>

              {/* Order Summary Card */}
              <div className="checkout-summary-card">
                <div className="summary-left-info">
                  <div className="summary-label">المبلغ الإجمالي المطلوب:</div>
                  <div id="checkoutTotalDisplay" className="summary-total-amount">
                    {formatPrice(grandTotalSAR)}
                  </div>
                </div>
                <div className="summary-right-badge">
                  <span className="vat-badge-tag">
                    ✓ شامل ضريبة 15%
                  </span>
                </div>
              </div>

              {/* Payment Method Selection Grid */}
              {/* <div className="checkout-payment-section">
                <label className="checkout-section-label">
                  حدد طريقة الدفع المفضلة:
                </label>
                <div className="checkout-payment-grid">
                  {[
                    { id: 'mada', flag: '🇸🇦', title: 'مدى (Mada)' },
                    { id: 'apple_pay', flag: '🍏', title: 'Apple Pay' },
                    { id: 'credit_card', flag: '💳', title: 'بطاقة ائتمان' },
                    { id: 'bank', flag: '🏦', title: 'تحويل بنكي' }
                  ].map((p) => (
                    <div
                      key={p.id}
                      className={`checkout-payment-card ${formData.paymentMethod === p.id ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                    >
                      <span className="payment-card-icon">{p.flag}</span>
                      <span className="payment-card-text">{p.title}</span>
                      {formData.paymentMethod === p.id && (
                        <span className="payment-card-check">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Form Inputs */}
              <form id="checkoutForm" onSubmit={handleSubmitOrder} className="checkout-form-fields">
                <div className="form-group-item">
                  <label className="checkout-input-label">
                    الاسم الكامل <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="checkout-form-input"
                    placeholder="مثال: عبد الله أحمد"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="checkout-inputs-row">
                  <div className="form-group-item">
                    <label className="checkout-input-label">
                      رقم الجوال (واتساب) <span className="req-star">*</span>
                    </label>
                    <input
                      type="tel"
                      className="checkout-form-input"
                      placeholder="05xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group-item">
                    <label className="checkout-input-label">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="checkout-form-input"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-item">
                  <label className="checkout-input-label">
                    ملاحظات أو روابط إضافية (اختياري)
                  </label>
                  <textarea
                    className="checkout-form-input checkout-textarea"
                    rows={2}
                    placeholder="أي ملاحظات أو تفاصيل تود إضافتها مع الطلب..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </form>
            </div>

            {/* Dedicated Sticky Footer Bar for Checkout Submit Button */}
            <div className="checkout-modal-footer-bar">
              <button
                type="submit"
                form="checkoutForm"
                className="btn-checkout-submit"
              >
                <span className="btn-icon">🔒</span>
                <span className="btn-text">تأكيد الدفع وإتمام الطلب ({formatPrice(grandTotalSAR)})</span>
                <span className="btn-arrow">←</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
