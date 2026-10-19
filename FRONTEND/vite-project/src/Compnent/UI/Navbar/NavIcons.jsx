import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useNotification } from "../../../Context/NotifecationContext";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/AuthSlice";
import socket from "../../../Socket/Socket";

export default function NavIcons() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications = [], unreadCount = 0, markAsRead } = useNotification();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const reduxName = useSelector((state) => state.auth.full_name);
  const authUser = useSelector((state) => state.auth.user);
  const displayName = reduxName || authUser?.full_name || localStorage.getItem("full_name") || "User";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    socket.disconnect();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex shrink-0 items-center justify-end gap-2 text-gray-500 sm:gap-3">
      {/* Notifications bell */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-100 relative text-slate-600"
          title="Notifications"
          onClick={() => setOpen((prev) => !prev)}
        >
          <i className="fa-solid fa-bell text-lg"></i>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-line rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-line flex items-center justify-between">
              <span className="font-bold text-sm text-header">
                Notifications ({unreadCount} unread)
              </span>
              <Link
                to="/start/noti"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-logo hover:underline"
              >
                View all
              </Link>
            </div>

            {notifications.length === 0 ? (
              <p className="p-6 text-center text-sm text-gray-400">
                No notifications right now
              </p>
            ) : (
              notifications.slice(0, 5).map((n) => (
                <div
                  key={n._id}
                  className={`p-3 border-b border-line hover:bg-gray-50 transition ${
                    !n.isRead ? "bg-blue-50/60 border-l-4 border-l-blue-600" : ""
                  }`}
                >
                  <p className="font-semibold text-xs text-header">{n.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{n.body}</p>
                  <div className="flex items-center justify-between mt-2">
                    <small className="text-[10px] text-gray-400">
                      {new Date(n.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                    {!n.isRead && (
                      <button
                        type="button"
                        className="text-[10px] font-semibold text-blue-600 hover:text-blue-800"
                        onClick={() => markAsRead(n._id)}
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-semibold rounded-lg transition"
        title="Sign Out"
        onClick={handleLogout}
      >
        Log Out
      </button>

      <span className="hidden text-gray-300 sm:block">|</span>

      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-800">
          {displayName.charAt(0).toUpperCase()}
        </span>
        <span className="max-w-28 truncate text-sm font-semibold text-header sm:max-w-40">
          {displayName}
        </span>
      </div>
    </div>
  );
}
