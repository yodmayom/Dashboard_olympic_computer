'use client';

import React, { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';
import type { MathProgress } from '@/types';
import ProgressBar from './ProgressBar';
import TopicProgress from './TopicProgress';

interface StudentProgressModalProps {
  progressData: MathProgress | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveNotes: (studentId: string, notes: string) => void;
}

export default function StudentProgressModal({
  progressData,
  isOpen,
  onClose,
  onSaveNotes,
}: StudentProgressModalProps) {
  const [notes, setNotes] = useState('');

  // Sync notes when the modal data changes
  useEffect(() => {
    if (progressData) {
      setNotes(progressData.teacherNotes || '');
    }
  }, [progressData]);

  if (!isOpen || !progressData) return null;

  const { student, overallProgress, topics } = progressData;
  const completedCount = topics.filter((t) => t.status === 'completed').length;
  const inProgressCount = topics.filter((t) => t.status === 'in_progress').length;

  const handleSave = () => {
    onSaveNotes(progressData.studentId, notes);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content w-full max-w-3xl mx-4 p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-xl font-bold text-surface-800 dark:text-surface-200">
            Student Progress Detail
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
          >
            <X size={20} className="text-surface-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Student info row */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-200 dark:bg-surface-600 flex-shrink-0">
              {student.photoUrl ? (
                <img
                  src={student.photoUrl}
                  alt={student.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-bold text-surface-400">
                  <User size={28} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-surface-800 dark:text-surface-200">
                {student.fullName}
              </h3>
              <p className="text-sm text-surface-500">
                Grade {student.grade} &middot; {student.classroom} &middot; {student.school}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-surface-400">
                <span>
                  ✅ {completedCount} completed
                </span>
                <span>
                  🔄 {inProgressCount} in progress
                </span>
                <span>
                  ⏳ {12 - completedCount - inProgressCount} not started
                </span>
              </div>
            </div>
          </div>

          {/* Large progress bar */}
          <div>
            <ProgressBar
              percentage={overallProgress}
              label="Overall Progress"
              showLabel
              className=""
            />
          </div>

          {/* All 12 topics */}
          <div>
            <h4 className="text-sm font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wider mb-3">
              Topic Breakdown
            </h4>
            <TopicProgress topics={topics} />
          </div>

          {/* Teacher notes */}
          <div>
            <h4 className="text-sm font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wider mb-2">
              Teacher Notes
            </h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this student's progress..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl text-sm bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--foreground)] placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-surface-200 dark:border-surface-700">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={16} />
            Save Notes
          </button>
        </div>
      </div>
    </div>
  );
}
