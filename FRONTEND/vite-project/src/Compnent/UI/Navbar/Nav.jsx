// import React from 'react'

import NavIcons from "./NavIcons";
import NavSearch from "./NavSearch";

export default function Nav() {
  return (
    <>
      <div className="flex justify-between w-full">
        <NavSearch />
        <NavIcons />
      </div>
    </>
  );
}
