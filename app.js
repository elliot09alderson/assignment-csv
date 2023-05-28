
// importing files and Modules
import express from "express";
import { studentRouter } from "./routes/studentRoute.js";
import { config } from "dotenv";
import { connectDB } from "./db/connect.js";
import multer from "multer";
import bodyParser from "body-parser";
import { importStudents } from "./controllers/student.js";
var upload = multer({ dest: "uploads/" });
import path from "path";


const app = express();


// importing middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use("/api/students", studentRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

config({ path: "./config/config.env" });

const PORT = 5000;

// Multer Configuration for adding the csv file
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
app.post("/addcsv", upload.single("file"), importStudents);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`${PORT} server is listening`);
    });
  } catch (error) {
    console.log(error);
  }
};


start();
connectDB();
