"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

// Login / account control shown in the nav. Client island inside the
// (server) Nav component.
export default function AccountButton() {
  const { user, openLogin, logout } = useAuth();

  if (!user) {
    return (
      <button
        onClick={openLogin}
        className="rounded-lg bg-white/15 px-3 py-1.5 text-sm font-semibold ring-1 ring-white/40 transition hover:bg-white/25"
      >
        Sign in
      </button>
    );
  }

  const initial = user.name.charAt(0).toUpperCase();
  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href="/account"
        className="flex items-center gap-2 rounded-lg bg-white/15 px-2.5 py-1.5 font-semibold ring-1 ring-white/40 transition hover:bg-white/25"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-kulam-gold text-kulam-dark">
          {initial}
        </span>
        {user.name.split(" ")[0]}
      </Link>
      <button
        onClick={logout}
        className="rounded-lg px-2 py-1.5 text-xs text-white/80 underline-offset-2 hover:underline"
      >
        Sign out
      </button>
    </div>
  );
}
