const express = require("express");
const cors = require("cors");
const data = require("./db.json");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/partners", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) console.log(err);
    else res.json({ data: JSON.parse(data) });
  });
});
app.post("/partners/create", (req, res) => {
  const data1 = data;
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) console.log(err);
    else {
      let id;
      data = JSON.parse(data);
      if (data.length === 0) id = 1;
      else id = data[data.length - 1].id + 1;
      data.push({ ...req.body, id });
      fs.writeFile("./db.json", JSON.stringify(data), (err) => {
        if (err) console.log(err);
        else res.status(201).json({ message: "Partner added successfully" });
      });
    }
  });
});
app.delete("/partners/:id", (req, res) => {
  const { id } = req.params;
  let data1;
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) console.log(err);
    else {
      data = JSON.parse(data);
      data = data.filter((d) => d.id !== Number(id));
      fs.writeFile("./db.json", JSON.stringify(data), (err) => {
        if (err) console.log(err);
        else res.status(200).json({ message: "Partner deleted successfully" });
      });
    }
  });
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
