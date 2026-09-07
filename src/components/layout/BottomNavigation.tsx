import { Compass, Grid2x2, House, Menu, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  icon: typeof House;
}

const items: NavItem[] = [
  { to: "/home", label: "Home", icon: House },
  { to: "/payments", label: "Payments", icon: Wallet },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/products", label: "Products", icon: Grid2x2 },
  { to: "/more", label: "More", icon: Menu },
];

export function BottomNavigation() {
  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-30 flex items-stretch justify-around border-t border-(--color-border) bg-(--color-surface)/95 px-1 pb-[max(6px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur"
    >
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          aria-label={label}
          className="flex min-w-14 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 press-scale"
        >
          {({ isActive }) => (
            <>
              <Icon
                size={22}
                strokeWidth={isActive ? 2.4 : 1.8}
                className={isActive ? "text-(--color-brand)" : "text-(--color-ink-muted)"}
                aria-hidden="true"
              />
              <span
                className={`text-[11px] leading-none ${
                  isActive
                    ? "font-semibold text-(--color-brand)"
                    : "text-(--color-ink-muted)"
                }`}
              >
                {label}
              </span>
              <span
                aria-hidden="true"
                className={`mt-0.5 h-1 w-1 rounded-full ${
                  isActive ? "bg-(--color-brand)" : "bg-transparent"
                }`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
