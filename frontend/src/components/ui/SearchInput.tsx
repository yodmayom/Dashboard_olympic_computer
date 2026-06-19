'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  className = '',
}: SearchInputProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Search icon */}
      <Search
        size={16}
        style={{
          position: 'absolute',
          left: 12,
          color: 'var(--color-surface-400)',
          pointerEvents: 'none',
        }}
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: 40,
          padding: '0 36px 0 38px',
          borderRadius: 12,
          border: '1px solid var(--input-border)',
          background: 'var(--input-bg)',
          color: 'var(--foreground)',
          fontSize: 14,
          outline: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary-400)';
          e.currentTarget.style.boxShadow =
            '0 0 0 3px rgba(99, 102, 241, 0.15)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--input-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: 8,
            width: 24,
            height: 24,
            borderRadius: 6,
            border: 'none',
            background: 'var(--color-surface-200)',
            color: 'var(--color-surface-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}
