// import React from 'react'
import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../../data/SidebarLinks";
import { UseAuth } from "../../../Context/AuthContext";
export default function SidebarNav({ onNavigate }) {
  // const list = [
  //   {
  //     icon: <i className="fa-solid fa-table-columns text-lg"></i>,
  //     title: "Dashboard",
  //     links: "/start/agent-dashbourd",
  //   },
  //   {
  //     icon: <i className="fa-solid fa-user text-lg"></i>,
  //     title: "Leads",
  //     links: "/start/AllLead",
  //   },
  //   {
  //     icon: <i className="fa-regular fa-square-check text-lg"></i>,
  //     title: "Tasks",
  //     links: "/start/tasks",
  //   },
  // ];
  const { role } = UseAuth();
  // const normalizedRole = role?.toString().toLowerCase();
  const list = sidebarLinks[role] || [];
  return (
    <nav className="space-y-2 font-manrope text-[#54647A]">
      {list.map((item) => (
        <NavLink
          key={item.links || item.link}
          to={item.links || item.link}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex min-h-11 items-center gap-3 rounded-xl px-3 font-semibold transition ${
              isActive
                ? "bg-blue-50 text-logo"
                : "text-[#54647A] hover:bg-purp hover:text-header"
            }`
          }
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center">
            {item.icon}
          </span>
          <span className="truncate">{item.title}</span>
        </NavLink>
      ))}
    </nav>
  );
}
