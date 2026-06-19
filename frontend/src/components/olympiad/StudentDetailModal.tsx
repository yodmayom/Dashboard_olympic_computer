'use client';

import React, { useState, useEffect } from 'react';
import { Application, ApplicationStatus } from '@/types';
import StatusBadge from './StatusBadge';

interface StudentDetailModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (applicationId: string, newStatus: ApplicationStatus) => void;
  onAddComment: (applicationId: string, comment: string) => void;
}

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'under_review', label: 'Under Review' },
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
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export default function StudentDetailModal({
  application,
  isOpen,
  onClose,
  onStatusChange,
  onAddComment,
}: StudentDetailModalProps) {
  const [commentText, setCommentText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>('pending');

  useEffect(() => {
    if (application) {
      setSelectedStatus(application.status);
      setCommentText('');
    }
  }, [application]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !application) return null;

  const { student } = application;

  const handleStatusChange = () => {
    if (selectedStatus !== application.status) {
      onStatusChange(application.id, selectedStatus);
    }
  };

  const handleAddComment = () => {
    const trimmed = commentText.trim();
    if (trimmed) {
      onAddComment(application.id, trimmed);
      setCommentText('');
    }
  };

  const infoItems = [
    { label: 'Student ID', value: student.studentId, mono: true },
    { label: 'Full Name', value: student.fullName },
    { label: 'Grade / Class', value: `${student.grade} / ${student.classroom}` },
    { label: 'School', value: student.school },
    { label: 'Email', value: student.email || '—' },
    { label: 'Phone', value: student.phone || '—' },
    { label: 'Registration Date', value: formatDate(application.registrationDate) },
    { label: 'Reviewed By', value: application.reviewedBy || '—' },
    { label: 'Reviewed At', value: application.reviewedAt ? formatDateTime(application.reviewedAt) : '—' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '800px',
          padding: '0',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 28px 20px',
            borderBottom: '1px solid var(--card-border)',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
            Student Details
          </h2>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              border: '1px solid var(--card-border)',
              background: 'transparent',
              color: 'var(--color-surface-400)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-danger-50)';
              e.currentTarget.style.color = 'var(--color-danger-500)';
              e.currentTarget.style.borderColor = 'var(--color-danger-500)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-surface-400)';
              e.currentTarget.style.borderColor = 'var(--card-border)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '28px' }}>
          {/* Two-column layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {/* Left Column: Photo + Status */}
            <div>
              {/* Photo / Avatar */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                {student.photoUrl ? (
                  <img
                    src={student.photoUrl}
                    alt={student.fullName}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--card-border)',
                      marginBottom: '12px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '32px',
                      fontWeight: 800,
                      letterSpacing: '1px',
                      marginBottom: '12px',
                    }}
                  >
                    {getInitials(student.fullName)}
                  </div>
                )}
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px' }}>
                  {student.fullName}
                </h3>
                <StatusBadge status={application.status} />
              </div>

              {/* Info Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'var(--input-bg)',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: 'var(--color-surface-500)', fontWeight: 500 }}>
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: item.mono ? 'var(--font-mono)' : 'inherit',
                        color: item.mono ? 'var(--color-primary-500)' : 'var(--foreground)',
                        textAlign: 'right',
                        maxWidth: '55%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Status Change + Comments */}
            <div>
              {/* Status Change */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '14px',
                  background: 'var(--input-bg)',
                  marginBottom: '24px',
                }}
              >
                <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-surface-500)' }}>
                  Update Status
                </h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--input-border)',
                      background: 'var(--card-bg)',
                      color: 'var(--foreground)',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleStatusChange}
                    disabled={selectedStatus === application.status}
                    style={{
                      opacity: selectedStatus === application.status ? 0.5 : 1,
                      cursor: selectedStatus === application.status ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-surface-500)' }}>
                  Comments ({application.comments.length})
                </h4>

                {/* Comments List */}
                <div
                  style={{
                    maxHeight: '240px',
                    overflowY: 'auto',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {application.comments.length === 0 ? (
                    <div
                      style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: 'var(--color-surface-400)',
                        fontSize: '14px',
                        borderRadius: '10px',
                        background: 'var(--input-bg)',
                      }}
                    >
                      No comments yet
                    </div>
                  ) : (
                    application.comments.map((comment) => (
                      <div
                        key={comment.id}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '10px',
                          background: 'var(--input-bg)',
                          borderLeft: '3px solid var(--color-primary-500)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '6px',
                          }}
                        >
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary-500)' }}>
                            {comment.author}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--color-surface-400)' }}>
                            {formatDateTime(comment.createdAt)}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'var(--foreground)' }}>
                          {comment.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Comment */}
                <div>
                  <textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--input-border)',
                      background: 'var(--input-bg)',
                      color: 'var(--foreground)',
                      fontSize: '14px',
                      resize: 'vertical',
                      outline: 'none',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                      marginBottom: '10px',
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
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleAddComment}
                    disabled={!commentText.trim()}
                    style={{
                      opacity: !commentText.trim() ? 0.5 : 1,
                      cursor: !commentText.trim() ? 'not-allowed' : 'pointer',
                      width: '100%',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
