const express = require("express");
const app = express();
const cors = require("cors");
const {mongoose} = require("mongoose");

//middleware
app.use(express.json());
app.use(cors());

//schema design
const productSchema = mongoose.Schema({

name:{
type: String,
required:[true,"Please provide a name for this product"],
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

//routes
// const productRoute = require('./routes/product.route')

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//Posting to database
// app.use('/api/v1/tour',productRoute)

 module.exports = app;
