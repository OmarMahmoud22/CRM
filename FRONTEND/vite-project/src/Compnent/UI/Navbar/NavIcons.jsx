// import React from 'react'
import { useNavigate } from "react-router-dom";
export default function NavIcons() {
  const navigate = useNavigate();
  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="flex shrink-0 items-center justify-end gap-2 text-gray-500 sm:gap-3">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-100"
        title="Notifications"
      >
        <i className="fa-solid fa-bell"></i>
      </button>
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
        Alex Rivera
      </h1>
    </div>
  );
}
