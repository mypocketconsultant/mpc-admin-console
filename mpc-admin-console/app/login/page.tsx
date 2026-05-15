'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole, Mail } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@mypocketconsultant.com');
  const [password, setPassword] = useState('ChangeMe123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminApi.login(email, password);
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(91,61,245,0.18),_transparent_30%),linear-gradient(180deg,#f7f8fc_0%,#eef2ff_100%)] p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
      <div className="hidden rounded-[32px] bg-gradient-to-br from-brand-700 via-brand-600 to-violet-500 p-10 text-white shadow-soft lg:flex lg:flex-col">
        <Logo compact />
        <div className="mt-auto max-w-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-white/70">Admin access</p>
          <h1 className="mt-6 text-5xl font-bold leading-tight">Monitor operations, users, and system controls from one place.</h1>
          <p className="mt-5 text-lg text-white/80">
            This starter includes the admin login flow and the three screens needed for tomorrow’s demo.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
            {['Dashboard metrics', 'User lookup', 'System toggles'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center lg:px-10">
        <div className="w-full max-w-md rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft backdrop-blur">
          <Logo />
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-ink">Sign in to Admin Console</h2>
            <p className="mt-2 text-sm text-muted">Use the seeded admin credentials or replace them with your own.</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-slate-50 px-4 py-3 focus-within:border-brand-500 focus-within:bg-white">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="w-full border-0 bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-slate-50 px-4 py-3 focus-within:border-brand-500 focus-within:bg-white">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  className="w-full border-0 bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
