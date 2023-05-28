import mongoose from "mongoose";
const schema = mongoose.Schema({
  id: {
    type: String,
    required: [[true, "please enter the id of student"]],
  },
  name: {
    type: String,
    required: [true, "Please provide Name of student"],
  },
  phone: {
    type: String,
  },
  totalMarks: {
    type: String,
    required: [true, "kindly add the total marks of student"],
  },
  std: {
    type: String,
    required: [true, "please give the class name"],
  },
  grade: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const StudentModel = mongoose.model("StudentDetail", schema);
