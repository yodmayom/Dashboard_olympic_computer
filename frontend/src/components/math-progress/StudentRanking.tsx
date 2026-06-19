'use client';

import React from 'react';
import { Trophy } from 'lucide-react';
import type { MathProgress } from '@/types';
import ProgressBar from './ProgressBar';

interface StudentRankingProps {
  rankings: MathProgress[];
}

const RANK_STYLES: Record<number, { color: string; bg: string; border: string; trophy: string }> = {
  1: {
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-700/50',
    trophy: '#eab308',
  },
  2: {
    color: 'text-slate-500 dark:text-slate-400',
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    border: 'border-slate-200 dark:border-slate-700/50',
    trophy: '#94a3b8',
  },
  3: {
    color: 'text-amber-700 dark:text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-700/50',
    trophy: '#d97706',
  },
};

export default function StudentRanking({ rankings }: StudentRankingProps) {
  // Take only the top 5
  const topFive = rankings.slice(0, 5);

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <h3 className="text-lg font-bold text-surface-800 dark:text-surface-200 mb-5 flex items-center gap-2">
        <span>🏆</span> Top Performers
      </h3>

      {/* Ranking list */}
      <div className="flex flex-col gap-3 stagger-children">
        {topFive.map((progress, index) => {
          const rank = index + 1;
          const style = RANK_STYLES[rank];
          const isTopThree = rank <= 3;

          return (
            <div
              key={progress.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 hover:scale-[1.02] ${
                isTopThree && style
                  ? `${style.bg} ${style.border}`
                  : 'bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700'
              }`}
            >
              {/* Rank badge */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {isTopThree && style ? (
                  <Trophy size={20} style={{ color: style.trophy }} />
                ) : (
                  <span className="text-sm font-bold text-surface-400">#{rank}</span>
                )}
              </div>

              {/* Student photo */}
              <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-200 dark:bg-surface-600 flex-shrink-0">
                {progress.student.photoUrl ? (
                  <img
                    src={progress.student.photoUrl}
                    alt={progress.student.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-bold text-surface-400">
                    {progress.student.firstName?.[0]}
                    {progress.student.lastName?.[0]}
                  </div>
                )}
              </div>

              {/* Name & progress */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 truncate">
                  {progress.student.fullName}
                </p>
                <ProgressBar percentage={progress.overallProgress} />
              </div>

              {/* Percentage */}
              <span
                className={`text-sm font-bold flex-shrink-0 ${
                  isTopThree && style ? style.color : 'text-surface-500'
                }`}
              >
                {progress.overallProgress}%
              </span>
            </div>
          );
        })}

        {topFive.length === 0 && (
          <p className="text-sm text-surface-400 text-center py-6">No ranking data yet</p>
        )}
      </div>
    </div>
  );
}
