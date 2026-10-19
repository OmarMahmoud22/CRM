import { useEffect, useState, useMemo } from "react";
import { FaEye } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllLead } from "../../redux/slices/LeadsSlice";

export default function AllLead() {
  const dispatch = useDispatch();
  const { leads = [], loading, error } = useSelector((state) => state.lead);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllLead());
  }, [dispatch]);

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

  const formatDate = (date) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-US", {
      timeZone: "Africa/Cairo",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return leads;
    const term = searchTerm.toLowerCase();
    return leads.filter(
      (item) =>
        item.name?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.phone?.toLowerCase().includes(term) ||
        item.status?.toLowerCase().includes(term) ||
        item.source?.toLowerCase().includes(term),
    );
  }, [leads, searchTerm]);

  return (
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
            <p className="text-2xl font-extrabold text-header">{leads.length}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-line p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-header">All Leads</h3>
            <p className="text-sm text-placeholdtwo">
              {filteredLeads.length} of {leads.length} records shown
            </p>
          </div>

          <div className="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-secondary px-4 text-placeholder md:w-80">
            <FiSearch className="shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm text-header outline-none placeholder:text-placeholdtwo"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-slate-500">
            <p className="font-semibold">Loading leads...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            <p className="font-semibold">{error}</p>
            <button
              onClick={() => dispatch(getAllLead())}
              className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-secondary">
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-placeholdtwo">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Source</th>
                  <th className="px-5 py-4">Assigned To</th>
                  <th className="px-5 py-4">Created At</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {filteredLeads.map((item) => (
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
                            {item.email || item.phone || "No contact data"}
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

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.Assignto?.full_name || (
                        <span className="text-slate-400 italic">Unassigned</span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-placeholder">
                      {formatDate(item.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2 text-lg">
                        <Link
                          to={`/start/infoLead/${item._id}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-logo transition hover:bg-blue-50"
                          title="View lead"
                        >
                          <FaEye size={20} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLeads.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 px-5 py-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-logo">
                  <HiOutlineUsers size={28} />
                </div>
                <h3 className="text-lg font-bold text-header">
                  {searchTerm ? "No matching leads" : "No leads yet"}
                </h3>
                <p className="text-sm text-placeholdtwo">
                  {searchTerm
                    ? "Try adjusting your search criteria."
                    : "New leads will appear here once they are created."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
