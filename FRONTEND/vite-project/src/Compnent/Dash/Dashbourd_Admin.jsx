import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaUserPlus, FaTrophy, FaArrowRight, FaEye } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { TiGroup } from "react-icons/ti";
import API_BASE_URL, { getAuthHeaders } from "../../config/api";

export default function Dashbourd_Admin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/dashbourd_admin/stats`, {
          headers: getAuthHeaders(),
        });
        setStats(res.data);
      } catch (error) {
        console.error("Admin stats error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalUsers = stats?.totalUsers || 0;
  const totalLeads = stats?.totalLeads || 0;
  const statusStats = stats?.statusStats || {};
  const sourceStats = stats?.sourceStats || {};
  const roleStats = stats?.roleStats || {};
  const recentLeads = stats?.recentLeads || [];

  const wonLeads = statusStats["Won"] || 0;
  const newLeads = statusStats["New"] || 0;
  const activePipeline =
    (statusStats["Contacted"] || 0) +
    (statusStats["Inteersted"] || 0) +
    (statusStats["Follow_Up"] || 0);

  const statusClasses = {
    New: "bg-blue-50 text-blue-700 ring-blue-100",
    Contacted: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    Interested: "bg-amber-50 text-amber-700 ring-amber-100",
    Inteersted: "bg-amber-50 text-amber-700 ring-amber-100",
    Follow_Up: "bg-violet-50 text-violet-700 ring-violet-100",
    Won: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Lost: "bg-rose-50 text-rose-700 ring-rose-100",
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg font-semibold text-slate-500">
          Loading Enterprise Overview...
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-logo">
            Executive Control
          </p>
          <h2 className="mt-1 text-3xl font-extrabold text-header">
            Enterprise Admin Dashboard
          </h2>
          <p className="mt-1 text-placeholdtwo">
            System-wide analytics, team distribution, and lead pipeline health.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <FaUserPlus size={16} />
            Create User
          </Link>

          <Link
            to="/start/create-lead"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-placeholder shadow-sm transition hover:border-blue-300 hover:text-logo"
          >
            Add Lead
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link
          to="/start/allUsers"
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Total Team Members
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
              <HiOutlineUsers size={22} />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 mt-3">{totalUsers}</p>
          <span className="mt-2 inline-flex items-center text-xs font-semibold text-purple-600">
            View team directory <FaArrowRight className="ml-1" size={10} />
          </span>
        </Link>

        <Link
          to="/start/AllLead"
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Total Leads
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-logo">
              <i className="fa-solid fa-users text-lg"></i>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 mt-3">{totalLeads}</p>
          <span className="mt-2 inline-flex items-center text-xs font-semibold text-blue-600">
            View all leads <FaArrowRight className="ml-1" size={10} />
          </span>
        </Link>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Won Deals
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FaTrophy size={20} />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 mt-3">{wonLeads}</p>
          <span className="mt-2 block text-xs text-emerald-600 font-semibold">
            Successfully closed prospects
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase">
              Active Pipeline
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <i className="fa-solid fa-bolt text-lg"></i>
            </div>
          </div>
          <p className="text-3xl font-extrabold text-gray-900 mt-3">
            {activePipeline}
          </p>
          <span className="mt-2 block text-xs text-amber-600 font-semibold">
            In contact & follow-up
          </span>
        </div>
      </div>

      {/* Grid: Status & Role breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pipeline Status Breakdown */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-header mb-4">
            Pipeline by Status
          </h3>
          <div className="space-y-3">
            {[
              { label: "New Leads", count: newLeads, color: "bg-blue-500" },
              {
                label: "Contacted",
                count: statusStats["Contacted"] || 0,
                color: "bg-cyan-500",
              },
              {
                label: "Interested",
                count: statusStats["Inteersted"] || 0,
                color: "bg-amber-500",
              },
              {
                label: "Follow Up",
                count: statusStats["Follow_Up"] || 0,
                color: "bg-violet-500",
              },
              { label: "Won", count: wonLeads, color: "bg-emerald-500" },
              {
                label: "Lost",
                count: statusStats["Lost"] || 0,
                color: "bg-rose-500",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="font-semibold text-header">{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-header">{item.count}</span>
                  <span className="text-xs text-placeholdtwo w-10 text-right">
                    {totalLeads > 0
                      ? `${Math.round((item.count / totalLeads) * 100)}%`
                      : "0%"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Roles Distribution */}
        <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold text-header mb-4">
            Team Composition by Role
          </h3>
          <div className="space-y-4">
            {[
              {
                role: "Administrators",
                count: (roleStats["admin"] || 0) + (roleStats["SuperAdmin"] || 0),
                desc: "Full system administration and user management",
              },
              {
                role: "Team Leaders",
                count: roleStats["TeamLeader"] || 0,
                desc: "Lead distribution and agent supervision",
              },
              {
                role: "Sales Agents",
                count: roleStats["agent"] || 0,
                desc: "Direct customer interaction and lead closing",
              },
              {
                role: "Data Entry",
                count: roleStats["Dataentry"] || 0,
                desc: "Prospect sourcing and lead intake",
              },
            ].map((item) => (
              <div
                key={item.role}
                className="flex items-center justify-between rounded-xl border border-line bg-slate-50 p-3"
              >
                <div>
                  <p className="font-bold text-header text-sm">{item.role}</p>
                  <p className="text-xs text-placeholdtwo">{item.desc}</p>
                </div>
                <span className="text-xl font-extrabold text-header">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leads by Channel */}
      <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-header mb-4">
          Lead Influx by Source
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-slate-50 p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700">Facebook</span>
              <FaFacebookSquare size={28} className="text-blue-600" />
            </div>
            <p className="text-2xl font-extrabold text-header mt-2">
              {sourceStats["FaceBook"] || 0}
            </p>
          </div>

          <div className="rounded-xl border border-line bg-slate-50 p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700">Twitter</span>
              <IoLogoTwitter size={28} className="text-blue-500" />
            </div>
            <p className="text-2xl font-extrabold text-header mt-2">
              {sourceStats["Tweeter"] || 0}
            </p>
          </div>

          <div className="rounded-xl border border-line bg-slate-50 p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700">Instagram</span>
              <GrInstagram size={28} className="text-orange-500" />
            </div>
            <p className="text-2xl font-extrabold text-header mt-2">
              {sourceStats["Inestagram"] || 0}
            </p>
          </div>

          <div className="rounded-xl border border-line bg-slate-50 p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-700">Referral</span>
              <TiGroup size={28} className="text-indigo-600" />
            </div>
            <p className="text-2xl font-extrabold text-header mt-2">
              {sourceStats["from_your_frind"] || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="rounded-xl border border-line bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-line p-5">
          <div>
            <h3 className="text-lg font-bold text-header">Recent Leads</h3>
            <p className="text-sm text-placeholdtwo">
              Latest prospects added to the pipeline
            </p>
          </div>
          <Link
            to="/start/AllLead"
            className="text-sm font-semibold text-logo hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-secondary text-xs uppercase text-placeholdtwo">
              <tr>
                <th className="px-5 py-3 text-left">Lead</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Source</th>
                <th className="px-5 py-3 text-left">Assigned Agent</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-sm">
              {recentLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <p className="font-bold text-header">{lead.name}</p>
                    <p className="text-xs text-placeholdtwo">{lead.email}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${
                        statusClasses[lead.status] || "bg-slate-50 text-slate-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-placeholder">{lead.source}</td>
                  <td className="px-5 py-3 text-placeholder">
                    {lead.Assignto?.full_name || (
                      <span className="italic text-slate-400">Unassigned</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      to={`/start/infoLead/${lead._id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-logo hover:bg-blue-50"
                    >
                      <FaEye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {recentLeads.length === 0 && (
            <div className="p-8 text-center text-slate-400">No leads recorded yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
