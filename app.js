const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(cors());

//schema design
const TourSchema = mongoose.Schema({

name:{
type: String,
required:[true,"Please provide a name for this tour"],
trim:true,
unique: [true,"Name must be unique"],
minLength:[3,"Name must be at least 3 character"],
maxLEngth:[100,"name is too large"],
},
description:{
    type:String,
    required:true
    },

price:{
type:Number,
require:true,
min:[0,"Price can be negative"],
},

quantity:{
  type:Number,
    required:true,
    min:[0,"quantity can not be negative"],
    validate:{
        validator:(value)=>{
            const isInteger=Number.isInteger(value);
            if(isInteger){
                return true
            }else{
                return false
            }
        }
    },
    message:"Quantity must be an integer"
},

image: {
    type: String,
    required: [true, "Please provide a image url for this product."],
},
status:{
    type: String,
    required:true,
    enum:{
     values:   ["Available","Not-available"],
    message:"Status can not be{VALUE}"
    }
}
},{
    timeStamps:true,
})

//SCHEMA =>MODEL=>Query

const Tour = mongoose.model('Tour',TourSchema)

//routes

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//Posting to database
app.post('/api/v1/tour',async(req,res,next)=>{
try {
    const result= await Tour.create(req.body)
    // const tour = new Tour(req.body)
    // const result= await tour.save()
    res.status(200).json({
        status:'success',
        message:'Tour inserted successfully',
        data:result
    }) 
} catch (error) {
    res.status(400).json({
        status:'fail',
        message:'Tour is not inserted',
        error:error.message
    })
}

})

 module.exports = app;
