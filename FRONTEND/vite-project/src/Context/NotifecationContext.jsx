// import React from 'react'
import {
  createContext,
  useEffect,
  useState,
  useContext,
  // Children,
} from "react";
import axios from "axios";
import socket from "../Socket/Socket";
const NotificatoinContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://127.0.0.1:4000/api/noti", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotification(res.data.noti);
      } catch (error) {
        console.log(error);
      }
    };
    getNotification();
  }, []);
  useEffect(() => {
    socket.on("newNotifecation", (notification) => {
      setNotification((prev) => [notification, ...prev]);
    });
    return () => {
      socket.off("newNotifecation");
    };
  }, []);
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;
  
    const markAsRead = async (id) => {
      try {
        const token = localStorage.getItem("token");
        await axios.patch(`http://localhost:4000/api/noti/${id}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotification((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
        );
      } catch (error) {
        console.log(error);
      }
    };
  

  return (
    <NotificatoinContext.Provider
      value={{
        notifications,
        setNotification,
        unreadCount,
        markAsRead
      }}
    >
      {children}
    </NotificatoinContext.Provider>

  );
};
export const useNotification = () => useContext(NotificatoinContext);
export default NotificationProvider;



