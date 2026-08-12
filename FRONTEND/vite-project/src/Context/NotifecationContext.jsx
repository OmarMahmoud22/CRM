import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import socket from "../Socket/Socket";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Get all notifications when the app starts
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await axios.get(
          "http://localhost:5000/api/noti",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotifications(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, []);

  // Listen for new notifications from Socket.IO
  useEffect(() => {
    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;