import { io } from "socket.io-client";
import { SOCKET_URL } from "../config/api";

const socket = io(SOCKET_URL, {
  autoConnect: false,
  auth: (cb) => {
    const token = localStorage.getItem("token");
    cb({ token });
  },
});

export default socket;
