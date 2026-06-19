'use client';

import React from 'react';

type BadgeVariant =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'under_review'
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'info'
  | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

/**
 * Maps badge variants to the CSS class names defined in globals.css.
 * Status variants use `status-*`, topic variants use `topic-*`,
 * and `info`/`default` fall back to appropriate classes.
 */
const variantClassMap: Record<BadgeVariant, string> = {
  pending: 'status-pending',
  approved: 'status-approved',
  rejected: 'status-rejected',
  under_review: 'status-under_review',
  not_started: 'topic-not_started',
  in_progress: 'topic-in_progress',
  completed: 'topic-completed',
  info: 'status-under_review', // reuse info-blue style
  default: 'topic-not_started',
};

export default function Badge({
  variant = 'default',
  children,
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`${variantClassMap[variant]} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 12px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'currentColor',
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </span>
  );
}
