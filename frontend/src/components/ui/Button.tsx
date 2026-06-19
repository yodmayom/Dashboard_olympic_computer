'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: 13, borderRadius: 8 },
  md: { padding: '10px 20px', fontSize: 14, borderRadius: 12 },
  lg: { padding: '14px 28px', fontSize: 15, borderRadius: 14 },
};

const ghostStyles: React.CSSProperties = {
  background: 'transparent',
  color: 'var(--color-surface-500)',
  border: 'none',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const variantClass =
    variant === 'ghost' ? '' : `btn-${variant}`;

  return (
    <button
      className={`btn ${variantClass} ${className}`}
      disabled={disabled || isLoading}
      style={{
        ...sizeStyles[size],
        ...(variant === 'ghost' ? ghostStyles : {}),
        opacity: disabled || isLoading ? 0.6 : 1,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...rest}
    >
      {isLoading ? (
        <span
          style={{
            width: size === 'sm' ? 14 : 16,
            height: size === 'sm' ? 14 : 16,
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: 'currentColor',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      ) : (
        leftIcon && <span style={{ display: 'flex', flexShrink: 0 }}>{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span style={{ display: 'flex', flexShrink: 0 }}>{rightIcon}</span>
      )}

      {/* Inline keyframes for the spinner */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
