export function formatDateTime(value?: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function statusTone(value?: string | null) {
  const v = (value || '').toLowerCase();
  if (v.includes('connect') || v.includes('ok') || v.includes('enable') || v.includes('active')) {
    return 'bg-green-100 text-green-700 border-green-200';
  }
  if (v.includes('error') || v.includes('down') || v.includes('fail') || v.includes('disable')) {
    return 'bg-red-100 text-red-700 border-red-200';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200';
}
