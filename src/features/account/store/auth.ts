'use client';

import { create } from 'zustand';

import type { AuthUser } from '../model/auth.types';

type AuthStore = {
  user: AuthUser | null;
  isLoading: boolean;
  isInitialized: boolean;
  fetchUser: () => Promise<void>;
  login: (
    email: string,
    password: string,
    keepSigned: boolean
  ) => Promise<{ ok: boolean; message?: string }>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string,
    phone: string,
    agreement: boolean
  ) => Promise<{ ok: boolean; message?: string }>;
  forgotPassword: (emailOrUsername: string) => Promise<{ ok: boolean; message?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;

  keepSigned: boolean;
  setKeepSigned: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  isInitialized: false,

  keepSigned: false,

  setKeepSigned: (value) => {
    set({ keepSigned: value });

    if (value) {
      localStorage.setItem('keepSigned', 'true');
    } else {
      localStorage.removeItem('keepSigned');
    }
  },

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      const data = (await res.json()) as { user?: AuthUser | null };
      set({
        user: data.user ?? null,
        isInitialized: true,
        isLoading: false,
      });
    } catch {
      set({ user: null, isInitialized: true, isLoading: false });
    }
  },

  login: async (email, password, keepSigned) => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = (await res.json()) as { user?: AuthUser; message?: string };
      if (!res.ok) {
        set({ isLoading: false });
        return { ok: false, message: data.message ?? 'Login failed.' };
      }

      // We save only if the login is successful
      if (keepSigned) {
        localStorage.setItem('keepSigned', 'true');
      } else {
        localStorage.removeItem('keepSigned');
      }

      set({ user: data.user ?? null, isLoading: false });
      return { ok: true };
    } catch {
      set({ isLoading: false });
      return { ok: false, message: 'Login failed.' };
    }
  },

  register: async (firstName, lastName, email, password, username, phone) => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, username, phone }),
        credentials: 'include',
      });
      console.log(res);
      const data = (await res.json()) as { user?: AuthUser; message?: string };
      if (!res.ok) {
        set({ isLoading: false });
        return { ok: false, message: data.message ?? 'Registration failed.' };
      }
      set({ user: data.user ?? null, isLoading: false });
      return { ok: true };
    } catch {
      set({ isLoading: false });
      return { ok: false, message: 'Registration failed.' };
    }
  },

  forgotPassword: async (emailOrUsername) => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailOrUsername }),
      });
      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        set({ isLoading: false });
        return { ok: false, message: data.message ?? 'Forgot password failed.' };
      }

      set({ isLoading: false });
      return { ok: true };
    } catch {
      set({ isLoading: false });
      return { ok: false, message: 'Forgot password failed.' };
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        set({ isLoading: false });
        return { ok: false, message: data.message ?? 'Reset password failed.' };
      }

      set({ isLoading: false });
      return { ok: true };
    } catch {
      set({ isLoading: false });
      return { ok: false, message: 'Reset password failed.' };
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } finally {
      set({ user: null });
    }
  },

  setUser: (user) => set({ user }),
}));
