'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import SearchInput from '@/components/ui/SearchInput';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface TopBarProps {
  title: string;
  onMenuToggle: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function TopBar({
  title,
  onMenuToggle,
  searchValue,
  onSearchChange,
}: TopBarProps) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'var(--card-bg)',
        borderBottom: '1px solid var(--card-border)',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >


      {/* Page Title */}
      <h1
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          margin: 0,
        }}
      >
        {title}
      </h1>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Search */}
      <div className="hidden md:block" style={{ width: 280 }}>
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search students, topics…"
        />
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Notification Bell */}
      <button
        aria-label="Notifications"
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
          position: 'relative',
          transition: 'all 0.2s ease',
        }}
      >
        <Bell size={18} />
        {/* Notification dot */}
        <span
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--color-danger-500)',
            border: '2px solid var(--card-bg)',
          }}
        />
      </button>

      {/* User Avatar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background:
              'linear-gradient(135deg, var(--color-primary-400), var(--color-accent-400))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          AD
        </div>
        <span
          className="hidden lg:inline"
          style={{
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          Admin User
        </span>
      </div>
    </header>
  );
}
