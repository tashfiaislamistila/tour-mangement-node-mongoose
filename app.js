const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const viewCount = require("./middleware/viewcount");

//middleware
app.use(express.json());
app.use(cors());

app.use(viewCount);



//routes
const tourRoute=require('./routes/tour.route')

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//Posting to database
app.use('/api/v1/tour',tourRoute)

app.get("/api/v1/tour",async(req,res,next)=>{
    try {
        const tours=await Tour.find({}).sort({quantity:-1});
        res.status(200).json({
            status:"success",
            data:tours
        })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Cannot get the tour",
            error:error.message,

        })
    }
})


 module.exports = app;
