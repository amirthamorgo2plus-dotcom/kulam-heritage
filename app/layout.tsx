import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { AuthProvider } from "@/components/auth/AuthProvider";
import LoginModal from "@/components/auth/LoginModal";

export const metadata: Metadata = {
  title: "Kamma Nest — Grandma's rituals, modern couple's app",
  description:
    "Preserving Roots, Simplifying Traditions — heritage, rituals, kula deivam temples and horoscope matching for the Tamil Nadu Kammavar Naidu community, in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-serif antialiased">
        <AuthProvider>
          <Nav />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <LoginModal />
        </AuthProvider>
        <footer className="mt-16 border-t border-kulam-gold/30 bg-kulam-dark/5 py-6 text-center text-xs text-stone-500">
          <p>
            Kamma Nest · Preserving Roots, Simplifying Traditions · v1 (Tamil Nadu Kammavar Naidu) · Sample/illustrative
            content — verify with community elders &amp; a qualified astrologer
            before relying on it.
          </p>
        </footer>
      </body>
    </html>
  );
}
