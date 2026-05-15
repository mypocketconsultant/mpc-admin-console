'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { AdminShell } from '@/components/admin-shell';
import { Panel } from '@/components/cards';
import { StatusBadge } from '@/components/status-badge';
import { adminApi } from '@/lib/api';
import { UserListItem } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      adminApi
        .listUsers(search)
        .then((res) => {
          setUsers(res.data.users || []);
          setError('');
        })
        .catch((err) => setError(err.message));
    }, 250);

    return () => clearTimeout(id);
  }, [search]);

  return (
    <AdminShell title="Users" subtitle="Search users by email, id, or name, then drill into details.">
      <Panel title="User directory">
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-line bg-slate-50 px-4 py-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email, user ID, or name"
            className="w-full border-0 bg-transparent text-sm outline-none"
          />
        </div>

        {error ? <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}

        <div className="overflow-hidden rounded-2xl border border-line">
          <table className="min-w-full divide-y divide-line text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Module</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-white">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-ink">
                    <Link href={`/users/${user.id}`} className="hover:text-brand-700">
                      {user.firstName} {user.lastName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-slate-600">{user.preferredModule || '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{formatDateTime(user.updatedAt || user.createdAt)}</td>
                  <td className="px-4 py-3"><StatusBadge label="OK" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!users.length ? <div className="px-4 py-12 text-center text-sm text-muted">No users returned yet. Seed or create a test user, then refresh.</div> : null}
        </div>
      </Panel>
    </AdminShell>
  );
}
