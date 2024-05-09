require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.set("trust proxy", 1);

//MIDLEWARE
app.use(
  cors({
    origin: process.env.FE_PATH, //add to RENDER as ENV  VARIABLE
    credentials: true,
  })
);
app.use(express.json());


//MVC CONTROLERS
const diaryController = require("./diary/diary.controller");
const loginController = require("./login/login.controller");

//LOGIN ENDPOINTS
app.post("/create_user", loginController.createUser);
app.post("/verify_user", loginController.verifyUser);

//DIARY ENDPOINTS
app.get("/diaries",auth, diaryController.getAll);
app.get("/diaries/:userID",auth, diaryController.getDiarybyUserID);
app.get("/userInitials", auth, diaryController.getAllUserInitials);
app.post("/diaries",auth, diaryController.createDiary);
app.patch("/diaries/:id",auth, diaryController.editDiary);
app.delete("/diaries/:id",auth, diaryController.deleteDiary);

//MIDDLEWARE FOR AUTHENTICATION
function auth(req, res, next) {
  //splitting the token value from the text in teh Header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = app;
