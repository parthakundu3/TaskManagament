"use strict";
const express = require("express");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const usrCtrl = require("../controller/userController");
const taskCtrl = require("../controller/taskController");
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  let bearer = token && token.replace("Bearer ", "");
  console.log("bearer", bearer);
  if (bearer) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.userLoginData = decoded.id;
    }
    next();
  } else {
    res.send({ message: "Invalid token" });
  }
}

router.post("/register", usrCtrl.register);
router.post("/login", usrCtrl.login);
router.post("/taskCreate", verifyToken, taskCtrl.taskCreate);

router.get("/form", csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  // res.render('send', { csrfToken: req.csrfToken() })
  res.send({ csrfToken: req.csrfToken() });
});

router.post("/process", parseForm, csrfProtection, function (req, res) {
  res.send("data is being processed");
});

module.exports = router;
