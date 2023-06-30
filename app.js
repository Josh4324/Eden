const express = require("express");
const app = express();
const Middleware = require("./middlewares/common");
const mongoose = require("mongoose");
const swagger = require("./swagger");
const passport = require("passport");
const GoogleAuth = require("./middlewares/googleAuth");
require("dotenv").config();

const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const seriesRoutes = require("./routes/series");
const eventRoutes = require("./routes/event");
const instagramRoutes = require("./routes/instagram");
const verseRoutes = require("./routes/verse");
const blogRoutes = require("./routes/blog");
const homeGroupRoutes = require("./routes/homegroup");
const dailyEdgeRoutes = require("./routes/dailyedge");
const homeRoutes = require("./routes/home");
const { redirect } = require("statuses");

// Port
const port = process.env.PORT || 1000;
//connection url
const DB = process.env.MONGOLAB_URI_PROD || "mongodb://localhost/eden";

Middleware(app);
GoogleAuth(app, passport);

//REGISTER ROUTES HERE
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/series", seriesRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/instagram", instagramRoutes);
app.use("/api/v1/verse", verseRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/homegroup", homeGroupRoutes);
app.use("/api/v1/dailyedge", dailyEdgeRoutes);
app.use("/api/v1/home", homeRoutes);

swagger(app, port);

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
  .catch((err) => {
    console.log(err);
    console.log("Error connecting to database");
  });

//listening to port
app.listen(port, () => {
  console.log(`EDEN Server is running on port ${port}`);
});
