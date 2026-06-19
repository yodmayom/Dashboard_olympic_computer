// ============================================================
// Student & Application Types
// ============================================================

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  photoUrl: string;
  grade: string;
  classroom: string;
  school: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'under_review';

export interface Application {
  id: string;
  studentId: string;
  student: Student;
  registrationDate: string;
  status: ApplicationStatus;
  comments: Comment[];
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

// ============================================================
// Math Progress Types
// ============================================================

export type TopicStatus = 'not_started' | 'in_progress' | 'completed';

export interface MathTopic {
  id: string;
  name: string;
  status: TopicStatus;
  score?: number;
  lastUpdated?: string;
}

export const MATH_TOPICS = [
  'Sets',
  'Logic',
  'Elementary Number Theory',
  'Relations',
  'Functions and Graphs',
  'Equations and Inequalities',
  'Real Numbers',
  'Polynomials',
  'Counting Techniques',
  'Permutations',
  'Combinations',
  'Probability',
] as const;

export interface MathProgress {
  id: string;
  studentId: string;
  student: Student;
  overallProgress: number; // 0-100
  topics: MathTopic[];
  teacherNotes: string;
  lastUpdated: string;
  rank?: number;
}

// ============================================================
// Dashboard Types
// ============================================================

export interface DashboardStats {
  totalStudents: number;
  registeredStudents: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  activeLearners: number;
  overallCompletion: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  user: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

// ============================================================
// UI Component Types
// ============================================================

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface FilterConfig {
  status?: ApplicationStatus | 'all';
  search?: string;
  grade?: string;
}
