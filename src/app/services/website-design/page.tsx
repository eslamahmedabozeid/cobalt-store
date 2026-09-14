'use client';

import React, { useState } from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';
import MultiChipSelector from '@/components/services/MultiChipSelector';
import FileUploadBox from '@/components/services/FileUploadBox';
import UrlRepeater from '@/components/services/UrlRepeater';
import { SERVICES_DATA } from '@/data/services';

const PAGE_GUARANTEES = [
  {
    icon: '📁',
    title: 'ملكية السورس كود بالكامل',
    desc: 'تسليم كافة الملفات المصدرية والأكواد والتصميم (Figma, Source Code) 100%.'
  },
  {
    icon: '⏱️',
    title: 'سرعة وأداء فائق للموقع',
    desc: 'نضمن سرعة تحميل فائقة وتصفح مرن متوافق مع كافة الأجهزة ومحركات البحث SEO.'
  },
  {
    icon: '🔄',
    title: 'دعم فني وصيانة مجانية',
    desc: 'دعم فني وضمان استقرار ونسخ احتياطي لمدة شهر كامل بعد إطلاق الموقع مجاناً.'
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
  { value: 'صفحة أخرى مخصصة', label: 'أخرى' }
];

const FEATURE_OPTIONS = [
  { value: 'استمارة تواصل (Contact / Form)', label: 'نموذج تواصل (Contact Form)' },
  { value: 'زر واتساب مباشر (WhatsApp)', label: 'واتساب مباشر (WhatsApp)' },
  { value: 'بوابة دفع إلكتروني (Payment)', label: 'بوابة دفع (Payment)' },
  { value: 'نظام حجز ومواعيد (Booking)', label: 'نظام حجوزات (Booking)' },
  { value: 'خرائط جوجل (Google Maps)', label: 'خرائط جوجل (Maps)' },
  { value: 'مدونة مقالات (Blog)', label: 'مدونة (Blog)' },
  { value: 'شات ومحادثة حية (Live Chat)', label: 'محادثة حية (Chat)' },
  { value: 'نشرة بريدية (Newsletter)', label: 'نشرة بريدية (Newsletter)' },
  { value: 'حسابات وتسجيل أعضاء (User Accounts)', label: 'حسابات مستخدمين (Accounts)' },
  { value: 'تعدد اللغات (Multilingual)', label: 'تعدد لغات (Multilingual)' },
  { value: 'خصائص برمجية أخرى (Other)', label: 'وظائف أخرى (Other)' }
];

export default function WebsiteDesignPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'website-design') || SERVICES_DATA[1];

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
      return { valid: false, message: '⚠️ يرجى تحديد الوظائف المطلوبة' };
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
        'الخدمة': 'تصميم موقع إلكتروني',
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
    >
      {/* Section 1 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🏢</span> 1. نوع الموقع وهوية المشروع
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🌐 نوع الموقع المطلوب <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <select className="form-control" value={siteType} onChange={(e) => setSiteType(e.target.value)}>
            <option value="شركة (Corporate Website)">شركة (Corporate Website)</option>
            <option value="صفحة هبوط (Landing Page)">صفحة هبوط (Landing Page)</option>
            <option value="معرض أعمال (Portfolio)">معرض أعمال (Portfolio)</option>
            <option value="موقع خدمات (Services Site)">موقع خدمات (Services Site)</option>
            <option value="موقع حجوزات ومواعيد (Booking)">موقع حجوزات ومواعيد (Booking)</option>
            <option value="أخرى (Other)">أخرى</option>
          </select>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🏷️ اسم المشروع / الشركة <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="اكتب الاسم التجاري أو اسم المنشأة..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">📝 وصف النشاط والخدمات <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={3}
            placeholder="نبذة تعريفية عن الشركة، ما تقدمه، ورسالتها الأساسية للزوار..."
            value={activityDesc}
            onChange={(e) => setActivityDesc(e.target.value)}
          />
        </div>

        <FileUploadBox
          label="🖼️ الشعار (Logo)"
          uploadTitle="ارفع ملف الشعار (PNG شفاف، AI، SVG، PDF)"
          accept="image/*,.ai,.svg,.pdf"
          files={logoFiles}
          onFilesChange={setLogoFiles}
          required
        />

        <FileUploadBox
          label="🎨 دليل الهوية والألوان (Brand Guidelines)"
          uploadTitle="ارفع دليل الألوان والخطوط (PDF / AI)"
          icon="📑"
          accept=".pdf,.ai,.zip,.png,.jpg"
          files={brandFiles}
          onFilesChange={setBrandFiles}
        />

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🌐 هل يوجد موقع إلكتروني حالي؟ <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button type="button" className={`switch-toggle-btn ${hasCurrentSite === 'no' ? 'active' : ''}`} onClick={() => setHasCurrentSite('no')}>لا (No)</button>
            <button type="button" className={`switch-toggle-btn ${hasCurrentSite === 'yes' ? 'active' : ''}`} onClick={() => setHasCurrentSite('yes')}>نعم (Yes)</button>
          </div>
          <div className={`conditional-field-wrapper ${hasCurrentSite === 'yes' ? 'active' : ''}`}>
            <div className="field-label-row">
              <label className="field-title">🔗 رابط الموقع الحالي <span style={{ color: '#FBBF24' }}>*</span></label>
              <span className="field-req-badge badge-conditional">شرطي</span>
            </div>
            <input
              type="url"
              className="form-control"
              placeholder="https://your-current-website.com"
              value={currentSiteUrl}
              onChange={(e) => setCurrentSiteUrl(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📑</span> 2. الصفحات والمحتوى والوسائط
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">📄 الصفحات المطلوبة في الموقع <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <MultiChipSelector options={PAGE_OPTIONS} selected={pages} onChange={setPages} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">✍️ هل المحتوى النصي جاهز؟ <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <select className="form-control" value={contentReady} onChange={(e) => setContentReady(e.target.value)}>
            <option value="نعم">نعم، جاهز بالكامل (Yes, fully ready)</option>
            <option value="جزئي">جزئي (يحتاج صياغة وتنسيق)</option>
            <option value="لا">لا (نحتاج كتابة المحتوى من قبلكم)</option>
          </select>

          <div className={`conditional-field-wrapper ${contentReady === 'نعم' || contentReady === 'جزئي' ? 'active' : ''}`}>
            <FileUploadBox
              label="📁 رفع ملفات المحتوى النصي"
              uploadTitle="ارفع ملفات Word، PDF، أو نصوص المحتوى"
              icon="📄"
              accept=".doc,.docx,.pdf,.txt"
              multiple
              files={contentFiles}
              onFilesChange={setContentFiles}
              conditional
            />
          </div>
        </div>

        <FileUploadBox
          label="📸 صور المنشأة والمشاريع"
          uploadTitle="ارفع صور عالية الدقة للموقع"
          icon="🖼️"
          accept="image/*,.zip"
          multiple
          files={photoFiles}
          onFilesChange={setPhotoFiles}
        />

        <FileUploadBox
          label="🎥 مقاطع الفيديو للموقع"
          uploadTitle="ارفع مقاطع الفيديو أو روابط يوتيوب/فيميو"
          icon="🎬"
          accept="video/*,.zip"
          multiple
          files={videoFiles}
          onFilesChange={setVideoFiles}
        />

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🌐 لغات الموقع المطلوب <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <select className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="العربية (Arabic)">العربية (Arabic)</option>
            <option value="الإنجليزية (English)">الإنجليزية (English)</option>
            <option value="ثنائي اللغة (عربي + إنجليزي)">ثنائي اللغة (عربي + إنجليزي)</option>
            <option value="لغات أخرى">أخرى</option>
          </select>
        </div>

        <UrlRepeater
          label="💡 مواقع مرجعية تفضل تصميمها"
          placeholder="https://example.com"
          urls={refUrls}
          onChange={setRefUrls}
          addButtonLabel="➕ إضافة موقع مرجعي آخر"
        />
      </div>

      {/* Section 3 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚡</span> 3. الوظائف المطلوبة والنطاق والاستضافة
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">⚙️ الوظائف والخصائص المطلوبة <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <MultiChipSelector options={FEATURE_OPTIONS} selected={features} onChange={setFeatures} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🌐 هل لديك اسم نطاق (Domain) محجوز؟ <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button type="button" className={`switch-toggle-btn ${hasDomain === 'no' ? 'active' : ''}`} onClick={() => setHasDomain('no')}>لا (نحتاج حجز دومين جديد)</button>
            <button type="button" className={`switch-toggle-btn ${hasDomain === 'yes' ? 'active' : ''}`} onClick={() => setHasDomain('yes')}>نعم (لدي دومين جاهز)</button>
          </div>
          <div className={`conditional-field-wrapper ${hasDomain === 'yes' ? 'active' : ''}`}>
            <div className="field-label-row">
              <label className="field-title">🔗 اكتب اسم الدومين المحجوز <span style={{ color: '#FBBF24' }}>*</span></label>
              <span className="field-req-badge badge-conditional">شرطي</span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="example.com أو company.sa"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
            />
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">☁️ هل لديك استضافة وسيرفر (Hosting)؟ <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button type="button" className={`switch-toggle-btn ${hasHosting === 'no' ? 'active' : ''}`} onClick={() => setHasHosting('no')}>لا (وفروا الاستضافة السريعة مجاناً)</button>
            <button type="button" className={`switch-toggle-btn ${hasHosting === 'yes' ? 'active' : ''}`} onClick={() => setHasHosting('yes')}>نعم (لدي استضافة خاصة)</button>
          </div>
          <div className={`conditional-field-wrapper ${hasHosting === 'yes' ? 'active' : ''}`}>
            <div className="field-label-row">
              <label className="field-title">🏢 اسم مزود الاستضافة <span style={{ color: '#FBBF24' }}>*</span></label>
              <span className="field-req-badge badge-conditional">شرطي</span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="مثال: Hostinger, Siteground, AWS, Cloudways, cPanel..."
              value={hostingProvider}
              onChange={(e) => setHostingProvider(e.target.value)}
            />
          </div>
        </div>
      </div>
    </ServiceDetailLayout>
  );
}
