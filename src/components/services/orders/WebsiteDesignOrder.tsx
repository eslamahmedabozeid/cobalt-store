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
    title: 'ملكية السورس كود والتصميم 100%',
    desc: 'تسليم كافة الملفات المصدرية للأكواد والتصميم (Figma, React/Next.js Source Code) فور الاعتماد.'
  },
  {
    icon: '⏱️',
    title: 'سرعة وأداء فائق متوافق مع SEO',
    desc: 'نضمن سرعة تحميل خارقة على Google PageSpeed وتصفح متجاوب بالكامل مع كافة الشاشات والموبايل.'
  },
  {
    icon: '🔄',
    title: 'دعم فني وصيانة مجانية',
    desc: 'دعم فني وضمان استقرار ونسخ احتياطي ومتابعة لمدة شهر كامل بعد إطلاق الموقع مجاناً.'
  }
];

const PAGE_OPTIONS = [
  { value: 'الرئيسية (Home)', label: 'الرئيسية (Home)' },
  { value: 'من نحن (About Us)', label: 'من نحن (About Us)' },
  { value: 'الخدمات (Services)', label: 'الخدمات (Services)' },
  { value: 'سابقة الأعمال / المعرض (Portfolio)', label: 'سابقة الأعمال (Portfolio)' },
  { value: 'المدونة والمقالات (Blog)', label: 'المدونة (Blog)' },
  { value: 'اتصل بنا (Contact Us)', label: 'اتصل بنا (Contact Us)' },
  { value: 'الأسئلة الشائعة (FAQ)', label: 'الأسئلة الشائعة (FAQ)' },
  { value: 'فريق العمل (Our Team)', label: 'فريق العمل (Our Team)' },
  { value: 'حجز موعد / استشارة (Booking)', label: 'حجز موعد (Booking)' },
  { value: 'صفحة أخرى مخصصة', label: 'أخرى مخصصة' }
];

const FEATURE_OPTIONS = [
  { value: 'استمارة تواصل (Contact / Form)', label: 'نموذج تواصل (Contact Form)' },
  { value: 'زر واتساب مباشر (WhatsApp)', label: 'واتساب مباشر (WhatsApp)' },
  { value: 'بوابة دفع إلكتروني (Payment)', label: 'بوابة دفع (Payment)' },
  { value: 'نظام حجز ومواعيد (Booking)', label: 'نظام حجوزات (Booking)' },
  { value: 'خرائط جوجل (Google Maps)', label: 'خرائط جوجل (Maps)' },
  { value: 'مدونة مقالات (Blog)', label: 'مدونة مقالات (Blog)' },
  { value: 'شات ومحادثة حية (Live Chat)', label: 'محادثة حية (Live Chat)' },
  { value: 'نشرة بريدية (Newsletter)', label: 'نشرة بريدية (Newsletter)' },
  { value: 'حسابات وتسجيل أعضاء (User Accounts)', label: 'حسابات مستخدمين (Accounts)' },
  { value: 'تعدد اللغات (Multilingual)', label: 'تعدد لغات (Multilingual)' },
  { value: 'خصائص برمجية أخرى (Other)', label: 'وظائف أخرى مخصصة' }
];

export default function WebsiteDesignOrder() {
  const service = getServiceBySlug('website-design');

  const [siteType, setSiteType] = useState('شركة (Corporate Website)');
  const [projectName, setProjectName] = useState('');
  const [activityDesc, setActivityDesc] = useState('');
  const [logoFiles, setLogoFiles] = useState<string[]>([]);
  const [brandFiles, setBrandFiles] = useState<string[]>([]);
  const [hasCurrentSite, setHasCurrentSite] = useState<'yes' | 'no'>('no');
  const [currentSiteUrl, setCurrentSiteUrl] = useState('');
  const [pages, setPages] = useState<string[]>([
    'الرئيسية (Home)',
    'من نحن (About Us)',
    'الخدمات (Services)',
    'اتصل بنا (Contact Us)'
  ]);
  const [contentReady, setContentReady] = useState('جزئي');
  const [contentFiles, setContentFiles] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<string[]>([]);
  const [videoFiles, setVideoFiles] = useState<string[]>([]);
  const [language, setLanguage] = useState('العربية (Arabic)');
  const [refUrls, setRefUrls] = useState<string[]>(['']);
  const [features, setFeatures] = useState<string[]>([
    'زر واتساب مباشر (WhatsApp)',
    'استمارة تواصل (Contact / Form)',
    'خرائط جوجل (Google Maps)'
  ]);
  const [hasDomain, setHasDomain] = useState<'yes' | 'no'>('no');
  const [domainName, setDomainName] = useState('');
  const [hasHosting, setHasHosting] = useState<'yes' | 'no'>('no');
  const [hostingProvider, setHostingProvider] = useState('');

  const validateFields = () => {
    if (!projectName.trim()) {
      return { valid: false, message: '⚠️ يرجى إدخال اسم المشروع / الشركة' };
    }
    if (!activityDesc.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة وصف النشاط والخدمات' };
    }
    if (hasCurrentSite === 'yes' && !currentSiteUrl.trim()) {
      return { valid: false, message: '⚠️ يرجى إدخال رابط الموقع الحالي' };
    }
    if (!pages.length) {
      return { valid: false, message: '⚠️ يرجى تحديد صفحة واحدة على الأقل من الصفحات المطلوبة' };
    }
    if (!features.length) {
      return { valid: false, message: '⚠️ يرجى تحديد الوظائف والخصائص المطلوبة' };
    }
    if (hasDomain === 'yes' && !domainName.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة اسم الدومين المحجوز' };
    }
    if (hasHosting === 'yes' && !hostingProvider.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة اسم مزود الاستضافة' };
    }

    const allUploadedFiles = [...logoFiles, ...brandFiles, ...contentFiles, ...photoFiles, ...videoFiles];

    return {
      valid: true,
      customData: {
        'الخدمة': 'تصميم وتطوير موقع إلكتروني',
        'نوع الموقع': siteType,
        'اسم المشروع': projectName,
        'وصف النشاط': activityDesc,
        'هل يوجد موقع حالي؟': hasCurrentSite === 'yes' ? `نعم (${currentSiteUrl})` : 'لا',
        'الصفحات المطلوبة': pages.join(', '),
        'حالة المحتوى': contentReady,
        'اللغة': language,
        'الوظائف المطلوبة': features.join(', '),
        'الدومين': hasDomain === 'yes' ? `نعم (${domainName})` : 'غير محجوز (مطلوب جديد)',
        'الاستضافة': hasHosting === 'yes' ? `نعم (${hostingProvider})` : 'غير متوفرة (مطلوبة جديدة)',
        'الشعار والمرفقات': allUploadedFiles.join(', ') || 'لا يوجد',
        'المواقع المرجعية': refUrls.filter(Boolean).join(' | ') || 'لا يوجد'
      }
    };
  };

  return (
    <ServiceDetailLayout
      service={service}
      onValidateCustomFields={validateFields}
      guaranteesTitle="ضمانات كوبالت لخدمات تصميم وتطوير المواقع"
      pageGuarantees={PAGE_GUARANTEES}
      stepLabels={['هوية ونوع الموقع', 'الصفحات والمحتوى', 'الوظائف والاستضافة']}
    >
      {/* Section 1: Project Identity */}
      <QuestionnaireSection
        step="01"
        icon="🏢"
        title="نوع الموقع وهوية المشروع"
        desc="حدد نوع الموقع وطبيعة نشاط الشركة لتهيئة التصميم والهيكل العام للمشروع"
      >
        <FormField label="نوع الموقع المطلوب" icon="🌐" requirement="required">
          <select className="form-control" value={siteType} onChange={(e) => setSiteType(e.target.value)}>
            <option value="شركة (Corporate Website)">موقع شركة ومؤسسة (Corporate Website)</option>
            <option value="صفحة هبوط (Landing Page)">صفحة هبوط تسويقية (Landing Page)</option>
            <option value="معرض أعمال (Portfolio)">معرض أعمال وسيرة مهنية (Portfolio)</option>
            <option value="موقع خدمات (Services Site)">موقع عرض وحجز خدمات (Services Site)</option>
            <option value="موقع حجوزات ومواعيد (Booking)">موقع حجوزات ومواعيد واستشارات (Booking)</option>
            <option value="أخرى (Other)">نوع آخر مخصص (Other)</option>
          </select>
        </FormField>

        <FormField label="اسم المشروع / الشركة" icon="🏷️" requirement="required">
          <input
            type="text"
            className="form-control"
            placeholder="اكتب الاسم التجاري أو اسم المنشأة..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </FormField>

        <FormField label="وصف النشاط والخدمات" icon="📝" requirement="required">
          <textarea
            className="form-control"
            rows={3}
            placeholder="نبذة تعريفية عن الشركة، ما تقدمه من خدمات، ورسالتها الأساسية للزوار..."
            value={activityDesc}
            onChange={(e) => setActivityDesc(e.target.value)}
          />
        </FormField>

        <FileUploadBox
          label="الشعار الرسمي (Logo)"
          uploadTitle="ارفع ملف الشعار بدقة عالية (PNG شفاف، AI، SVG، PDF)"
          icon="🖼️"
          accept="image/*,.ai,.svg,.pdf"
          files={logoFiles}
          onFilesChange={setLogoFiles}
          required
        />

        <FileUploadBox
          label="دليل الهوية والألوان (Brand Guidelines)"
          uploadTitle="ارفع دليل الألوان والخطوط (PDF / AI / ZIP)"
          icon="🎨"
          accept=".pdf,.ai,.zip,.png,.jpg"
          files={brandFiles}
          onFilesChange={setBrandFiles}
        />

        <FormField label="هل يوجد موقع إلكتروني حالي للشركة؟" icon="🌐" requirement="required">
          <YesNoToggle
            value={hasCurrentSite}
            onChange={setHasCurrentSite}
            noLabel="لا (موقع جديد كلياً)"
            yesLabel="نعم (إعادة تصميم وتطوير)"
          />
          <ConditionalReveal show={hasCurrentSite === 'yes'}>
            <FormField label="رابط الموقع الحالي" icon="🔗" requirement="conditional">
              <input
                type="url"
                className="form-control"
                placeholder="https://your-current-website.com"
                value={currentSiteUrl}
                onChange={(e) => setCurrentSiteUrl(e.target.value)}
                dir="ltr"
              />
            </FormField>
          </ConditionalReveal>
        </FormField>
      </QuestionnaireSection>

      {/* Section 2: Pages & Media */}
      <QuestionnaireSection
        step="02"
        icon="📑"
        title="الصفحات والمحتوى والوسائط"
        desc="حدد قائمة الصفحات المطلوبة وجاهزية المحتوى النصي والصور المرفقة"
      >
        <FormField label="الصفحات المطلوبة في الموقع" icon="📄" requirement="required">
          <MultiChipSelector options={PAGE_OPTIONS} selected={pages} onChange={setPages} />
        </FormField>

        <FormField label="هل المحتوى النصي للموقع جاهز؟" icon="✍️" requirement="required">
          <select className="form-control" value={contentReady} onChange={(e) => setContentReady(e.target.value)}>
            <option value="نعم">نعم، جاهز بالكامل (Yes, fully ready)</option>
            <option value="جزئي">جزئي (يحتاج صياغة وتنسيق)</option>
            <option value="لا">لا (نحتاج كتابة المحتوى وصياغته من قبلكم)</option>
          </select>

          <ConditionalReveal show={contentReady === 'نعم' || contentReady === 'جزئي'}>
            <FileUploadBox
              label="رفع ملفات المحتوى النصي"
              uploadTitle="ارفع ملفات Word، PDF، أو نصوص المحتوى"
              icon="📄"
              accept=".doc,.docx,.pdf,.txt"
              multiple
              files={contentFiles}
              onFilesChange={setContentFiles}
              conditional
            />
          </ConditionalReveal>
        </FormField>

        <FileUploadBox
          label="صور المنشأة والمشاريع"
          uploadTitle="ارفع صور عالية الدقة للموقع (صور المقر، الفريق، الأعمال)"
          icon="📸"
          accept="image/*,.zip"
          multiple
          files={photoFiles}
          onFilesChange={setPhotoFiles}
        />

        <FileUploadBox
          label="مقاطع الفيديو للموقع إن وجدت"
          uploadTitle="ارفع مقاطع الفيديو أو الفيديوهات التعريفية"
          icon="🎥"
          accept="video/*,.zip"
          multiple
          files={videoFiles}
          onFilesChange={setVideoFiles}
        />

        <FormField label="لغات الموقع المطلوب" icon="🌐" requirement="required">
          <select className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="العربية (Arabic)">العربية فقط (Arabic)</option>
            <option value="الإنجليزية (English)">الإنجليزية فقط (English)</option>
            <option value="ثنائي اللغة (عربي + إنجليزي)">ثنائي اللغة (عربي + إنجليزي متكامل)</option>
            <option value="لغات أخرى">لغات أخرى مخصصة</option>
          </select>
        </FormField>

        <UrlRepeater
          label="مواقع مرجعية تفضل أسلوب تصميمها"
          placeholder="https://example.com"
          urls={refUrls}
          onChange={setRefUrls}
          addButtonLabel="➕ إضافة موقع مرجعي آخر"
        />
      </QuestionnaireSection>

      {/* Section 3: Features & Hosting */}
      <QuestionnaireSection
        step="03"
        icon="⚙️"
        title="الوظائف المطلوبة والنطاق والاستضافة"
        desc="تحديد الميزات التفاعلية وحالة النطاق (Domain) والاستضافة السحابية"
      >
        <FormField label="الوظائف والخصائص البرمجية المطلوبة" icon="⚙️" requirement="required">
          <MultiChipSelector options={FEATURE_OPTIONS} selected={features} onChange={setFeatures} />
        </FormField>

        <FormField label="هل لديك اسم نطاق (Domain) محجوز؟" icon="🌐" requirement="required">
          <YesNoToggle
            value={hasDomain}
            onChange={setHasDomain}
            noLabel="لا (نحتاج حجز دومين جديد)"
            yesLabel="نعم (لدي دومين جاهز)"
          />
          <ConditionalReveal show={hasDomain === 'yes'}>
            <FormField label="اكتب اسم الدومين المحجوز" icon="🔗" requirement="conditional">
              <input
                type="text"
                className="form-control"
                placeholder="example.com أو company.sa"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                dir="ltr"
              />
            </FormField>
          </ConditionalReveal>
        </FormField>

        <FormField label="هل لديك استضافة وسيرفر (Hosting)؟" icon="☁️" requirement="required">
          <YesNoToggle
            value={hasHosting}
            onChange={setHasHosting}
            noLabel="لا (وفروا استضافة سريعة مع الباقة)"
            yesLabel="نعم (لدي استضافة خاصة)"
          />
          <ConditionalReveal show={hasHosting === 'yes'}>
            <FormField label="اسم مزود الاستضافة أو بيانات السيرفر" icon="🏢" requirement="conditional">
              <input
                type="text"
                className="form-control"
                placeholder="مثال: Hostinger, Siteground, AWS, Cloudways, cPanel..."
                value={hostingProvider}
                onChange={(e) => setHostingProvider(e.target.value)}
              />
            </FormField>
          </ConditionalReveal>
        </FormField>
      </QuestionnaireSection>
    </ServiceDetailLayout>
  );
}
