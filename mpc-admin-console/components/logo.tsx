export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Icon mark — the stacked circles/people shape */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="iconGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5B3DF5" />
            <stop offset="100%" stopColor="#C9A84C" />
          </linearGradient>
        </defs>
        {/* Left column — 3 circles stacked */}
        <circle cx="10" cy="10" r="5" fill="url(#iconGrad)" opacity="0.9" />
        <circle cx="10" cy="22" r="5" fill="url(#iconGrad)" opacity="0.75" />
        <circle cx="10" cy="34" r="4" fill="url(#iconGrad)" opacity="0.6" />
        {/* Right column — 2 larger circles */}
        <circle cx="24" cy="13" r="7" fill="url(#iconGrad)" opacity="0.85" />
        <circle cx="24" cy="30" r="6" fill="url(#iconGrad)" opacity="0.7" />
      </svg>

      {!compact && (
        <div>
          <p className="text-sm font-semibold leading-tight">
            <span className="text-[#5B3DF5]">My Pocket</span>
          </p>
          <p className="text-xs font-medium tracking-widest text-[#C9A84C]">Consultant</p>
        </div>
      )}
    </div>
  );
}