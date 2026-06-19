'use client';

import React from 'react';
import { Application, SortConfig } from '@/types';
import StatusBadge from './StatusBadge';

interface StudentTableProps {
  applications: Application[];
  onViewStudent: (application: Application) => void;
  onEditStudent: (application: Application) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

interface ColumnDef {
  key: string;
  label: string;
  sortable: boolean;
}

const COLUMNS: ColumnDef[] = [
  { key: 'index', label: '#', sortable: false },
  { key: 'photo', label: 'Photo', sortable: false },
  { key: 'studentId', label: 'Student ID', sortable: true },
  { key: 'fullName', label: 'Full Name', sortable: true },
  { key: 'grade', label: 'Grade/Class', sortable: true },
  { key: 'school', label: 'School', sortable: true },
  { key: 'registrationDate', label: 'Registration Date', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
];

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return fullName.slice(0, 2).toUpperCase();
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

function SortArrow({ columnKey, sortConfig }: { columnKey: string; sortConfig: SortConfig }) {
  const isActive = sortConfig.key === columnKey;
  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        marginLeft: '4px',
        lineHeight: 0,
        opacity: isActive ? 1 : 0.3,
        transition: 'opacity 0.2s ease',
      }}
    >
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        style={{
          marginBottom: '-1px',
          color: isActive && sortConfig.direction === 'asc' ? 'var(--color-primary-500)' : 'currentColor',
        }}
      >
        <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        style={{
          marginTop: '-1px',
          color: isActive && sortConfig.direction === 'desc' ? 'var(--color-primary-500)' : 'currentColor',
        }}
      >
        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function StudentTable({
  applications,
  onViewStudent,
  onEditStudent,
  sortConfig,
  onSort,
}: StudentTableProps) {
  return (
    <div
      className="glass-card"
      style={{ overflow: 'hidden' }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && onSort(col.key)}
                  style={{
                    cursor: col.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {col.label}
                    {col.sortable && <SortArrow columnKey={col.key} sortConfig={sortConfig} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.id}>
                {/* Index */}
                <td style={{ fontWeight: 500, color: 'var(--color-surface-400)', width: '50px' }}>
                  {index + 1}
                </td>

                {/* Photo */}
                <td style={{ width: '60px' }}>
                  {app.student.photoUrl ? (
                    <img
                      src={app.student.photoUrl}
                      alt={app.student.fullName}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--card-border)',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {getInitials(app.student.fullName)}
                    </div>
                  )}
                </td>

                {/* Student ID */}
                <td>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--color-primary-500)',
                    }}
                  >
                    {app.student.studentId}
                  </span>
                </td>

                {/* Full Name */}
                <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {app.student.fullName}
                </td>

                {/* Grade/Class */}
                <td>
                  <span
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-surface-500)',
                    }}
                  >
                    {app.student.grade}/{app.student.classroom}
                  </span>
                </td>

                {/* School */}
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {app.student.school}
                </td>

                {/* Registration Date */}
                <td style={{ whiteSpace: 'nowrap', color: 'var(--color-surface-500)', fontSize: '13px' }}>
                  {formatDate(app.registrationDate)}
                </td>

                {/* Status */}
                <td>
                  <StatusBadge status={app.status} />
                </td>

                {/* Actions */}
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {/* View button (Eye icon) */}
                    <button
                      onClick={() => onViewStudent(app)}
                      title="View Details"
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        border: '1px solid var(--card-border)',
                        background: 'transparent',
                        color: 'var(--color-primary-500)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--color-primary-50)';
                        e.currentTarget.style.borderColor = 'var(--color-primary-300)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'var(--card-border)';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>

                    {/* Edit button (Pencil icon) */}
                    <button
                      onClick={() => onEditStudent(app)}
                      title="Edit Application"
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        border: '1px solid var(--card-border)',
                        background: 'transparent',
                        color: 'var(--color-accent-500)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--color-accent-50)';
                        e.currentTarget.style.borderColor = 'var(--color-accent-300)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'var(--card-border)';
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
