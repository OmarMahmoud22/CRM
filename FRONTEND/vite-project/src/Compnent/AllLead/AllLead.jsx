import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {Link} from 'react-router-dom'
export default function AllLead() {
  //   const [data, setData] = useState({});
  const [lead, setLead] = useState([]);
  const [totallead, setTotalLeads] = useState(0);
  useEffect(() => {
    async function feching() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://127.0.0.1:5000/api/AllLead", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setData(res.data);
        setLead(res.data.leads);
        setTotalLeads(res.data.totallead);
      } catch (error) {
        console.log(error.message);
      }
    }
    feching();
  }, []);
  //   const { totalLead } = data;
  const statusClasses = {
    New: "bg-blue-500 text-blue-200",
    Contacted: "bg-green-500 text-green-200",
    Interested: "bg-yellow-500 text-yello-200",
    "Follow-Up": "bg-amber-900 text-ambet-500",
    Won: "bg-green-500 text-green-200",
    Lost: "bg-red-500 text-red-200",
  };
  //   console.log(statusClasses[status]);
  return (
    <>
      <div className=" flex flex-col mb-5">
        <h2 className="font-extrabold text-3xl text-logo">Leads {totallead}</h2>
        <p className="text-placeholdtwo">
          Manage and track your sales pipeline prospects
        </p>
      </div>
      <div className="overflow-hidden border border-gray-300 rounded-2xl">
        <table className="w-full ">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Source</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {lead.map((item, index) => (
              <tr key={index} className="bg-white shadow-sm rounded-xl hover:bg-gray-100 transition">
                <td className="p-4 font-bold">{item.name}</td>

                <td className="p-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm ${statusClasses[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4">{item.source}</td>

                <td className="p-4">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    timeZone: "Africa/Cairo",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                <td className="p-4">
                  <div className="flex gap-4 text-xl">
                    <Link to={`/start/infoLead/${item._id}`}>
                    <FaEye />
                    </Link>
                    <FaPencilAlt className="text-placeholder" />
                    <MdDelete className="text-placeholder" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
