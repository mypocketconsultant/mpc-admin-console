import { ApiEnvelope, AdminUser, DashboardResponse, SystemControls, UserDetail, UserListItem } from "@/lib/types";

const BASE_URL = "/api";

function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAdminToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = payload?.errors?.[0]?.message || payload?.message || "Request failed";
    throw new Error(message);
  }

  return payload as T;
}

export const adminApi = {
  login: async (email: string, password: string) => {
    const payload = await request<ApiEnvelope<{ admin: AdminUser; token: string }>>(
      "/v1/admin/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );

    if (typeof window !== "undefined" && payload?.data?.token) {
      localStorage.setItem("admin_token", payload.data.token);
    }

    return payload;
  },

  me: () => request<ApiEnvelope<AdminUser>>("/v1/admin/auth/me"),

  logout: async () => {
    const payload = await request<ApiEnvelope<null>>("/v1/admin/auth/logout", {
      method: "POST",
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
    }

    return payload;
  },

  dashboard: () => request<ApiEnvelope<DashboardResponse>>("/v1/admin/dashboard"),

  getSystemControls: () =>
    request<ApiEnvelope<SystemControls>>("/v1/admin/system-controls"),

  updateSystemControls: (data: Partial<SystemControls>) =>
    request<ApiEnvelope<SystemControls>>("/v1/admin/system-controls", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  listUsers: (search = "") =>
    request<ApiEnvelope<UserListItem[]>>(
      `/v1/admin/users${search ? `?search=${encodeURIComponent(search)}` : ""}`
    ).then((res) => ({
      ...res,
      data: { users: Array.isArray(res.data) ? res.data : [] },
    })),

  getUser: (userId: string) =>
    request<ApiEnvelope<UserDetail>>(`/v1/admin/users/${userId}`),

  clearSessionMemory: (userId: string) =>
    request<ApiEnvelope<null>>(`/v1/admin/users/${userId}/clear-session-memory`, {
      method: "POST",
    }),
};