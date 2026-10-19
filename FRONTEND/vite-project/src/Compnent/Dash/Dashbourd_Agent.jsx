import { TiGroup } from "react-icons/ti";
import { GrInstagram } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { Link } from "react-router-dom";
import API_BASE_URL, { getAuthHeaders } from "../../config/api";

export default function Dashbourd_Agent() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetching() {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/dashboard`, {
          headers: getAuthHeaders(),
        });
        setData(res.data);
      } catch (error) {
        console.error("Dashboard error:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetching();
  }, []);

  const { totalLead = 0, SourceState = {}, StatusStats = {} } = data;

  const info = [
    {
      title: "TOTAL LEADS",
      value: totalLead || 0,
      links: "/start/AllLead",
      icon: <i className="fa-solid fa-users text-logo text-xl"></i>,
    },
    {
      title: "NEW LEADS",
      value: StatusStats?.New || 0,
      links: "/start/agent-dashbourd/filter?status=New",
      icon: <i className="fa-solid fa-square-plus text-logo text-xl"></i>,
    },
    {
      title: "LOST LEADS",
      value: StatusStats?.Lost || 0,
      links: "/start/agent-dashbourd/filter?status=Lost",
      icon: <i className="fa-solid fa-circle-xmark text-red-500 text-xl"></i>,
    },
    {
      title: "WON LEADS",
      value: StatusStats?.Won || 0,
      links: "/start/agent-dashbourd/filter?status=Won",
      icon: <i className="fa-solid fa-trophy text-green-500 text-xl"></i>,
    },
    {
      title: "FOLLOW UP LEADS",
      value: StatusStats?.Follow_Up || 0,
      links: "/start/agent-dashbourd/filter?status=Follow_Up",
      icon: <i className="fa-solid fa-phone text-yellow-500 text-xl"></i>,
    },
    {
      title: "INTERESTED LEADS",
      value: StatusStats?.Inteersted || 0,
      links: "/start/agent-dashbourd/filter?status=Inteersted",
      icon: <i className="fa-solid fa-heart text-pink-500 text-xl"></i>,
    },
    {
      title: "CONTACTED LEADS",
      value: StatusStats?.Contacted || 0,
      links: "/start/agent-dashbourd/filter?status=Contacted",
      icon: <i className="fa-solid fa-envelope text-blue-500 text-xl"></i>,
    },
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg font-semibold text-slate-500">Loading Agent Dashboard...</p>
      </div>
    );
  }

  return (
    <section className="w-full space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-logo">
          Agent Workspace
        </p>
        <h2 className="mt-1 text-3xl font-extrabold text-header">
          Performance Dashboard
        </h2>
        <p className="mt-1 text-placeholdtwo">
          Real-time metrics for your assigned leads and acquisition channels.
        </p>
      </div>

      {/* Cards */}
      <main className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {info.map((item, index) => (
          <Link
            to={item.links}
            key={index}
            className="block bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-semibold text-gray-500">
                {item.title}
              </span>
              {item.icon}
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold mt-4 text-gray-800">
              {item.value}
            </h1>
          </Link>
        ))}
      </main>

      {/* Channel statistics */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-header mb-4">
          Leads By Channel
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-slate-50 p-4 transition hover:shadow-sm">
            <h4 className="text-sm font-bold text-gray-600">Twitter</h4>
            <div className="flex justify-between items-center mt-3">
              <p className="text-3xl font-extrabold text-gray-800">
                {SourceState?.Tweeter || 0}
              </p>
              <IoLogoTwitter size={36} className="text-blue-500" />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-slate-50 p-4 transition hover:shadow-sm">
            <h4 className="text-sm font-bold text-gray-600">Facebook</h4>
            <div className="flex justify-between items-center mt-3">
              <p className="text-3xl font-extrabold text-gray-800">
                {SourceState?.FaceBook || 0}
              </p>
              <FaFacebookSquare size={36} className="text-blue-600" />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-slate-50 p-4 transition hover:shadow-sm">
            <h4 className="text-sm font-bold text-gray-600">Instagram</h4>
            <div className="flex justify-between items-center mt-3">
              <p className="text-3xl font-extrabold text-gray-800">
                {SourceState?.Inestagram || 0}
              </p>
              <GrInstagram size={36} className="text-orange-500" />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-slate-50 p-4 transition hover:shadow-sm">
            <h4 className="text-sm font-bold text-gray-600">Friend Referral</h4>
            <div className="flex justify-between items-center mt-3">
              <p className="text-3xl font-extrabold text-gray-800">
                {SourceState?.from_your_frind || 0}
              </p>
              <TiGroup size={36} className="text-indigo-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
