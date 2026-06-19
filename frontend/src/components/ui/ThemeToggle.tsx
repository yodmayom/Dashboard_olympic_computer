'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)',
        color: 'var(--color-surface-500)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  );
}
