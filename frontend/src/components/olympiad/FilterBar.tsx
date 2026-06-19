'use client';

import React from 'react';
import { ApplicationStatus } from '@/types';

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusFilter: ApplicationStatus | 'all';
  onStatusFilterChange: (status: ApplicationStatus | 'all') => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onExportPDF: () => void;
  onExportExcel: () => void;
}

const STATUS_TABS: { value: ApplicationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'under_review', label: 'Under Review' },
];

const SORT_OPTIONS = [
  { value: 'registrationDate', label: 'Registration Date' },
  { value: 'fullName', label: 'Full Name' },
  { value: 'studentId', label: 'Student ID' },
  { value: 'grade', label: 'Grade' },
  { value: 'school', label: 'School' },
  { value: 'status', label: 'Status' },
];

export default function FilterBar({
  searchValue,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  onExportPDF,
  onExportExcel,
}: FilterBarProps) {
  return (
    <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
      {/* Top row: Search + Sort + Export */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 280px', minWidth: '200px' }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-surface-400)',
              pointerEvents: 'none',
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, ID, or school..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 42px',
              borderRadius: '12px',
              border: '1px solid var(--input-border)',
              background: 'var(--input-bg)',
              color: 'var(--foreground)',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary-500)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--input-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Sort Dropdown */}
        <div style={{ flex: '0 0 auto' }}>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1px solid var(--input-border)',
              background: 'var(--input-bg)',
              color: 'var(--foreground)',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
              minWidth: '160px',
              transition: 'border-color 0.2s ease',
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Export Buttons */}
        <div style={{ display: 'flex', gap: '8px', flex: '0 0 auto' }}>
          <button className="btn btn-secondary btn-sm" onClick={onExportPDF}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            PDF
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onExportExcel}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="16" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Excel
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
        }}
      >
        {STATUS_TABS.map((tab) => {
          const isActive = statusFilter === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onStatusFilterChange(tab.value)}
              style={{
                padding: '7px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                border: isActive ? 'none' : '1px solid var(--card-border)',
                background: isActive
                  ? 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))'
                  : 'transparent',
                color: isActive ? '#fff' : 'var(--color-surface-500)',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 2px 8px rgba(99, 102, 241, 0.3)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--color-primary-50)';
                  e.currentTarget.style.color = 'var(--color-primary-600)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--color-surface-500)';
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
