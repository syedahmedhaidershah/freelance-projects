// const { redisClient } = require('../../libraries/redis.lib');

/**
   * Emit notification
   * @param {number} to - Specify to as an event
   * @param {number} data - Notification object to send
   * @returns {Promise<Notification[]>}
   */
const sendNotification = (to, data) => {
  global.io.of('/notifications').emit(to, data);

  // redisClient.get(email, (err, value) => {
  //   if (!value) return;
  //   const sockets = JSON.parse(value);
  //   sockets.forEach((id) => {
  //     global.io.of('/notifications')
  //       .to(id).emit('notification', data);
  //   });
  // });
};

module.exports = {
  sendNotification,
};
