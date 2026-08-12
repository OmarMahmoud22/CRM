import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../Context/NotifecationContext";
import { useSelector } from "react-redux";
export default function NavIcons() {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead } = useNotification();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  const full_name = useSelector((state) => state.auth.full_name);
  // console.log(full_name);
  return (
    <div className="flex shrink-0 items-center justify-end gap-2 text-gray-500 sm:gap-3">
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-100 relative"
          title="Notifications"
          onClick={() => setOpen((prev) => !prev)}
        >
          <i className="fa-solid fa-bell"></i>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-3 border-b font-semibold text-gray-700">
              Notifications ({unreadCount})
            </div>
            {notifications.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">No Notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-3 border-b hover:bg-gray-50 ${!n.isRead ? "bg-blue-50 border-l-4 border-l-blue-400" : ""}`}
                >
                  <p className="font-semibold text-sm">{n.title}</p>
                  <p className="text-sm text-gray-600">{n.body}</p>
                  <small className="text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </small>
                  <button
                    className="text-xs text-blue-500 hover:text-blue-700"
                    onClick={() => markAsRead(n._id)}
                  >
                    Mark as Read
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <button
        type="button"
        className="p-2 bg-red-500 text-white rounded-2xl"
        title="Settings"
        onClick={handelLogout}
      >
        LogOut
      </button>
      <p className="hidden text-gray-300 sm:block">|</p>
      <h1 className="max-w-28 truncate text-sm font-semibold text-placeholder sm:max-w-40">
        {full_name}
      </h1>
    </div>
  );
}
