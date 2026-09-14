'use client';

import React, { useState } from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';
import MultiChipSelector from '@/components/services/MultiChipSelector';
import FileUploadBox from '@/components/services/FileUploadBox';
import UrlRepeater from '@/components/services/UrlRepeater';
import FormField from '@/components/services/FormField';
import QuestionnaireSection from '@/components/services/QuestionnaireSection';
import YesNoToggle, { ConditionalReveal } from '@/components/services/YesNoToggle';
import { getServiceBySlug } from '@/data/services';

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

export default function DigitalMarketingOrder() {
  const service = getServiceBySlug('digital-marketing');

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
      <QuestionnaireSection
        step="01"
        icon="🎯"
        title="أهداف الحملة، النشاط والميزانية"
        desc="تحديد مؤشرات الأداء المستهدفة (KPIs) والميزانية التشغيلية لمنصات الإعلانات"
      >
        <FormField label="الهدف الأساسي من الحملة الإعلانية" icon="🎯" requirement="required">
          <select className="form-control" value={campaignGoal} onChange={(e) => setCampaignGoal(e.target.value)}>
            <option value="مبيعات مباشرة (Purchases / E-commerce Sales)">مبيعات مباشرة للمتاجر (Sales / Purchases)</option>
            <option value="توليد عملاء محتملين (Leads Generation)">توليد واستقبال عملاء مهتمين (Leads Generation)</option>
            <option value="محادثات واتساب مباشرة (WhatsApp Messages)">محادثات واتساب ومراسلات فورية (WhatsApp Messages)</option>
            <option value="تحميل وتثبيت التطبيقات (App Installs)">تحميل وتثبيت التطبيقات (App Installs)</option>
            <option value="شهرة وانتشار العلامة (Brand Awareness)">شهرة وانتشار العلامة التجارية (Brand Awareness)</option>
            <option value="زيارات للموقع أو الفرع (Traffic / Store Visits)">زيارات للموقع أو الفروع (Traffic / Store Visits)</option>
            <option value="أخرى">هدف آخر مخصص</option>
          </select>
        </FormField>

        <FormField label="المنتج أو الخدمة المراد الإعلان عنها" icon="🛍️" requirement="required">
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب اسم المنتج/الخدمة، أبرز المميزات ونقاط القوة التنافسية..."
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
          />
        </FormField>

        <FormField label="الميزانية الإعلانية المقترحة للمنصات" icon="💵" requirement="required">
          <div className="form-inline-row">
            <input
              type="number"
              className="form-control form-flex-2"
              placeholder="مثال: 3000"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
            />
            <select
              className="form-control form-flex-1"
              value={budgetCurrency}
              onChange={(e) => setBudgetCurrency(e.target.value)}
            >
              <option value="SAR (ريال سعودي)">SAR (ر.س)</option>
              <option value="AED (درهم إماراتي)">AED (د.إ)</option>
              <option value="USD (دولار)">USD ($)</option>
              <option value="KWD (دينار)">KWD (د.ك)</option>
              <option value="EGP (جنيه)">EGP (ج.م)</option>
            </select>
          </div>
        </FormField>

        <FormField label="مدة تشغيل الحملة الإعلانية المقترحة" icon="⏱️" requirement="required">
          <div className="form-inline-row">
            <input
              type="number"
              className="form-control form-flex-1"
              placeholder="عدد الأيام"
              value={durationDays}
              min={3}
              max={180}
              onChange={(e) => setDurationDays(e.target.value)}
            />
            <span className="form-suffix-label">أيام تشغيل</span>
          </div>
        </FormField>

        <FormField label="رابط صفحة الهبوط أو المتجر المستهدف للإعلانات" icon="🌐" requirement="optional">
          <input
            type="url"
            className="form-control"
            placeholder="https://yourstore.com/offer"
            value={landingUrl}
            onChange={(e) => setLandingUrl(e.target.value)}
            dir="ltr"
          />
        </FormField>

        <UrlRepeater
          label="روابط حسابات السوشيال ميديا الحالية"
          placeholder="https://instagram.com/yourbrand"
          urls={socialUrls}
          onChange={setSocialUrls}
          addButtonLabel="➕ إضافة رابط حساب آخر"
        />
      </QuestionnaireSection>

      <QuestionnaireSection
        step="02"
        icon="🌍"
        title="الاستهداف الجغرافي والجمهور"
        desc="تحديد الشريحة المستهدفة والاهتمامات والدول والمدن لرفع معدل التحويل"
      >
        <FormField label="وصف واهتمامات الجمهور المستهدف" icon="👥" requirement="required">
          <textarea
            className="form-control"
            rows={2}
            placeholder="الاهتمامات، السلوك الشرائي، المشاكل التي يحلها المنتج لجمهورك..."
            value={audienceDesc}
            onChange={(e) => setAudienceDesc(e.target.value)}
          />
        </FormField>

        <FormField label="الدول المستهدفة بالإعلانات" icon="🌍" requirement="required">
          <MultiChipSelector options={COUNTRY_OPTIONS} selected={targetCountries} onChange={setTargetCountries} />
        </FormField>

        <FormField label="مدن محددة للاستهداف" icon="🏙️" requirement="optional">
          <input
            type="text"
            className="form-control"
            placeholder="مثال: الرياض، جدة، الدمام، دبي، أبوظبي، الكويت... أو اتركها فارغة لكافة المدن"
            value={cities}
            onChange={(e) => setCities(e.target.value)}
          />
        </FormField>

        <FormField label="الفئات العمرية المستهدفة" icon="🎂" requirement="optional">
          <MultiChipSelector options={AGE_OPTIONS} selected={ageBrackets} onChange={setAgeBrackets} />
        </FormField>

        <FormField label="الجنس / النوع المستهدف" icon="🚻" requirement="optional">
          <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="الجميع (رجال وسيدات)">الجميع (رجال وسيدات)</option>
            <option value="رجال فقط">رجال فقط (Men Only)</option>
            <option value="سيدات فقط">سيدات فقط (Women Only)</option>
          </select>
        </FormField>
      </QuestionnaireSection>

      <QuestionnaireSection
        step="03"
        icon="🎨"
        title="العروض، المواد الإعلانية وسجل الإعلانات"
        desc="تجهيز المواد الإعلانية، مراجعة الحملات السابقة، وتحليل المنافسين"
      >
        <FormField label="تفاصيل العرض الترويجي والخصم" icon="🎁" requirement="optional">
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب العرض الجذاب (مثال: خصم 30%، اشتري 1 واحصل على 1 مجاناً، كود خصم، شحن مجاني)..."
            value={promoOffer}
            onChange={(e) => setPromoOffer(e.target.value)}
          />
        </FormField>

        <FormField label="سعر المنتج في الإعلان (إن وجد)" icon="🏷️" requirement="optional">
          <input
            type="number"
            className="form-control"
            placeholder="مثال: 199"
            value={priceNumber}
            onChange={(e) => setPriceNumber(e.target.value)}
          />
        </FormField>

        <FormField
          label="هل تحتاج تصاميم وفيديوهات إعلانية (Creatives) من فريقنا؟"
          icon="🎨"
          requirement="required"
        >
          <YesNoToggle
            value={needCreatives}
            onChange={setNeedCreatives}
            yesLabel="نعم (صمموا لي المواد الإعلانية)"
            noLabel="لا (المواد الإعلانية جاهزة لدي)"
          />
        </FormField>

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

        <FormField
          label="هل سبق لك تشغيل إعلانات ممولة من قبل؟"
          icon="📊"
          requirement="required"
        >
          <YesNoToggle
            value={hasRunAdsBefore}
            onChange={setHasRunAdsBefore}
            yesLabel="نعم (لدي حملات سابقة)"
            noLabel="لا (أول تجربة إعلانية)"
          />

          <ConditionalReveal show={hasRunAdsBefore === 'yes'}>
            <FormField label="المنصات السابقة التي أعلنت عليها" icon="📱" requirement="conditional">
              <MultiChipSelector options={PREV_PLATFORM_OPTIONS} selected={prevPlatforms} onChange={setPrevPlatforms} />
            </FormField>

            <FormField label="نتائج وتحديات الحملات السابقة" icon="📈" requirement="conditional">
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
            </FormField>
          </ConditionalReveal>
        </FormField>

        <UrlRepeater
          label="روابط المنافسين أو إعلانات تعجبك"
          placeholder="https://competitor.com أو حساب منافس"
          urls={competitorUrls}
          onChange={setCompetitorUrls}
          addButtonLabel="➕ إضافة رابط منافس آخر"
        />
      </QuestionnaireSection>
    </ServiceDetailLayout>
  );
}
