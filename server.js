const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

// ✅ Configure CORS to allow requests from your frontend
app.use(cors({ origin: ["http://localhost:3000", "https://marvelous-pegasus-9a0d3d.netlify.app"] }));


// ✅ Serve static models
app.use("/models", express.static(path.join(__dirname, "models")));

app.get("/models", (req, res) => {
  fs.readdir(path.join(__dirname, "models"), (err, files) => {
    if (err) {
      res.status(500).json({ error: "Error reading model directory" });
    } else {
      res.json(files.filter(file => file.endsWith(".glb")));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
