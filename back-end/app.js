var cookieParser = require("cookie-parser");
var express = require("express");
var cors = require("cors");
const helmet = require("helmet");
var bodyParser = require("body-parser");

// setup route middlewares

// create express app
var app = express();

// configure app
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.hidePoweredBy());

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
const db = require("./models/index");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type,bearer"
//   );
//   // Transport Security added
//   res.setHeader("Strict-Transport-Security", "max-age=31536000;");
//   // Pass to next layer of middleware
//   next();
// });
// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

// setup route middlewares

const apilist = require("./routes/apilist");
app.use("/api/v1/", apilist);

module.exports = app;
