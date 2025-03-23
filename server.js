// server.js
const app = require("./app"); // Import app from app.js

const PORT = process.env.PORT || 3000;

// Only start the server if this is the main execution context
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Export app for testing purposes
