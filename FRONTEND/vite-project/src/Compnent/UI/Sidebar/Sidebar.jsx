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
  className="sm:hidden fixed bottom-6 left-6 
             bg-blue-600 text-white p-3
             rounded-full shadow-lg"
  onClick={() => setIsOpen(!isOpen)}
>
  {isOpen ? <IoClose size={30} /> : <CiCircleList size={30} />}
</button>

{/* من شاشة sm فأكبر يختفي */}
      <aside
        className={`sm:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <SidebarHeader />
        <SidebarNav />
      </aside>

      <aside className="hidden sm:flex flex-col gap-10 min-h-screen">
        <SidebarHeader />
        <SidebarNav />
      </aside>
    </>
  );
}