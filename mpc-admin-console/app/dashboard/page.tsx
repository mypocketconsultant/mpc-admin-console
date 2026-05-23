'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin-shell';
import { Panel, StatCard } from '@/components/cards';
import { StatusBadge } from '@/components/status-badge';
import { adminApi } from '@/lib/api';
import { DashboardResponse } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi
      .dashboard()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <AdminShell title="Dashboard" subtitle="System status and top-level operational visibility.">
      {error ? <div className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="System Status">
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(data?.systemStatus || {}).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between rounded-2xl border border-line px-4 py-4">
                <span className="text-sm font-medium capitalize text-slate-600">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <StatusBadge label={value} />
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <StatCard label="Active users today" value={data?.stats.activeUsersToday ?? '—'} />
          <StatCard label="Failed requests today" value={data?.stats.failedRequestsToday ?? '—'} />
          <StatCard label="Background job failures" value={data?.stats.backgroundJobFailures ?? '—'} />
          <StatCard label="Total users" value={data?.stats.totalUsers ?? '—'} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Recent errors">
          <div className="overflow-hidden rounded-2xl border border-line">
            <table className="min-w-full divide-y divide-line text-sm">
              <thead className="bg-slate-50 text-left text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Timestamp</th>
                  <th className="px-4 py-3 font-medium">Module</th>
                  <th className="px-4 py-3 font-medium">Error summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {data?.recentErrors?.length ? (
                  data.recentErrors.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-slate-500">{formatDateTime(row.timestamp)}</td>
                      <td className="px-4 py-3 font-medium text-ink">{row.module}</td>
                      <td className="px-4 py-3 text-slate-600">{row.summary}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-10 text-center text-sm text-muted">
                      No recent errors recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Latest users">
          <div className="space-y-3">
            {data?.latestUsers?.length ? (
              data.latestUsers.map((user) => {
                const name = user.fullName ||
                  `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() ||
                  'Unnamed user';
                return (
                  <Link
                    key={user.id}
                    href={`/users/${user.id}`}
                    className="block rounded-2xl border border-line px-4 py-4 hover:bg-slate-50 transition"
                  >
                    <p className="font-semibold text-ink">{name}</p>
                    <p className="mt-1 text-sm text-muted">{user.email}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Preferred module: {user.preferredModule || '—'}
                    </p>
                  </Link>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
                No users yet. Sign-ups will appear here.
              </div>
            )}
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}