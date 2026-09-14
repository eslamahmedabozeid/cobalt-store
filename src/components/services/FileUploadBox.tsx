'use client';

import React, { useRef, useState } from 'react';

interface FileUploadBoxProps {
  label: string;
  sublabel?: string;
  uploadTitle?: React.ReactNode;
  icon?: string;
  accept?: string;
  multiple?: boolean;
  files: string[];
  onFilesChange: (files: string[]) => void;
  required?: boolean;
  conditional?: boolean;
  hideLabel?: boolean;
}

export default function FileUploadBox({
  label,
  sublabel,
  uploadTitle,
  icon = '📁',
  accept,
  multiple = false,
  files,
  onFilesChange,
  required = false,
  conditional = false,
  hideLabel = false
}: FileUploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const newNames: string[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const sizeKB = (file.size / 1024).toFixed(1);
      newNames.push(`${file.name} (${sizeKB} KB)`);
    }
    onFilesChange(multiple ? [...files, ...newNames] : newNames);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (e.target) e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="form-field-group">
      {!hideLabel && (
        <div className="field-label-row">
          <label className="field-title">
            <span className="field-icon">{icon}</span>
            <span>{label}</span>
            {required && <span className="req-star" style={{ color: '#F87171' }}>*</span>}
            {conditional && <span className="req-star" style={{ color: '#FBBF24' }}>*</span>}
          </label>
          {required ? (
            <span className="field-req-badge badge-required">إجباري</span>
          ) : conditional ? (
            <span className="field-req-badge badge-conditional">شرطي</span>
          ) : (
            <span className="field-req-badge badge-optional">اختياري</span>
          )}
        </div>
      )}

      <div
        className={`upload-box-enhanced ${isDragging ? 'drag-over' : ''} ${files.length > 0 ? 'has-files' : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            fileInputRef.current?.click();
          }
        }}
      >
        <div className="upload-ambient-glow" />
        <div className="upload-icon-circle">
          <svg
            className="upload-cloud-icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
          </svg>
        </div>

        <div className="upload-main-text">
          {uploadTitle || (
            <>
              اسحب وأفلت الملفات هنا أو{' '}
              <span className="upload-browse-link">تصفح من جهازك</span>
            </>
          )}
        </div>

        {sublabel ? (
          <div className="upload-sub-text">{sublabel}</div>
        ) : (
          <div className="upload-sub-text">
            {accept ? `التنسيقات المدعومة: ${accept.replace(/\./g, ' ').toUpperCase()}` : 'يدعم كافة صيغ الملفات والصور'}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {files.length > 0 && (
          <div
            className="upload-file-list"
            onClick={(e) => e.stopPropagation()}
          >
            {files.map((fileName, idx) => (
              <div key={idx} className="upload-file-tag">
                <span className="tag-file-icon">📄</span>
                <span className="tag-file-name" title={fileName}>{fileName}</span>
                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={() => removeFile(idx)}
                  title="حذف الملف"
                  aria-label="حذف الملف"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
