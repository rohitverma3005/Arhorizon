const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;

app.use(cors({ origin: ["http://localhost:3000", "https://marvelous-pegasus-9a0d3d.netlify.app"] }));

// ✅ Serve models
app.use("/models", express.static(path.join(__dirname, "models")));

// ✅ API to list all `.glb` and `.usdz` models
app.get("/models", (req, res) => {
  fs.readdir(path.join(__dirname, "models"), (err, files) => {
    if (err) {
      res.status(500).json({ error: "Error reading model directory" });
    } else {
      const models = files.filter(file => file.endsWith(".glb") || file.endsWith(".usdz"));
      res.json(models);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
