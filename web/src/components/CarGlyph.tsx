// The little blue car in two views: side (44×22) for the nav, sidebar and footer; top-down (22×36) for the journey road.
export function CarGlyph({
  view = "side",
  width,
  height,
  className = "",
}: {
  view?: "side" | "top";
  width?: number;
  height?: number;
  className?: string;
}) {
  if (view === "top") {
    return (
      <svg
        viewBox="0 0 22 36"
        width={width ?? 22}
        height={height ?? 36}
        className={`block ${className}`}
        aria-hidden="true"
      >
        <rect x="1" y="1" width="20" height="34" rx="6" className="fill-ink" />
        <rect x="4" y="22" width="14" height="7" rx="2" className="fill-panel" />
        <rect x="4.5" y="6" width="13" height="4.5" rx="1.5" className="fill-panel" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 44 22"
      width={width ?? 40}
      height={height ?? 20}
      className={`block overflow-visible ${className}`}
      aria-hidden="true"
    >
      <rect x="9" y="2" width="21" height="9" rx="2.5" className="fill-panel stroke-ink" strokeWidth="1.6" />
      <rect x="17" y="2" width="1.6" height="9" className="fill-ink" />
      <rect x="1.5" y="9" width="41" height="8" rx="3" className="fill-ink" />
      <circle cx="11" cy="17.5" r="3.6" className="fill-panel stroke-ink" strokeWidth="1.8" />
      <circle cx="33" cy="17.5" r="3.6" className="fill-panel stroke-ink" strokeWidth="1.8" />
    </svg>
  );
}
