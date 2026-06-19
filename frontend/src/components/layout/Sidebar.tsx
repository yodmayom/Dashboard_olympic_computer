'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Trophy,
  LayoutDashboard,
  ClipboardList,
  Calculator,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    href: '/olympiad',
    label: 'Olympiad Management',
    icon: <ClipboardList size={20} />,
  },
  {
    href: '/math-progress',
    label: 'Math Progress',
    icon: <Calculator size={20} />,
  },
];

export default function Sidebar({
  isCollapsed,
  onToggleCollapse,
  className = '',
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`sidebar ${className}`}
      style={{
        width: isCollapsed ? 72 : 260,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 40,
        overflow: 'hidden',
      }}
    >
      {/* Brand Section */}
      <div
        style={{
          padding: isCollapsed ? '20px 0' : '20px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          gap: 12,
          borderBottom: '1px solid var(--sidebar-border)',
          minHeight: 72,
          transition: 'padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
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
            flexShrink: 0,
          }}
        >
          <Trophy size={20} color="white" />
        </div>
        {!isCollapsed && (
          <span
            className="gradient-text"
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            CS Olympiad
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav
        style={{
          flex: 1,
          padding: isCollapsed ? '16px 10px' : '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          transition: 'padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              style={{
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                padding: isCollapsed ? '10px' : '10px 16px',
                position: 'relative',
              }}
              title={isCollapsed ? item.label : undefined}
            >
              <span style={{ flexShrink: 0, display: 'flex' }}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.label}
                </span>
              )}
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  style={{
                    marginLeft: isCollapsed ? 0 : 'auto',
                    position: isCollapsed ? 'absolute' : 'relative',
                    top: isCollapsed ? 4 : 'auto',
                    right: isCollapsed ? 4 : 'auto',
                    background: isActive
                      ? 'rgba(255,255,255,0.3)'
                      : 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 700,
                    minWidth: 20,
                    height: 20,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 6px',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div
        style={{
          padding: '8px 12px',
          display: 'flex',
          justifyContent: isCollapsed ? 'center' : 'flex-end',
        }}
      >
        <button
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
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
            transition: 'all 0.2s ease',
          }}
        >
          {isCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>
      </div>

      {/* User Avatar Section */}
      <div
        style={{
          padding: isCollapsed ? '16px 0' : '16px 16px',
          borderTop: '1px solid var(--sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          gap: 12,
          transition: 'padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
        {!isCollapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Admin User
            </div>
            <div
              style={{
                fontSize: 12,
                color: 'var(--color-surface-500)',
                whiteSpace: 'nowrap',
              }}
            >
              Administrator
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
