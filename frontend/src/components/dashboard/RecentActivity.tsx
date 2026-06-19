'use client';

import React from 'react';
import { Activity } from 'lucide-react';
import type { ActivityLog } from '@/types';

// ============================================================
// Color map for activity types
// ============================================================
const TYPE_COLORS: Record<ActivityLog['type'], string> = {
  info: 'bg-info-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-danger-500',
};

const TYPE_RING_COLORS: Record<ActivityLog['type'], string> = {
  info: 'ring-info-500/20',
  success: 'ring-success-500/20',
  warning: 'ring-warning-500/20',
  error: 'ring-danger-500/20',
};

// ============================================================
// Relative time formatter
// ============================================================
function formatRelativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;

  if (isNaN(then)) return timestamp;

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

// ============================================================
// Props
// ============================================================
interface RecentActivityProps {
  activities: ActivityLog[];
}

// ============================================================
// RecentActivity Component
// ============================================================
export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
        <span className="text-xs font-medium text-surface-400">
          {activities.length} {activities.length === 1 ? 'event' : 'events'}
        </span>
      </div>

      {/* Empty State */}
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-3">
            <Activity size={22} className="text-surface-400" />
          </div>
          <p className="text-sm font-medium text-surface-500">No recent activity</p>
          <p className="text-xs text-surface-400 mt-1">
            Activity will appear here as events occur.
          </p>
        </div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto pr-1 -mr-1 space-y-1">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/50"
            >
              {/* Color-coded dot */}
              <div className="flex-shrink-0 mt-1.5">
                <span
                  className={`block w-2.5 h-2.5 rounded-full ring-4 ${TYPE_COLORS[activity.type]} ${TYPE_RING_COLORS[activity.type]}`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium text-surface-500 truncate">
                    {activity.user}
                  </span>
                  <span className="text-surface-300 dark:text-surface-600">·</span>
                  <time className="text-xs text-surface-400 whitespace-nowrap">
                    {formatRelativeTime(activity.timestamp)}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
