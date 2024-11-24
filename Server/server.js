const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080; // You can customize the port if needed

// Define the path to your static files (adjusted for the "Client" folder)
const clientPath = path.join(__dirname, "Client");

// Serve static files from the "Client" folder
app.use(express.static(clientPath));

// Handle SPA routing (for Vue.js, React, etc., with client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Start the frontend server
app.listen(PORT, () => {
  console.log(`Frontend server is running at http://localhost:${PORT}`);
});
