'use client';

import React from 'react';

export type ChipOption =
  | string
  | {
      value: string;
      label: string;
      icon?: string;
    };

interface MultiChipSelectorProps {
  options: ChipOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function getValue(opt: ChipOption): string {
  return typeof opt === 'string' ? opt : opt.value;
}

function getLabel(opt: ChipOption): string {
  return typeof opt === 'string' ? opt : opt.label;
}

function getIcon(opt: ChipOption): string | undefined {
  return typeof opt === 'object' ? opt.icon : undefined;
}

export default function MultiChipSelector({
  options,
  selected,
  onChange
}: MultiChipSelectorProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="multi-chip-wrapper">
      <div className="multi-select-chip-group">
        {options.map((opt) => {
          const value = getValue(opt);
          const label = getLabel(opt);
          const icon = getIcon(opt);
          const isActive = selected.includes(value);

          return (
            <button
              key={value}
              type="button"
              className={`multi-chip-btn ${isActive ? 'active' : ''}`}
              onClick={() => toggleOption(value)}
              aria-pressed={isActive}
            >
              <span className="chip-indicator">
                {isActive ? '✓' : '+'}
              </span>
              {icon && <span className="chip-custom-icon">{icon}</span>}
              <span className="chip-label-text">{label}</span>
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <div className="chips-selected-counter">
          تم تحديد <span className="counter-num">{selected.length}</span> خيارات
        </div>
      )}
    </div>
  );
}
