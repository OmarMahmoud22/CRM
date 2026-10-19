import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaEye, FaCheckCircle } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import API_BASE_URL, { getAuthHeaders } from "../../config/api";

export default function Tasks() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAgentLeads = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/AllLead`, {
          headers: getAuthHeaders(),
        });
        const list = res.data.leads || res.data.lead || [];
        setLeads(list);
      } catch (error) {
        console.error("Tasks fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgentLeads();
  }, []);

  // Map leads to actionable tasks
  const tasks = leads.map((lead) => {
    let taskTitle = "Follow up with client";
    let priority = "Medium";
    let actionType = "Call";

    if (lead.status === "New") {
      taskTitle = "Initial outreach & qualify prospect";
      priority = "High";
      actionType = "Outreach";
    } else if (lead.status === "Contacted") {
      taskTitle = "Schedule discovery presentation";
      priority = "Medium";
      actionType = "Meeting";
    } else if (lead.status === "Inteersted" || lead.status === "Interested") {
      taskTitle = "Prepare & send proposal";
      priority = "High";
      actionType = "Proposal";
    } else if (lead.status === "Follow_Up") {
      taskTitle = "Execute follow-up call";
      priority = "Urgent";
      actionType = "Call";
    } else if (lead.status === "Won") {
      taskTitle = "Send onboarding package";
      priority = "Low";
      actionType = "Onboarding";
    } else if (lead.status === "Lost") {
      taskTitle = "Archive prospect & log feedback";
      priority = "Low";
      actionType = "Review";
    }

    return {
      id: lead._id,
      leadName: lead.name,
      leadEmail: lead.email,
      leadPhone: lead.phone,
      leadStatus: lead.status,
      taskTitle,
      priority,
      actionType,
      createdAt: lead.createdAt,
    };
  });

  const priorityColors = {
    Urgent: "bg-red-50 text-red-700 ring-red-100",
    High: "bg-amber-50 text-amber-700 ring-amber-100",
    Medium: "bg-blue-50 text-blue-700 ring-blue-100",
    Low: "bg-slate-50 text-slate-600 ring-slate-100",
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.leadStatus !== "Won" && t.leadStatus !== "Lost";
    if (filter === "urgent") return t.priority === "Urgent" || t.priority === "High";
    if (filter === "closed") return t.leadStatus === "Won" || t.leadStatus === "Lost";
    return true;
  });

  return (
    <section className="space-y-6 font-inter">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-logo">
            Action Items
          </p>
          <h2 className="mt-1 text-3xl font-extrabold text-header">
            Sales Tasks & Follow-ups
          </h2>
          <p className="mt-1 text-placeholdtwo">
            Pipeline action items generated from your assigned customer leads.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-line bg-white p-1 shadow-sm">
          {["all", "pending", "urgent", "closed"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase transition ${
                filter === f
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-line bg-white shadow-sm overflow-hidden">
        <div className="border-b border-line p-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-header">Tasks List</h3>
            <p className="text-sm text-placeholdtwo">
              {filteredTasks.length} tasks scheduled
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-semibold">
            Loading your tasks...
          </div>
        ) : (
          <div className="divide-y divide-line">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-slate-50 transition gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ${
                        priorityColors[task.priority] || "bg-slate-50"
                      }`}
                    >
                      {task.priority} Priority
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Lead Status: {task.leadStatus}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-header">
                    {task.taskTitle}
                  </h4>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-placeholdtwo pt-1">
                    <span className="font-semibold text-slate-800">
                      Client: {task.leadName}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEnvelope className="text-slate-400" /> {task.leadEmail}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaPhone className="text-slate-400" /> {task.leadPhone}
                    </span>
                    <span className="flex items-center gap-1">
                      <IoCalendarOutline className="text-slate-400" />{" "}
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <Link
                    to={`/start/infoLead/${task.id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-xs font-bold text-header shadow-sm transition hover:border-blue-400 hover:text-logo"
                  >
                    <FaEye size={14} /> Open Lead
                  </Link>
                </div>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="p-14 text-center">
                <FaCheckCircle className="mx-auto text-4xl text-emerald-500 mb-3" />
                <h4 className="font-bold text-header text-lg">All tasks caught up!</h4>
                <p className="text-sm text-placeholdtwo mt-1">
                  No active tasks match the selected filter.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
