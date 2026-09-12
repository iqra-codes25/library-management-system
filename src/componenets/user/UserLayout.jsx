import React from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "../ui/SideBar";

export function UserLayout() {
  return (
    <div className="flex min-h-screen bg-[#faf7f7]">
      <Sidebar role="user" />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}