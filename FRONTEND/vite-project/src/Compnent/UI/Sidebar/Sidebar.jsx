// import React from 'react'
// import Stylig from "../Sidebar/Sidebar.module.css";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
export default function Sidebar() {
  return (
    <>
    <isaid className="flex flex-col gap-10 min-h-screen border-2 border-gray-200 bg-[#F2F4F6]">
    <SidebarHeader />
    <SidebarNav/>
    </isaid>
    </>
  );
}
