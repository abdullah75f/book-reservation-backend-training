const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/database");
const notificationRoutes = require("./routes/notifications");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const reservationRoutes = require("./routes/reservations");
require("dotenv").config();

// Initialize app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI) // No extra options needed
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/notifications", notificationRoutes);

// Add root route to pass the test
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

// Start server
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Export the app for testing
