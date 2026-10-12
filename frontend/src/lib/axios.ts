
import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Prevent the same request from being retried more than once.
type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// All failed requests share this one refresh operation.
let refreshPromise: Promise<void> | null = null;

function refreshAccessToken(): Promise<void> {
  // If refresh is already running, reuse the existing promise.
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/refresh`,
        {},
        { withCredentials: true },
      )
      .then(() => undefined)
      .finally(() => {
        // Allow a future refresh attempt when this one finishes.
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response?.status === 401;
    const alreadyRetried = originalRequest._retry;

    if (!isUnauthorized || alreadyRetried) {
      return Promise.reject(error);
    }

    const url = originalRequest.url ?? "";

    // Never try to refresh after login or refresh itself fails.
    if (
      url.includes("/auth/login") ||
      url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Concurrent requests wait for the same refresh operation.
      await refreshAccessToken();

      // Retry this request after refresh succeeds.
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh failed: the session can no longer be renewed.
      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }

      return Promise.reject(refreshError);
    }
  },
);
