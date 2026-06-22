"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";

// MOCK login dialog. No password / no real auth — enter a name + email and a
// "session" is stored locally. This is the gate that protects saving data.
export default function LoginModal() {
  const { loginModalOpen, closeLogin, login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!loginModalOpen) return null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    login({ name: name.trim(), email: email.trim() });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={closeLogin}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-2xl font-bold text-kulam-dark">
          Sign in to Kamma Nest
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Browsing is free. Sign in to save favourites, send enquiries and leave
          reviews — your data stays with your account.
        </p>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-stone-700">
              Your name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Naidu"
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-kulam"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-kulam"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-4 py-2.5 font-semibold text-white shadow transition hover:brightness-110"
          >
            Continue
          </button>
        </form>
        <p className="mt-3 text-center text-xs text-stone-400">
          Prototype sign-in — no password needed. Real secure login arrives in
          Phase 1.
        </p>
      </div>
    </div>
  );
}
