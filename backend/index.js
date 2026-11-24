// IMPORTS
import express from "express"; //new way
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({});

// CREATE APP
const app = express();

// MIDDLEWARE
app.use(express.json()); //read json
app.use(express.urlencoded({ extended: true })); //name=Ram&email=ram@gmail.com, extended:true helps to handle nested/extended data
app.use(cookieParser());

const corsOptions = {
  //rule we create
  origin: "http://localhost:5173", // allow request from ur react frontend
  credentials: true, // allow browser req to include cookies
};

app.use(cors(corsOptions));

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`server running at port ${PORT}`);
});
