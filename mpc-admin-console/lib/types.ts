export interface ApiEnvelope<T> {
  status: string;
  message: string;
  data: T;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  lastLoginAt?: string;
}

export interface RecentError {
  timestamp: string;
  module: string;
  summary: string;
}

export interface LatestUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  preferredModule?: string;
  updatedAt?: string;
}

export interface DashboardResponse {
  systemStatus: Record<string, string>;
  stats: {
    totalUsers: number;
    activeUsersToday: number;
    failedRequestsToday: number;
    backgroundJobFailures: number;
  };
  recentErrors: RecentError[];
  latestUsers: LatestUser[];
}

export interface SystemControls {
  id?: string;
  sttEnabled: boolean;
  fileUploadsEnabled: boolean;
  vectorRetrievalEnabled: boolean;
  backgroundJobsEnabled: boolean;
  environmentLabel: string;
  appVersion?: string;
}

export interface UserListItem {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  preferredModule?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDetail {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  preferredModule?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
  currentResumeId?: string;
  recentActivity?: {
    module: string;
    summary: string;
    status: string;
    timestamp: string;
  }[];
}