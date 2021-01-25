const mongoose = require('mongoose');

const DB_URI = 'mongodb://mongo:27017/moody';

const connectDB = () => {
  return mongoose.connect(DB_URI, (err) => {
    if (err) {
      console.error('[MongoDB]', err.message);
      setTimeout(connectDB, 5000);
    } else {
      console.log('[MongoDB]: Connected...');
    }
  });
};

module.exports = connectDB;
