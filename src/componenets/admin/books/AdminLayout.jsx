import React from "react";
import { Outlet } from "react-router-dom";
import {Sidebar}  from "../../ui/SideBar";


export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#faf7f7]">
      <Sidebar role="admin" />

      <div className="flex min-w-0 flex-1 flex-col">


        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}