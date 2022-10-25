
const { createTourService, getTourService,getTourServiceById,updateTourServiceById,getCheapestService } = require("../services/tour.services")

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

exports.getCheapestTour = async(req,res,next)=>{
    try {
        // const tours = await Tour.find({ price: { $lte:3000 } });
         const tours=await getCheapestService();
        res.status(200).json({
            status:"successfully get the cheapest tour",
            data: tours
        }) 
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not get the cheapest tour",
            error:error.message,  
    })
}
}
exports.updateTourById= async(req,res,next)=>{
    try {
        const {id}=req.params;
        const result=await updateTourServiceById(id,req.body);
        res.status(200).json({
            status:"successfully updated the tour by id",
            data:result
        })
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not update the tour by ID",
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
            error:error.message,
        })
    }
    }