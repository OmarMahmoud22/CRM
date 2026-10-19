import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../../data/SidebarLinks";
import { UseAuth } from "../../../Context/AuthContext";
import { useSelector } from "react-redux";

export default function SidebarNav({ onNavigate }) {
  const reduxRole = useSelector((state) => state.auth.user?.role);
  const { role: authRole } = UseAuth();

  const currentRole = (reduxRole || authRole || "")?.toString().toLowerCase();
  const list = sidebarLinks[currentRole] || [];

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
