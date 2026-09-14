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
    icon: '🎬',
    title: 'ملكية الفيديو والمصادر 100%',
    desc: 'تسليم الفيديو بدقة 4K / Full HD مع كامل ملفات المشروع الصوتية والبصرية وقوالب العمل المفتوحة.'
  },
  {
    icon: '🎙️',
    title: 'تعليق صوتي استوديو نقي',
    desc: 'تسجيل عبر نخبة من أفضل المعلقين الصوتيين في الوطن العربي بأعلى نقاوة صوتية مع المؤثرات الاحترافية.'
  },
  {
    icon: '🔄',
    title: 'تعديلات غير محدودة للمشاهد',
    desc: 'تعديلات ومراجعات مجانية حتى الوصول لأعلى درجات الإبهار والجاذبية الإعلانية ورضاك التام.'
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

export default function MotionGraphicsOrder() {
  const service = getServiceBySlug('motion-graphics');

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
      stepLabels={['الأهداف والمنصات', 'السيناريو والرسالة', 'التعليق الصوتي والمرفقات']}
    >
      {/* Section 1: Goals & Platforms */}
      <QuestionnaireSection
        step="01"
        icon="🎯"
        title="أهداف الفيديو والمنصات والمقاسات"
        desc="تحديد الغرض التسويقي من الفيديو والقنوات التي سيتم إطلاق الحملة عليها"
      >
        <FormField label="الهدف الأساسي من الفيديو" icon="🎯" requirement="required">
          <textarea
            className="form-control"
            rows={2}
            placeholder="مثال: إطلاق تطبيق جديد، شرح آلية عمل الخدمة، إعلان موسمي لزيادة المبيعات، فيديو توعوي..."
            value={videoGoal}
            onChange={(e) => setVideoGoal(e.target.value)}
          />
        </FormField>

        <FormField label="المنتج أو الخدمة المراد الإعلان عنها" icon="🛍️" requirement="required">
          <textarea
            className="form-control"
            rows={2}
            placeholder="اكتب اسم وتفاصيل ومميزات المنتج/الخدمة الرئيسية ونقاط البيع الفريدة..."
            value={videoProduct}
            onChange={(e) => setVideoProduct(e.target.value)}
          />
        </FormField>

        <FormField label="منصات النشر المستهدفة" icon="📱" requirement="required">
          <MultiChipSelector options={PLATFORM_OPTIONS} selected={platforms} onChange={setPlatforms} />
        </FormField>

        <FormField label="أبعاد ومقاس الفيديو المطلوب" icon="📐" requirement="required">
          <select className="form-control" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
            <option value="9:16 (طولي - ستوريز وتيك توك وريلز)">9:16 (طولي - ستوريز وتيك توك وريلز وسناب شات)</option>
            <option value="16:9 (أفقي - يوتيوب وشاشات عرض)">16:9 (أفقي - يوتيوب ومواقع إلكترونية وشاشات)</option>
            <option value="1:1 (مربع - انستقرام وبوستات)">1:1 (مربع - انستقرام وتويتر وفيسبوك)</option>
            <option value="أكثر من مقاس (متعدد الأحجام)">أكثر من مقاس (تصدير بكافة الأبعاد المطلوبة)</option>
          </select>
        </FormField>
      </QuestionnaireSection>

      {/* Section 2: Script & Key Message */}
      <QuestionnaireSection
        step="02"
        icon="📝"
        title="السيناريو والرسالة الأساسية"
        desc="صياغة حبكة الفيديو والرسالة الجوهرية التي ستحرك المشاهد لاتخاذ الإجراء"
      >
        <FormField label="هل السيناريو الإعلاني (Script) جاهز لديك؟" icon="📜" requirement="required">
          <YesNoToggle
            value={isScriptReady}
            onChange={setIsScriptReady}
            yesLabel="نعم (السيناريو جاهز لدي)"
            noLabel="لا (نحتاج كتابة سيناريو احترافي)"
          />

          <ConditionalReveal show={isScriptReady === 'yes'}>
            <FormField label="نص أو ملف السيناريو الجاهز" icon="✍️" requirement="conditional">
              <textarea
                className="form-control form-control-spaced-sm"
                rows={3}
                placeholder="الصق نص السيناريو أو المشاهد هنا..."
                value={scriptText}
                onChange={(e) => setScriptText(e.target.value)}
              />
              <FileUploadBox
                label="ملف السيناريو"
                hideLabel
                uploadTitle="أو ارفع ملف السيناريو (Word / PDF)"
                icon="📄"
                accept=".doc,.docx,.pdf,.txt"
                files={scriptFiles}
                onFilesChange={setScriptFiles}
              />
            </FormField>
          </ConditionalReveal>

          <ConditionalReveal show={isScriptReady === 'no'}>
            <div className="included-perk-notice">
              ✨ كتابة السيناريو الإعلاني الاحترافي مشمولة مجاناً ضمن باقتك من فريق كوبالت!
            </div>
          </ConditionalReveal>
        </FormField>

        <FormField label="الرسالة الأساسية (Key Message)" icon="💡" requirement="required">
          <textarea
            className="form-control"
            rows={2}
            placeholder="ما هي الفكرة والرسالة الأهم التي تريد أن تترسخ في ذهن المشاهد بعد الفيديو؟..."
            value={keyMessage}
            onChange={(e) => setKeyMessage(e.target.value)}
          />
        </FormField>

        <FormField label="الدعوة لاتخاذ إجراء (Call To Action - CTA)" icon="📢" requirement="optional">
          <input
            type="text"
            className="form-control"
            placeholder="مثال: اطلب الآن واستفد من الخصم، حمل التطبيق من الرابط، تواصل معنا..."
            value={cta}
            onChange={(e) => setCta(e.target.value)}
          />
        </FormField>
      </QuestionnaireSection>

      {/* Section 3: Voiceover & Assets */}
      <QuestionnaireSection
        step="03"
        icon="🎙️"
        title="التعليق الصوتي (Voice Over) والملفات"
        desc="تحديد لهجة ونوع المعلق الصوتي وإرفاق الشعار وملفات الهوية"
      >
        <FormField label="هل تريد تعليق صوتي استوديو (Voice Over)؟" icon="🎙️" requirement="required">
          <YesNoToggle
            value={hasVoiceOver}
            onChange={setHasVoiceOver}
            yesLabel="نعم (تسجيل استوديو محترف)"
            noLabel="لا (مؤثرات موسيقية فقط)"
          />

          <ConditionalReveal show={hasVoiceOver === 'yes'}>
            <FormField label="لغة ولهجة التعليق الصوتي" icon="🗣️" requirement="conditional">
              <select className="form-control" value={voiceLang} onChange={(e) => setVoiceLang(e.target.value)}>
                <option value="عربية فصحى راقية">عربية فصحى راقية ورسمية (Standard Arabic)</option>
                <option value="لهجة سعودية خليجية">لهجة سعودية خليجية جذابة (Saudi / Gulf)</option>
                <option value="لهجة مصرية حيوية">لهجة مصرية حيوية وتفاعلية (Egyptian)</option>
                <option value="لهجة شامية">لهجة شامية (Levantine)</option>
                <option value="إنجليزية أمريكية (US English)">إنجليزية أمريكية (US English)</option>
                <option value="إنجليزية بريطانية (UK English)">إنجليزية بريطانية (UK English)</option>
                <option value="أخرى">أخرى</option>
              </select>
            </FormField>

            <FormField label="نبرة ونوع الصوت" icon="👤" requirement="conditional">
              <select className="form-control" value={voiceGender} onChange={(e) => setVoiceGender(e.target.value)}>
                <option value="صوت رجالي (Male Voice)">صوت رجالي فخم وإعلاني (Male Voice)</option>
                <option value="صوت نسائي (Female Voice)">صوت نسائي ناعم وواضح (Female Voice)</option>
                <option value="اترك الاختيار لفريق كوبالت">اترك الاختيار لفريق كوبالت للأفضلية</option>
              </select>
            </FormField>
          </ConditionalReveal>
        </FormField>

        <FileUploadBox
          label="الشعار (Logo) بدقة فيكتور عالية"
          uploadTitle="ارفع ملف الشعار (AI, SVG, PNG شفاف, PDF)"
          icon="🖼️"
          accept="image/*,.ai,.svg,.pdf"
          files={logoFiles}
          onFilesChange={setLogoFiles}
          required
        />

        <FileUploadBox
          label="ألوان وهوية العلامة التجارية"
          uploadTitle="ارفع كود الألوان أو دليل الهوية (PDF / AI)"
          icon="🎨"
          accept=".pdf,.ai,.zip,.png,.jpg"
          files={brandFiles}
          onFilesChange={setBrandFiles}
        />

        <FileUploadBox
          label="صور المنتج أو لقطات الشاشة للتطبيق"
          uploadTitle="ارفع لقطات الشاشة أو صور المنتج المراد تضمينها"
          icon="📸"
          accept="image/*,.zip"
          multiple
          files={photoFiles}
          onFilesChange={setPhotoFiles}
        />

        <FileUploadBox
          label="مقاطع خام أو تسجيلات شاشة للتطبيق"
          uploadTitle="ارفع مقاطع خام لتضمينها في المونتاج والتحريك"
          icon="🎥"
          accept="video/*,.zip"
          multiple
          files={rawFiles}
          onFilesChange={setRawFiles}
        />

        <UrlRepeater
          label="فيديوهات مرجعية تفضل أسلوب تحريكها وإخراجها"
          placeholder="https://youtube.com/watch?v=... أو Vimeo"
          urls={refUrls}
          onChange={setRefUrls}
          addButtonLabel="➕ إضافة رابط فيديو مرجعي آخر"
        />
      </QuestionnaireSection>
    </ServiceDetailLayout>
  );
}
