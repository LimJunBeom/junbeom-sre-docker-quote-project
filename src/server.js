const express = require("express");
const path = require("path");
const quotes = require("./quotes");
const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.get("/quote", (_req, res) => {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: q });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
