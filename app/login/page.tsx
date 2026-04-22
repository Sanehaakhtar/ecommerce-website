"use client"
import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldShake, setShouldShake] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setShouldShake(true);
      window.setTimeout(() => setShouldShake(false), 400);
      return;
    }
    const name = email.split("@")[0] || "Member";
    login({ name, email });
    router.push(searchParams.get("from") ?? "/");
  };

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans">

      {/* LEFT — Deep Maroon Brand Section */}
      <div className="hidden lg:flex w-[48%] bg-[var(--accent)] relative flex-col justify-between p-12 overflow-hidden">
        {/* Decorative Cream Circles */}
        <div className="auth-circle w-[340px] h-[340px] -bottom-20 -left-20" style={{ position: 'absolute' }} />
        <div className="auth-circle w-[200px] h-[200px] bottom-16 left-48" style={{ position: 'absolute', background: 'rgba(253,245,230,0.05)' }} />
        <div className="auth-circle w-[120px] h-[120px] bottom-44 left-12" style={{ position: 'absolute', background: 'rgba(253,245,230,0.04)' }} />
        <div className="auth-circle w-[80px] h-[80px] top-20 right-16" style={{ position: 'absolute', background: 'rgba(253,245,230,0.03)' }} />
        <div className="auth-circle w-[160px] h-[160px] -top-10 -right-10" style={{ position: 'absolute', background: 'rgba(253,245,230,0.06)' }} />

        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...spring }}
        >
          <div className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-xl font-bold text-lg border border-white/10">S</div>
          <span className="font-bold text-xl tracking-tight text-white">ShopSpace</span>
        </motion.div>

        {/* Center Content */}
        <motion.div
          className="z-10 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...spring }}
        >
          {/* Mini Product Cards */}
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <p className="label-caps !text-white/50">Wireless</p>
              <p className="font-bold text-xl text-white mt-1">$129</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <p className="label-caps !text-white/50">Smart Watch</p>
              <p className="font-bold text-xl text-white mt-1">$218</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <p className="label-caps !text-white/50">Mechanical</p>
              <p className="font-bold text-xl text-white mt-1">$89</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <p className="label-caps !text-white/50">SSD 1TB</p>
              <p className="font-bold text-xl text-white mt-1">$44</p>
            </div>
          </div>

          <div>
            <h1 className="text-4xl xl:text-[3.25rem] font-extrabold leading-[1.1] text-white tracking-tight">
              The best place to <br />
              <span className="text-[#fdf5e6]/80">shop everything.</span>
            </h1>
            <p className="mt-5 text-white/50 text-sm max-w-xs leading-relaxed">
              Curated products. Honest prices. A premium shopping experience.
            </p>
          </div>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          className="flex gap-8 z-10 border-t border-white/10 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <p className="text-2xl font-extrabold text-white">12K+</p>
            <p className="label-caps !text-white/40 mt-1">Products</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">4.9</p>
            <p className="label-caps !text-white/40 mt-1">Rating</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">Free</p>
            <p className="label-caps !text-white/40 mt-1">Shipping</p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-[var(--bg-primary)]">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ...spring }}
        >
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="bg-[var(--accent)] text-[var(--accent-contrast)] p-1.5 rounded-lg font-bold text-lg">S</div>
            <span className="font-bold text-lg tracking-tight">ShopSpace</span>
          </div>

          <header className="mb-8">
            <h2 className="text-2xl font-extrabold text-[var(--foreground)] tracking-tight">Sign in to your account</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1.5">Welcome back! Please enter your details.</p>
          </header>

          {/* Social Buttons */}
          <div className="flex gap-3 mb-6">
            <motion.button type="button" className="btn-social" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={spring}>
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </motion.button>
            <motion.button type="button" className="btn-social" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={spring}>
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Apple
            </motion.button>
          </div>

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-[var(--border-subtle)]"></div>
            <span className="label-caps px-4">or email</span>
            <div className="flex-grow border-t border-[var(--border-subtle)]"></div>
          </div>

          <form className={shouldShake ? "animate-shake" : ""} onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="label-premium">Email address</label>
                <input
                  type="email"
                  className="input-premium"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="label-premium !mb-0">Password</label>
                  <button type="button" className="text-[11px] text-[var(--accent)] font-semibold hover:underline">Forgot?</button>
                </div>
                <input
                  type="password"
                  className="input-premium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2.5">
                <input type="checkbox" id="rem" className="w-3.5 h-3.5 accent-[var(--accent)] rounded" />
                <label htmlFor="rem" className="text-xs text-[var(--text-muted)]">Remember for 30 days</label>
              </div>

              <motion.button
                type="submit"
                className="btn-primary"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={spring}
              >
                Sign In
              </motion.button>
            </div>
          </form>

          <p className="pt-6 text-center text-sm text-[var(--text-muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[var(--accent)] font-semibold hover:underline">Create account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}