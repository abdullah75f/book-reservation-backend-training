const app = require("./app"); // Import app from app.js

const PORT = process.env.PORT || 3000;

// Start the server if it's not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
