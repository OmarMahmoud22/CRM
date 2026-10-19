import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import socket from "../Socket/Socket";
import API_BASE_URL, { getAuthHeaders } from "../config/api";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const getNotifications = useCallback(async () => {
    try {
      const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setNotifications([]);
        return;
      }

      const res = await axios.get(`${API_BASE_URL}/noti`, {
        headers: getAuthHeaders(),
      });

      const list = res.data.noti || res.data || [];
      setNotifications(Array.isArray(list) ? list : []);
    } catch (error) {
      console.warn("Notification fetch warning:", error?.response?.data?.msg || error.message);
    }
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    const handleNewNotification = (notification) => {
      if (!notification || !notification._id) return;

      setNotifications((prev) => {
        // Prevent duplicate notifications with the same ID
        const exists = prev.some(
          (n) => n._id?.toString() === notification._id?.toString(),
        );
        if (exists) {
          return prev;
        }
        return [notification, ...prev];
      });
    };

    socket.on("newNotifecation", handleNewNotification);

    return () => {
      socket.off("newNotifecation", handleNewNotification);
    };
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/noti/${id}`,
        {},
        {
          headers: getAuthHeaders(),
        },
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
    } catch (error) {
      console.error("Mark notification as read failed:", error.message);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        markAsRead,
        refreshNotifications: getNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context || { notifications: [], unreadCount: 0, markAsRead: () => {} };
};

export default NotificationProvider;
