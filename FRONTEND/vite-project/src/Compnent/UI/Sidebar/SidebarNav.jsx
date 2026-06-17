// import React from 'react'
import {NavLink} from 'react-router-dom'
// import { link } from '../../../../../../BACKEND/Routes/AuthRouter';
export default function SidebarNav() {
  const list = [
    { icon: <i className="fa-solid fa-table-columns text-2xl"></i>, title: "Dashbord" ,links:"/start/agent-dashbourd"},
    { icon: <i className="fa-solid fa-user text-2xl"></i>, title: "Leads" ,links:"/start/AllLead"},
    { icon: <i className="fa-regular fa-square-check text-2xl"></i>, title: "Tasks" , links:"/start/tasks" },
  ];
  return (
    <>
      <nav className="font-manrope text-[#54647A] ">
        {list.map((item , index) => (
          <ul key={index} className="flex gap-5 p-3 rounded-2xl hover:bg-purp ">
            <li>{item.icon}</li>
            <NavLink to={item.links} className="">{item.title}</NavLink>
          </ul>
        ))}
      </nav>
    </>
  );
}
