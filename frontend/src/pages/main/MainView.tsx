import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../../utils/components/SideBar";

export const MainView: React.FC = () => {
  return (
<div className="grid h-[calc(100vh] grid-cols-12 grid-rows-1 gap-2">
    <div className="col-span-2">
      <SideBar />
    </div>
    <div className="col-span-10 col-start-3">

      <Outlet />
    </div>
</div>
  );
};
