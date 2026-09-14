'use client';

import React, { useState } from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';
import MultiChipSelector from '@/components/services/MultiChipSelector';
import FileUploadBox from '@/components/services/FileUploadBox';
import UrlRepeater from '@/components/services/UrlRepeater';
import { SERVICES_DATA } from '@/data/services';

const PAGE_GUARANTEES = [
  {
    icon: '🎬',
    title: 'ملكية الفيديو والمصادر 100%',
    desc: 'تسليم الفيديو بدقة 4K / Full HD مع كامل ملفات المشروع الصوتية والبصرية وقوالب العمل.'
  },
  {
    icon: '🎙️',
    title: 'تعليق صوتي استوديو نقي',
    desc: 'تسجيل عبر نخبة من أفضل المعلقين الصوتيين في الوطن العربي بأعلى نقاوة صوتية.'
  },
  {
    icon: '🔄',
    title: 'تعديلات غير محدودة للمشاهد',
    desc: 'تعديلات ومراجعات مجانية حتى الوصول لأعلى درجات الإبهار والجاذبية الإعلانية.'
  }
];

const PLATFORM_OPTIONS = [
  { value: 'انستقرام (Instagram)', label: 'انستقرام (Instagram)' },
  { value: 'سناب شات (Snapchat)', label: 'سناب شات (Snapchat)' },
  { value: 'تيك توك (TikTok)', label: 'تيك توك (TikTok)' },
  { value: 'يوتيوب (YouTube)', label: 'يوتيوب (YouTube)' },
  { value: 'إكس / تويتر (X)', label: 'إكس (Twitter / X)' },
  { value: 'شاشات عرض ومؤتمرات', label: 'شاشات عرض ومؤتمرات' },
  { value: 'تلفزيون (TV)', label: 'تلفزيون (TV)' }
];

export default function MotionGraphicsPage() {
  const service = SERVICES_DATA.find((s) => s.slug === 'motion-graphics') || SERVICES_DATA[3];

  const [videoGoal, setVideoGoal] = useState('');
  const [videoProduct, setVideoProduct] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([
    'انستقرام (Instagram)',
    'سناب شات (Snapchat)',
    'تيك توك (TikTok)'
  ]);
  const [aspectRatio, setAspectRatio] = useState('9:16 (طولي - ستوريز وتيك توك وريلز)');
  const [isScriptReady, setIsScriptReady] = useState<'yes' | 'no'>('no');
  const [scriptText, setScriptText] = useState('');
  const [scriptFiles, setScriptFiles] = useState<string[]>([]);
  const [keyMessage, setKeyMessage] = useState('');
  const [cta, setCta] = useState('');
  const [hasVoiceOver, setHasVoiceOver] = useState<'yes' | 'no'>('yes');
  const [voiceLang, setVoiceLang] = useState('لهجة سعودية خليجية');
  const [voiceGender, setVoiceGender] = useState('اترك الاختيار لفريق كوبالت');
  const [logoFiles, setLogoFiles] = useState<string[]>([]);
  const [brandFiles, setBrandFiles] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<string[]>([]);
  const [rawFiles, setRawFiles] = useState<string[]>([]);
  const [refUrls, setRefUrls] = useState<string[]>(['']);

  const validateFields = () => {
    if (!videoGoal.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة الهدف من الفيديو' };
    }
    if (!videoProduct.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة تفاصيل المنتج / الخدمة' };
    }
    if (!platforms.length) {
      return { valid: false, message: '⚠️ يرجى تحديد منصات النشر المستهدفة' };
    }
    if (isScriptReady === 'yes' && !scriptText.trim() && !scriptFiles.length) {
      return { valid: false, message: '⚠️ يرجى إدخال نص السيناريو أو رفع الملف الخاص به' };
    }
    if (!keyMessage.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة الرسالة الأساسية المراد إبرازها' };
    }

    const allUploadedFiles = [...logoFiles, ...brandFiles, ...photoFiles, ...rawFiles, ...scriptFiles];

    return {
      valid: true,
      customData: {
        'الخدمة': 'موشن جرافيك / فيديو إعلاني',
        'الهدف من الفيديو': videoGoal,
        'المنتج / الخدمة': videoProduct,
        'منصات النشر': platforms.join(', '),
        'المقاس': aspectRatio,
        'حالة السيناريو':
          isScriptReady === 'yes'
            ? `جاهز (${scriptText ? 'نص مدخل' : ''} ${scriptFiles.join(', ')})`
            : 'مطلوب كتابته من كوبالت (مجاناً)',
        'الرسالة الأساسية': keyMessage,
        'الدعوة لإجراء CTA': cta || 'حسب رؤية فريق الإخراج',
        'التعليق الصوتي Voice Over':
          hasVoiceOver === 'yes' ? `نعم (${voiceLang} - ${voiceGender})` : 'بدون تعليق صوتي',
        'الشعار المرفوع': logoFiles.join(', ') || 'سيتم إرساله',
        'الملفات المرفقة': allUploadedFiles.join(', ') || 'لا يوجد',
        'الفيديوهات المرجعية': refUrls.filter(Boolean).join(' | ') || 'لا يوجد'
      }
    };
  };

  return (
    <ServiceDetailLayout
      service={service}
      onValidateCustomFields={validateFields}
      guaranteesTitle="ضمانات كوبالت لخدمات الموشن جرافيك وإنتاج الفيديو"
      pageGuarantees={PAGE_GUARANTEES}
    >
      {/* Section 1 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎯</span> 1. أهداف الفيديو والمنصات والمقاسات
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🎯 الهدف الأساسي من الفيديو <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="مثال: إطلاق تطبيق جديد، شرح آلية عمل الخدمة، إعلان موسمي لزيادة المبيعات، توعية..."
            value={videoGoal}
            onChange={(e) => setVideoGoal(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🛍️ المنتج أو الخدمة المراد الإعلان عنها <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب اسم وتفاصيل ومميزات المنتج/الخدمة الرئيسية..."
            value={videoProduct}
            onChange={(e) => setVideoProduct(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">📱 منصات النشر المستهدفة <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <MultiChipSelector options={PLATFORM_OPTIONS} selected={platforms} onChange={setPlatforms} />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">📐 أبعاد ومقاس الفيديو <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <select className="form-control" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
            <option value="9:16 (طولي - ستوريز وتيك توك وريلز)">9:16 (طولي - ستوريز وتيك توك وريلز)</option>
            <option value="16:9 (أفقي - يوتيوب وشاشات عرض)">16:9 (أفقي - يوتيوب وشاشات عرض)</option>
            <option value="1:1 (مربع - انستقرام وبوستات)">1:1 (مربع - انستقرام وبوستات)</option>
            <option value="أكثر من مقاس (متعدد الأحجام)">أكثر من مقاس (تسليم متعدد الأحجام)</option>
          </select>
        </div>
      </div>

      {/* Section 2 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📝</span> 2. السيناريو والرسالة الأساسية
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">📜 هل السيناريو الإعلاني (Script) جاهز لديك؟ <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button type="button" className={`switch-toggle-btn ${isScriptReady === 'no' ? 'active' : ''}`} onClick={() => setIsScriptReady('no')}>لا (نحتاج كتابة سيناريو احترافي)</button>
            <button type="button" className={`switch-toggle-btn ${isScriptReady === 'yes' ? 'active' : ''}`} onClick={() => setIsScriptReady('yes')}>نعم (السيناريو جاهز لدي)</button>
          </div>

          <div className={`conditional-field-wrapper ${isScriptReady === 'yes' ? 'active' : ''}`}>
            <div className="field-label-row">
              <label className="field-title">✍️ نص أو ملف السيناريو الجاهز <span style={{ color: '#FBBF24' }}>*</span></label>
              <span className="field-req-badge badge-conditional">شرطي</span>
            </div>
            <textarea
              className="form-control"
              rows={3}
              placeholder="الصق نص السيناريو أو المشاهد هنا..."
              style={{ marginBottom: '10px' }}
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
            />
            <FileUploadBox
              label="ملف السيناريو"
              hideLabel
              uploadTitle={<span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-light)' }}>أو ارفع ملف السيناريو (Word / PDF)</span>}
              accept=".doc,.docx,.pdf,.txt"
              files={scriptFiles}
              onFilesChange={setScriptFiles}
            />
          </div>

          <div className={`conditional-field-wrapper ${isScriptReady === 'no' ? 'active' : ''}`}>
            <div style={{ fontSize: '0.88rem', color: 'var(--cyan-accent)', fontWeight: 700 }}>
              ✨ كتابة السيناريو الإعلاني الاحترافي مشمولة مجاناً ضمن باقتك من فريق كوبالت!
            </div>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">💡 الرسالة الأساسية (Key Message) <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={2}
            placeholder="ما هي الفكرة والرسالة الأهم التي تريد أن تترسخ في ذهن المشاهد بعد الفيديو؟..."
            value={keyMessage}
            onChange={(e) => setKeyMessage(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">📢 الدعوة لاتخاذ إجراء (Call To Action - CTA)</label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="مثال: اطلب الآن واستفد من الخصم، حمل التطبيق من الرابط..."
            value={cta}
            onChange={(e) => setCta(e.target.value)}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="questionnaire-section-box">
        <h3 style={{ fontSize: '1.05rem', color: 'var(--cyan-accent)', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎙️</span> 3. التعليق الصوتي (Voice Over) والملفات
        </h3>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">🎙️ هل تريد تعليق صوتي استوديو (Voice Over)؟ <span style={{ color: '#F87171' }}>*</span></label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <div className="switch-toggle-group">
            <button type="button" className={`switch-toggle-btn ${hasVoiceOver === 'yes' ? 'active' : ''}`} onClick={() => setHasVoiceOver('yes')}>نعم (Yes)</button>
            <button type="button" className={`switch-toggle-btn ${hasVoiceOver === 'no' ? 'active' : ''}`} onClick={() => setHasVoiceOver('no')}>لا (مؤثرات موسيقية فقط)</button>
          </div>

          <div className={`conditional-field-wrapper ${hasVoiceOver === 'yes' ? 'active' : ''}`}>
            <div className="form-field-group">
              <div className="field-label-row">
                <label className="field-title">🗣️ لغة ولهجة التعليق الصوتي <span style={{ color: '#FBBF24' }}>*</span></label>
                <span className="field-req-badge badge-conditional">شرطي</span>
              </div>
              <select className="form-control" value={voiceLang} onChange={(e) => setVoiceLang(e.target.value)}>
                <option value="عربية فصحى راقية">عربية فصحى راقية ورسمية (Standard Arabic)</option>
                <option value="لهجة سعودية خليجية">لهجة سعودية خليجية جذابة (Saudi / Gulf)</option>
                <option value="لهجة مصرية حيوية">لهجة مصرية حيوية وتفاعلية (Egyptian)</option>
                <option value="لهجة شامية">لهجة شامية (Levantine)</option>
                <option value="إنجليزية أمريكية (US English)">إنجليزية أمريكية (US English)</option>
                <option value="إنجليزية بريطانية (UK English)">إنجليزية بريطانية (UK English)</option>
                <option value="أخرى">أخرى</option>
              </select>
            </div>

            <div className="form-field-group">
              <div className="field-label-row">
                <label className="field-title">👤 نبرة ونوع الصوت <span style={{ color: '#FBBF24' }}>*</span></label>
                <span className="field-req-badge badge-conditional">شرطي</span>
              </div>
              <select className="form-control" value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)}>
                <option value="صوت رجالي (Male Voice)">صوت رجالي فخم (Male Voice)</option>
                <option value="صوت نسائي (Female Voice)">صوت نسائي ناعم وواضح (Female Voice)</option>
                <option value="اترك الاختيار لفريق كوبالت">اترك الاختيار لفريق كوبالت للأفضلية</option>
              </select>
            </div>
          </div>
        </div>

        <FileUploadBox
          label="🖼️ الشعار (Logo) بدقة فيكتور عالية"
          uploadTitle="ارفع ملف الشعار (AI, SVG, PNG شفاف, PDF)"
          accept="image/*,.ai,.svg,.pdf"
          files={logoFiles}
          onFilesChange={setLogoFiles}
          required
        />

        <FileUploadBox
          label="🎨 ألوان وهوية العلامة التجارية"
          uploadTitle="ارفع كود الألوان أو دليل الهوية (PDF / AI)"
          icon="📑"
          accept=".pdf,.ai,.zip,.png,.jpg"
          files={brandFiles}
          onFilesChange={setBrandFiles}
        />

        <FileUploadBox
          label="📸 صور المنتج أو لقطات الشاشة للتطبيق"
          uploadTitle="ارفع لقطات الشاشة أو صور المنتج"
          icon="🖼️"
          accept="image/*,.zip"
          multiple
          files={photoFiles}
          onFilesChange={setPhotoFiles}
        />

        <FileUploadBox
          label="🎥 مقاطع خام أو تسجيلات شاشة للتطبيق"
          uploadTitle="ارفع مقاطع خام لتضمينها في المونتاج"
          icon="🎬"
          accept="video/*,.zip"
          multiple
          files={rawFiles}
          onFilesChange={setRawFiles}
        />

        <UrlRepeater
          label="💡 فيديوهات مرجعية تفضل أسلوب تحريكها"
          placeholder="https://youtube.com/watch?v=... أو Vimeo"
          urls={refUrls}
          onChange={setRefUrls}
          addButtonLabel="➕ إضافة رابط فيديو مرجعي آخر"
        />
      </div>
    </ServiceDetailLayout>
  );
}
