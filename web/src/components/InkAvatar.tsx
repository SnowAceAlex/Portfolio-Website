// Ink drawing of Vinh. Fills and strokes use the theme tokens, so it re-inks itself at night.
// Size it with the wrapping circle; the SVG fills its parent.
export function InkAvatar({ size, className = "" }: { size: number; className?: string }) {
  return (
    <div
      className={`flex-none overflow-hidden rounded-full border-[1.5px] border-ink bg-panel ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="block size-full" role="img" aria-label="Ink drawing of Vinh">
        <g className="stroke-ink" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M10 102 C12 85 25 77.5 42 75.5 L58 75.5 C75 77.5 88 85 90 102 Z" className="fill-panel" strokeWidth="2.2" />
          <path d="M42 75.5 Q50 82.5 58 75.5" strokeWidth="2.2" />
          <path d="M44.5 66 L44 75.5 M55.5 66 L56 75.5" strokeWidth="2.2" />
          <ellipse cx="33.5" cy="52" rx="3.2" ry="5" className="fill-panel" strokeWidth="2" />
          <ellipse cx="66.5" cy="52" rx="3.2" ry="5" className="fill-panel" strokeWidth="2" />
          <ellipse cx="50" cy="50" rx="17" ry="20" className="fill-panel" strokeWidth="2.2" />
        </g>
        <g className="fill-ink">
          <ellipse cx="50" cy="31" rx="17.5" ry="8.5" />
          <circle cx="34" cy="36.5" r="6.2" />
          <circle cx="37" cy="27.5" r="7.5" />
          <circle cx="45.5" cy="21.5" r="7.8" />
          <circle cx="55" cy="21" r="7.8" />
          <circle cx="63.5" cy="27" r="7.6" />
          <circle cx="66.5" cy="36" r="6" />
          <circle cx="41" cy="35.5" r="4.6" />
          <circle cx="50" cy="36" r="4.4" />
          <circle cx="59" cy="35.5" r="4.6" />
        </g>
        <path
          d="M33 26 q3 -3.5 6.5 -.5 M43 19 q3 -3.5 6.5 -.5 M53 18.5 q3 -3.5 6.5 -.5 M61.5 25 q3 -3.5 6.5 -.5 M38 33.5 q2.5 -2.8 5.5 -.6 M47.5 33.8 q2.5 -2.8 5.5 -.6 M57 33.5 q2.5 -2.8 5.5 -.6"
          fill="none"
          className="stroke-panel"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <g className="stroke-ink" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M38 42.2 L45.5 41.4 M54.5 41.4 L62 42.2" strokeWidth="2" />
          <rect x="35.2" y="44.2" width="12.6" height="10" rx="2.2" className="fill-panel" strokeWidth="2.4" />
          <rect x="52.2" y="44.2" width="12.6" height="10" rx="2.2" className="fill-panel" strokeWidth="2.4" />
          <path d="M47.8 47.6 Q50 46.2 52.2 47.6 M35.2 47.4 L33.4 48.4 M64.8 47.4 L66.6 48.4" strokeWidth="2.2" />
          <path d="M50.2 54.5 L48.8 59 L51 59.4" strokeWidth="1.8" />
          <path d="M45 63.2 Q50 66.8 55 63.2" strokeWidth="2" />
        </g>
        <circle cx="41.5" cy="49.6" r="1.5" className="fill-ink" />
        <circle cx="58.5" cy="49.6" r="1.5" className="fill-ink" />
      </svg>
    </div>
  );
}
