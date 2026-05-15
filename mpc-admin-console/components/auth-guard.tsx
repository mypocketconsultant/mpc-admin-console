'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api';
import { AdminUser } from '@/lib/types';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    let mounted = true;

    adminApi
      .me()
      .then((res) => {
        if (!mounted) return;
        // res.data is AdminUser directly, not res.data.admin
        setAdmin(res.data);
        setReady(true);
      })
      .catch(() => {
        if (!mounted) return;
        setAdmin(null);
        setReady(true);
        if (pathname !== '/login') router.replace('/login');
      });

    return () => {
      mounted = false;
    };
  // Remove pathname from deps — re-running on every nav causes the race condition
  }, []);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted">
        Loading admin console…
      </div>
    );
  }

  if (!admin && pathname !== '/login') {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted">
        Redirecting to admin login…
      </div>
    );
  }

  return <>{children}</>;
}