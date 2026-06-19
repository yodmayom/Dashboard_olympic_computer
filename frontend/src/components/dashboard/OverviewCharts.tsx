'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useTheme } from '@/context/ThemeContext';
import type { DashboardStats } from '@/types';

// ============================================================
// Register Chart.js modules
// ============================================================
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// ============================================================
// Props
// ============================================================
interface OverviewChartsProps {
  stats: DashboardStats;
  topicData?: {
    labels: string[];
    completed: number[];
    inProgress: number[];
    notStarted: number[];
  };
}

// ============================================================
// Default topic data placeholder
// ============================================================
const DEFAULT_TOPIC_DATA = {
  labels: ['Sets', 'Logic', 'Number Theory', 'Relations', 'Functions', 'Probability'],
  completed: [0, 0, 0, 0, 0, 0],
  inProgress: [0, 0, 0, 0, 0, 0],
  notStarted: [0, 0, 0, 0, 0, 0],
};

// ============================================================
// OverviewCharts Component
// ============================================================
export default function OverviewCharts({ stats, topicData }: OverviewChartsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Shared style tokens
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.8)';

  // ----- Doughnut Chart: Application Status -----
  const doughnutData = {
    labels: ['Pending', 'Approved', 'Rejected', 'Under Review'],
    datasets: [
      {
        data: [
          stats.pendingApplications,
          stats.approvedApplications,
          stats.rejectedApplications,
          Math.max(
            0,
            stats.registeredStudents -
              stats.pendingApplications -
              stats.approvedApplications -
              stats.rejectedApplications
          ),
        ],
        backgroundColor: [
          'rgba(245, 158, 11, 0.85)', // amber
          'rgba(34, 197, 94, 0.85)',   // green
          'rgba(239, 68, 68, 0.85)',   // red
          'rgba(59, 130, 246, 0.85)',   // blue
        ],
        borderColor: isDark ? '#1e293b' : '#ffffff',
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          font: { family: 'Inter, sans-serif', size: 12, weight: 500 as const },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#334155' : '#1e293b',
        titleFont: { family: 'Inter, sans-serif', size: 13 },
        bodyFont: { family: 'Inter, sans-serif', size: 12 },
        padding: 10,
        cornerRadius: 8,
        boxPadding: 4,
      },
    },
  };

  // ----- Bar Chart: Topic Completion -----
  const topics = topicData ?? DEFAULT_TOPIC_DATA;

  const barData = {
    labels: topics.labels,
    datasets: [
      {
        label: 'Completed',
        data: topics.completed,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.65,
      },
      {
        label: 'In Progress',
        data: topics.inProgress,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.65,
      },
      {
        label: 'Not Started',
        data: topics.notStarted,
        backgroundColor: isDark ? 'rgba(71, 85, 105, 0.6)' : 'rgba(203, 213, 225, 0.8)',
        borderRadius: 4,
        barPercentage: 0.7,
        categoryPercentage: 0.65,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          font: { family: 'Inter, sans-serif', size: 12, weight: 500 as const },
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#334155' : '#1e293b',
        titleFont: { family: 'Inter, sans-serif', size: 13 },
        bodyFont: { family: 'Inter, sans-serif', size: 12 },
        padding: 10,
        cornerRadius: 8,
        boxPadding: 4,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: {
          color: textColor,
          font: { family: 'Inter, sans-serif', size: 11 },
          maxRotation: 45,
          minRotation: 0,
        },
        border: { display: false },
      },
      y: {
        stacked: true,
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          font: { family: 'Inter, sans-serif', size: 11 },
          stepSize: 5,
        },
        border: { display: false },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Application Status Doughnut */}
      <div className="glass-card p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Application Status
        </h3>
        <div className="h-[300px] flex items-center justify-center">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>

      {/* Topic Completion Bar */}
      <div className="glass-card p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Topic Completion
        </h3>
        <div className="h-[300px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
