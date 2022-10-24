const Tour = require('../models/Tour');

 exports.getTourService = async () =>{
 const tours=await Tour.find({});
 return tours;
 }

 exports.getTourServiceById = async (id) =>{
    const tours=await Tour.findById(id);
    return tours;
    }


exports.createTourService = async(data)=>{
    const tour = await Tour.create(data);
    return tour;
   }