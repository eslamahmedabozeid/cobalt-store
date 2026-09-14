'use client';

import React from 'react';

interface UrlRepeaterProps {
  label: string;
  placeholder?: string;
  urls: string[];
  onChange: (urls: string[]) => void;
  required?: boolean;
  addButtonLabel?: string;
}

export default function UrlRepeater({
  label,
  placeholder = 'https://...',
  urls,
  onChange,
  required = false,
  addButtonLabel = '➕ إضافة رابط إضافي'
}: UrlRepeaterProps) {
  const addUrl = () => {
    onChange([...urls, '']);
  };

  const updateUrl = (index: number, value: string) => {
    const updated = [...urls];
    updated[index] = value;
    onChange(updated);
  };

  const removeUrl = (index: number) => {
    if (urls.length <= 1) {
      onChange(['']);
    } else {
      onChange(urls.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="form-field-group">
      <div className="field-label-row">
        <label className="field-title">
          <span className="field-icon">🔗</span>
          <span>{label}</span>
          {required && <span className="req-star">*</span>}
        </label>
        {required ? (
          <span className="field-req-badge badge-required">إجباري</span>
        ) : (
          <span className="field-req-badge badge-optional">اختياري</span>
        )}
      </div>

      <div className="url-repeater-container">
        {urls.map((url, idx) => (
          <div key={idx} className="url-repeater-row">
            <div className="url-input-wrapper">
              <span className="url-input-icon">🌐</span>
              <input
                type="url"
                className="form-control dynamic-url-input"
                placeholder={placeholder}
                value={url}
                onChange={(e) => updateUrl(idx, e.target.value)}
                dir="ltr"
              />
            </div>
            {urls.length > 1 && (
              <button
                type="button"
                className="btn-remove-url"
                onClick={() => removeUrl(idx)}
                title="حذف هذا الرابط"
                aria-label="حذف الرابط"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addUrl}
          className="btn-add-url"
        >
          <span className="add-icon">+</span>
          <span>{addButtonLabel}</span>
        </button>
      </div>
    </div>
  );
}
