'use client';

import React from 'react';

interface YesNoToggleProps {
  value: 'yes' | 'no';
  onChange: (value: 'yes' | 'no') => void;
  yesLabel: string;
  noLabel: string;
}

export default function YesNoToggle({
  value,
  onChange,
  yesLabel,
  noLabel,
}: YesNoToggleProps) {
  return (
    <div className="switch-toggle-group">
      <button
        type="button"
        className={`switch-toggle-btn ${value === 'no' ? 'active' : ''}`}
        onClick={() => onChange('no')}
      >
        {noLabel}
      </button>
      <button
        type="button"
        className={`switch-toggle-btn ${value === 'yes' ? 'active' : ''}`}
        onClick={() => onChange('yes')}
      >
        {yesLabel}
      </button>
    </div>
  );
}

interface ConditionalRevealProps {
  show: boolean;
  children: React.ReactNode;
}

export function ConditionalReveal({ show, children }: ConditionalRevealProps) {
  return (
    <div className={`conditional-field-wrapper ${show ? 'active' : ''}`}>
      {children}
    </div>
  );
}
