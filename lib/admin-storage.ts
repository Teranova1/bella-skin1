import { AdminUser } from './types';

const ADMIN_USERS_KEY = 'bella-admin-users-v1';
const ADMIN_SESSION_KEY = 'bella-admin-session-v1';

const defaultAdminUsers: AdminUser[] = [
  {
    name: 'Bella Admin',
    email: 'admin@bella.com',
    password: 'Admin123!',
  },
];

export function loadAdminUsers(): AdminUser[] {
  if (typeof window === 'undefined') {
    return defaultAdminUsers;
  }

  try {
    const stored = window.localStorage.getItem(ADMIN_USERS_KEY);

    if (!stored) {
      window.localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(defaultAdminUsers));
      return defaultAdminUsers;
    }

    const parsed = JSON.parse(stored) as AdminUser[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultAdminUsers;
  } catch {
    return defaultAdminUsers;
  }
}

export function saveAdminUsers(users: AdminUser[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users));
}

export function loadAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(ADMIN_SESSION_KEY);
    return stored ? (JSON.parse(stored) as AdminUser) : null;
  } catch {
    return null;
  }
}

export function saveAdminSession(user: AdminUser | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    return;
  }

  window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(user));
}
