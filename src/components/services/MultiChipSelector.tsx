'use client';

import React from 'react';

export type ChipOption = string | { value: string; label: string };

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
    <div className="multi-select-chip-group">
      {options.map((opt) => {
        const value = getValue(opt);
        const label = getLabel(opt);
        const isActive = selected.includes(value);
        return (
          <button
            key={value}
            type="button"
            className={`multi-chip-btn ${isActive ? 'active' : ''}`}
            onClick={() => toggleOption(value)}
          >
            {isActive && <span className="chip-check-icon">✓</span>}{' '}
            {label}
          </button>
        );
      })}
    </div>
  );
}
