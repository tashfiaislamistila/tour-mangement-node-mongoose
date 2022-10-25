
const { createTourService, getTourService,getTourServiceById,updateTourServiceById,getCheapestService,getTrendingService } = require("../services/tour.services")

exports.getTours=async(req,res,next)=>{
    try {
        let filters = { ...req.query };

        const excludeFields = ['sort', 'page', 'limit', 'fields'];
        excludeFields.forEach(field => delete filters[field]);

        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        filters = JSON.parse(filtersString);

        const queries = {};
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }
        const tours=await getTourService(filters,queries);
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
exports.getTrendingTour= async(req,res,next) => {
    try {
        const tours=await getTrendingService();
        res.status(200).json({
            status:"successfully get the trending tour",
            data: tours
        }) 
    } catch (error) {
        res.status(400).json({
            status:"fail",
            message:"Can not get the trending tour",
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