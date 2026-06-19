'use client';

import React, { useState, useMemo } from 'react';
import { Search, Users, TrendingUp, Award } from 'lucide-react';
import type { MathProgress, SortConfig } from '@/types';
import ProgressTable from '@/components/math-progress/ProgressTable';
import StudentRanking from '@/components/math-progress/StudentRanking';
import StudentProgressModal from '@/components/math-progress/StudentProgressModal';

// ----------------------------------------------------------------
// TODO: Replace with Firebase Firestore subscription
// e.g. useEffect(() => { const unsub = onSnapshot(collection(db, 'mathProgress'), ...) }, []);
// ----------------------------------------------------------------
const MOCK_PROGRESS: MathProgress[] = [];

export default function MathProgressPage() {
  // ---- State ----
  const [progressData, setProgressData] = useState<MathProgress[]>(MOCK_PROGRESS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'overallProgress', direction: 'desc' });
  const [selectedStudent, setSelectedStudent] = useState<MathProgress | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ---- Derived stats ----
  const stats = useMemo(() => {
    const total = progressData.length;
    const avgProgress =
      total > 0
        ? Math.round(progressData.reduce((sum, p) => sum + p.overallProgress, 0) / total)
        : 0;
    const fullyCompleted = progressData.filter((p) => p.overallProgress === 100).length;
    return { total, avgProgress, fullyCompleted };
  }, [progressData]);

  // ---- Search filter ----
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return progressData;
    const q = searchQuery.toLowerCase();
    return progressData.filter(
      (p) =>
        p.student.fullName.toLowerCase().includes(q) ||
        p.student.grade.toLowerCase().includes(q) ||
        p.student.school.toLowerCase().includes(q),
    );
  }, [progressData, searchQuery]);

  // ---- Sort ----
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    const { key, direction } = sortConfig;
    const dir = direction === 'asc' ? 1 : -1;

    data.sort((a, b) => {
      switch (key) {
        case 'rank':
          return ((a.rank ?? 0) - (b.rank ?? 0)) * dir;
        case 'fullName':
          return a.student.fullName.localeCompare(b.student.fullName) * dir;
        case 'grade':
          return a.student.grade.localeCompare(b.student.grade) * dir;
        case 'overallProgress':
          return (a.overallProgress - b.overallProgress) * dir;
        case 'topics': {
          const aCount = a.topics.filter((t) => t.status === 'completed').length;
          const bCount = b.topics.filter((t) => t.status === 'completed').length;
          return (aCount - bCount) * dir;
        }
        case 'lastUpdated':
          return (new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()) * dir;
        default:
          return 0;
      }
    });

    return data;
  }, [filteredData, sortConfig]);

  // ---- Rankings (always by overallProgress desc) ----
  const rankings = useMemo(
    () => [...progressData].sort((a, b) => b.overallProgress - a.overallProgress),
    [progressData],
  );

  // ---- Handlers ----
  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleViewStudent = (progress: MathProgress) => {
    setSelectedStudent(progress);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSaveNotes = (studentId: string, notes: string) => {
    // TODO: Save to Firebase
    // e.g. await updateDoc(doc(db, 'mathProgress', studentId), { teacherNotes: notes });
    setProgressData((prev) =>
      prev.map((p) => (p.studentId === studentId ? { ...p, teacherNotes: notes } : p)),
    );
    handleCloseModal();
  };

  // ---- Mini stat cards config ----
  const miniStats = [
    {
      label: 'Total Students',
      value: stats.total,
      icon: Users,
      gradient: 'from-primary-500 to-accent-500',
    },
    {
      label: 'Avg Progress',
      value: `${stats.avgProgress}%`,
      icon: TrendingUp,
      gradient: 'from-info-500 to-primary-500',
    },
    {
      label: 'Fully Completed',
      value: stats.fullyCompleted,
      icon: Award,
      gradient: 'from-success-500 to-emerald-400',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Math Learning Progress</h1>
          <p className="text-sm text-surface-500 mt-1">
            Track student performance across all 12 math topics
          </p>
        </div>
      </div>

      {/* Mini stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
        {miniStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-5 flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
              >
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-surface-800 dark:text-surface-200">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search by name, grade, or school..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--foreground)] placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
        />
      </div>

      {/* Main content: table + sidebar ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Progress table */}
        <ProgressTable
          progressData={sortedData}
          onViewStudent={handleViewStudent}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        {/* Sidebar ranking */}
        <div className="hidden lg:block">
          <StudentRanking rankings={rankings} />
        </div>
      </div>

      {/* Student detail modal */}
      <StudentProgressModal
        progressData={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSaveNotes={handleSaveNotes}
      />
    </div>
  );
}
