import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";
import API_BASE_URL, { getAuthHeaders } from "../../config/api";

export default function FilterStatus() {
  const [searchParams] = useSearchParams();
  const [leadS, setLeadS] = useState([]);
  const [loading, setLoading] = useState(true);
  const status = searchParams.get("status") || "All";

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/lead/filter?status=${status}`,
          {
            headers: getAuthHeaders(),
          },
        );
        setLeadS(res.data.data || []);
      } catch (error) {
        console.error("Filter error:", error);
        setLeadS([]);
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, [searchParams, status]);

  const statusClasses = {
    New: "bg-blue-50 text-blue-700 ring-blue-100",
    Contacted: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    Interested: "bg-amber-50 text-amber-700 ring-amber-100",
    Inteersted: "bg-amber-50 text-amber-700 ring-amber-100",
    Follow_Up: "bg-violet-50 text-violet-700 ring-violet-100",
    Won: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Lost: "bg-rose-50 text-rose-700 ring-rose-100",
  };

  const sourceLabels = {
    from_your_frind: "Friend",
    Tweeter: "Twitter",
    Inestagram: "Instagram",
    FaceBook: "Facebook",
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/start/agent-dashbourd"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-placeholder shadow-sm transition hover:border-blue-200 hover:text-logo"
          >
            <IoArrowBack />
            Back to Dashboard
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-header">
            Filtered Leads: <span className="text-logo">{status}</span>
          </h2>
          <p className="text-sm text-placeholdtwo">
            Showing all leads with status: {status}
          </p>
        </div>

        <div className="rounded-xl border border-line bg-white px-4 py-2 text-right shadow-sm">
          <p className="text-xs text-placeholdtwo">Count</p>
          <p className="text-xl font-bold text-header">{leadS.length}</p>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 font-semibold">
            Loading filtered leads...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-secondary">
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-placeholdtwo">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Phone Number</th>
                  <th className="px-5 py-4 text-right">Action</th>
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
                            {item.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex min-h-8 items-center rounded-full px-3 text-sm font-semibold ring-1 ${
                          statusClasses[item.status] ||
                          "bg-slate-50 text-slate-700 ring-slate-100"
                        }`}
                      >
                        {item.status || "New"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-placeholder">
                      {sourceLabels[item.source] || item.source || "Unknown"}
                    </td>

                    <td className="px-5 py-4 text-placeholder">{item.phone}</td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/start/infoLead/${item._id}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-logo transition hover:bg-blue-50"
                        title="View lead"
                      >
                        <FaEye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {leadS.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                No leads found with status "{status}".
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
