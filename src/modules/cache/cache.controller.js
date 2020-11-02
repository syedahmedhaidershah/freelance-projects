const { Worker } = require('worker_threads');

const worker = new Worker('./src/modules/cache/cache.worker.js');
worker.on('message', (message) => {
  const {
    topic,
    data
  } = message;
  let destruct = null;

  switch (topic) {
    case 'getall':
      io.emit('getall', data);
      break;
    case 'store':
      io.emit('store', data);
      break;
    case 'remove':
      io.emit('remove', data);
      break;
    case 'clear':
      io.emit('clear', {});
      break;
    default:
      break;
  }
});

const getAll = async (...data) => {
  try {
    worker.postMessage({ topic: 'getall' });
  } catch (error) {
    next(error);
  }
};

const store = async (data) => {
  try {
    data = JSON.parse(data);
    worker.postMessage({
      topic: 'store',
      data: {
        key: Object.keys(data)[0],
        value: Object.values(data)[0],
      }
    });
  } catch (error) {
    console.log(error);
  }
};


const remove = async (data) => {
  try {
    worker.postMessage({
      topic: 'remove',
      data: {
        key: data
      }
    });
  } catch (error) {
    next(error);
  }
};

const clear = async (data) => {
  try {
    worker.postMessage({
      topic: 'clear'
    });
  } catch (error) {
    next(error);
  }
};


// const markRead = async (req, res, next) => {
//   try {
//     const { notificationIds } = req.body;
//     const notifications = await Notification.MarkRead(notificationIds);
//     return sendResponse(res, null, notifications);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  // createNotification,
  getAll,
  store,
  remove,
  clear
  // markRead,
};
