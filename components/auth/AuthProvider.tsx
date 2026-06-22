"use client";

// MOCK auth for the clickable prototype. No backend — a "session" and the
// user's saved data live in localStorage so the experience feels real:
// browse freely, but log in to save favourites, enquiries and reviews.
// This is the seam where real Supabase auth + tables drop in for Phase 1.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface MockUser {
  name: string;
  email: string;
}

export interface Enquiry {
  venueId: string;
  venueName: string;
  date: string; // event date (yyyy-mm-dd)
  guests: number;
  message: string;
  createdAt: string;
}

export interface Review {
  venueId: string;
  author: string;
  rating: number; // 1-5
  text: string;
  createdAt: string;
}

interface AuthState {
  user: MockUser | null;
  savedVenueIds: string[];
  enquiries: Enquiry[];
  reviews: Review[];
  login: (user: MockUser) => void;
  logout: () => void;
  toggleSave: (venueId: string) => void;
  addEnquiry: (e: Omit<Enquiry, "createdAt">) => void;
  addReview: (r: Omit<Review, "author" | "createdAt">) => void;
  // login-gate helper: returns true if a session exists, else opens the modal
  requireAuth: () => boolean;
  loginModalOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
}

const Ctx = createContext<AuthState | null>(null);

const KEY = "kammanest_mock";

interface Persisted {
  user: MockUser | null;
  savedVenueIds: string[];
  enquiries: Enquiry[];
  reviews: Review[];
}

function load(): Persisted {
  if (typeof window === "undefined")
    return { user: null, savedVenueIds: [], enquiries: [], reviews: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Persisted;
  } catch {
    /* ignore */
  }
  return { user: null, savedVenueIds: [], enquiries: [], reviews: [] };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Persisted>({
    user: null,
    savedVenueIds: [],
    enquiries: [],
    reviews: [],
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const login = useCallback((user: MockUser) => {
    setState((s) => ({ ...s, user }));
    setLoginModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setState((s) => ({ ...s, user: null }));
  }, []);

  const openLogin = useCallback(() => setLoginModalOpen(true), []);
  const closeLogin = useCallback(() => setLoginModalOpen(false), []);

  const requireAuth = useCallback(() => {
    if (state.user) return true;
    setLoginModalOpen(true);
    return false;
  }, [state.user]);

  const toggleSave = useCallback((venueId: string) => {
    setState((s) => ({
      ...s,
      savedVenueIds: s.savedVenueIds.includes(venueId)
        ? s.savedVenueIds.filter((id) => id !== venueId)
        : [...s.savedVenueIds, venueId],
    }));
  }, []);

  const addEnquiry = useCallback((e: Omit<Enquiry, "createdAt">) => {
    setState((s) => ({
      ...s,
      enquiries: [
        { ...e, createdAt: new Date().toISOString() },
        ...s.enquiries,
      ],
    }));
  }, []);

  const addReview = useCallback(
    (r: Omit<Review, "author" | "createdAt">) => {
      setState((s) => ({
        ...s,
        reviews: [
          {
            ...r,
            author: s.user?.name ?? "Guest",
            createdAt: new Date().toISOString(),
          },
          ...s.reviews,
        ],
      }));
    },
    [],
  );

  const value = useMemo<AuthState>(
    () => ({
      user: state.user,
      savedVenueIds: state.savedVenueIds,
      enquiries: state.enquiries,
      reviews: state.reviews,
      login,
      logout,
      toggleSave,
      addEnquiry,
      addReview,
      requireAuth,
      loginModalOpen,
      openLogin,
      closeLogin,
    }),
    [state, login, logout, toggleSave, addEnquiry, addReview, requireAuth, loginModalOpen, openLogin, closeLogin],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
