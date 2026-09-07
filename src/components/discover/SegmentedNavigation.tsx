import { NavLink } from "react-router-dom";

interface Segment {
  to: string;
  label: string;
  end?: boolean;
}

const segments: Segment[] = [
  { to: "/discover", label: "All", end: true },
  { to: "/discover/for-you", label: "For You" },
  { to: "/discover/whats-new", label: "What's New" },
  { to: "/discover/offers", label: "Offers" },
];

export function SegmentedNavigation() {
  return (
    <div
      role="tablist"
      aria-label="Discover sections"
      className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3"
    >
      {segments.map((segment) => (
        <NavLink
          key={segment.to}
          to={segment.to}
          end={segment.end}
          role="tab"
          className="shrink-0"
        >
          {({ isActive }) => (
            <span
              aria-selected={isActive}
              className={`inline-flex items-center rounded-full border px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap press-scale ${
                isActive
                  ? "border-(--color-brand) bg-(--color-brand) text-white"
                  : "border-(--color-border) bg-(--color-surface) text-(--color-ink-secondary)"
              }`}
            >
              {segment.label}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  );
}
