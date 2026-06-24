// import React from 'react'

import NavIcons from "./NavIcons";
import NavSearch from "./NavSearch";

export default function Nav() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <NavSearch />
      <NavIcons />
    </div>
  );
}
