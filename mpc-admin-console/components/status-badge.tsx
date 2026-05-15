import { statusTone } from '@/lib/utils';

export function StatusBadge({ label }: { label: string }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusTone(label)}`}>
      {label}
    </span>
  );
}
