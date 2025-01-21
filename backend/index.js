const express = require("express");
const cors = require("cors");
const data = require("./db.json");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/partners", (req, res) => {
  res.json({ data });
});
app.post("/partners/create", (req, res) => {
  const data1 = data;
  let id;
  if (data1.length === 0) id = 1;
  else id = data1[data1.length - 1].id + 1;
  data1.push({ ...req.body, id });
  fs.writeFile("./db.json", JSON.stringify(data1), (err) => {
    if (err) console.log(err);
    else res.status(201).json({ message: "Partner added successfully" });
  });
});
app.delete("/partners/:id", (req, res) => {
  const { id } = req.params;
  let data1 = [...data];
  data1 = data1.filter((d) => d.id !== Number(id));
  console.log(data1);
  fs.writeFile("./db.json", JSON.stringify(data1), (err) => {
    if (err) console.log(err);
    else res.status(200).json({ message: "Partner deleted successfully" });
  });
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
