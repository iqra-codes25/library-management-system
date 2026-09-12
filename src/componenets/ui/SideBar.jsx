import React from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BookMarked,
  Settings,
  LogOut,
} from "lucide-react";

import { Button } from "./Button";

export function Sidebar({ role = "admin" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("currentUser");
  navigate("/");
};

  const adminItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      label: "Books",
      icon: BookOpen,
      path: "/admin/books",
    },
    {
      label: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      label: "Borrowed Books",
      icon: BookMarked,
      path: "/admin/borrowed-books",
    },
    
  ];

  const userItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/user",
    },
    {
      label: "Available Books",
      icon: BookOpen,
      path: "/user/books",
    },
    {
      label: "My Borrowed Books",
      icon: BookMarked,
      path: "/user/borrowed-books",
    },
    {
      label: "History",
      icon: BookMarked,
      path: "/user/history",
    },
    
  ];

  const sidebarItems = role === "admin" ? adminItems : userItems;

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-[#eadede] bg-white shadow-[4px_0_20px_rgba(123,17,19,0.05)]">

      {/* Logo */}
      <div className="border-b border-[#eee2e2] px-6 py-6">
        <h2 className="text-xl font-bold text-[#7b1113]">
          Library
        </h2>

        <p className="mt-1 text-xs text-[#9b8585]">
          {role === "admin"
            ? "Management Panel"
            : "User Panel"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={
                item.path === "/admin" ||
                item.path === "/user"
              }
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "translate-x-1 bg-[#f8eeee] text-[#7b1113] shadow-sm"
                    : "text-[#6f4a4b] hover:translate-x-1 hover:bg-[#f8eeee] hover:text-[#7b1113]"
                }`
              }
            >
              <Icon size={19} strokeWidth={2} />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-[#eee2e2] p-3">
        <Button
          variant="secondary"
          className="w-full justify-start"
           onClick={handleLogout}
        >
          <LogOut size={19} />
          Logout
        </Button>
      </div>
    </aside>
  );
}