'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Shield, Users, LogOut } from 'lucide-react';
import { Logo } from '@/components/logo';
import { adminApi } from '@/lib/api';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/system-controls', label: 'System Controls', icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await adminApi.logout();
    } finally {
      router.push('/login');
      router.refresh();
    }
  }

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-line bg-white px-6 py-6">
      <Logo />
      <nav className="mt-10 space-y-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-ink'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-ink"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}
