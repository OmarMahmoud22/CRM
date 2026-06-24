import { Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar/Nav";
import Sidebar from "../UI/Sidebar/Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F2F4F6] font-inter lg:flex">
      {/* Sidebar */}
      <div className="lg:w-64 lg:shrink-0">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Navbar */}
        <div className="sticky top-0 z-30 flex items-center bg-white px-4 py-4 shadow-sm sm:px-5 lg:px-6">
          <Navbar />
        </div>

        {/* Page Content */}
        <div className="min-w-0 flex-1 p-4 sm:p-5 lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
