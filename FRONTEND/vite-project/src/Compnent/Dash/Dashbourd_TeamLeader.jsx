import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaEye } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import API_BASE_URL, { getAuthHeaders } from "../../config/api";

export default function Dashbourd_TeamLeader() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, usersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/dashbourd_admin/allLead`, {
          headers: getAuthHeaders(),
        }),
        axios.get(`${API_BASE_URL}/dashbourd_admin/allusers`, {
          headers: getAuthHeaders(),
        }).catch(() => ({ data: { users: [] } })),
      ]);

      const allLeads = leadsRes.data.all_leads || leadsRes.data.lead || [];
      setLeads(allLeads);

      const allUsers = usersRes.data.users || [];
      const agentList = allUsers.filter(
        (u) => !u.role || u.role.toLowerCase() === "agent",
      );
      setAgents(agentList);
    } catch (error) {
      console.error("TeamLeader dashboard error:", error);
      setMessage({ text: "Failed to load leads or agents.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (leadId) => {
    const agentId = selectedAgent[leadId];
    if (!agentId) {
      setMessage({ text: "Please select an agent to assign.", type: "error" });
      return;
    }

    setAssigningId(leadId);
    setMessage({ text: "", type: "" });

    try {
      const res = await axios.patch(
        `${API_BASE_URL}/Lead/${leadId}`,
        { Assignto: agentId },
        { headers: getAuthHeaders() },
      );

      setMessage({ text: "Lead assigned successfully!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);

      // Update state locally
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? res.data.data : l)),
      );
    } catch (error) {
      console.error("Assign error:", error);
      setMessage({
        text: error.response?.data?.msg || "Failed to assign lead.",
        type: "error",
      });
    } finally {
      setAssigningId(null);
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingStatusId(leadId);
    setMessage({ text: "", type: "" });

    try {
      const res = await axios.patch(
        `${API_BASE_URL}/LeadS/${leadId}`,
        { status: newStatus },
        { headers: getAuthHeaders() },
      );

      setMessage({
        text: `Lead status updated to "${newStatus}" successfully!`,
        type: "success",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);

      // Update state locally
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? res.data.data : l)),
      );
    } catch (error) {
      console.error("Status update error:", error);
      setMessage({
        text: error.response?.data?.msg || "Failed to update lead status.",
        type: "error",
      });
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const statusClasses = {
    New: "bg-blue-50 text-blue-700 ring-blue-100",
    Contacted: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    Interested: "bg-amber-50 text-amber-700 ring-amber-100",
    Inteersted: "bg-amber-50 text-amber-700 ring-amber-100",
    Follow_Up: "bg-violet-50 text-violet-700 ring-violet-100",
    Won: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Lost: "bg-rose-50 text-rose-700 ring-rose-100",
  };

  const unassignedCount = leads.filter((l) => !l.Assignto).length;
  const assignedCount = leads.filter((l) => l.Assignto).length;

  return (
    <section className="space-y-6 font-inter">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-logo">
            Team Leadership
          </p>
          <h2 className="mt-1 text-3xl font-extrabold text-header">
            Lead Distribution & Status Control
          </h2>
          <p className="mt-1 text-placeholdtwo">
            Review incoming leads, update status directly, and assign them to sales agents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-logo">
              <HiOutlineUsers size={24} />
            </span>
            <div>
              <p className="text-xs text-placeholdtwo">Total Leads</p>
              <p className="text-xl font-extrabold text-header">{leads.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FaUserPlus size={20} />
            </span>
            <div>
              <p className="text-xs text-placeholdtwo">Unassigned</p>
              <p className="text-xl font-extrabold text-amber-600">
                {unassignedCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {message.text && (
        <div
          className={`rounded-xl p-4 text-sm font-semibold ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="rounded-xl border border-line bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between border-b border-line p-4">
          <h3 className="text-lg font-bold text-header">Lead Distribution Table</h3>
          <span className="text-sm text-placeholdtwo">
            {assignedCount} Assigned / {unassignedCount} Pending
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-semibold">
            Loading team pipeline...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-secondary">
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-placeholdtwo">
                  <th className="px-5 py-4">Lead Name</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Status (Click to update)</th>
                  <th className="px-5 py-4">Current Agent</th>
                  <th className="px-5 py-4">Assign To Agent</th>
                  <th className="px-5 py-4 text-right">Details</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {leads.map((item) => (
                  <tr key={item._id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-bold text-header">{item.name}</p>
                      <span className="text-xs text-placeholdtwo">
                        Source: {item.source}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm">
                      <p className="text-slate-800">{item.email}</p>
                      <p className="text-xs text-placeholdtwo">{item.phone}</p>
                    </td>

                    {/* Interactive Status Selector calling PATCH /api/LeadS/:id */}
                    <td className="px-5 py-4">
                      <select
                        value={item.status || "New"}
                        disabled={updatingStatusId === item._id}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ring-1 outline-none transition cursor-pointer ${
                          statusClasses[item.status] ||
                          "bg-slate-50 text-slate-700 ring-slate-100"
                        }`}
                        title="Change lead status via PATCH /api/LeadS/:id"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Inteersted">Interested</option>
                        <option value="Follow_Up">Follow Up</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {item.Assignto?.full_name ? (
                        <span className="font-semibold text-emerald-700">
                          {item.Assignto.full_name}
                        </span>
                      ) : (
                        <span className="italic text-amber-600 font-medium">
                          Unassigned
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={selectedAgent[item._id] || item.Assignto?._id || ""}
                          onChange={(e) =>
                            setSelectedAgent({
                              ...selectedAgent,
                              [item._id]: e.target.value,
                            })
                          }
                          className="rounded-lg border border-line bg-secondary px-3 py-1.5 text-xs font-semibold text-header outline-none focus:border-blue-400"
                        >
                          <option value="">Select agent...</option>
                          {agents.map((agent) => (
                            <option key={agent._id} value={agent._id}>
                              {agent.full_name} ({agent.email})
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          disabled={assigningId === item._id}
                          onClick={() => handleAssign(item._id)}
                          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                          {assigningId === item._id ? "Saving..." : "Assign"}
                        </button>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/start/infoLead/${item._id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-logo transition hover:bg-blue-50"
                        title="View Details"
                      >
                        <FaEye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {leads.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                No leads available to assign.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
