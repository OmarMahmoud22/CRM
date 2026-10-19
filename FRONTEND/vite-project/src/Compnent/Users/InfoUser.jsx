import { IoArrowBack, IoCalendarOutline } from "react-icons/io5";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "../../redux/slices/UsersSlice";
import { FaEnvelope, FaUser, FaUserShield } from "react-icons/fa";

export default function InfoUser() {
  const { user, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getUserInfo(id));
    }
  }, [dispatch, id]);

  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        timeZone: "Africa/Cairo",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No date";

  const details = [
    {
      label: "Full Name",
      value: user?.full_name || "Unnamed user",
      icon: <FaUser />,
    },
    {
      label: "Assigned Role",
      value: user?.role || "agent",
      icon: <FaUserShield />,
    },
    {
      label: "Email Address",
      value: user?.email || "No email address",
      icon: <FaEnvelope />,
    },
    {
      label: "Member Since",
      value: createdAt,
      icon: <IoCalendarOutline />,
    },
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg font-semibold text-slate-500">Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg font-semibold text-red-500">User not found</p>
        <Link
          to="/start/allUsers"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            to="/start/allUsers"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-semibold text-placeholder shadow-sm transition hover:border-blue-200 hover:text-logo"
          >
            <IoArrowBack />
            Back to Users
          </Link>

          <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-logo">
            User profile
          </p>
          <h2 className="mt-1 text-3xl font-extrabold text-header">
            {user?.full_name || "User Details"}
          </h2>
          <p className="mt-1 text-placeholdtwo">
            User account information and system permissions.
          </p>
        </div>

        <div className="inline-flex min-h-11 w-fit items-center rounded-full bg-blue-50 px-4 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
          Role: {user?.role || "agent"}
        </div>
      </div>

      <div className="rounded-xl border border-line bg-white shadow-sm">
        <div className="border-b border-line p-5">
          <h3 className="text-lg font-bold text-header">Account Information</h3>
          <p className="text-sm text-placeholdtwo">
            Main contact details and profile role.
          </p>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-2">
          {details.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-line bg-secondary p-4"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-logo shadow-sm">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-placeholdtwo">
                {item.label}
              </p>
              <p className="mt-1 break-words text-base font-bold text-header">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
