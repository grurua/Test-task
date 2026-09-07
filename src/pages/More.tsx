import { CircleHelp, LogOut, Settings, ShieldCheck, User } from "lucide-react";

const rows = [
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
  { icon: ShieldCheck, label: "Security" },
  { icon: CircleHelp, label: "Help & support" },
  { icon: LogOut, label: "Log out" },
];

export function More() {
  return (
    <div className="flex flex-col gap-5 px-4 pt-5 pb-8">
      <h1 className="text-[24px] font-bold tracking-tight text-(--color-ink)">More</h1>
      <div className="overflow-hidden rounded-(--radius-card) border border-(--color-border) bg-(--color-surface)">
        {rows.map(({ icon: Icon, label }, index) => (
          <div
            key={label}
            className={`flex items-center gap-3.5 px-4 py-3.5 ${
              index !== rows.length - 1 ? "border-b border-(--color-border)" : ""
            }`}
          >
            <Icon size={18} className="text-(--color-ink-secondary)" aria-hidden="true" />
            <span className="text-[14px] font-medium text-(--color-ink)">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
