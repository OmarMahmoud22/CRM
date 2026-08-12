import { io } from "socket.io-client";

const token = localStorage.getItem("token");

const socket = io("http://lockalhost:4000", {
  autoConnect: false,
  auth: { token },
});

export default socket;
