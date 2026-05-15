export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  lastLoginAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type DashboardResponse = {
  systemStatus: {
    aiBackend: string;
    apiBackend: string;
    redis: string;
    qdrant: string;
  };
  stats: {
    totalUsers: number;
    activeUsersToday: number;
    failedRequestsToday: number;
    backgroundJobFailures: number;
  };
  recentErrors: Array<{
    timestamp: string;
    module: string;
    summary: string;
  }>;
  latestUsers: Array<{
    id: string;
    fullName: string;
    email: string;
    preferredModule?: string | null;
    createdAt?: string;
  }>;
  controls: SystemControls | null;
};

export type SystemControls = {
  id?: string;
  sttEnabled: boolean;
  fileUploadsEnabled: boolean;
  vectorRetrievalEnabled: boolean;
  backgroundJobsEnabled: boolean;
  environmentLabel: string;
  appVersion?: string | null;
};

export type UserListItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  preferredModule?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UserDetail = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  preferredModule?: string | null;
  createdAt?: string;
  updatedAt?: string;
  recentActivity?: Array<{
    module: string;
    timestamp: string;
    status: string;
    summary?: string;
  }>;
};

export type ApiEnvelope<T> = {
  status: string;
  message: string;
  data: T;
};
