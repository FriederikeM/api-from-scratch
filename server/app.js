const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Students = require("./models/students");
const Course = require("./models/course");

const app = express();

app.use(express.json());
app.use(cors());

// Add a single course

app.post("/course", (req, res) => {
  Course.create(req.body).then((newCourse) => {
    res.status(201);
    res.json(newCourse);
  });
});

// Get all courses

app.get("/course", (req, res) => {
  Course.find().then((course) => {
    res.status(200);
    res.json(course);
  });
});

// Get a single course

app.get("/course/:id", (req, res) => {
  const { id } = req.params;
  Course.findById(id).then((course) => {
    res.status(200);
    res.json(course);
  });
});

// Get all students

app.get("/students", (req, res) => {
  Students.find().then((students) => {
    res.status(200);
    res.json(students);
  });
});

// Get all students in a specific course

app.get("/course/:courseId/students", (req, res) => {
  const { courseId } = req.params;
  Students.find({ courseId }).then((students) => {
    res.status(200);
    res.json(students);
  });
});

// Get a single student

app.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Students.findById(studentId).then((students) => {
    res.status(200);
    res.json(students);
  });
});

// Add a single student to a specific course

app.post("/course/:courseId/students", (req, res) => {
  const { courseId } = req.params;

  Students.create({ ...req.body, courseId }).then((newStudent) => {
    res.status(201);
    res.json(newStudent);
  });
});

// Edit a specific student

app.patch("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Students.findByIdAndUpdate(studentId, req.body, { new: true }).then(
    (updatedStudent) => {
      res.status(200);
      res.json(updatedStudent);
    }
  );
});

// Delete a specific student

app.delete("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  Students.findByIdAndDelete(studentId).then(() => {
    res.status(204);
    res.json("Student deleted!");
  });
});

// Edit single course

app.patch("/course/:courseId", (req, res) => {
  const { courseId } = req.params;
  Course.findByIdAndUpdate(courseId, req.body, { new: true }).then(
    (updatedCourse) => {
      res.status(200);
      res.json(updatedCourse);
    }
  );
});

// Delete single course

app.delete("/course/:courseId", (req, res) => {
  const { courseId } = req.params;
  Course.findByIdAndDelete(courseId).then(() => {
    res.json("Course deleted!");
    res.status(204);
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
