// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slices/UsersSlice";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { Link } from "react-router-dom";
export default function Users() {
  const dispatch = useDispatch();
  const { users, loading, error, length } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  const formatDate = (date) => {
    // if (!date) return "No date";

    return new Date(date).toLocaleDateString("en-US", {
      timeZone: "Africa/Cairo",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };


  return (
<>


     <section className="space-y-6">
       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
         <div>
           <p className="text-sm font-semibold uppercase tracking-wide text-logo">
             Sales pipeline
           </p>
           <h2 className="mt-1 text-3xl font-extrabold text-header">Leads</h2>
           <p className="mt-1 text-placeholdtwo">
             Manage and track your sales pipeline prospects.
           </p>
         </div>
 
         <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-sm">
           <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-logo">
             <HiOutlineUsers size={24} />
           </span>
           <div>
             <p className="text-sm text-placeholdtwo">Total leads</p>
             <p className="text-2xl font-extrabold text-header">{length}</p>
           </div>
         </div>
       </div>
 
       <div className="rounded-xl border border-line bg-white shadow-sm">
         <div className="flex flex-col gap-4 border-b border-line p-4 md:flex-row md:items-center md:justify-between">
           <div>
             <h3 className="text-lg font-bold text-header">All Leads</h3>
             <p className="text-sm text-placeholdtwo">
               {length} records shown
             </p>
           </div>
 
           <div className="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-secondary px-4 text-placeholder md:w-80">
             <FiSearch className="shrink-0" />
             <span className="text-sm text-placeholdtwo">
               Search coming soon
             </span>
           </div>
         </div>
 
         <div className="overflow-x-auto">
           <table className="w-full min-w-[760px]">
             <thead className="bg-secondary">
               <tr className="text-left text-xs font-bold uppercase tracking-wide text-placeholdtwo">
                 <th className="px-5 py-4">Name</th>

                 <th className="px-5 py-4">Created At</th>
                 <th className="px-5 py-4 text-right">Action</th>
               </tr>
             </thead>
 
             <tbody className="divide-y divide-line">
               {users.map((item) => (
                 <tr key={item._id} className="transition hover:bg-slate-50">
                   <td className="px-5 py-4">
                     <div className="flex items-center gap-3">
                       <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-placeholder">
                         {item.full_name?.charAt(0)?.toUpperCase() || "L"}
                       </span>
                       <div>
                         <p className="font-bold text-header">
                           {item.full_name || "Unnamed lead"}
                         </p>
                         <p className="text-sm text-placeholdtwo">
                           {item.email || item.phone || "No contact data"}
                         </p>
                       </div>
                     </div>
                   </td>
{/*  
                   <td className="px-5 py-4">
                     <span
                       className={`inline-flex min-h-8 items-center rounded-full px-3 text-sm font-semibold ring-1 ${
                         statusClasses[item.status] ||
                         // statusClasses["New"]
                         "bg-slate-50 text-slate-700 ring-slate-100"
                       }`}
                     >
                       {item.status || "New"}
                     </span>
                   </td> */}
{/*  
                   <td className="px-5 py-4 text-placeholder">
                     {sourceLabels[item.source] || item.source || "Unknown"}
                   </td> */}
 
                   <td className="px-5 py-4 text-placeholder">
                     {formatDate(item.createdAt)}
                   </td>
 
                   <td className="px-5 py-4">
                     <div className="flex justify-end gap-2 text-lg">
                       <Link
                         to={`/start/infoUsers/${item._id}`}
                         className="flex h-9 w-9 items-center justify-center rounded-lg text-logo transition hover:bg-blue-50"
                         title="View lead"
                       >
                         <FaEye size={30} />
                       </Link>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
 
           {users.length === 0 && (
             <div className="flex flex-col items-center justify-center gap-2 px-5 py-14 text-center">
               <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-logo">
                 <HiOutlineUsers size={28} />
               </div>
               <h3 className="text-lg font-bold text-header">No leads yet</h3>
               <p className="text-sm text-placeholdtwo">
                 New leads will appear here once they are created.
               </p>
             </div>
           )}
         </div>
       </div>
     </section>
  </>
  )
}
