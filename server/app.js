const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Students = require("./models/students");
const Course = require("./models/course");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/students", (req, res) => {
  Students.create(req.body).then((newStudent) => {
    res.status(201);
    res.json(newStudent);
  });
});

app.get("/students", (req, res) => {
  Students.find().then((students) => {
    res.status(200);
    res.json(students);
  });
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  Students.findById(id).then((students) => {
    res.status(200);
    res.json(students);
  });
});

app.patch("/students/:id", (req, res) => {
  const { id } = req.params;
  Students.findByIdAndUpdate(id, req.body, { new: true }).then(
    (updatedStudent) => {
      res.status(200);
      res.json(updatedStudent);
    }
  );
});

app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  Students.findByIdAndDelete(id).then(() => {
    res.status(204);
    res.json("Post deleted!");
  });
});

mongoose.connect("mongodb://localhost/bootcamp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongodb = mongoose.connection;

mongodb.on("open", () => {
  app.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
  });
});
