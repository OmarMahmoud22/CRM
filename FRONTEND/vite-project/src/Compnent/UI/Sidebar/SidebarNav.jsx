// import React from 'react'

export default function SidebarNav() {
  const list = [
    { icon: <i class="fa-solid fa-table-columns text-2xl"></i>, title: "Dashbord" },
    { icon: <i class="fa-solid fa-user text-2xl"></i>, title: "Leads" },
    { icon: <i class="fa-regular fa-square-check text-2xl"></i>, title: "Tasks" },
  ];
  return (
    <>
      <nav className="font-manrope text-[#54647A] ">
        {list.map((item , index) => (
          <ul key={index} className="flex gap-5 p-3 rounded-2xl hover:bg-purp ">
            <li>{item.icon}</li>
            <span className="">{item.title}</span>
          </ul>
        ))}
      </nav>
    </>
  );
}
