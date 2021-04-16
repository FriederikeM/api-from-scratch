const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentsSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    course: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Students", StudentsSchema);
