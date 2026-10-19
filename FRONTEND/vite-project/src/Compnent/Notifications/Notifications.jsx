import { useNotification } from "../../Context/NotifecationContext";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

export default function Notifications() {
  const { notifications = [], unreadCount = 0, markAsRead } = useNotification();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-logo">
            Alerts & Activity
          </p>
          <h1 className="text-3xl font-extrabold text-header">
            Notifications ({unreadCount} unread)
          </h1>
          <p className="text-sm text-placeholdtwo">
            Real-time notifications about assigned leads and system events.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-xl border border-line bg-white p-12 text-center text-slate-400">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3">
              <i className="fa-regular fa-bell text-xl"></i>
            </div>
            <p className="font-semibold text-header">No notifications yet</p>
            <p className="text-sm text-placeholdtwo mt-1">
              You will be notified whenever leads are assigned or updated.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border p-4 shadow-sm transition ${
                !notification.isRead
                  ? "border-blue-200 bg-blue-50/50 border-l-4 border-l-blue-600"
                  : "border-line bg-white"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-header">
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600">{notification.body}</p>
                <small className="text-xs text-placeholdtwo block">
                  {new Date(notification.createdAt).toLocaleString("en-US", {
                    timeZone: "Africa/Cairo",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>

              {!notification.isRead && (
                <button
                  type="button"
                  onClick={() => markAsRead && markAsRead(notification._id)}
                  className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
                >
                  <IoCheckmarkDoneOutline size={16} />
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
