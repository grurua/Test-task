// A small, controlled set of illustrated-banner background colors.
// Cycled by index within a section so cards read as one family rather
// than a random rainbow, while still giving each card visual distinction.
export const bannerTones = [
  "#1F5C4E", // deep teal-green
  "#B5502A", // terracotta
  "#0F2F4D", // navy (brand)
  "#5B3A57", // plum
  "#6B5A34", // warm taupe
] as const;

export function toneForIndex(index: number): string {
  return bannerTones[index % bannerTones.length];
}
