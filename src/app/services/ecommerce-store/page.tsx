'use client';

import React, { useState } from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';
import MultiChipSelector from '@/components/services/MultiChipSelector';
import FileUploadBox from '@/components/services/FileUploadBox';
import { SERVICES_DATA } from '@/data/services';

const PAGE_GUARANTEES = [
  {
    icon: '💳',
    title: 'ربط بوابات الدفع والتحقق 100%',
    desc: 'نضمن اختبار عمليات الشراء الحية وربط مدى وApple Pay وتابي وتمارا والفيزا بنجاح تام.'
  },
  {
    icon: '⏱️',
    title: 'جاهزية فورية للمبيعات',
    desc: 'تسليم متجر جاهز تقنياً وبصرياً لإطلاق الحملات الإعلانية واستقبال طلبات العملاء مباشرة.'
  },
  {
    icon: '🔄',
    title: 'دعم فني وتدريب على الإدارة',
    desc: 'تدريب كامل ومفصل لك ولفريقك على كيفية إضافة المنتجات وإدارة الفواتير والطلبات والمخزون.'
  }
];

const PAYMENT_OPTIONS = [
  { value: 'مدى (Mada)', label: 'مدى (Mada)' },
  { value: 'Apple Pay', label: 'Apple Pay' },
  { value: 'فيزا وماستركارد (Visa/MasterCard)', label: 'Visa / MasterCard' },
  { value: 'تمارا (Tamara)', label: 'تمارا (Tamara)' },
  { value: 'تابي (Tabby)', label: 'تابي (Tabby)' },
  { value: 'الدفع عند الاستلام (COD)', label: 'الدفع عند الاستلام (COD)' },
  { value: 'STC Pay', label: 'STC Pay' },
  { value: 'تحويل بنكي مباشر', label: 'تحويل بنكي' },
  { value: 'باي بال (PayPal)', label: 'PayPal' }
];

const COUNTRY_OPTIONS = [
  { value: 'المملكة العربية السعودية', label: '🇸🇦 السعودية' },
  { value: 'الإمارات العربية المتحدة', label: '🇦🇪 الإمارات' },
  { value: 'الكويت', label: '🇰🇼 الكويت' },
  { value: 'قطر', label: '🇶🇦 قطر' },
  { value: 'البحرين', label: '🇧🇭 البحرين' },
  { value: 'سلطنة عمان', label: '🇴🇲 عمان' },
  { value: 'مصر', label: '🇪🇬 مصر' },
  { value: 'كافة دول الخليج العربي', label: 'دول الخليج كافة' },
  { value: 'شحن دولي لكافة أنحاء العالم', label: 'جميع دول العالم' }
];

export default function EcommerceStorePage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'ecommerce-store') || SERVICES_DATA[2];

  const [productsCount, setProductsCount] = useState('30');
  const [categoriesText, setCategoriesText] = useState('');
  const [csvFiles, setCsvFiles] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<string[]>([]);
  const [priceFiles, setPriceFiles] = useState<string[]>([]);
  const [inventoryType, setInventoryType] = useState('متجر سلة (Salla)');
  const [inventoryFiles, setInventoryFiles] = useState<string[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([
    'مدى (Mada)',
    'Apple Pay',
    'فيزا وماستركارد (Visa/MasterCard)',
    'تمارا (Tamara)',
    'تابي (Tabby)'
  ]);
  const [targetCountries, setTargetCountries] = useState<string[]>([
    'المملكة العربية السعودية',
    'الإمارات العربية المتحدة',
    'الكويت'
  ]);
  const [shippingZones, setShippingZones] = useState('');
  const [shippingCompanies, setShippingCompanies] = useState('');
  const [hasVat, setHasVat] = useState<'yes' | 'no'>('yes');
  const [storeCurrency, setStoreCurrency] = useState('SAR (ريال سعودي)');
  const [shippingPolicy, setShippingPolicy] = useState('');
  const [returnPolicy, setReturnPolicy] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState('');

  const validateFields = () => {
    if (!productsCount || parseInt(productsCount, 10) < 1) {
      return { valid: false, message: '⚠️ يرجى إدخال عدد المنتجات التقريبي' };
    }
    if (!categoriesText.trim()) {
      return { valid: false, message: '⚠️ يرجى إدخال تصنيفات وأقسام المنتجات' };
    }
    if (!paymentMethods.length) {
      return { valid: false, message: '⚠️ يرجى تحديد طرق الدفع المطلوبة' };
    }
    if (!targetCountries.length) {
      return { valid: false, message: '⚠️ يرجى تحديد الدول المستهدفة للبيع' };
    }
    if (!shippingZones.trim()) {
      return { valid: false, message: '⚠️ يرجى إدخال مناطق وتغطية الشحن والتوصيل' };
    }

    return {
      valid: true,
      customData: {
        'الخدمة': 'المتجر الإلكتروني',
        'عدد المنتجات': `${productsCount} منتج تقريباً`,
        'تصنيفات المنتجات': categoriesText,
        'ملف المنتجات': csvFiles.join(', ') || 'سيتم إرفاقه',
        'صور المنتجات': photoFiles.join(', ') || 'سيتم إرفاقها',
        'ملف الأسعار': priceFiles.join(', ') || 'محدد في ملف المنتجات',
        'المخزون والمنصة': inventoryType + (inventoryFiles.length ? ` (ملف: ${inventoryFiles.join(', ')})` : ''),
        'طرق الدفع المطلوبة': paymentMethods.join(', '),
        'الدول المستهدفة': targetCountries.join(', '),
        'مناطق الشحن': shippingZones,
        'شركات الشحن': shippingCompanies || 'حسب الأفضلية',
        'الضريبة': hasVat === 'yes' ? 'نعم (15% ضريبة مضافة)' : 'لا توجد ضريبة',
        'العملة الأساسية': storeCurrency,
        'سياسة الشحن': shippingPolicy || 'صياغة نموذج كوبالت القياسي',
        'سياسة الاسترجاع': returnPolicy || 'صياغة نموذج كوبالت القياسي',
        'سياسة الخصوصية': privacyPolicy || 'صياغة نموذج كوبالت القياسي'
      }
    };
  };

  return (
    <ServiceDetailLayout
      service={service}
      onValidateCustomFields={validateFields}
      guaranteesTitle="ضمانات كوبالت لخدمات المتاجر الإلكترونية"
      pageGuarantees={PAGE_GUARANTEES}
      stepLabels={['المنتجات والمخزون', 'بوابات الدفع والشحن', 'سياسات المتجر']}
    >
      {/* Section 1: Products & Inventory */}
      <div className="questionnaire-section-box">
        <div className="section-box-header">
          <div className="section-step-badge">01</div>
          <div className="section-header-info">
            <h3 className="section-box-title">
              <span className="section-icon">📦</span> المنتجات، التصنيفات وملفات الأسعار
            </h3>
            <p className="section-box-desc">
              حدد تفاصيل منتجاتك وأقسام المتجر لتجهيز قاعدة البيانات ورفع المنتجات باحترافية
            </p>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🔢</span>
              <span>عدد المنتجات التقريبي المراد إدراجها</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <input
            type="number"
            className="form-control"
            min={1}
            max={10000}
            placeholder="مثال: 50 منتج"
            value={productsCount}
            onChange={(e) => setProductsCount(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">📂</span>
              <span>تصنيفات وأقسام المنتجات (Categories)</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={3}
            placeholder="أدخل أسماء الأقسام الرئيسية والفرعية (مثال: عطور رجالية، عطور نسائية، بخور، هدايا)..."
            value={categoriesText}
            onChange={(e) => setCategoriesText(e.target.value)}
          />
        </div>

        <FileUploadBox
          label="ملف المنتجات والتفاصيل (CSV / Excel)"
          uploadTitle={
            <>
              اسحب ملف الإكسيل / CSV هنا أو{' '}
              <span className="upload-browse-link">تصفح من جهازك</span>
            </>
          }
          sublabel="(CSV, XLSX, XLS - يحتوي على أسماء المنتجات والأوصاف والأسعار)"
          icon="📊"
          accept=".csv,.xlsx,.xls"
          files={csvFiles}
          onFilesChange={setCsvFiles}
          required
        />

        <FileUploadBox
          label="صور المنتجات عالية الدقة"
          uploadTitle="ارفع صور المنتجات (يمكنك تحديد عدة صور أو ملف ZIP)"
          icon="📸"
          accept="image/*,.zip"
          multiple
          files={photoFiles}
          onFilesChange={setPhotoFiles}
          required
        />

        <FileUploadBox
          label="قائمة الأسعار والعروض الترويجية"
          uploadTitle="ارفع ملف الأسعار أو قائمة الخصومات"
          icon="💰"
          accept=".csv,.xlsx,.xls,.pdf,image/*"
          files={priceFiles}
          onFilesChange={setPriceFiles}
          required
        />

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🏢</span>
              <span>منصة المتجر وإدارة المخزون (Stock & Platform)</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <select
            className="form-control"
            style={{ marginBottom: '12px' }}
            value={inventoryType}
            onChange={(e) => setInventoryType(e.target.value)}
          >
            <option value="متجر سلة (Salla)">منصة سلة (Salla Platform)</option>
            <option value="منصة زد (Zid)">منصة زد (Zid Platform)</option>
            <option value="شوبيفاي (Shopify)">منصة شوبيفاي (Shopify)</option>
            <option value="ووكومرس (WooCommerce)">ووكومرس مخصص (WooCommerce)</option>
            <option value="ربط عبر نظام ERP / API">ربط نظام محاسبي ERP / API</option>
            <option value="ملف إكسيل منفصل">ملف مخزون يدوي</option>
          </select>
          <FileUploadBox
            label="ملف المخزون"
            hideLabel
            uploadTitle="ارفع ملف جرد المخزون إن وجد (Excel / CSV)"
            icon="📑"
            accept=".csv,.xlsx,.xls"
            files={inventoryFiles}
            onFilesChange={setInventoryFiles}
          />
        </div>
      </div>

      {/* Section 2: Payments & Shipping */}
      <div className="questionnaire-section-box">
        <div className="section-box-header">
          <div className="section-step-badge">02</div>
          <div className="section-header-info">
            <h3 className="section-box-title">
              <span className="section-icon">💳</span> بوابات الدفع، الشحن والضرائب
            </h3>
            <p className="section-box-desc">
              حدد قنوات الدفع المفضلة ومناطق الشحن لتهيئة تجربة شراء متكاملة لعملائك
            </p>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">💳</span>
              <span>طرق وبوابات الدفع المطلوبة للربط</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <MultiChipSelector options={PAYMENT_OPTIONS} selected={paymentMethods} onChange={setPaymentMethods} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🌍</span>
              <span>الدول المستهدفة للبيع والشحن</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <MultiChipSelector options={COUNTRY_OPTIONS} selected={targetCountries} onChange={setTargetCountries} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🚚</span>
              <span>مناطق وتغطية الشحن والتوصيل</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="أدخل المدن والمناطق المغطاة (مثال: جميع مدن المملكة والقرى، توصيل سريع بالرياض، وشحن دولي للخليج)..."
            value={shippingZones}
            onChange={(e) => setShippingZones(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🏢</span>
              <span>شركات الشحن المفضلة للربط</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="مثال: أرامكس (Aramex)، سمسا (SMSA)، DHL، سبل، مندوب خاص..."
            value={shippingCompanies}
            onChange={(e) => setShippingCompanies(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🏛️</span>
              <span>هل المتجر خاضع لضريبة القيمة المضافة (VAT)؟</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button
              type="button"
              className={`switch-toggle-btn ${hasVat === 'yes' ? 'active' : ''}`}
              onClick={() => setHasVat('yes')}
            >
              نعم (15% ضريبة مضافة)
            </button>
            <button
              type="button"
              className={`switch-toggle-btn ${hasVat === 'no' ? 'active' : ''}`}
              onClick={() => setHasVat('no')}
            >
              لا (غير مسجل ضريبياً)
            </button>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">💱</span>
              <span>العملة الأساسية للمتجر</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <select className="form-control" value={storeCurrency} onChange={(e) => setStoreCurrency(e.target.value)}>
            <option value="SAR (ريال سعودي)">🇸🇦 ريال سعودي (SAR)</option>
            <option value="AED (درهم إماراتي)">🇦🇪 درهم إماراتي (AED)</option>
            <option value="USD (دولار أمريكي)">🇺🇸 دولار أمريكي (USD)</option>
            <option value="KWD (دينار كويتي)">🇰🇼 دينار كويتي (KWD)</option>
            <option value="QAR (ريال قطري)">🇶🇦 ريال قطري (QAR)</option>
            <option value="BHD (دينار بحريني)">🇧🇭 دينار بحريني (BHD)</option>
            <option value="OMR (ريال عماني)">🇴🇲 ريال عماني (OMR)</option>
            <option value="EGP (جنيه مصري)">🇪🇬 جنيه مصري (EGP)</option>
          </select>
        </div>
      </div>

      {/* Section 3: Policies */}
      <div className="questionnaire-section-box">
        <div className="section-box-header">
          <div className="section-step-badge">03</div>
          <div className="section-header-info">
            <h3 className="section-box-title">
              <span className="section-icon">📜</span> سياسات المتجر (الشحن، الاسترجاع والخصوصية)
            </h3>
            <p className="section-box-desc">
              صياغة شروط المتجر القانونية والتشغيلية المعتمدة لحماية المتجر وبناء ثقة العملاء
            </p>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">📦</span>
              <span>سياسة الشحن والتوصيل (Shipping Policy)</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب شروط وأوقات الشحن والتوصيل، أو اتركها لنقوم بصياغتها باحترافية حسب الأنظمة الرسمية..."
            value={shippingPolicy}
            onChange={(e) => setShippingPolicy(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🔄</span>
              <span>سياسة الاسترجاع والاستبدال (Refund & Return Policy)</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب مدة وشروط الاسترجاع والاستبدال المعتمدة لديك، أو اتركها لنقوم بصياغتها..."
            value={returnPolicy}
            onChange={(e) => setReturnPolicy(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🔒</span>
              <span>سياسة الخصوصية وحماية بيانات العملاء (Privacy Policy)</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب شروط الخصوصية أو سنقوم بتهيئة السياسة المعتمدة لوزارة التجارة وهيئة البيانات..."
            value={privacyPolicy}
            onChange={(e) => setPrivacyPolicy(e.target.value)}
          />
        </div>
      </div>
    </ServiceDetailLayout>
  );
}
