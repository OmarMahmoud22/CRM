import { Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar/Nav";
import Sidebar from "../UI/Sidebar/Sidebar";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="lg:w-64">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <div className="py-5  bg-white px-5 flex items-center shadow-sm">
          <Navbar />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}