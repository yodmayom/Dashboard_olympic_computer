'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Application,
  ApplicationStatus,
  SortConfig,
  SortDirection,
} from '@/types';
import FilterBar from '@/components/olympiad/FilterBar';
import StudentTable from '@/components/olympiad/StudentTable';
import StudentDetailModal from '@/components/olympiad/StudentDetailModal';

// ============================================================
// TODO: Firebase Integration
// ============================================================
// 1. Import Firebase Firestore functions:
//    import { collection, getDocs, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
//    import { db } from '@/lib/firebase';
//
// 2. Replace the `applications` state with a useEffect that fetches
//    from the "applications" Firestore collection on mount.
//
// 3. Replace `handleStatusChange` with a Firestore updateDoc call
//    on the application document.
//
// 4. Replace `handleAddComment` with a Firestore addDoc call
//    to the "comments" subcollection (or array field update).
//
// 5. Replace export handlers with actual PDF/Excel generation
//    using libraries like jspdf + jspdf-autotable / xlsx.
// ============================================================

export default function OlympiadPage() {
  // --- State ---
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'registrationDate', direction: 'desc' });
  const [sortBy, setSortBy] = useState('registrationDate');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Filter Logic ---
  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((app) => app.status === statusFilter);
    }

    // Search filter
    if (searchValue.trim()) {
      const query = searchValue.toLowerCase().trim();
      result = result.filter(
        (app) =>
          app.student.fullName.toLowerCase().includes(query) ||
          app.student.studentId.toLowerCase().includes(query) ||
          app.student.school.toLowerCase().includes(query) ||
          app.student.grade.toLowerCase().includes(query)
      );
    }

    return result;
  }, [applications, statusFilter, searchValue]);

  // --- Sort Logic ---
  const sortedApplications = useMemo(() => {
    const sorted = [...filteredApplications];

    sorted.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (sortConfig.key) {
        case 'studentId':
          aValue = a.student.studentId;
          bValue = b.student.studentId;
          break;
        case 'fullName':
          aValue = a.student.fullName;
          bValue = b.student.fullName;
          break;
        case 'grade':
          aValue = a.student.grade;
          bValue = b.student.grade;
          break;
        case 'school':
          aValue = a.student.school;
          bValue = b.student.school;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'registrationDate':
        default:
          aValue = a.registrationDate;
          bValue = b.registrationDate;
          break;
      }

      const comparison = aValue.localeCompare(bValue);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [filteredApplications, sortConfig]);

  // --- Handlers ---
  const handleSort = useCallback(
    (key: string) => {
      setSortConfig((prev) => {
        if (prev.key === key) {
          const newDirection: SortDirection = prev.direction === 'asc' ? 'desc' : 'asc';
          return { key, direction: newDirection };
        }
        return { key, direction: 'asc' };
      });
    },
    []
  );

  const handleSortByChange = useCallback((value: string) => {
    setSortBy(value);
    setSortConfig({ key: value, direction: 'asc' });
  }, []);

  const handleViewStudent = useCallback((application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  }, []);

  const handleEditStudent = useCallback((application: Application) => {
    // TODO: Implement edit functionality or navigate to edit form
    setSelectedApplication(application);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  }, []);

  const handleStatusChange = useCallback(
    (applicationId: string, newStatus: ApplicationStatus) => {
      // TODO: Replace with Firebase updateDoc call
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? { ...app, status: newStatus, reviewedAt: new Date().toISOString() }
            : app
        )
      );
      // Update modal view as well
      setSelectedApplication((prev) =>
        prev && prev.id === applicationId
          ? { ...prev, status: newStatus, reviewedAt: new Date().toISOString() }
          : prev
      );
    },
    []
  );

  const handleAddComment = useCallback(
    (applicationId: string, commentText: string) => {
      // TODO: Replace with Firebase addDoc / arrayUnion call
      const newComment = {
        id: `comment-${Date.now()}`,
        text: commentText,
        author: 'Admin', // TODO: Replace with authenticated user name
        createdAt: new Date().toISOString(),
      };

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? { ...app, comments: [...app.comments, newComment] }
            : app
        )
      );
      setSelectedApplication((prev) =>
        prev && prev.id === applicationId
          ? { ...prev, comments: [...prev.comments, newComment] }
          : prev
      );
    },
    []
  );

  const handleExportPDF = useCallback(() => {
    // TODO: Implement PDF export with jspdf + jspdf-autotable
    console.log('Export PDF – filtered applications:', sortedApplications.length);
    alert('PDF export will be available after Firebase integration.');
  }, [sortedApplications]);

  const handleExportExcel = useCallback(() => {
    // TODO: Implement Excel export with xlsx library
    console.log('Export Excel – filtered applications:', sortedApplications.length);
    alert('Excel export will be available after Firebase integration.');
  }, [sortedApplications]);

  // --- Render ---
  return (
    <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Page Header */}
      <div
        className="animate-fade-in-up"
        style={{ marginBottom: '28px' }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: 800,
            margin: '0 0 6px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#headerGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-primary-500)" />
                <stop offset="100%" stopColor="var(--color-accent-500)" />
              </linearGradient>
            </defs>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="gradient-text">Olympiad Management</span>
        </h1>
        <p style={{ margin: 0, color: 'var(--color-surface-500)', fontSize: '15px' }}>
          Manage student registrations and application statuses for the CS Olympiad.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <FilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={handleSortByChange}
          onExportPDF={handleExportPDF}
          onExportExcel={handleExportExcel}
        />
      </div>

      {/* Results Count */}
      <div
        className="animate-fade-in-up"
        style={{
          marginBottom: '16px',
          fontSize: '14px',
          color: 'var(--color-surface-500)',
          fontWeight: 500,
          animationDelay: '0.15s',
        }}
      >
        Showing {sortedApplications.length} of {applications.length} application{applications.length !== 1 ? 's' : ''}
      </div>

      {/* Student Table or Empty State */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {sortedApplications.length > 0 ? (
          <StudentTable
            applications={sortedApplications}
            onViewStudent={handleViewStudent}
            onEditStudent={handleEditStudent}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        ) : (
          /* Empty State */
          <div
            className="glass-card"
            style={{
              padding: '64px 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {/* Inbox Icon */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary-100), var(--color-accent-100))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary-500)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                margin: '0 0 8px',
                color: 'var(--foreground)',
              }}
            >
              No Applications Found
            </h3>
            <p
              style={{
                margin: 0,
                color: 'var(--color-surface-400)',
                fontSize: '14px',
                maxWidth: '400px',
                lineHeight: '1.6',
              }}
            >
              {applications.length === 0
                ? 'There are no student applications yet. Applications will appear here once students register for the CS Olympiad.'
                : 'No applications match your current filters. Try adjusting the search or status filter.'}
            </p>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      <StudentDetailModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusChange={handleStatusChange}
        onAddComment={handleAddComment}
      />
    </div>
  );
}
