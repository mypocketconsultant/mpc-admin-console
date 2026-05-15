'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AdminShell } from '@/components/admin-shell';
import { Panel } from '@/components/cards';
import { StatusBadge } from '@/components/status-badge';
import { adminApi } from '@/lib/api';
import { UserDetail } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';

export default function UserDetailPage() {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const [user, setUser] = useState<UserDetail | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userId) return;
    adminApi
      .getUser(userId)
      .then((res) => setUser(res.data))
      .catch((err) => setMessage(err.message));
  }, [userId]);

  async function clearSessionMemory() {
    if (!userId) return;
    try {
      await adminApi.clearSessionMemory(userId);
      setMessage('User session memory cleared successfully.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to clear session memory');
    }
  }

  const name = user ? `${user.firstName} ${user.lastName}` : 'User detail';

  return (
    <AdminShell title="Users" subtitle="Inspect a specific user and clear their session memory if needed.">
      <Link href="/users" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" />
        Back to users
      </Link>

      {message ? <div className="mb-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">{message}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Panel title={name} action={<StatusBadge label="Active" />}>
          <dl className="space-y-4 text-sm">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-muted">User ID</dt>
              <dd className="font-medium text-ink">{user?.id || userId}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-muted">Email</dt>
              <dd className="font-medium text-ink">{user?.email || '—'}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-muted">Preferred module</dt>
              <dd className="font-medium text-ink">{user?.preferredModule || '—'}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-muted">Last updated</dt>
              <dd className="font-medium text-ink">{formatDateTime(user?.updatedAt)}</dd>
            </div>
          </dl>

          <button
            onClick={clearSessionMemory}
            className="mt-6 rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Clear session memory
          </button>
        </Panel>

        <Panel title="Recent activity">
          <div className="space-y-3">
            {(user?.recentActivity?.length
              ? user.recentActivity
              : [
                  { module: 'Career', timestamp: new Date().toISOString(), status: 'OK', summary: 'Run a 10-sec scan of my resume' },
                  { module: 'Faith', timestamp: new Date().toISOString(), status: 'OK', summary: 'Generated devotional content' },
                  { module: 'Life Advisory', timestamp: new Date().toISOString(), status: 'OK', summary: 'Created action plan' },
                ]
            ).map((item, index) => (
              <div key={index} className="rounded-2xl border border-line px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{item.module}</p>
                    <p className="mt-1 text-sm text-muted">{item.summary || 'Recent module interaction'}</p>
                  </div>
                  <StatusBadge label={item.status} />
                </div>
                <p className="mt-3 text-xs text-slate-500">{formatDateTime(item.timestamp)}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}
