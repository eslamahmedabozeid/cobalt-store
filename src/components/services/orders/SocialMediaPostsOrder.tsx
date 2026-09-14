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
    icon: '📁',
    title: 'ملكية كاملة لكافة الملفات والمصادر',
    desc: 'تسليم ملفات التصاميم المصدرية المفتوحة وقوالب العمل بجودة عالية فور الاعتماد.'
  },
  {
    icon: '⏱️',
    title: 'التزام تام بالخطة الزمنية',
    desc: 'تسليم البوستات والستوريز والمحتوى الإعلاني في الموعد المحدد دون أي تأخير.'
  },
  {
    icon: '🔄',
    title: 'تعديلات مستمرة حتى الرضا',
    desc: 'تعديلات ومراجعات مجانية متواصلة حتى الوصول للشكل والنسق الجذاب المناسب لهوية حسابك.'
  }
];

const PLATFORM_OPTIONS = [
  { value: 'انستقرام Instagram', label: 'انستقرام (Instagram)' },
  { value: 'سناب شات Snapchat', label: 'سناب شات (Snapchat)' },
  { value: 'تيك توك TikTok', label: 'تيك توك (TikTok)' },
  { value: 'إكس / تويتر X', label: 'إكس (Twitter / X)' },
  { value: 'لينكد إن LinkedIn', label: 'لينكد إن (LinkedIn)' },
  { value: 'فيسبوك Facebook', label: 'فيسبوك (Facebook)' },
  { value: 'يوتيوب YouTube', label: 'يوتيوب (YouTube)' },
  { value: 'بينترست Pinterest', label: 'بينترست (Pinterest)' }
];

const GOAL_OPTIONS = [
  { value: 'مبيعات Direct Sales', label: 'مبيعات مباشرة (Sales)' },
  { value: 'انتشار Brand Awareness', label: 'انتشار وشهرة (Awareness)' },
  { value: 'تفاعل Engagement', label: 'تفاعل ومتابعين (Engagement)' },
  { value: 'جمع بيانات عملاء Leads', label: 'عملاء محتملين (Leads)' },
  { value: 'زيارات للموقع / المتجر Traffic', label: 'زيارات للموقع (Traffic)' }
];

export default function SocialMediaPostsOrder() {
  const service = getServiceBySlug('social-media-posts');

  const [platforms, setPlatforms] = useState<string[]>(['انستقرام Instagram']);
  const [currentAccounts, setCurrentAccounts] = useState<string[]>(['']);
  const [serviceType, setServiceType] = useState('محتوى + تصميم');
  const [activityField, setActivityField] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [mainGoals, setMainGoals] = useState<string[]>([
    'مبيعات Direct Sales',
    'انتشار Brand Awareness'
  ]);
  const [keyProducts, setKeyProducts] = useState('');
  const [hasOffers, setHasOffers] = useState<'yes' | 'no'>('no');
  const [offersDetails, setOffersDetails] = useState('');
  const [language, setLanguage] = useState('العربية (Arabic)');
  const [toneOfVoice, setToneOfVoice] = useState('عصري وشبابي');
  const [logoFiles, setLogoFiles] = useState<string[]>([]);
  const [brandFiles, setBrandFiles] = useState<string[]>([]);
  const [productFiles, setProductFiles] = useState<string[]>([]);
  const [videoFiles, setVideoFiles] = useState<string[]>([]);
  const [priceFiles, setPriceFiles] = useState<string[]>([]);
  const [refAccounts, setRefAccounts] = useState<string[]>(['']);

  const validateFields = () => {
    if (!platforms.length) {
      return { valid: false, message: '⚠️ يرجى تحديد منصة واحدة على الأقل من المنصات المطلوبة' };
    }
    if (!activityField.trim()) {
      return { valid: false, message: '⚠️ يرجى إدخال مجال النشاط' };
    }
    if (!targetAudience.trim()) {
      return { valid: false, message: '⚠️ يرجى تحديد الجمهور المستهدف' };
    }
    if (!mainGoals.length) {
      return { valid: false, message: '⚠️ يرجى تحديد الهدف الرئيسي من الحساب' };
    }
    if (!keyProducts.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة أهم المنتجات / الخدمات' };
    }
    if (hasOffers === 'yes' && !offersDetails.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة تفاصيل العروض والخصومات' };
    }

    const allUploadedFiles = [...logoFiles, ...brandFiles, ...productFiles, ...videoFiles, ...priceFiles];

    return {
      valid: true,
      customData: {
        'الخدمة': 'السوشيال ميديا (تصميم وإدارة محتوى)',
        'المنصات المطلوبة': platforms.join(', '),
        'روابط الحسابات الحالية': currentAccounts.filter(Boolean).join(' | ') || 'غير مدخل',
        'مجال النشاط': activityField,
        'الجمهور المستهدف': targetAudience,
        'نوع الخدمة': serviceType,
        'الهدف الرئيسي': mainGoals.join(', '),
        'أهم الخدمات والمنتجات': keyProducts,
        'هل توجد عروض؟': hasOffers === 'yes' ? `نعم - (${offersDetails})` : 'لا توجد عروض',
        'اللغة': language,
        'Tone of Voice': toneOfVoice,
        'الشعار المرفوع': logoFiles.join(', ') || 'سيتم إرساله لاحقاً',
        'ملفات الهوية والمرفقات': allUploadedFiles.join(', ') || 'لا يوجد',
        'الحسابات المرجعية': refAccounts.filter(Boolean).join(' | ') || 'لا يوجد'
      }
    };
  };

  return (
    <ServiceDetailLayout
      service={service}
      onValidateCustomFields={validateFields}
      guaranteesTitle="ضمانات كوبالت لخدمات منشورات السوشيال ميديا"
      pageGuarantees={PAGE_GUARANTEES}
      stepLabels={['المنصات والخدمة', 'النشاط والجمهور', 'العروض والنبرة', 'الملفات والمرفقات']}
    >
      <QuestionnaireSection
        step="01"
        icon="🌐"
        title="المنصات المطلوبة ونوع الخدمة"
        desc="حدد قنوات التواصل المستهدفة وطبيعة الخدمة المطلوبة لحساباتك"
      >
        <FormField label="المنصات المطلوبة للنشر والتصميم" icon="📱" requirement="required">
          <MultiChipSelector options={PLATFORM_OPTIONS} selected={platforms} onChange={setPlatforms} />
        </FormField>

        <UrlRepeater
          label="روابط الحسابات الحالية على وسائل التواصل"
          placeholder="https://instagram.com/youraccount"
          urls={currentAccounts}
          onChange={setCurrentAccounts}
          addButtonLabel="➕ إضافة رابط حساب آخر"
        />

        <FormField label="نوع الخدمة المطلوبة" icon="🛠️" requirement="required">
          <select className="form-control" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
            <option value="محتوى + تصميم">محتوى بيعي + تصاميم جرافيك مميزة (Content Writing + Design)</option>
            <option value="تصميم فقط">تصميم جرافيك فقط (Graphic Design Only)</option>
            <option value="إدارة كاملة">إدارة ونشر متكاملة (Full Management + Posting + Interaction)</option>
          </select>
        </FormField>
      </QuestionnaireSection>

      <QuestionnaireSection
        step="02"
        icon="🎯"
        title="تفاصيل النشاط والجمهور المستهدف"
        desc="توضيح مجال العمل وخصائص العملاء المستهدفين لبناء استراتيجية محتوى جذابة"
      >
        <FormField label="مجال النشاط والقطاع التجاري" icon="🏢" requirement="required">
          <input
            type="text"
            className="form-control"
            placeholder="مثال: متجر عطور فاخرة، شركة عقارية، عيادة أسنان، تطبيق توصيل..."
            value={activityField}
            onChange={(e) => setActivityField(e.target.value)}
          />
        </FormField>

        <FormField label="الجمهور والعملاء المستهدفين" icon="👥" requirement="required">
          <textarea
            className="form-control"
            rows={3}
            placeholder="حدد فئة عملائك: الفئات العمرية، الاهتمامات، النطاق الجغرافي (رجال/نساء، مهتمين بالتقنية أو الموضة)..."
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />
        </FormField>

        <FormField label="الهدف الرئيسي من التواجد الرقمي" icon="🚀" requirement="required">
          <MultiChipSelector options={GOAL_OPTIONS} selected={mainGoals} onChange={setMainGoals} />
        </FormField>

        <FormField label="أهم الخدمات / المنتجات المراد التركيز عليها" icon="✨" requirement="required">
          <textarea
            className="form-control"
            rows={3}
            placeholder="أذكر أبرز 3-5 خدمات أو منتجات تريد التركيز على إبراز مميزاتها في المنشورات..."
            value={keyProducts}
            onChange={(e) => setKeyProducts(e.target.value)}
          />
        </FormField>
      </QuestionnaireSection>

      <QuestionnaireSection
        step="03"
        icon="🗣️"
        title="العروض ونبرة التخاطب واللغة"
        desc="ضبط اللهجة ونبرة الخطاب التي تناسب علامتك وتصل للجمهور بفاعلية"
      >
        <FormField label="هل توجد عروض حالية أو خصومات ترويجية؟" icon="🏷️" requirement="required">
          <YesNoToggle
            value={hasOffers}
            onChange={setHasOffers}
            noLabel="لا (محتوى تعريفي عام)"
            yesLabel="نعم (لدينا عروض وخصومات)"
          />

          <ConditionalReveal show={hasOffers === 'yes'}>
            <FormField label="تفاصيل العروض والخصومات" icon="📝" requirement="conditional">
              <textarea
                className="form-control"
                rows={2}
                placeholder="اكتب تفاصيل الخصم، كود العرض، مدة العرض أو الباقات الترويجية..."
                value={offersDetails}
                onChange={(e) => setOffersDetails(e.target.value)}
              />
            </FormField>
          </ConditionalReveal>
        </FormField>

        <FormField label="لغة المحتوى والتصاميم" icon="🌐" requirement="required">
          <select className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="العربية (Arabic)">العربية (Arabic)</option>
            <option value="الإنجليزية (English)">الإنجليزية (English)</option>
            <option value="ثنائي اللغة (عربي + إنجليزي)">كلاهما (عربي + إنجليزي)</option>
            <option value="لغة أخرى">لغة أخرى</option>
          </select>
        </FormField>

        <FormField label="نبرة التخاطب (Tone of Voice)" icon="🎙️" requirement="optional">
          <select className="form-control" value={toneOfVoice} onChange={(e) => setToneOfVoice(e.target.value)}>
            <option value="عصري وشبابي">عصري وشبابي وتفاعلي (Modern & Engaging)</option>
            <option value="رسمي ومؤسسي">رسمي ومؤسسي وقوي (Corporate & Professional)</option>
            <option value="ودود وقريب للعميل">ودود وقريب وبسيط (Friendly & Warm)</option>
            <option value="تسويقي ومحفز">تسويقي ومحفز للشراء (Persuasive & Sales-driven)</option>
            <option value="فاخر وراقي">فاخر وراقي (Luxury & High-end)</option>
          </select>
        </FormField>
      </QuestionnaireSection>

      <QuestionnaireSection
        step="04"
        icon="📁"
        title="الملفات والمرفقات والحسابات المرجعية"
        desc="إرفاق الشعار، صور المنتجات، ودليل الهوية لضمان تناسق وجودة التصاميم"
      >
        <FileUploadBox
          label="الشعار (Logo) بدقة عالية"
          uploadTitle={
            <>
              اسحب ملف الشعار هنا أو{' '}
              <span className="upload-browse-link">تصفح من جهازك</span>
            </>
          }
          sublabel="(PNG بخلفية شفافة, AI, EPS, SVG, PDF)"
          accept="image/*,.ai,.eps,.pdf,.svg"
          files={logoFiles}
          onFilesChange={setLogoFiles}
          required
        />

        <FileUploadBox
          label="دليل الهوية البصرية (Brand Guidelines)"
          uploadTitle="ارفع ملف ألوان وخطوط الهوية (PDF / AI / ZIP)"
          icon="🎨"
          accept=".pdf,.ai,.zip,.png,.jpg"
          files={brandFiles}
          onFilesChange={setBrandFiles}
        />

        <FileUploadBox
          label="صور المنتجات والمواد الخام"
          uploadTitle="ارفع صور المنتجات عالية الجودة (يمكنك تحديد عدة صور)"
          icon="📸"
          accept="image/*,.zip"
          multiple
          files={productFiles}
          onFilesChange={setProductFiles}
        />

        <FileUploadBox
          label="مقاطع الفيديو والمونتاج إن وجدت"
          uploadTitle="ارفع مقاطع الفيديو (MP4 / MOV / Drive Link)"
          icon="🎥"
          accept="video/*,.zip"
          multiple
          files={videoFiles}
          onFilesChange={setVideoFiles}
        />

        <FileUploadBox
          label="قائمة الأسعار والمنيو (Price List / Menu)"
          uploadTitle="ارفع ملف الأسعار (PDF / Excel / Images)"
          icon="💰"
          accept=".pdf,.xls,.xlsx,.csv,image/*"
          files={priceFiles}
          onFilesChange={setPriceFiles}
        />

        <UrlRepeater
          label="حسابات أو تصاميم مرجعية تفضل أسلوبها"
          placeholder="https://instagram.com/inspirational_account"
          urls={refAccounts}
          onChange={setRefAccounts}
          addButtonLabel="➕ إضافة رابط حساب مرجعي آخر"
        />
      </QuestionnaireSection>
    </ServiceDetailLayout>
  );
}
