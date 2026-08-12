<<<<<<< HEAD
=======
// import React from 'react'

>>>>>>> fd9fffb059a049e8b28813acfca05e6bcb7b2373
import { useNotification } from "../../Context/NotifecationContext";

export default function Notifications() {
  const { notifications, unreadCount } = useNotification();
<<<<<<< HEAD

  return (
    <div className="p-5">
=======
  return (
   <div className="p-5">
>>>>>>> fd9fffb059a049e8b28813acfca05e6bcb7b2373
      <h1 className="text-2xl font-bold">
        Notifications ({unreadCount})
      </h1>

      <div className="mt-5 space-y-4">
        {notifications.length === 0 ? (
          <p>No Notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="border rounded-lg p-4 shadow"
            >
              <h2 className="font-semibold">
                {notification.title}
              </h2>

              <p>{notification.body}</p>

              <small>
                {new Date(notification.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
<<<<<<< HEAD
  );
}
=======
  )
}
>>>>>>> fd9fffb059a049e8b28813acfca05e6bcb7b2373
