/**
 * API & Socket configuration with Vite environment variables support.
 * Safely handles trailing/leading slashes to prevent concatenation errors.
 */

// 1. Read environment variables from Vite
const rawApiUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:4000";

const rawSocketUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SOCKET_URL) ||
  rawApiUrl;

/**
 * Normalizes the API base URL:
 * - Trims whitespace
 * - Strips any trailing slashes to avoid double slashes when joining endpoints
 * - Appends /api if not present (backend routes are mounted on /api)
 * - Returns a clean base URL without trailing slash
 */
export const normalizeApiUrl = (url) => {
  if (!url || typeof url !== "string") {
    return "http://localhost:4000/api";
  }
  let cleaned = url.trim().replace(/\/+$/, "");
  if (!cleaned) {
    return "http://localhost:4000/api";
  }
  if (!cleaned.endsWith("/api")) {
    cleaned = `${cleaned}/api`;
  }
  return cleaned.replace(/\/+$/, "");
};

/**
 * Normalizes Socket.IO URL (points to server root, without /api)
 */
export const normalizeSocketUrl = (url) => {
  if (!url || typeof url !== "string") {
    return "http://localhost:4000";
  }
  let cleaned = url.trim().replace(/\/+$/, "");
  cleaned = cleaned.replace(/\/api$/, "");
  return cleaned.replace(/\/+$/, "") || "http://localhost:4000";
};

export const API_BASE_URL = normalizeApiUrl(rawApiUrl);
export const SOCKET_URL = normalizeSocketUrl(rawSocketUrl);

/**
 * Helper to safely construct full endpoint URLs without double slashes:
 * e.g. buildApiUrl("login") -> "https://crm-iota-wine.vercel.app/api/login"
 * e.g. buildApiUrl("/login") -> "https://crm-iota-wine.vercel.app/api/login"
 */
export const buildApiUrl = (endpoint = "") => {
  const base = API_BASE_URL.replace(/\/+$/, "");
  if (!endpoint) return base;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

/**
 * Helper to get authorization headers with JWT Bearer token
 */
export const getAuthHeaders = () => {
  if (typeof localStorage === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default API_BASE_URL;
