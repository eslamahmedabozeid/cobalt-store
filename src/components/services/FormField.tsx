import React from 'react';

export type FieldRequirement = 'required' | 'optional' | 'conditional';

interface FormFieldProps {
  label: string;
  icon?: string;
  requirement?: FieldRequirement;
  children: React.ReactNode;
  className?: string;
}

const BADGE_MAP: Record<FieldRequirement, { className: string; text: string }> = {
  required: { className: 'badge-required', text: 'إجباري' },
  optional: { className: 'badge-optional', text: 'اختياري' },
  conditional: { className: 'badge-conditional', text: 'شرطي' },
};

export default function FormField({
  label,
  icon,
  requirement = 'optional',
  children,
  className = '',
}: FormFieldProps) {
  const badge = BADGE_MAP[requirement];
  const showStar = requirement === 'required' || requirement === 'conditional';

  return (
    <div className={`form-field-group${className ? ` ${className}` : ''}`}>
      <div className="field-label-row">
        <label className="field-title">
          {icon && <span className="field-icon">{icon}</span>}
          <span>{label}</span>
          {showStar && (
            <span
              className={`req-star${requirement === 'conditional' ? ' conditional' : ''}`}
            >
              *
            </span>
          )}
        </label>
        <span className={`field-req-badge ${badge.className}`}>{badge.text}</span>
      </div>
      {children}
    </div>
  );
}
