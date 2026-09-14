'use client';

import React, { useState } from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';
import FileUploadBox from '@/components/services/FileUploadBox';
import FormField from '@/components/services/FormField';
import QuestionnaireSection from '@/components/services/QuestionnaireSection';
import { ServiceItem } from '@/types';

interface GenericServiceOrderProps {
  service: ServiceItem;
}

export default function GenericServiceOrder({ service }: GenericServiceOrderProps) {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [preferredTimeline, setPreferredTimeline] = useState('عاجل (خلال أيام قليلة)');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);

  const validateFields = () => {
    if (!projectTitle.trim()) {
      return { valid: false, message: '⚠️ يرجى إدخال اسم المشروع / المنشأة' };
    }
    if (!projectDetails.trim()) {
      return { valid: false, message: '⚠️ يرجى كتابة تفاصيل ومتطلبات الخدمة' };
    }

    return {
      valid: true,
      customData: {
        'الخدمة': service.title,
        'اسم المشروع': projectTitle,
        'تفاصيل الطلب': projectDetails,
        'الوقت المفضل للتسليم': preferredTimeline,
        'الملفات المرفقة': attachedFiles.join(', ') || 'لا يوجد',
      },
    };
  };

  return (
    <ServiceDetailLayout
      service={service}
      onValidateCustomFields={validateFields}
      stepLabels={['تفاصيل المشروع', 'الملفات والمتطلبات']}
    >
      <QuestionnaireSection
        step="01"
        icon="📋"
        title="تفاصيل ومتطلبات الخدمة"
        desc="يرجى تزويدنا بكافة المعلومات المتعلقة بطلبك لسرعة البدء في التنفيذ"
      >
        <FormField label="اسم المشروع / العلامة التجارية" icon="🏷️" requirement="required">
          <input
            type="text"
            className="form-control"
            placeholder="اكتب اسم المنشأة أو المشروع..."
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </FormField>

        <FormField label="شرح وتفاصيل المتطلبات" icon="📝" requirement="required">
          <textarea
            className="form-control"
            rows={4}
            placeholder="اشرح بالتفصيل ما ترغب في إنجازه، الأهداف، وأي ملاحظات خاصة..."
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
          />
        </FormField>

        <FormField label="الوقت المفضل للتسليم" icon="⏱️" requirement="optional">
          <select
            className="form-control"
            value={preferredTimeline}
            onChange={(e) => setPreferredTimeline(e.target.value)}
          >
            <option value="عاجل (خلال أيام قليلة)">عاجل (أولوية تنفيذ خلال أيام قليلة)</option>
            <option value="عادي (حسب جدول التسليم القياسي)">عادي (حسب جدول التسليم القياسي للخدمة)</option>
            <option value="مرن (لدينا متسع من الوقت)">مرن (لا يوجد موعد محدد)</option>
          </select>
        </FormField>

        <FileUploadBox
          label="الملفات والمستندات المرفقة"
          uploadTitle="ارفع ملفات المشروع، الشعار، أو المستندات المرجعية"
          icon="📁"
          multiple
          files={attachedFiles}
          onFilesChange={setAttachedFiles}
        />
      </QuestionnaireSection>
    </ServiceDetailLayout>
  );
}
