const Tour = require('../models/Tour');

 exports.getTourService = async (filters, queries) =>{
 const tours=await Tour
 .find(filters)
 .skip(queries.skip)
 .limit(queries.limit)
 .select(queries.fields)
 .sort(queries.sortBy);
 return tours;

const total = await Tour.countDocuments(filters);
const page = Math.ceil(total / queries.limit);
    return { total, page, tours };
 }

 exports.getTourServiceById = async (id) =>{
    const tours=await Tour.findById(id);
    return tours;
    }

exports.getCheapestService = async()=>{
    const tours = await Tour.find({}).limit(3).sort({price:1});
    return tours;
}

exports.getTrendingService = async()=>{
    const tours = await Tour.find({}).sort({viewCount:-1}).limit(3);
    return tours;
}

exports.updateTourServiceById = async (id,data) =>{
        const tours = await Tour.updateOne(
            {_id: id}, { $set: data }, {runValidators:true}
            );
        return tours;
        }

exports.createTourService = async(data)=>{
    const tour = await Tour.create(data);
    return tour;
   }

   exports.updateViewCount = async (tourId, data) => {
    const result = await Tour.updateOne({ _id: tourId }, { $inc: { viewCount: 1 } }, { runValidators: true });
    return result;
}