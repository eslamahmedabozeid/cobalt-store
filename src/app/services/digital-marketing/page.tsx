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
    title: 'استهداف ذكي لتحقيق أعلى عائد',
    desc: 'نعتمد على بكسل التتبع وشرائح الجمهور المخصص لخفض تكلفة الاكتساب وزيادة المبيعات.'
  },
  {
    icon: '📊',
    title: 'تقارير أداء ومتابعة مستمرة',
    desc: 'تقارير يومية ولوحة بيانات توضح عدد النقرات، المبيعات، ومعدل التحويل بدقة 100%.'
  },
  {
    icon: '⚙️',
    title: 'تحسين الـ A/B Testing مستمر',
    desc: 'اختبار عناوين وفيديوهات وتصاميم متعددة للوصول لأفضل تركيبة إعلانية تحقق الربح.'
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
    >
      {/* Section 1 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎯</span> 1. أهداف الحملة، النشاط والميزانية
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🎯 الهدف الأساسي من الحملة الإعلانية <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <select className="form-control" value={campaignGoal} onChange={(e) => setCampaignGoal(e.target.value)}>
            <option value="مبيعات مباشرة (Purchases / E-commerce Sales)">مبيعات مباشرة (Sales / Purchases)</option>
            <option value="توليد عملاء محتملين (Leads Generation)">توليد عملاء محتملين (Leads)</option>
            <option value="محادثات واتساب مباشرة (WhatsApp Messages)">محادثات واتساب مباشرة (WhatsApp)</option>
            <option value="تحميل وتثبيت التطبيقات (App Installs)">تحميل وتثبيت التطبيقات (App Installs)</option>
            <option value="شهرة وانتشار العلامة (Brand Awareness)">شهرة وانتشار العلامة (Awareness)</option>
            <option value="زيارات للموقع أو الفرع (Traffic / Store Visits)">زيارات للموقع أو الفرع (Traffic)</option>
            <option value="أخرى">أخرى</option>
          </select>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🛍️ المنتج أو الخدمة المراد الإعلان عنها <span style={{ color: '#F87171' }}>*</span></label>
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
            <label className="field-title">💵 الميزانية الإعلانية المقترحة للمنصات <span style={{ color: '#F87171' }}>*</span></label>
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
            <label className="field-title">⏱️ مدة تشغيل الحملة الإعلانية <span style={{ color: '#F87171' }}>*</span></label>
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
            <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 700 }}>أيام عمل</span>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🌐 رابط الموقع أو المتجر المستهدف للإعلانات</label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <input
            type="url"
            className="form-control"
            placeholder="https://yourstore.com/offer"
            value={landingUrl}
            onChange={(e) => setLandingUrl(e.target.value)}
          />
        </div>

        <UrlRepeater
          label="📱 روابط حسابات السوشيال ميديا الحالية"
          placeholder="https://instagram.com/yourbrand"
          urls={socialUrls}
          onChange={setSocialUrls}
          addButtonLabel="➕ إضافة رابط حساب آخر"
        />
      </div>

      {/* Section 2 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🌍</span> 2. الاستهداف الجغرافي والجمهور
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">👥 وصف واهتمامات الجمهور المستهدف <span style={{ color: '#F87171' }}>*</span></label>
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
            <label className="field-title">🌍 الدول المستهدفة بالإعلانات <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <MultiChipSelector options={COUNTRY_OPTIONS} selected={targetCountries} onChange={setTargetCountries} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🏙️ مدن محددة للاستهداف</label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="مثال: الرياض، جدة، الدمام، دبي، أبوظبي، الكويت... أو اتركها لكافة المدن"
            value={cities}
            onChange={(e) => setCities(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🎂 الفئات العمرية المستهدفة</label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <MultiChipSelector options={AGE_OPTIONS} selected={ageBrackets} onChange={setAgeBrackets} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🚻 الجنس / النوع المستهدف</label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="الجميع (رجال وسيدات)">الجميع (رجال وسيدات)</option>
            <option value="رجال فقط">رجال فقط (Men Only)</option>
            <option value="سيدات فقط">سيدات فقط (Women Only)</option>
          </select>
        </div>
      </div>

      {/* Section 3 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎨</span> 3. العروض، المواد الإعلانية وسجل الإعلانات
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🎁 تفاصيل العرض الترويجي والخصم</label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب العرض الجذاب (مثال: خصم 30%، اشتري 1 واحصل على 1 مجاناً، شحن مجاني)..."
            value={promoOffer}
            onChange={(e) => setPromoOffer(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🏷️ سعر المنتج في الإعلان (إن وجد)</label>
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
            <label className="field-title">🎨 هل تحتاج تصاميم وفيديوهات إعلانية (Creatives) من فريقنا؟ <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button type="button" className={`switch-toggle-btn ${needCreatives === 'yes' ? 'active' : ''}`} onClick={() => setNeedCreatives('yes')}>نعم (صمموا لي المواد الإعلانية)</button>
            <button type="button" className={`switch-toggle-btn ${needCreatives === 'no' ? 'active' : ''}`} onClick={() => setNeedCreatives('no')}>لا (المواد الإعلانية جاهزة لدي)</button>
          </div>
        </div>

        <FileUploadBox
          label="📸 رفع صور وتصاميم الإعلانات الجاهزة"
          uploadTitle="ارفع تصاميم البوستات والبانرات الإعلانية"
          icon="🖼️"
          accept="image/*,.zip"
          multiple
          files={adImages}
          onFilesChange={setAdImages}
        />

        <FileUploadBox
          label="🎥 رفع فيديوهات وريلز الإعلانات"
          uploadTitle="ارفع الفيديوهات الإعلانية (MP4 / MOV / Drive Link)"
          icon="🎬"
          accept="video/*,.zip"
          multiple
          files={adVideos}
          onFilesChange={setAdVideos}
        />

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">📊 هل سبق لك تشغيل إعلانات ممولة من قبل؟ <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button type="button" className={`switch-toggle-btn ${hasRunAdsBefore === 'no' ? 'active' : ''}`} onClick={() => setHasRunAdsBefore('no')}>لا (أول تجربة إعلانية)</button>
            <button type="button" className={`switch-toggle-btn ${hasRunAdsBefore === 'yes' ? 'active' : ''}`} onClick={() => setHasRunAdsBefore('yes')}>نعم (لدي حملات سابقة)</button>
          </div>

          <div className={`conditional-field-wrapper ${hasRunAdsBefore === 'yes' ? 'active' : ''}`}>
            <div className="form-field-group">
              <div className="field-label-row">
                <label className="field-title">📱 المنصات السابقة التي أعلنت عليها <span style={{ color: '#FBBF24' }}>*</span></label>
                <span className="field-req-badge badge-conditional">شرطي</span>
              </div>
              <MultiChipSelector options={PREV_PLATFORM_OPTIONS} selected={prevPlatforms} onChange={setPrevPlatforms} />
            </div>

            <div className="form-field-group">
              <div className="field-label-row">
                <label className="field-title">📈 نتائج وتحديات الحملات السابقة <span style={{ color: '#FBBF24' }}>*</span></label>
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
                uploadTitle={<span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-light)' }}>أو ارفع تقارير الأداء السابقة (PDF / Excel / Images)</span>}
                accept=".pdf,.xlsx,.csv,image/*"
                multiple
                files={prevReports}
                onFilesChange={setPrevReports}
              />
            </div>
          </div>
        </div>

        <UrlRepeater
          label="🔍 روابط المنافسين أو إعلانات تعجبك"
          placeholder="https://competitor.com أو حساب منافس"
          urls={competitorUrls}
          onChange={setCompetitorUrls}
          addButtonLabel="➕ إضافة رابط منافس آخر"
        />
      </div>
    </ServiceDetailLayout>
  );
}
