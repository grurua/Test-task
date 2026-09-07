interface PartnerTileProps {
  merchant: string;
  benefitValue: string;
  tone: string;
  onClick: () => void;
}

export function PartnerTile({ merchant, benefitValue, tone, onClick }: PartnerTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-[92px] w-[128px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-3 text-left press-scale"
      style={{ background: tone }}
    >
      <span className="w-max rounded-full bg-white/90 px-2 py-0.5 text-[10.5px] font-bold text-(--color-ink)">
        {benefitValue}
      </span>
      <span className="truncate text-[15px] font-bold text-white">{merchant}</span>
    </button>
  );
}
