const models = require("../models/index");
const userModel = models.users;
const constants = require("../constants.json");
const jwt = require("jsonwebtoken");
bcrypt = require("bcryptjs");
require("dotenv").config({ path: "./.env" });

//console.log("checking", userModel);

exports.register = (req, res) => {
  //console.log("checking", userModel);
  const { fullname, email, password } = req.body;
  let password_salt = process.env.PASSWORD_SALT;
  let paswordhash = bcrypt.hashSync(password + password_salt, 10);
  userModel
    .create({
      fullname: fullname,
      email: email,
      password: paswordhash,
    })
    .then((result) => {
      res.status(constants.HTTP_STATUS.CREATED);
      res.json(result);
    })
    .catch(async (error) => {
      res.status(error.status);
      res.json({
        message: error.message,
      });
    });
};

exports.login = async (req, res) => {
  //console.log("I am in user controller", req.body);
  const { email, password } = req.body;
  let password_salt = process.env.PASSWORD_SALT;
  let userData = await userModel.findOne({ where: { email: req.body.email } });
  if (!userData) {
    res.status(constants.HTTP_STATUS.NOT_FOUND);
    res.json({
      message: "Invalid Email",
    });
    return;
  } else {
    const result = await bcrypt.compareSync(
      password + password_salt,
      userData.password
    );
    console.log("ExpireIN", process.env.JWT_EXPIRATION_TIME);
    const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    res.status(200).json({ messge: "Users Login Successfully", token });

    res.json({
      message: "Your password is incorrect",
    });
  }
};
