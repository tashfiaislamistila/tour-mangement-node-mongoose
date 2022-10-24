
const { createTourService, getTourService,getTourServiceById } = require("../services/tour.services")

exports.getTours=async(req,res,next)=>{
    try {
        const tours=await getTourService();
        res.status(200).json({
            status:"success",
            data:tours
        })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not get the tour",
            error:error.message,

        })
    }
}

exports.getTourByID = async(req,res,next)=>{
    try {
        const {id}=req.params;
        const tours=await getTourServiceById(id);
        res.status(200).json({
            status:"success",
            data:tours
        })
        
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not get the tour by ID",
            error:error.message,

        })
    }
}


exports.createTour = async(req,res,next)=>{
    try {
        const result= await createTourService(req.body)
        result.logger()
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
    }