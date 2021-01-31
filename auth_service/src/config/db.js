const mongoose = require('mongoose');
const DB_URI = 'mongodb://mongo:27017/moody';

var options = {
  useNewUrlParser: true,
  reconnectTries: 100,
  reconnectInterval: 5000
};

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, options);
  } catch (err) {}
};

mongoose.connection.on('connecting', () => {
  connected = true;
  console.log('[MongoDB]: Connecting...');
});

mongoose.connection.on('connected', () => {
  console.log('[MongoDB]: Connected');
});

mongoose.connection.on('open', () => {
  console.log('[MongoDB]: Connection open');
});

mongoose.connection.on('disconnecting', () => {
  console.log('[MongoDB]: Disconnecting...');
});

mongoose.connection.on('disconnected', () => {
  console.log('[MongoDB]: Disconnected');
});

mongoose.connection.on('close', () => {
  console.log('[MongoDB]: Connection closed');
});

mongoose.connection.on('reconnected', function () {
  console.log('[MongoDB]: Reconnected');
});

mongoose.connection.on('error', function () {
  console.log('[MongoDB]: Error: Could not connect to MongoDB');
  setTimeout(connectDB, 5000);
});

module.exports = connectDB;
