'use client';

import React, { useRef } from 'react';

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
  icon = '📂',
  accept,
  multiple = false,
  files,
  onFilesChange,
  required = false,
  conditional = false,
  hideLabel = false
}: FileUploadBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newNames: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        newNames.push(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      }
      onFilesChange(multiple ? [...files, ...newNames] : newNames);
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
            {label}{' '}
            {required && <span style={{ color: '#F87171' }}>*</span>}
            {conditional && <span style={{ color: '#FBBF24' }}>*</span>}
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
        className="upload-box-enhanced"
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <div className="upload-icon-circle">{icon}</div>
        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#FFF' }}>
          {uploadTitle || (
            <>
              اسحب الملفات هنا أو{' '}
              <span style={{ color: 'var(--cyan-accent)', textDecoration: 'underline' }}>
                تصفح من جهازك
              </span>
            </>
          )}
        </div>
        {sublabel && (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {sublabel}
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
          <div className="upload-file-list" style={{ marginTop: '10px' }} onClick={(e) => e.stopPropagation()}>
            {files.map((fileName, idx) => (
              <div key={idx} className="upload-file-tag">
                <span>📄 {fileName}</span>
                <span
                  className="remove-file-btn"
                  onClick={() => removeFile(idx)}
                  title="إلغاء الملف"
                >
                  ✕
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
