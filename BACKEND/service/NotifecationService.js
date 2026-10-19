const Notifecatoin = require("../Models/Notifecation");
const { getIO } = require("../socket");

const createNotifecation = async ({
  userId,
  type,
  title,
  body,
  data = {},
}) => {
  const actualUserId = userId?._id || userId;
  if (!actualUserId) {
    return null;
  }

  const notifecation = await Notifecatoin.create({
    userId: actualUserId,
    type,
    title,
    body,
    data,
  });

  const io = getIO();
  if (io) {
    const targetRoom = actualUserId.toString();
    // Emit only once to prevent duplicate client triggers
    io.to(targetRoom).emit("newNotifecation", notifecation);
  }

  return notifecation;
};

module.exports = {
  createNotifecation,
};
