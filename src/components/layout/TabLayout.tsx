import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";

export function TabLayout() {
  return (
    <>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </div>
      <BottomNavigation />
    </>
  );
}
