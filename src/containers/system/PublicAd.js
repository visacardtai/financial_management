import React from "react";
import { SidebarAd } from "../../components/admin";
import { Outlet } from "react-router-dom";

const PublicAd = () => {
  return (
    <div className="flex gap-5">
      <SidebarAd />
      <div className="py-4 flex-1 mx-auto max-w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicAd;
