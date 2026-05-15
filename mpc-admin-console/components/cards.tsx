export function Panel({ title, action, children, className = '' }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[28px] border border-line bg-white p-6 shadow-soft ${className}`}>
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title ? <h2 className="text-lg font-semibold text-ink">{title}</h2> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-3xl border border-brand-100 bg-white px-5 py-4 shadow-soft">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-4xl font-bold text-brand-700">{value}</p>
    </div>
  );
}
