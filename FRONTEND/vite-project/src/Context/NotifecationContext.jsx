<<<<<<< HEAD
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
=======
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
>>>>>>> fd9fffb059a049e8b28813acfca05e6bcb7b2373
      } catch (error) {
        console.log(error);
      }
    };
<<<<<<< HEAD

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
=======
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



>>>>>>> fd9fffb059a049e8b28813acfca05e6bcb7b2373
