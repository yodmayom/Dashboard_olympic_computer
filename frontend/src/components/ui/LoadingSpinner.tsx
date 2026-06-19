'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const sizeMap = {
  sm: 20,
  md: 32,
  lg: 48,
};

const borderWidthMap = {
  sm: 2,
  md: 3,
  lg: 4,
};

export default function LoadingSpinner({
  size = 'md',
  text,
}: LoadingSpinnerProps) {
  const dim = sizeMap[size];
  const bw = borderWidthMap[size];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: '32px 0',
      }}
    >
      <div
        style={{
          width: dim,
          height: dim,
          borderRadius: '50%',
          border: `${bw}px solid var(--color-surface-200)`,
          borderTopColor: 'var(--color-primary-500)',
          animation: 'loading-spin 0.7s linear infinite',
        }}
      />

      {text && (
        <span
          style={{
            fontSize: size === 'sm' ? 12 : 14,
            color: 'var(--color-surface-500)',
            fontWeight: 500,
          }}
        >
          {text}
        </span>
      )}

      <style>{`
        @keyframes loading-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
