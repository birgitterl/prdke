const connectDB = require("./src/config/db");
const app = require("./src/app");

//Connect to DB
connectDB();

// Connect to port
app.listen(8080, () => {
  console.log("Server started on port 8080...");
});
