'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';
import FileUploadBox from '@/components/services/FileUploadBox';
import { SERVICES_DATA } from '@/data/services';

interface DynamicServicePageProps {
  params: {
    slug: string;
  };
}

export default function DynamicServicePage({ params }: DynamicServicePageProps) {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

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
        'الملفات المرفقة': attachedFiles.join(', ') || 'لا يوجد'
      }
    };
  };

  return (
    <ServiceDetailLayout
      service={service}
      onValidateCustomFields={validateFields}
      stepLabels={['تفاصيل المشروع', 'الملفات والمتطلبات']}
    >
      <div className="questionnaire-section-box">
        <div className="section-box-header">
          <div className="section-step-badge">01</div>
          <div className="section-header-info">
            <h3 className="section-box-title">
              <span className="section-icon">📋</span> تفاصيل ومتطلبات الخدمة
            </h3>
            <p className="section-box-desc">
              يرجى تزويدنا بكافة المعلومات المتعلقة بطلبك لسرعة البدء في التنفيذ
            </p>
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">🏷️</span>
              <span>اسم المشروع / العلامة التجارية</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="اكتب اسم المنشأة أو المشروع..."
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">📝</span>
              <span>شرح وتفاصيل المتطلبات</span>
              <span className="req-star" style={{ color: '#F87171' }}>*</span>
            </label>
            <span className="field-req-badge badge-required">إجباري</span>
          </div>
          <textarea
            className="form-control"
            rows={4}
            placeholder="اشرح بالتفصيل ما ترغب في إنجازه، الأهداف، وأي ملاحظات خاصة..."
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
          />
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label className="field-title">
              <span className="field-icon">⏱️</span>
              <span>الوقت المفضل للتسليم</span>
            </label>
            <span className="field-req-badge badge-optional">اختياري</span>
          </div>
          <select
            className="form-control"
            value={preferredTimeline}
            onChange={(e) => setPreferredTimeline(e.target.value)}
          >
            <option value="عاجل (خلال أيام قليلة)">عاجل (أولوية تنفيذ خلال أيام قليلة)</option>
            <option value="عادي (حسب جدول التسليم القياسي)">عادي (حسب جدول التسليم القياسي للخدمة)</option>
            <option value="مرن (لدينا متسع من الوقت)">مرن (لا يوجد موعد محدد)</option>
          </select>
        </div>

        <FileUploadBox
          label="الملفات والمستندات المرفقة"
          uploadTitle="ارفع ملفات المشروع، الشعار، أو المستندات المرجعية"
          icon="📁"
          multiple
          files={attachedFiles}
          onFilesChange={setAttachedFiles}
        />
      </div>
    </ServiceDetailLayout>
  );
}
