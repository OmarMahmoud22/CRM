import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slices/UsersSlice";
import { useEffect, useState, useMemo } from "react";
import { FaEye, FaUserPlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function Users() {
  const dispatch = useDispatch();
  const { users = [], loading, error, length = 0 } = useSelector(
    (state) => state.users,
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-US", {
      timeZone: "Africa/Cairo",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const roleBadges = {
    admin: "bg-purple-50 text-purple-700 ring-purple-100",
    superadmin: "bg-purple-50 text-purple-700 ring-purple-100",
    TeamLeader: "bg-blue-50 text-blue-700 ring-blue-100",
    teamleader: "bg-blue-50 text-blue-700 ring-blue-100",
    agent: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Dataentry: "bg-amber-50 text-amber-700 ring-amber-100",
    dataentry: "bg-amber-50 text-amber-700 ring-amber-100",
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.full_name?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term) ||
        u.role?.toLowerCase().includes(term),
    );
  }, [users, searchTerm]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-logo">
            Team Management
          </p>
          <h2 className="mt-1 text-3xl font-extrabold text-header">Users & Roles</h2>
          <p className="mt-1 text-placeholdtwo">
            Manage company team accounts, permissions, and roles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <FaUserPlus size={16} />
            Add New User
          </Link>

          <div className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-logo">
              <HiOutlineUsers size={24} />
            </span>
            <div>
              <p className="text-sm text-placeholdtwo">Total users</p>
              <p className="text-2xl font-extrabold text-header">{length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-line p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-header">All Users</h3>
            <p className="text-sm text-placeholdtwo">
              {filteredUsers.length} of {length} records shown
            </p>
          </div>

          <div className="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-secondary px-4 text-placeholder md:w-80">
            <FiSearch className="shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm text-header outline-none placeholder:text-placeholdtwo"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 text-slate-500 font-semibold">
            Loading team members...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500 font-semibold">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-secondary">
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-placeholdtwo">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Created At</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {filteredUsers.map((item) => (
                  <tr key={item._id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-placeholder">
                          {item.full_name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                        <div>
                          <p className="font-bold text-header">
                            {item.full_name || "Unnamed user"}
                          </p>
                          <p className="text-sm text-placeholdtwo">
                            {item.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold ring-1 ${
                          roleBadges[item.role] ||
                          "bg-slate-50 text-slate-700 ring-slate-100"
                        }`}
                      >
                        {item.role || "agent"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-placeholder">
                      {formatDate(item.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2 text-lg">
                        <Link
                          to={`/start/infoUsers/${item._id}`}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-logo transition hover:bg-blue-50"
                          title="View user details"
                        >
                          <FaEye size={20} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 px-5 py-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-logo">
                  <HiOutlineUsers size={28} />
                </div>
                <h3 className="text-lg font-bold text-header">
                  {searchTerm ? "No matching users" : "No users found"}
                </h3>
                <p className="text-sm text-placeholdtwo">
                  {searchTerm
                    ? "Try adjusting your search criteria."
                    : "Create a new user to populate this list."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
