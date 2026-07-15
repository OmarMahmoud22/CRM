// const { Model } = require("mongoose")
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
//عشان نستخدمه ف كل الفانكشنز ,,, وهيشيل ال SERVER الجديد
let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    try {
      const token = socket.handshake.auth.token;

      const decoded = jwt.verify(token, process.env.SECRETKEY);

      socket.userId = decoded.id;

      socket.join(decoded.id);

      console.log(`User ${decoded.id} connected`);

      socket.on("disconnect", () => {
        console.log(`User ${decoded.id} disconnected`);
      });
    } catch (error) {
      console.log("socket auth faild");
      socket.disconnect(true);
      
    }
  
  });
}
function getIO() {
  return io;
}

module.exports = {
  initSocket,
  getIO,
};
