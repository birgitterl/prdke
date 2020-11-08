const mongoose = require("mongoose");

//TODO: check connection string!!!
const DB_URI = "mongodb://mongo:27017/moody";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Connection error", err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
