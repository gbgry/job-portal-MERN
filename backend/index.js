// IMPORTS
import express from "express"; //new way
import cookieParser from "cookie-parser";
import cors from "cors";

// CREATE APP
const app = express();

// MIDDLEWARE
app.use(express.json());   //read json
app.use(express.urlencoded({ extended: true }));   //name=Ram&email=ram@gmail.com, extended:true helps to handle nested/extended data
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// START SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});


