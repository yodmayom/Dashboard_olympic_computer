'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Trophy,
  LayoutDashboard,
  ClipboardList,
  Calculator,
  X,
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { href: '/olympiad', label: 'Olympiad Management', icon: <ClipboardList size={20} /> },
  { href: '/math-progress', label: 'Math Progress', icon: <Calculator size={20} /> },
];

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="animate-fade-in"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--modal-overlay)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Slide-in Panel */}
      <div
        className="animate-slide-in-left"
        style={{
          position: 'relative',
          width: 280,
          maxWidth: '80vw',
          height: '100%',
          background: 'var(--sidebar-bg)',
          borderRight: '1px solid var(--sidebar-border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 0 24px var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--sidebar-border)',
            minHeight: 72,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background:
                  'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trophy size={20} color="white" />
            </div>
            <span
              className="gradient-text"
              style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              CS Olympiad
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: '1px solid var(--card-border)',
              background: 'var(--card-bg)',
              color: 'var(--color-surface-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav Links */}
        <nav
          style={{
            flex: 1,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span style={{ flexShrink: 0, display: 'flex' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid var(--sidebar-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
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
              fontSize: 14,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            AD
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Admin User</div>
            <div style={{ fontSize: 12, color: 'var(--color-surface-500)' }}>
              Administrator
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
