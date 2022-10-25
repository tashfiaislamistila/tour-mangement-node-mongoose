const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const viewCount = require("./middleware/viewcount");

//middleware
app.use(express.json());
app.use(cors());

// app.use(viewCount);


//routes
const tourRoute=require('./routes/tour.route')

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//Posting to database
app.use('/api/v1/tour',tourRoute)


 module.exports = app;
