// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Sample data (in place of a real database)
let lessons = [
    { id: 1, title: "Math Tutoring", description: "Enhance your math skills!", price: 100, availableInventory: 5 },
    { id: 2, title: "Science Workshop", description: "Hands-on science experience.", price: 150, availableInventory: 3 }
];

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/lessons', (req, res) => {
    res.json(lessons);
});

// For updating or submitting orders, you would add more endpoints here.

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
