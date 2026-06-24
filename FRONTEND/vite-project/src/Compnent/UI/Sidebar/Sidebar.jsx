import { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import { CiCircleList } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <IoClose size={28} /> : <CiCircleList size={28} />}
      </button>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 max-w-[85vw] flex-col gap-6 border-r border-line bg-white p-4 shadow-xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarHeader />
        <SidebarNav onNavigate={() => setIsOpen(false)} />
      </aside>

      <aside className="sticky top-0 hidden h-screen flex-col gap-8 border-r border-line bg-white p-4 lg:flex">
        <SidebarHeader />
        <SidebarNav />
      </aside>
    </>
  );
}
