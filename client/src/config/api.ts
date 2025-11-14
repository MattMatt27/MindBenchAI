export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * API endpoint helpers
 */
export const API_ENDPOINTS = {
  // Auth
  auth: `${API_URL}/auth`,
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  logout: `${API_URL}/auth/logout`,
  forgotPassword: `${API_URL}/auth/forgot-password`,
  resetPassword: `${API_URL}/auth/reset-password`,
  verifyEmail: `${API_URL}/auth/verify-email`,

  // Current version endpoints
  techProfiles: `${API_URL}/current/tech-profiles/display`,
  conversationalProfiles: (testName: string) => `${API_URL}/current/conversational-profiles/${testName}`,
  iriProfiles: `${API_URL}/current/iri/profiles`,
  benchmarks: `${API_URL}/current/resources/benchmarks`,
} as const;
