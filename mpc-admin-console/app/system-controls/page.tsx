'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin-shell';
import { Panel } from '@/components/cards';
import { adminApi } from '@/lib/api';
import { SystemControls } from '@/lib/types';

const defaultControls: SystemControls = {
  sttEnabled: true,
  fileUploadsEnabled: true,
  vectorRetrievalEnabled: false,
  backgroundJobsEnabled: false,
  environmentLabel: 'staging',
  appVersion: 'v1.0.0',
};

export default function SystemControlsPage() {
  const [controls, setControls] = useState<SystemControls>(defaultControls);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    adminApi
      .getSystemControls()
      .then((res) => setControls(res.data || defaultControls))
      .catch(() => undefined);
  }, []);

  async function saveChanges() {
    setSaving(true);
    setMessage('');
    try {
      const res = await adminApi.updateSystemControls({
        ...controls,
        appVersion: controls.appVersion || '', // ← never send null
      });
      setControls(res.data);
      setMessage('System controls updated successfully.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to update controls');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminShell title="System Controls" subtitle="Toggle operational capabilities for the demo environment.">
      <Panel title="Controls" action={<button onClick={saveChanges} disabled={saving} className="rounded-2xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">{saving ? 'Saving…' : 'Save changes'}</button>}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            {[
              ['sttEnabled', 'Speech to text'],
              ['fileUploadsEnabled', 'File uploads'],
              ['vectorRetrievalEnabled', 'Vector retrieval (Qdrant)'],
              ['backgroundJobsEnabled', 'Background jobs'],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center justify-between rounded-2xl border border-line px-4 py-4">
                <div>
                  <p className="font-medium text-ink">{label}</p>
                  <p className="text-sm text-muted">Enable or disable this capability in the admin demo.</p>
                </div>
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[#5b3df5]"
                  checked={Boolean(controls[key as keyof SystemControls])}
                  onChange={(e) => setControls((prev) => ({ ...prev, [key]: e.target.checked }))}
                />
              </label>
            ))}
          </div>

          <div className="space-y-4 rounded-3xl border border-line bg-slate-50 p-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Environment label</span>
              <input
                value={controls.environmentLabel}
                onChange={(e) => setControls((prev) => ({ ...prev, environmentLabel: e.target.value }))}
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">App version</span>
              <input
                value={controls.appVersion || ''}
                onChange={(e) => setControls((prev) => ({ ...prev, appVersion: e.target.value }))}
                className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-brand-500"
              />
            </label>
            <div className="rounded-2xl border border-dashed border-line bg-white p-4 text-sm text-muted">
              The layout mirrors the designer’s system controls screen, but uses editable fields so the demo is interactive.
            </div>
          </div>
        </div>
        {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}
      </Panel>
    </AdminShell>
  );
}
