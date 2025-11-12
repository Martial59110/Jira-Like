export function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 text-slate-200"
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#38bdf8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="20"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            begin="0s"
            dur="1s"
            from="0 12 12"
            to="360 12 12"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <span className="text-base font-medium">Chargement des données…</span>
    </div>
  );
}
