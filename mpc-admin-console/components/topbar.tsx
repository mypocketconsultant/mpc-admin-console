'use client';

import { Bell, Search, UserCircle2 } from 'lucide-react';

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
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
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-500">
          <UserCircle2 className="h-7 w-7" />
        </div>
      </div>
    </header>
  );
}
