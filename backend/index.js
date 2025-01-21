const express = require("express");
const cors = require("cors");
const data = require("./db.json");
const app = express();
app.use(cors());
app.get("/partners", (req, res) => {
  res.json({ data });
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
