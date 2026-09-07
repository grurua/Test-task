import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-(--color-surface-sunken) flex justify-center">
      <div className="relative flex w-full max-w-[430px] min-h-screen flex-col bg-(--color-app-bg) shadow-[0_0_0_1px_rgba(0,0,0,0.04)] sm:my-6 sm:min-h-[844px] sm:rounded-[36px] sm:shadow-[0_30px_60px_-15px_rgba(15,20,30,0.25)] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
