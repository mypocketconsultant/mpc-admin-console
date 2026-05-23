'use client';

import { Bell, Search, UserCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api';
import { AdminUser } from '@/lib/types';

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    adminApi.me().then((res) => setAdmin(res.data)).catch(() => null);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = admin?.fullName
    ? admin.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'A';

  return (
    <header className="flex items-center justify-between rounded-[28px] border border-line bg-white px-6 py-5 shadow-soft">
      <div>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-line px-3 py-2 text-sm text-muted md:flex">
          <Search className="h-4 w-4" />
          Search
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-2xl border border-line text-slate-500 hover:bg-slate-50">
          <Bell className="h-5 w-5" />
        </button>

        {/* User avatar with dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-100 text-brand-700 font-semibold text-sm hover:bg-brand-200 transition"
          >
            {initials}
          </button>

          {showProfile && (
            <div className="absolute right-0 top-13 z-50 mt-2 w-56 rounded-2xl border border-line bg-white p-3 shadow-soft">
              <div className="px-2 py-1 mb-2">
                <p className="text-sm font-semibold text-ink">{admin?.fullName || 'Admin'}</p>
                <p className="text-xs text-muted truncate">{admin?.email}</p>
                <p className="mt-1 text-xs text-slate-400 capitalize">{admin?.role}</p>
              </div>
              <div className="border-t border-line pt-2">
                <button
                  onClick={async () => {
                    await adminApi.logout();
                    router.replace('/login');
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50 transition"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}