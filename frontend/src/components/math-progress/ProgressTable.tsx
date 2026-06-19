'use client';

import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Eye } from 'lucide-react';
import type { MathProgress, SortConfig } from '@/types';
import ProgressBar from './ProgressBar';

interface ProgressTableProps {
  progressData: MathProgress[];
  onViewStudent: (progress: MathProgress) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export default function ProgressTable({
  progressData,
  onViewStudent,
  sortConfig,
  onSort,
}: ProgressTableProps) {
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="text-surface-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={14} className="text-primary-500" />
    ) : (
      <ArrowDown size={14} className="text-primary-500" />
    );
  };

  const completedTopicsCount = (progress: MathProgress): number =>
    progress.topics.filter((t) => t.status === 'completed').length;

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const columns = [
    { key: 'rank', label: 'Rank', sortable: true },
    { key: 'photo', label: '', sortable: false },
    { key: 'fullName', label: 'Full Name', sortable: true },
    { key: 'grade', label: 'Grade', sortable: true },
    { key: 'overallProgress', label: 'Overall Progress', sortable: true },
    { key: 'topics', label: 'Topics', sortable: true },
    { key: 'lastUpdated', label: 'Last Updated', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.sortable ? 'cursor-pointer select-none hover:text-primary-500 transition-colors' : ''}
                  onClick={() => col.sortable && onSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && getSortIcon(col.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {progressData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-surface-400">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📊</span>
                    <p className="text-sm">No student progress data found</p>
                  </div>
                </td>
              </tr>
            ) : (
              progressData.map((progress, index) => (
                <tr
                  key={progress.id}
                  className="animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.03}s` }}
                  onClick={() => onViewStudent(progress)}
                >
                  {/* Rank */}
                  <td>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-700 text-sm font-bold text-surface-600 dark:text-surface-300">
                      {progress.rank ?? index + 1}
                    </span>
                  </td>

                  {/* Photo */}
                  <td>
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-surface-200 dark:bg-surface-600 flex-shrink-0">
                      {progress.student.photoUrl ? (
                        <img
                          src={progress.student.photoUrl}
                          alt={progress.student.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-surface-400">
                          {progress.student.firstName?.[0]}
                          {progress.student.lastName?.[0]}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Full Name */}
                  <td>
                    <div>
                      <p className="font-semibold text-surface-800 dark:text-surface-200">
                        {progress.student.fullName}
                      </p>
                      <p className="text-xs text-surface-400">{progress.student.school}</p>
                    </div>
                  </td>

                  {/* Grade */}
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/30 text-xs font-medium text-primary-700 dark:text-primary-300">
                      {progress.student.grade}
                    </span>
                  </td>

                  {/* Overall Progress */}
                  <td className="min-w-[160px]">
                    <ProgressBar percentage={progress.overallProgress} />
                  </td>

                  {/* Topics Count */}
                  <td>
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      {completedTopicsCount(progress)}
                      <span className="text-surface-400">/12</span>
                    </span>
                  </td>

                  {/* Last Updated */}
                  <td>
                    <span className="text-sm text-surface-500">
                      {formatDate(progress.lastUpdated)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewStudent(progress);
                      }}
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
