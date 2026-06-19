'use client';

import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  BookOpen,
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import OverviewCharts from '@/components/dashboard/OverviewCharts';
import RecentActivity from '@/components/dashboard/RecentActivity';
import type { DashboardStats, ActivityLog } from '@/types';

// ============================================================
// Dashboard Page
// ============================================================
export default function DashboardPage() {
  // ---- State ----
  // TODO: Replace with Firebase real-time listeners
  // e.g. useEffect(() => { const unsubscribe = onSnapshot(collection(db, 'students'), ...); }, []);
  const [stats] = useState<DashboardStats>({
    totalStudents: 0,
    registeredStudents: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    activeLearners: 0,
    overallCompletion: 0,
  });

  // TODO: Replace with Firebase real-time listener on the activity_logs collection
  // e.g. useEffect(() => { const q = query(collection(db, 'activity_logs'), orderBy('timestamp','desc'), limit(20)); ... }, []);
  const [activities] = useState<ActivityLog[]>([]);

  // TODO: Compute from Firebase math_progress collection
  // e.g. aggregate topic statuses across all students
  const topicData = undefined;

  // ---- Stat Card Definitions ----
  const statCards: {
    icon: React.ReactNode;
    label: string;
    value: number;
    color: 'indigo' | 'violet' | 'emerald' | 'amber' | 'rose' | 'sky';
    trend?: { value: number; isPositive: boolean };
  }[] = [
    {
      icon: <Users size={22} />,
      label: 'Total Students',
      value: stats.totalStudents,
      color: 'indigo',
    },
    {
      icon: <UserCheck size={22} />,
      label: 'Registered',
      value: stats.registeredStudents,
      color: 'violet',
    },
    {
      icon: <Clock size={22} />,
      label: 'Pending',
      value: stats.pendingApplications,
      color: 'amber',
    },
    {
      icon: <CheckCircle size={22} />,
      label: 'Approved',
      value: stats.approvedApplications,
      color: 'emerald',
    },
    {
      icon: <XCircle size={22} />,
      label: 'Rejected',
      value: stats.rejectedApplications,
      color: 'rose',
    },
    {
      icon: <BookOpen size={22} />,
      label: 'Active Learners',
      value: stats.activeLearners,
      color: 'sky',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-surface-500 mt-1">
          CS Olympiad overview and key metrics
        </p>
      </div>

      {/* ---- Stat Cards Grid ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
        {statCards.map((card) => (
          <StatCard
            key={card.label}
            icon={card.icon}
            label={card.label}
            value={card.value}
            trend={card.trend}
            color={card.color}
          />
        ))}
      </div>

      {/* ---- Overview Charts ---- */}
      <div className="stagger-children">
        <OverviewCharts stats={stats} topicData={topicData} />
      </div>

      {/* ---- Recent Activity Panel ---- */}
      <div className="stagger-children">
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
}
