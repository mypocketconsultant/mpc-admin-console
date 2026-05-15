export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 via-violet-500 to-amber-300 text-white font-bold shadow-soft">
        MPC
      </div>
      {!compact && (
        <div>
          <p className="text-sm font-semibold tracking-wide text-ink">My Pocket Consultant</p>
          <p className="text-xs text-muted">Admin Console</p>
        </div>
      )}
    </div>
  );
}
