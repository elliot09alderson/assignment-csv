import { query } from "express";
import { StudentModel } from "../models/studentModel.js";
import csvtojson from "csvtojson";
import fs from "fs";

const getAllStudent = async (req, res) => {
  const { name, std, grade, id, sort } = req.query;

  // # Advanced Searching Functionality

  const queryObj = {};
  if (grade) {
    queryObj.grade = grade;
  }
  if (std) {
    queryObj.std = std;
  }
  if (id) {
    queryObj.id = id;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  let apiUrl = StudentModel.find(queryObj);

  // # Advanced Sorting Functionality
  if (sort) {
    let sortQuery = sort.replace(",", " ");
    apiUrl = apiUrl.sort(sortQuery);
  }

  // #  Pagination Functionality

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 4;

  let skipCount = (page - 1) * limit;
  apiUrl = apiUrl.skip(skipCount).limit(limit);

  const data = await apiUrl;
  res.status(200).json({
    success: true,
    data: data,
  });
};

// TO ADD THE CSV DATA IN DATABASE
export const importStudents = async (req, res) => {
  try {
    var studentData = [];
    csvtojson()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (var x = 0; x < response.length; x++) {
          studentData.push({
            id: response[x].id,
            name: response[x].name,
            phone: response[x].phone,
            totalMarks: response[x].totalMarks,
            std: response[x].std,
            grade: response[x].grade,
          });
        }
        await StudentModel.insertMany(studentData);
      });
    res.status(400).send({
      success: true,
      message: "data added",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export default getAllStudent;
