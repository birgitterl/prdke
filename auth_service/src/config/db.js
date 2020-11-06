const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//TODO: check connection string!!!
const connectionString = 'mongodb://mongo:27017/moody'

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error('Connection error', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
