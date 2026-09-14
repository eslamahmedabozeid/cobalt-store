'use client';

import React, { useState } from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';
import MultiChipSelector from '@/components/services/MultiChipSelector';
import FileUploadBox from '@/components/services/FileUploadBox';
import UrlRepeater from '@/components/services/UrlRepeater';
import { SERVICES_DATA } from '@/data/services';

const PAGE_GUARANTEES = [
  {
    icon: '📈',
    title: 'استهداف ذكي لتحقيق أعلى عائد ROAS',
    desc: 'نعتمد على بكسل التتبع وشرائح الجمهور المخصص لخفض تكلفة الاكتساب وزيادة المبيعات إلى أقصى حد.'
  },
  {
    icon: '📊',
    title: 'تقارير أداء ومتابعة تحليلية مستمرة',
    desc: 'تقارير يومية ولوحة بيانات توضح عدد النقرات، المبيعات، ومعدل التحويل بدقة وشفافية 100%.'
  },
  {
    icon: '⚙️',
    title: 'تحسين واختبار A/B Testing مستمر',
    desc: 'اختبار عناوين وفيديوهات وتصاميم متعددة للوصول لأفضل تركيبة إعلانية تحقق الربح بأقل تكلفة.'
  }
];

const COUNTRY_OPTIONS = [
  { value: 'المملكة العربية السعودية', label: '🇸🇦 السعودية' },
  { value: 'الإمارات العربية المتحدة', label: '🇦🇪 الإمارات' },
  { value: 'الكويت', label: '🇰🇼 الكويت' },
  { value: 'قطر', label: '🇶🇦 قطر' },
  { value: 'البحرين', label: '🇧🇭 البحرين' },
  { value: 'سلطنة عمان', label: '🇴🇲 عمان' },
  { value: 'مصر', label: '🇪🇬 مصر' },
  { value: 'الأردن', label: '🇯🇴 الأردن' },
  { value: 'دول الخليج كافة', label: 'دول الخليج كافة' }
];

const AGE_OPTIONS = [
  '18 - 24 سنة',
  '25 - 34 سنة',
  '35 - 44 سنة',
  '45 - 54 سنة',
  '55+ سنة'
];

const PREV_PLATFORM_OPTIONS = [
  { value: 'سناب شات (Snapchat)', label: 'Snapchat' },
  { value: 'انستقرام (Instagram)', label: 'Instagram' },
  { value: 'تيك توك (TikTok)', label: 'TikTok' },
  { value: 'إعلانات جوجل (Google Ads)', label: 'Google Ads' },
  { value: 'فيسبوك (Facebook Ads)', label: 'Facebook' },
  { value: 'إكس / تويتر (X Ads)', label: 'Twitter / X' },
  { value: 'لينكد إن (LinkedIn Ads)', label: 'LinkedIn' }
];

export default function DigitalMarketingPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'digital-marketing') || SERVICES_DATA[4];

  const [campaignGoal, setCampaignGoal] = useState('مبيعات مباشرة (Purchases / E-commerce Sales)');
  const [productDesc, setProductDesc] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('2500');
  const [budgetCurrency, setBudgetCurrency] = useState('SAR (ريال سعودي)');
  const [durationDays, setDurationDays] = useState('14');
  const [landingUrl, setLandingUrl] = useState('');
  const [socialUrls, setSocialUrls] = useState<string[]>(['']);
  const [audienceDesc, setAudienceDesc] = useState('');
  const [targetCountries, setTargetCountries] = useState<string[]>([
    'المملكة العربية السعودية',
    'الإمارات العربية المتحدة'
  ]);
  const [cities, setCities] = useState('');
  const [ageBrackets, setAgeBrackets] = useState<string[]>(['25 - 34 سنة', '35 - 44 سنة']);
  const [gender, setGender] = useState('الجميع (رجال وسيدات)');
  const [promoOffer, setPromoOffer] = useState('');
  const [priceNumber, setPriceNumber] = useState('');
  const [needCreatives, setNeedCreatives] = useState<'yes' | 'no'>('yes');
  const [adImages, setAdImages] = useState<string[]>([]);
  const [adVideos, setAdVideos] = useState<string[]>([]);
  const [hasRunAdsBefore, setHasRunAdsBefore] = useState<'yes' | 'no'>('no');
  const [prevPlatforms, setPrevPlatforms] = useState<string[]>([
    'سناب شات (Snapchat)',
    'انستقرام (Instagram)'
  ]);
  const [prevResults, setPrevResults] = useState('');
  const [prevReports, setPrevReports] = useState<string[]>([]);
  const [competitorUrls, setCompetitorUrls] = useState<string[]>(['']);

  const validateFields = () => {
    if (!productDesc.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة تفاصيل ومميزات المنتج أو الخدمة' };
    }
    if (!budgetAmount || parseInt(budgetAmount, 10) < 100) {
      return { valid: false, message: '⚠️ يرجى إدخال الميزانية الإعلانية المقترحة للمنصات' };
    }
    if (!durationDays || parseInt(durationDays, 10) < 1) {
      return { valid: false, message: '⚠️ يرجى تحديد مدة الحملة بالأيام' };
    }
    if (!audienceDesc.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة وصف الجمهور واهتماماته' };
    }
    if (!targetCountries.length) {
      return { valid: false, message: '⚠️ يرجى تحديد الدول المستهدفة بالإعلانات' };
    }
    if (hasRunAdsBefore === 'yes' && !prevPlatforms.length) {
      return { valid: false, message: '⚠️ يرجى تحديد المنصات السابقة التي أعلنت عليها' };
    }

    const allUploadedFiles = [...adImages, ...adVideos, ...prevReports];

    return {
      valid: true,
      customData: {
        'الخدمة': 'التسويق والإعلانات الممولة',
        'هدف الحملة': campaignGoal,
        'المنتج / الخدمة': productDesc,
        'الميزانية الإعلانية': `${budgetAmount} ${budgetCurrency}`,
        'مدة الحملة': `${durationDays} يوماً`,
        'رابط الهبوط': landingUrl || 'غير محدد',
        'وصف الجمهور المستهدف': audienceDesc,
        'الدول المستهدفة': targetCountries.join(', '),
        'المدن المستهدفة': cities || 'كافة المدن الرئيسية',
        'الفئات العمرية': ageBrackets.join(', ') || 'الجميع',
        'الجنس': gender,
        'العرض الترويجي': promoOffer || 'لا يوجد عرض خاص',
        'سعر المنتج المعلن': priceNumber ? `${priceNumber} ${budgetCurrency}` : 'غير محدد',
        'طلب تصميم Creatives': needCreatives === 'yes' ? 'نعم (مطلوب من كوبالت)' : 'لا (جاهزة)',
        'إعلانات سابقة':
          hasRunAdsBefore === 'yes'
            ? `نعم (منصات: ${prevPlatforms.join(', ')} | نتائج: ${prevResults})`
            : 'لا توجد سوابق إعلانية',
        'حسابات السوشيال': socialUrls.filter(Boolean).join(' | ') || 'لا يوجد',
        'المنافسون': competitorUrls.filter(Boolean).join(' | ') || 'لا يوجد',
        'الملفات المرفقة': allUploadedFiles.join(', ') || 'لا يوجد'
      }
    };
  };

  return (
    <ServiceDetailLayout
      service={service}
      onValidateCustomFields={validateFields}
      guaranteesTitle="ضمانات كوبالت لخدمات إدارة الحملات الإعلانية"
      pageGuarantees={PAGE_GUARANTEES}
      stepLabels={['الأهداف والميزانية', 'الاستهداف والجمهور', 'المواد الإعلانية وسوابق الإعلانات']}
    >
      {/* Section 1: Campaign Goals & Budget */}
      <div className="questionnaire-section-box">
        <div className="section-box-header">
          <div className="section-step-badge">01</div>
          <div className="section-header-info">
            <h3 className="section-box-title">
              <span className="section-icon">🎯</span> أهداف الحملة، النشاط والميزانية
            </h3>
            <p className="section-box-desc">
              تحديد مؤشرات الأداء المستهدفة (KPIs) والميزانية التشغيلية لمنصات الإعلانات
            </p>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🎯</span>
              <span>الهدف الأساسي من الحملة الإعلانية</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <select className="form-control" value={campaignGoal} onChange={(e) => setCampaignGoal(e.target.value)}>
            <option value="مبيعات مباشرة (Purchases / E-commerce Sales)">مبيعات مباشرة للمتاجر (Sales / Purchases)</option>
            <option value="توليد عملاء محتملين (Leads Generation)">توليد واستقبال عملاء مهتمين (Leads Generation)</option>
            <option value="محادثات واتساب مباشرة (WhatsApp Messages)">محادثات واتساب ومراسلات فورية (WhatsApp Messages)</option>
            <option value="تحميل وتثبيت التطبيقات (App Installs)">تحميل وتثبيت التطبيقات (App Installs)</option>
            <option value="شهرة وانتشار العلامة (Brand Awareness)">شهرة وانتشار العلامة التجارية (Brand Awareness)</option>
            <option value="زيارات للموقع أو الفرع (Traffic / Store Visits)">زيارات للموقع أو الفروع (Traffic / Store Visits)</option>
            <option value="أخرى">هدف آخر مخصص</option>
          </select>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🛍️</span>
              <span>المنتج أو الخدمة المراد الإعلان عنها</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب اسم المنتج/الخدمة، أبرز المميزات ونقاط القوة التنافسية..."
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">💵</span>
              <span>الميزانية الإعلانية المقترحة للمنصات</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              className="form-control"
              placeholder="مثال: 3000"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              style={{ flex: 2 }}
            />
            <select
              className="form-control"
              value={budgetCurrency}
              onChange={(e) => setBudgetCurrency(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="SAR (ريال سعودي)">SAR (ر.س)</option>
              <option value="AED (درهم إماراتي)">AED (د.إ)</option>
              <option value="USD (دولار)">USD ($)</option>
              <option value="KWD (دينار)">KWD (د.ك)</option>
              <option value="EGP (جنيه)">EGP (ج.م)</option>
            </select>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">⏱️</span>
              <span>مدة تشغيل الحملة الإعلانية المقترحة</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="number"
              className="form-control"
              placeholder="عدد الأيام"
              value={durationDays}
              min={3}
              max={180}
              onChange={(e) => setDurationDays(e.target.value)}
              style={{ flex: 1 }}
            />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>أيام تشغيل</span>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🌐</span>
              <span>رابط صفحة الهبوط أو المتجر المستهدف للإعلانات</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <input
            type="url"
            className="form-control"
            placeholder="https://yourstore.com/offer"
            value={landingUrl}
            onChange={(e) => setLandingUrl(e.target.value)}
            dir="ltr"
          />
        </div>

        <UrlRepeater
          label="روابط حسابات السوشيال ميديا الحالية"
          placeholder="https://instagram.com/yourbrand"
          urls={socialUrls}
          onChange={setSocialUrls}
          addButtonLabel="➕ إضافة رابط حساب آخر"
        />
      </div>

      {/* Section 2: Targeting & Geography */}
      <div className="questionnaire-section-box">
        <div className="section-box-header">
          <div className="section-step-badge">02</div>
          <div className="section-header-info">
            <h3 className="section-box-title">
              <span className="section-icon">🌍</span> الاستهداف الجغرافي والجمهور
            </h3>
            <p className="section-box-desc">
              تحديد الشريحة المستهدفة والاهتمامات والدول والمدن لرفع معدل التحويل
            </p>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">👥</span>
              <span>وصف واهتمامات الجمهور المستهدف</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="الاهتمامات، السلوك الشرائي، المشاكل التي يحلها المنتج لجمهورك..."
            value={audienceDesc}
            onChange={(e) => setAudienceDesc(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🌍</span>
              <span>الدول المستهدفة بالإعلانات</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <MultiChipSelector options={COUNTRY_OPTIONS} selected={targetCountries} onChange={setTargetCountries} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🏙️</span>
              <span>مدن محددة للاستهداف</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="مثال: الرياض، جدة، الدمام، دبي، أبوظبي، الكويت... أو اتركها فارغة لكافة المدن"
            value={cities}
            onChange={(e) => setCities(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🎂</span>
              <span>الفئات العمرية المستهدفة</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <MultiChipSelector options={AGE_OPTIONS} selected={ageBrackets} onChange={setAgeBrackets} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🚻</span>
              <span>الجنس / النوع المستهدف</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="الجميع (رجال وسيدات)">الجميع (رجال وسيدات)</option>
            <option value="رجال فقط">رجال فقط (Men Only)</option>
            <option value="سيدات فقط">سيدات فقط (Women Only)</option>
          </select>
        </div>
      </div>

      {/* Section 3: Creatives & Ad History */}
      <div className="questionnaire-section-box">
        <div className="section-box-header">
          <div className="section-step-badge">03</div>
          <div className="section-header-info">
            <h3 className="section-box-title">
              <span className="section-icon">🎨</span> العروض، المواد الإعلانية وسجل الإعلانات
            </h3>
            <p className="section-box-desc">
              تجهيز المواد الإعلانية، مراجعة الحملات السابقة، وتحليل المنافسين
            </p>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🎁</span>
              <span>تفاصيل العرض الترويجي والخصم</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب العرض الجذاب (مثال: خصم 30%، اشتري 1 واحصل على 1 مجاناً، كود خصم، شحن مجاني)..."
            value={promoOffer}
            onChange={(e) => setPromoOffer(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🏷️</span>
              <span>سعر المنتج في الإعلان (إن وجد)</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <input
            type="number"
            className="form-control"
            placeholder="مثال: 199"
            value={priceNumber}
            onChange={(e) => setPriceNumber(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🎨</span>
              <span>هل تحتاج تصاميم وفيديوهات إعلانية (Creatives) من فريقنا؟</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button
              type="button"
              className={`switch-toggle-btn ${needCreatives === 'yes' ? 'active' : ''}`}
              onClick={() => setNeedCreatives('yes')}
            >
              نعم (صمموا لي المواد الإعلانية)
            </button>
            <button
              type="button"
              className={`switch-toggle-btn ${needCreatives === 'no' ? 'active' : ''}`}
              onClick={() => setNeedCreatives('no')}
            >
              لا (المواد الإعلانية جاهزة لدي)
            </button>
          </div>
        </div>

        <FileUploadBox
          label="رفع صور وتصاميم الإعلانات الجاهزة"
          uploadTitle="ارفع تصاميم البوستات والبانرات الإعلانية (PNG / JPG / ZIP)"
          icon="📸"
          accept="image/*,.zip"
          multiple
          files={adImages}
          onFilesChange={setAdImages}
        />

        <FileUploadBox
          label="رفع فيديوهات وريلز الإعلانات"
          uploadTitle="ارفع الفيديوهات الإعلانية (MP4 / MOV / Drive Link)"
          icon="🎥"
          accept="video/*,.zip"
          multiple
          files={adVideos}
          onFilesChange={setAdVideos}
        />

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">📊</span>
              <span>هل سبق لك تشغيل إعلانات ممولة من قبل؟</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button
              type="button"
              className={`switch-toggle-btn ${hasRunAdsBefore === 'no' ? 'active' : ''}`}
              onClick={() => setHasRunAdsBefore('no')}
            >
              لا (أول تجربة إعلانية)
            </button>
            <button
              type="button"
              className={`switch-toggle-btn ${hasRunAdsBefore === 'yes' ? 'active' : ''}`}
              onClick={() => setHasRunAdsBefore('yes')}
            >
              نعم (لدي حملات سابقة)
            </button>
          </div>

          <div className={`conditional-field-wrapper ${hasRunAdsBefore === 'yes' ? 'active' : ''}`}>
            <div className="form-field-group">
              <div className="field-label-row">
                <label className="field-title">
                  <span className="field-icon">📱</span>
                  <span>المنصات السابقة التي أعلنت عليها</span>
                  <span className="req-star" style={{ color: '#FBBF24' }}>*</span>
                </label>
                <span className="field-req-badge badge-conditional">شرطي</span>
              </div>
              <MultiChipSelector options={PREV_PLATFORM_OPTIONS} selected={prevPlatforms} onChange={setPrevPlatforms} />
            </div>

            <div className="form-field-group">
              <div className="field-label-row">
                <label className="field-title">
                  <span className="field-icon">📈</span>
                  <span>نتائج وتحديات الحملات السابقة</span>
                  <span className="req-star" style={{ color: '#FBBF24' }}>*</span>
                </label>
                <span className="field-req-badge badge-conditional">شرطي</span>
              </div>
              <textarea
                className="form-control"
                rows={2}
                placeholder="اكتب تكلفة النقرة/التحويل التي حققتها، وما هي التحديات التي واجهتك..."
                value={prevResults}
                onChange={(e) => setPrevResults(e.target.value)}
              />
              <FileUploadBox
                label="تقارير سابقة"
                hideLabel
                uploadTitle="أو ارفع تقارير الأداء السابقة (PDF / Excel / Images)"
                icon="📊"
                accept=".pdf,.xlsx,.csv,image/*"
                multiple
                files={prevReports}
                onFilesChange={setPrevReports}
              />
            </div>
          </div>
        </div>

        <UrlRepeater
          label="روابط المنافسين أو إعلانات تعجبك"
          placeholder="https://competitor.com أو حساب منافس"
          urls={competitorUrls}
          onChange={setCompetitorUrls}
          addButtonLabel="➕ إضافة رابط منافس آخر"
        />
      </div>
    </ServiceDetailLayout>
  );
}
