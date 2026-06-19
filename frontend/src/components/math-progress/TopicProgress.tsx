'use client';

import React from 'react';
import { Circle, Loader2, CheckCircle2 } from 'lucide-react';
import type { MathTopic, TopicStatus } from '@/types';

interface TopicProgressProps {
  topics: MathTopic[];
}

const STATUS_CONFIG: Record<TopicStatus, {
  label: string;
  icon: React.ElementType;
  badgeClass: string;
  iconClass: string;
}> = {
  not_started: {
    label: 'Not Started',
    icon: Circle,
    badgeClass: 'topic-not_started',
    iconClass: 'text-surface-400',
  },
  in_progress: {
    label: 'In Progress',
    icon: Loader2,
    badgeClass: 'topic-in_progress',
    iconClass: 'text-info-500 animate-spin',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    badgeClass: 'topic-completed',
    iconClass: 'text-success-500',
  },
};

export default function TopicProgress({ topics }: TopicProgressProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {topics.map((topic, index) => {
        const config = STATUS_CONFIG[topic.status];
        const Icon = config.icon;

        return (
          <div
            key={topic.id}
            className="glass-card p-4 flex flex-col gap-3 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Topic name */}
            <h4 className="text-sm font-semibold text-surface-800 dark:text-surface-200 leading-tight min-h-[2.5rem] flex items-center">
              {topic.name}
            </h4>

            {/* Status row */}
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.badgeClass}`}
              >
                <Icon size={12} className={config.iconClass} />
                {config.label}
              </span>
            </div>

            {/* Optional score */}
            {topic.score !== undefined && topic.status === 'completed' && (
              <div className="mt-auto pt-2 border-t border-surface-200 dark:border-surface-700">
                <span className="text-xs text-surface-500">Score</span>
                <span className="text-sm font-bold text-success-600 dark:text-success-400 ml-2">
                  {topic.score}%
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
