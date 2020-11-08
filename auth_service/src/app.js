const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./config/swaggerDef");

const app = express();

// Init body parser middleware
app.use(express.json());

// Define API Routes:
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Swagger documentation setup - available under 'localhost:8080/api-docs':
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { explorer: true })
);

app.get("/", (req, res) => {
  res.send("Hi there auth-service works");
});

module.exports = app;
