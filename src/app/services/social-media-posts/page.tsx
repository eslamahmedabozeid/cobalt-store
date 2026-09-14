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
    title: 'ملكية كاملة للمصادر',
    desc: 'تسليم ملفات التصاميم المصدرية المفتوحة وقوالب العمل فور الاعتماد.'
  },
  {
    icon: '⏱️',
    title: 'تسليم فوري للمحتوى',
    desc: 'التزام تام بالخطة الزمنية لتسليم البوستات والستوريز والمحتوى الإعلاني.'
  },
  {
    icon: '🔄',
    title: 'تعديلات غير محدودة',
    desc: 'تعديلات مجانية متواصلة حتى الوصول للشكل والنسق الجذاب المناسب لحسابك.'
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
  { value: 'مبيعات Direct Sales', label: 'مبيعات (Sales)' },
  { value: 'انتشار Brand Awareness', label: 'انتشار (Awareness)' },
  { value: 'تفاعل Engagement', label: 'تفاعل (Engagement)' },
  { value: 'جمع بيانات عملاء Leads', label: 'عملاء محتملين (Leads)' },
  { value: 'زيارات للموقع / المتجر Traffic', label: 'زيارات (Traffic)' }
];

export default function SocialMediaPostsPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'social-media-posts') || SERVICES_DATA[0];

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
    >
      {/* Section 1 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🌐</span> 1. المنصات المطلوبة ونوع الخدمة
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">📱 المنصات المطلوبة <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <MultiChipSelector options={PLATFORM_OPTIONS} selected={platforms} onChange={setPlatforms} />
        </div>

        <UrlRepeater
          label="🔗 روابط الحسابات الحالية"
          placeholder="https://instagram.com/youraccount"
          urls={currentAccounts}
          onChange={setCurrentAccounts}
          addButtonLabel="➕ إضافة رابط حساب آخر"
        />

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🛠️ نوع الخدمة <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <select className="form-control" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
            <option value="تصميم فقط">تصميم فقط (Graphic Design Only)</option>
            <option value="محتوى + تصميم">محتوى + تصميم (Content Writing + Design)</option>
            <option value="إدارة كاملة">إدارة كاملة (Full Management + Posting + Interaction)</option>
          </select>
        </div>
      </div>

      {/* Section 2 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎯</span> 2. تفاصيل النشاط والجمهور المستهدف
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🏢 مجال النشاط <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="مثال: متجر عطور فاخرة، شركة عقارية، عيادة أسنان، تطبيق توصيل..."
            value={activityField}
            onChange={(e) => setActivityField(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">👥 الجمهور المستهدف <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={3}
            placeholder="حدد فئة عملائك: الفئات العمرية، الاهتمامات، النطاق الجغرافي (رجال/نساء، مهتمين بالتقنية أو الموضة)..."
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🚀 الهدف الرئيسي من الحساب <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <MultiChipSelector options={GOAL_OPTIONS} selected={mainGoals} onChange={setMainGoals} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">✨ أهم الخدمات / المنتجات المراد التركيز عليها <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={3}
            placeholder="أذكر أبرز 3-5 خدمات أو منتجات تريد التركيز على إبراز مميزاتها في المنشورات..."
            value={keyProducts}
            onChange={(e) => setKeyProducts(e.target.value)}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🗣️</span> 3. العروض ونبرة التخاطب واللغة
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🏷️ هل توجد عروض حالية أو خصومات؟ <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button
              type="button"
              className={`switch-toggle-btn ${hasOffers === 'no' ? 'active' : ''}`}
              onClick={() => setHasOffers('no')}
            >
              لا (No)
            </button>
            <button
              type="button"
              className={`switch-toggle-btn ${hasOffers === 'yes' ? 'active' : ''}`}
              onClick={() => setHasOffers('yes')}
            >
              نعم (Yes)
            </button>
          </div>

          <div className={`conditional-field-wrapper ${hasOffers === 'yes' ? 'active' : ''}`}>
            <div className="field-label-row">
              <label className="field-title">📝 تفاصيل العروض والخصومات <span style={{ color: '#FBBF24' }}>*</span></label>
              <span className="field-req-badge badge-conditional">شرطي</span>
            </div>
            <textarea
              className="form-control"
              rows={2}
              placeholder="اكتب تفاصيل الخصم، كود العرض، مدة العرض أو الباقات الترويجية..."
              value={offersDetails}
              onChange={(e) => setOffersDetails(e.target.value)}
            />
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🌐 لغة المحتوى والتصاميم <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <select className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="العربية (Arabic)">العربية (Arabic)</option>
            <option value="الإنجليزية (English)">الإنجليزية (English)</option>
            <option value="ثنائي اللغة (عربي + إنجليزي)">كلاهما (عربي + إنجليزي)</option>
            <option value="لغة أخرى">لغة أخرى</option>
          </select>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🎙️ نبرة التخاطب (Tone of Voice)</label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <select className="form-control" value={toneOfVoice} onChange={(e) => setToneOfVoice(e.target.value)}>
            <option value="عصري وشبابي">عصري وشبابي وتفاعلي (Modern & Engaging)</option>
            <option value="رسمي ومؤسسي">رسمي ومؤسسي وقوي (Corporate & Professional)</option>
            <option value="ودود وقريب للعميل">ودود وقريب وبسيط (Friendly & Warm)</option>
            <option value="تسويقي ومحفز">تسويقي ومحفز للشراء (Persuasive & Sales-driven)</option>
            <option value="فاخر وراقي">فاخر وراقي (Luxury & High-end)</option>
          </select>
        </div>
      </div>

      {/* Section 4 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📁</span> 4. الملفات والمرفقات والحسابات المرجعية
        </h3>

        <FileUploadBox
          label="🖼️ الشعار (Logo) بدقة عالية"
          uploadTitle={
            <>
              اسحب ملف الشعار هنا أو{' '}
              <span style={{ color: 'var(--cyan-accent)', textDecoration: 'underline' }}>تصفح من جهازك</span>
            </>
          }
          sublabel="(PNG بخلفية شفافة, AI, EPS, SVG, PDF)"
          accept="image/*,.ai,.eps,.pdf,.svg"
          files={logoFiles}
          onFilesChange={setLogoFiles}
          required
        />

        <FileUploadBox
          label="🎨 دليل الهوية البصرية (Brand Guidelines)"
          uploadTitle="ارفع ملف ألوان وخطوط الهوية (PDF / AI)"
          icon="📑"
          accept=".pdf,.ai,.zip,.png,.jpg"
          files={brandFiles}
          onFilesChange={setBrandFiles}
        />

        <FileUploadBox
          label="📸 صور المنتجات والمواد الخام"
          uploadTitle="ارفع صور المنتجات عالية الجودة (يمكنك تحديد عدة صور)"
          icon="🖼️"
          accept="image/*,.zip"
          multiple
          files={productFiles}
          onFilesChange={setProductFiles}
        />

        <FileUploadBox
          label="🎥 مقاطع الفيديو والمونتاج إن وجدت"
          uploadTitle="ارفع مقاطع الفيديو (MP4 / MOV / Drive Link)"
          icon="🎬"
          accept="video/*,.zip"
          multiple
          files={videoFiles}
          onFilesChange={setVideoFiles}
        />

        <FileUploadBox
          label="💰 قائمة الأسعار والمنيو (Price List / Menu)"
          uploadTitle="ارفع ملف الأسعار (PDF / Excel / Images)"
          icon="📄"
          accept=".pdf,.xls,.xlsx,.csv,image/*"
          files={priceFiles}
          onFilesChange={setPriceFiles}
        />

        <UrlRepeater
          label="💡 حسابات أو تصاميم مرجعية تفضل أسلوبها"
          placeholder="https://instagram.com/inspirational_account"
          urls={refAccounts}
          onChange={setRefAccounts}
          addButtonLabel="➕ إضافة رابط حساب مرجعي آخر"
        />
      </div>
    </ServiceDetailLayout>
  );
}
