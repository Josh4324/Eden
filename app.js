const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();


const userRoutes = require("./routes/user");


// Port
const port = process.env.PORT || 1000;
//connection url
const DB = process.env.MONGOLAB_URI || "mongodb://localhost/eden";

//HTTP headers
app.use(helmet());

//Enable cors
app.use(cors());

//Against brute attack
const rateLimiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

//rate liniter
app.use("/api", rateLimiter);

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: false,
    parameterLimit: 10000,
  })
);

//NoSQL query injection -Data Sanitization
app.use(mongoSanitize());

//xss attack - Data Sanitization
app.use(xss());

//HTTP parament pollution
app.use(hpp());

//REGISTER ROUTES HERE
app.use("/api/v1/user", userRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: `Welcome to EDEN API served on port ${port}`,
  });
});

//Handling unhandle routes
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "Error 404",
    message: `Page not found. Can't find ${req.originalUrl} on this server`,
  });
});

// Database Connection
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DATABASE connection successfull"))
  .catch((err) => console.log("Error connecting to database"));

//listening to port
app.listen(port, () => {
  console.log(`EDEN Server is running on port ${port}`);
});
