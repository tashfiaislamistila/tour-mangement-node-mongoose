const { createTourService } = require("../services/tour.services")


exports.createProduct = async(req,res,next)=>{
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