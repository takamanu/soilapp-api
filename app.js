const express = require("express");
const morgan = require("morgan"); // Add this line
const bodyParser = require("body-parser");
const passport = require("passport");
const strategy = require("./config/jwtOptions");
const User = require("./models/User");
const checkAuth = require("./middleware/checkAuth");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const db = require("./config/database");

const app = express();

// Logging middleware
app.use(morgan("SoilApp> :method :url :status :response-time ms"));

// Configuration of the REST API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Database connection
db.authenticate()
  .then(() =>
    console.log(`Successfully connected to ${db.config.host}:${db.config.port}`)
  )
  .catch((err) => console.error("Error connecting to database:", err));

// Sync User model
User.sync()
  .then(() => console.log("User table created successfully"))
  .catch((err) => console.error("User table not created:", err));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport strategy middleware
passport.use("strategy", strategy);

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "unknown route" });
});

// Start server
// app.listen(port, () => console.log("Listening on port:", port));

module.exports = app;
