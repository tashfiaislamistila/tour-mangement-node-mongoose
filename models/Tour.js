const mongoose=require("mongoose")

//schema design
const tourSchema = mongoose.Schema({
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
    },
    viewCount: {
        type:Number
    }
    },
    {
        timeStamps:true,
    })
    
    //mongoose middleware for saving data: pre/post 
    
    tourSchema.pre('save',function(next){
        console.log('Before saving data');
        if(this.quantity == 0){
          this.status='Not Available'
        }
        next()
    })
    
    tourSchema.methods.logger= function(){
        console.log(`Tour saved for ${this.name}`);
      }
    
    //SCHEMA =>MODEL=>Query
    
    const Tour = mongoose.model('Tour',tourSchema)

    module.exports=Tour;