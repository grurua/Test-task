import { ArrowRight, ArrowDownLeft, ArrowUpRight, Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MoneyValue } from "../components/discover/MoneyValue";
import { customerProfile } from "../data/customerProfile";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 px-4 pt-5 pb-8">
      <div>
        <p className="text-[14px] text-(--color-ink-secondary)">Good to see you,</p>
        <h1 className="text-[24px] font-bold tracking-tight text-(--color-ink)">
          {customerProfile.firstName}
        </h1>
      </div>

      <div className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-5">
        <p className="text-[12px] font-semibold tracking-wide text-(--color-ink-muted)">
          CURRENT ACCOUNT
        </p>
        <MoneyValue amount={customerProfile.currentAccountBalance} size="xl" className="mt-1 block" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-(--radius-control) bg-(--color-surface-alt) px-3 py-2.5 text-[13px] font-semibold text-(--color-ink)">
            <ArrowUpRight size={16} className="text-(--color-brand)" aria-hidden="true" />
            Send
          </div>
          <div className="flex items-center gap-2 rounded-(--radius-control) bg-(--color-surface-alt) px-3 py-2.5 text-[13px] font-semibold text-(--color-ink)">
            <ArrowDownLeft size={16} className="text-(--color-brand)" aria-hidden="true" />
            Request
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate("/discover")}
        className="flex items-center gap-3.5 rounded-(--radius-card) bg-(--color-brand) p-4 text-left text-white press-scale"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Landmark size={20} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-semibold">
            You could have earned +₾150
          </span>
          <span className="block text-[12.5px] text-white/75">
            See what Discover found for you
          </span>
        </span>
        <ArrowRight size={18} className="shrink-0" aria-hidden="true" />
      </button>
    </div>
  );
}
