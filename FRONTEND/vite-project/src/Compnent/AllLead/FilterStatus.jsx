// import React from 'react'

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function FilterStatus() {
  const [searchParams] = useSearchParams();
  const [leadS, setLeadS] = useState([]);

  useEffect(() => {
    const feching = async () => {
      try {
        const status = searchParams.get("status");
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://127.0.0.1:5000/api/lead/filter?status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setLeadS(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    feching();
  }, [status]);
  // const statusClasses = {
  //   New: "bg-blue-50 text-blue-700 ring-blue-100",
  //   Contacted: "bg-cyan-50 text-cyan-700 ring-cyan-100",
  //   Interested: "bg-amber-50 text-amber-700 ring-amber-100",
  //   Inteersted: "bg-amber-50 text-amber-700 ring-amber-100",
  //   Follow_Up: "bg-violet-50 text-violet-700 ring-violet-100",
  //   // "Follow-Up": "bg-violet-50 text-violet-700 ring-violet-100",
  //   Won: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  //   Lost: "bg-rose-50 text-rose-700 ring-rose-100",
  // };

  const sourceLabels = {
    from_your_frind: "Friend",
    Tweeter: "Twitter",
    Inestagram: "Instagram",
    FaceBook: "Facebook",
  };

  return (
    <>
      <div className="flex">
        <table className="w-full min-w-[760px]">
          <thead className="bg-secondary">
            <tr className="text-left text-xs font-bold uppercase tracking-wide text-placeholdtwo">
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Status</th>
              {/* <th className="px-5 py-4">Source</th> */}
              <th className="px-5 py-4">Phone Number</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {leadS.map((item) => (
              <tr key={item._id} className="transition hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-placeholder">
                      {item.name?.charAt(0)?.toUpperCase() || "L"}
                    </span>
                    <div>
                      <p className="font-bold text-header">
                        {item.name || "Unnamed lead"}
                      </p>
                      <p className="text-sm text-placeholdtwo">
                        {item.email || "No contact data"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* <td className="px-5 py-4">
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

                <td className="px-5 py-4 text-placeholder">
                  {sourceLabels[item.source] || item.source || "Unknown"}
                </td>

                <td className="px-5 py-4 text-placeholder">{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
