// import React from 'react

export default function SidebarHeader() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-center">
        <i className="fa-solid fa-user text-xl text-white"></i>
      </div>
      <div className="min-w-0">
        <h1 className="truncate font-inter text-xl font-extrabold text-logo">
          Sales Core
        </h1>
        <p className="truncate font-manrope text-sm text-gray-500">
          Enterprise CRM
        </p>
      </div>
    </div>
  );
}
